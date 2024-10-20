import React from 'react';
import { MessageCircle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex items-center">
        <MessageCircle size={24} className="mr-2" />
        <h1 className="text-xl font-bold">Qwen2.5-Instruct Chat App</h1>
      </div>
    </header>
  );
};

export default Header;