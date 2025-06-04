import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useDroppable } from '@dnd-kit/core';  

import { useState } from 'react';
import ActivityCard from './ActivityCard';

const DayColumn = ({ day }) => {
  const [activities, setActivities] = useState(day.activities);

  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );


  const { setNodeRef } = useDroppable({
    id: day.id,
  });


  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = activities.findIndex((a) => a.id === active.id);
      const newIndex = activities.findIndex((a) => a.id === over.id);

      setActivities((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  return (
    <div ref={setNodeRef} className="day-column">
      <h2 className="day-title">{day.title}</h2>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={activities.map((a) => a.id)}
          strategy={verticalListSortingStrategy}
        >
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DayColumn;


