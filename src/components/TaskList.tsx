import React, { useState, useMemo } from 'react';
import { Task } from '../types/Task';
import TaskItem from './TaskItem';
import FilterBar from './FilterBar';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const [filter, setFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('endDate');

  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter(task => {
        const title = task.title?.toLowerCase() || '';
        const description = task.description?.toLowerCase() || '';
        const filterLowerCase = filter.toLowerCase();
        return title.includes(filterLowerCase) || description.includes(filterLowerCase);
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'endDate':
            return (a.endDate?.getTime() || 0) - (b.endDate?.getTime() || 0);
          case 'startDate':
            return (a.startDate?.getTime() || 0) - (b.startDate?.getTime() || 0);
          case 'title':
            return (a.title || '').localeCompare(b.title || '');
          case 'priority':
            const priorityOrder = { 'Low': 0, 'Medium': 1, 'High': 2 };
            return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
          default:
            return 0;
        }
      });
  }, [tasks, filter, sortBy]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
  };

  return (
    <div className="task-list">
      <FilterBar onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
      {filteredAndSortedTasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onUpdate={onUpdateTask} 
          onDelete={onDeleteTask} 
        />
      ))}
    </div>
  );
};

export default TaskList;
