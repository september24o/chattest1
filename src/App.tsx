import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';

function App() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    setMessages((prevMessages) => [...prevMessages, { role: 'user', content: message }]);

    try {
      const response = await fetch(`${import.meta.env.VITE_XINFERENCE_API_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'qwen2.5-instruct',
          messages: [...messages, { role: 'user', content: message }],
        }),
      });

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: '抱歉，发生了错误。请稍后再试。' }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2024 Qwen2.5-Instruct Chat App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;