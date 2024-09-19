import React from 'react';
import { Switch } from 'antd';
import { Link } from 'react-router-dom';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  title: string;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onToggleTheme }) => {
  return (
    <header className='w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg'>
      <div className='max-w-7xl mx-auto flex items-center justify-between p-4'>
        <h1 className='text-3xl font-bold tracking-wide flex items-center'>
          <ClipboardDocumentListIcon className="h-8 w-8 mr-2" />
          <Link to="/">{title}</Link>
        </h1>
        <Link to="/add-task" className='px-4 py-2 bg-gradient-to-r from-gold-400 to-gold-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 mr-4'>Add Task</Link>
        <Link to="/tasks" className='px-4 py-2 bg-gradient-to-r from-silver-400 to-silver-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1'>Tasks</Link>
        <div className='flex items-center space-x-4'>
          <span className='text-sm font-medium'>Toggle theme</span>
          <Switch 
            checkedChildren="🌙" 
            unCheckedChildren="☀️" 
            onChange={onToggleTheme} 
            className='bg-white'
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
