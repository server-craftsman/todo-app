import React from 'react';
import { Input, Select } from 'antd';

interface FilterBarProps {
  onFilterChange: (filter: string) => void;
  onSortChange: (sortBy: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, onSortChange }) => {
    return (
      <div className="filter-bar mb-8 text-left">
        <Input.Search
          placeholder="Search for exquisite tasks..."
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-72 mr-6 rounded-full border-3 border-yellow-300 focus:border-yellow-500 transition-all duration-500 bg-opacity-30 backdrop-blur-xl shadow-2xl hover:shadow-3xl text-lg font-serif bg-gradient-to-br from-yellow-100/10 to-white/20"
        />
        <Select 
          defaultValue="endDate" 
          onChange={onSortChange}
          className="w-48 rounded-full bg-opacity-20 backdrop-blur-lg shadow-lg hover:shadow-xl text-white"
          popupClassName="bg-opacity-80 backdrop-blur-md rounded-lg shadow-xl"
        >
          <Select.Option value="endDate" className="text-gray-800 hover:bg-gold-200">Sort by End Date</Select.Option>
          <Select.Option value="startDate" className="text-gray-800 hover:bg-gold-200">Sort by Start Date</Select.Option>
          <Select.Option value="title" className="text-gray-800 hover:bg-gold-200">Sort by Title</Select.Option>
          <Select.Option value="priority" className="text-gray-800 hover:bg-gold-200">Sort by Priority</Select.Option>
        </Select>
      </div>
    );
  };
  

export default FilterBar;
