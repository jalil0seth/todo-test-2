import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Task } from '../../types/task';
import { TaskItemWrapper } from './TaskItemWrapper';

interface DraggableTaskListProps {
  tasks: Task[];
  onDragEnd: (result: any) => void;
  editingTask: Task | null;
  onEdit: (task: Task | null) => void;
  onUpdate: (task: Task) => void;
}

export function DraggableTaskList({ 
  tasks, 
  onDragEnd, 
  editingTask, 
  onEdit, 
  onUpdate 
}: DraggableTaskListProps) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-3"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <TaskItemWrapper
                    task={task}
                    editingTask={editingTask}
                    provided={provided}
                    onEdit={onEdit}
                    onUpdate={onUpdate}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}