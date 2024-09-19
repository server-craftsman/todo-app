import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 py-6 shadow-lg'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center'>
          <p className='text-sm'>© {currentYear} TodoList App</p>
          <div className='flex items-center space-x-4'>
            <span className='text-sm'>React_12_TEAM2</span>
            <a href='https://github.com/React_12_TEAM2' className='hover:text-gold-400 transition-colors'>
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
