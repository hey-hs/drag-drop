import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

function TaskList({ tasks, blockId }) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">{blockId}</h3>
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="mb-2 p-2 bg-white rounded shadow cursor-pointer"
            >
              {task.content}
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
}

export default TaskList;
