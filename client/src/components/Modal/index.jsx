import React from 'react';

export function Modal({ isOpen, setOpen, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      
      <div 
      role = 'dialog'
      className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md"
      >
        
        <button 
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &#x2715; 
        </button>

        {children}
      </div>
    </div>
  );
}