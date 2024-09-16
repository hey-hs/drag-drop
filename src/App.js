import React, { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import TaskList from './components/TaskList';

const initialData = {
  blocks: {
    today: {
      id: 'Today',
      tasks: [],
    },
    tomorrow: {
      id: 'Tomorrow',
      tasks: [],
    },
    thisWeek: {
      id: 'This Week',
      tasks: [],
    },
    nextWeek: {
      id: 'Next Week',
      tasks: [],
    },
    unplanned: {
      id: 'Unplanned',
      tasks: Array.from({ length: 10 }, (v, k) => ({
        id: `task-${k + 1}`,
        content: `Task ${k + 1}`,
      })),
    },
  },
  blockOrder: ['today', 'tomorrow', 'thisWeek', 'nextWeek', 'unplanned'],
};

function App() {
  const [data, setData] = useState(initialData);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    
    // If dropped outside the destination
    if (!destination) return;

    // If the task is dropped in the same place
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceBlock = data.blocks[source.droppableId];
    const destBlock = data.blocks[destination.droppableId];

    const sourceTasks = Array.from(sourceBlock.tasks);
    const destTasks = Array.from(destBlock.tasks);

    // Remove the task from source and add it to destination
    const [movedTask] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, movedTask);

    const newState = {
      ...data,
      blocks: {
        ...data.blocks,
        [source.droppableId]: {
          ...sourceBlock,
          tasks: sourceTasks,
        },
        [destination.droppableId]: {
          ...destBlock,
          tasks: destTasks,
        },
      },
    };

    setData(newState);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Task Manager</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-5 gap-4">
          {data.blockOrder.map((blockId) => {
            const block = data.blocks[blockId];
            return (
              <Droppable droppableId={blockId} key={blockId}>
                {(provided) => (
                  <div
                    className="p-4 bg-white rounded-lg shadow"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <TaskList tasks={block.tasks} blockId={block.id} />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
