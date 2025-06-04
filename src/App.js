import { DndContext } from '@dnd-kit/core';
import { useState } from 'react';
import DayColumn from './components/DayColumn';
import { initialData } from './data/itineraryData';

function App() {
  const [days, setDays] = useState(initialData);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const sourceDay = days.find((day) =>
      day.activities.some((act) => act.id === active.id)
    );

   
    if (!sourceDay) return;

    const newActivities = [...sourceDay.activities];
    const oldIndex = newActivities.findIndex((act) => act.id === active.id);
    const newIndex = newActivities.findIndex((act) => act.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

   
    newActivities.splice(oldIndex, 1);
    newActivities.splice(newIndex, 0, sourceDay.activities[oldIndex]);

    const updatedDays = days.map((day) =>
      day.id === sourceDay.id ? { ...day, activities: newActivities } : day
    );

    setDays(updatedDays);
  };

  return (
    <div className="app-container">
      <h1>Y2Z Itinerary Planner</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="days-container">
          {days.map((day) => (
            <DayColumn key={day.id} day={day} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default App;
