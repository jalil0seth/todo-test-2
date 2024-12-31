import React from 'react';
import { Layout } from './components/Layout';
import { TaskProvider } from './context/TaskContext';
import { TaskList } from './components/TaskList';

function App() {
  return (
    <TaskProvider>
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <TaskList />
        </div>
      </Layout>
    </TaskProvider>
  );
}

export default App;