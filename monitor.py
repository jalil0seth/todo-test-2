import os
import time
import shutil
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import zipfile
from dotenv import load_dotenv
import subprocess
from pathlib import Path
import sys
import threading
from datetime import datetime

# Load environment variables
load_dotenv()
PROJECT_NAME = 'todo-test2'

class Spinner:
    def __init__(self):
        self.spinning = False
        self.spinner_chars = "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏"
        self.current_char = 0
        self.last_status = ""
        self.terminal_width = self._get_terminal_width()

    def _get_terminal_width(self):
        try:
            return os.get_terminal_size().columns
        except OSError:
            return 80

    def _truncate_message(self, message, max_length):
        if len(message) <= max_length:
            return message
        return message[:max_length-3] + "..."

    def spin(self):
        while self.spinning:
            self.current_char = (self.current_char + 1) % len(self.spinner_chars)
            current_time = datetime.now().strftime("%H:%M:%S")
            base_status = f"{self.spinner_chars[self.current_char]} [{current_time}] Waiting for new zip file..."
            available_space = self.terminal_width - len(base_status) - 5
            
            status = base_status
            if self.last_status and available_space > 10:
                last_status = self._truncate_message(self.last_status, available_space)
                status = f"{base_status} ({last_status})"

            sys.stdout.write('\r' + ' ' * self.terminal_width + '\r')
            sys.stdout.write(status)
            sys.stdout.flush()
            time.sleep(0.1)

    def start(self):
        self.spinning = True
        threading.Thread(target=self.spin, daemon=True).start()

    def stop(self, status=""):
        self.spinning = False
        sys.stdout.write('\r' + ' ' * self.terminal_width + '\r')
        if status:
            current_time = datetime.now().strftime("%H:%M:%S")
            print(f"[{current_time}] ✓ {status}")
            self.last_status = self._truncate_message(status, 50)

class ZipHandler(FileSystemEventHandler):
    def __init__(self, root_path):
        self.root_path = root_path
        self.archive_path = os.path.join(root_path, 'archive')
        self.extract_path = os.path.join(root_path)
        self.current_version = 0
        self.spinner = Spinner()
        self.last_processed_zip = None
        
        # Create necessary directories
        os.makedirs(self.archive_path, exist_ok=True)
        os.makedirs(self.extract_path, exist_ok=True)
        
        # Create .gitignore
        self.create_gitignore()
        
        # Set initial version based on existing archives
        self._update_current_version()

    def create_gitignore(self):
        gitignore_path = os.path.join(self.root_path, '.gitignore')
        if not os.path.exists(gitignore_path):
            with open(gitignore_path, 'w') as f:
                f.write("archive/\n*.zip\nmonitor.py\n.bolt\n*.DS_Store\nnode_modules/")

    def is_zip_file(self, path):
        return path.endswith('.zip')

    def archive_zip(self, src_path):
        try:
            # Create archive directory if it doesn't exist
            os.makedirs(self.archive_path, exist_ok=True)
            
            # Generate new version number
            self.current_version += 1
            
            # Create new archive name
            archived_name = f"{PROJECT_NAME}-v{self.current_version}.zip"
            archived_path = os.path.join(self.archive_path, archived_name)
            
            # Move and rename the zip file
            shutil.move(src_path, archived_path)
            
            return archived_path
        except Exception as e:
            self.spinner.stop(f"Failed to archive zip: {str(e)}")
            return None

    def extract_zip(self, zip_path):
        try:
            # Files to preserve
            preserve_files = ['.env', 'monitor.py', '.git', '.gitignore']
            
            # Backup preserved files
            preserved_contents = {}
            for file in preserve_files:
                file_path = os.path.join(self.extract_path, file)
                if os.path.exists(file_path):
                    if os.path.isdir(file_path):
                        preserved_contents[file] = shutil.copytree(file_path, file_path + '_backup', dirs_exist_ok=True)
                    else:
                        preserved_contents[file] = shutil.copy2(file_path, file_path + '_backup')

            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                # Extract all files except preserved ones
                for file_info in zip_ref.filelist:
                    filename = os.path.basename(file_info.filename)
                    if filename in preserve_files:
                        continue
                    
                    # Get the file path relative to the first directory in the zip
                    parts = file_info.filename.split('/')
                    if len(parts) > 1:
                        # Skip the first directory (if it exists) but keep the rest of the path
                        relative_path = '/'.join(parts[1:]) if parts[0] else file_info.filename
                    else:
                        relative_path = file_info.filename

                    # Create target path in root directory
                    target_path = os.path.join(self.extract_path, relative_path)
                    
                    # Create directories if needed
                    os.makedirs(os.path.dirname(target_path), exist_ok=True)
                    
                    # Extract the file
                    if not file_info.filename.endswith('/'):  # Skip directories
                        content = zip_ref.read(file_info.filename)
                        with open(target_path, 'wb') as f:
                            f.write(content)

            # Restore preserved files
            for file, backup_path in preserved_contents.items():
                original_path = os.path.join(self.extract_path, file)
                if os.path.exists(backup_path):
                    if os.path.isdir(backup_path):
                        if os.path.exists(original_path):
                            shutil.rmtree(original_path)
                        shutil.copytree(backup_path, original_path, dirs_exist_ok=True)
                        shutil.rmtree(backup_path)
                    else:
                        shutil.move(backup_path, original_path)

            return True
        except Exception as e:
            self.spinner.stop(f"Failed to extract zip: {str(e)}")
            return False

    def handle_git(self):
        try:
            self.spinner.stop("Processing git operations...")
            git_dir = os.path.join(self.extract_path, '.git')
            
            # Check if git is initialized
            if not os.path.exists(git_dir):
                # First time setup
                subprocess.run(['git', 'init'], cwd=self.extract_path, capture_output=True)
            
            # Configure Git user if not set
            subprocess.run(['git', 'config', 'user.email', 'jalil0seth@gmail.com'], cwd=self.extract_path, capture_output=True)
            subprocess.run(['git', 'config', 'user.name', 'jalil0seth'], cwd=self.extract_path, capture_output=True)
            
            # Check if remote exists
            remote_exists = subprocess.run(['git', 'remote'], cwd=self.extract_path, capture_output=True, text=True)
            if 'origin' in remote_exists.stdout:
                subprocess.run(['git', 'remote', 'remove', 'origin'], cwd=self.extract_path, capture_output=True)
            
            # Add remote
            subprocess.run(['git', 'remote', 'add', 'origin', f'git@github.com:jalil0seth/{PROJECT_NAME}.git'], 
                         cwd=self.extract_path, capture_output=True)
            
            # Stage changes
            subprocess.run(['git', 'add', '.'], cwd=self.extract_path, capture_output=True)
            
            # Check if this is initial commit
            is_initial = subprocess.run(['git', 'rev-parse', 'HEAD'], cwd=self.extract_path, capture_output=True).returncode != 0
            
            # Commit changes
            commit_msg = "Initial commit" if is_initial else f'v{self.current_version}'
            commit_result = subprocess.run(['git', 'commit', '-m', commit_msg], 
                                        cwd=self.extract_path, capture_output=True, text=True)
            
            if commit_result.returncode != 0 and 'nothing to commit' not in commit_result.stderr:
                self.spinner.stop(f"Commit failed: {commit_result.stderr}")
                return False
            
            # Ensure we're on main branch
            subprocess.run(['git', 'branch', '-M', 'main'], cwd=self.extract_path, capture_output=True)
            
            # Push changes
            push_result = subprocess.run(['git', 'push', '-f', 'origin', 'main'], 
                                      cwd=self.extract_path, capture_output=True, text=True)
            
            if push_result.returncode != 0:
                self.spinner.stop(f"Push failed: {push_result.stderr}")
                return False
            
            self.spinner.stop("Git operations completed successfully")
            return True
            
        except Exception as e:
            self.spinner.stop(f"Git error: {str(e)}")
            return False

    def _update_current_version(self):
        try:
            # Get all zip files in archive directory
            zip_files = [f for f in os.listdir(self.archive_path) if f.endswith('.zip')]
            if zip_files:
                versions = [int(f.split('-v')[-1].split('.')[0]) for f in zip_files if '-v' in f]
                self.current_version = max(versions) if versions else 0
        except Exception:
            self.current_version = 0

    def on_created(self, event):
        if not self.is_zip_file(event.src_path):
            return
            
        try:
            self.spinner.stop(f"New zip detected: {os.path.basename(event.src_path)}")
            
            # Process the zip file
            self.spinner.stop("Processing zip file...")
            if self.extract_zip(event.src_path):
                # Archive the zip file
                archived_path = self.archive_zip(event.src_path)
                if archived_path:
                    self.spinner.stop(f"Files extracted and archived as {os.path.basename(archived_path)}")
                    # Handle git operations
                    self.handle_git()
                else:
                    self.spinner.stop("Failed to archive zip file")
            else:
                self.spinner.stop("Failed to extract zip file")
                
        except Exception as e:
            self.spinner.stop(f"Error processing zip: {str(e)}")

def main():
    # Setup paths
    root_path = os.path.dirname(os.path.abspath(__file__))
    
    # Print startup information
    print(f"\n{'='*50}")
    print(f"Starting file monitor")
    print(f"Project name: {PROJECT_NAME}")
    print(f"Monitoring directory: {root_path}")
    print(f"{'='*50}\n")

    # Create and start the handler
    event_handler = ZipHandler(root_path)
    observer = Observer()
    observer.schedule(event_handler, root_path, recursive=False)
    observer.start()

    # Start the spinner
    event_handler.spinner.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        event_handler.spinner.stop("Monitoring stopped")
        observer.stop()
        observer.join()

if __name__ == "__main__":
    main()