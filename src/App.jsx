import React, { useState, useEffect } from "react";
import Chat from "./components/Chat"; // your chatbot page
import './App.css'; // Ensure Tailwind CSS is imported
const IntroScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-cursive bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg animate-gradient-x">
          Nexa
        </h1>
        <p className="text-gray-400 mt-6 text-lg tracking-wide font-times">
          Powered by Shruti Khadatkar
        </p>
      </div>
      <style >{`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Times+New+Roman:wght@400;500;700&display=swap');
                
                .font-cursive {
                    font-family: 'Dancing Script', cursive;
                    font-weight: 700;
                }
                
                .font-times {
                    font-family: 'Times New Roman', Times, serif;
                }
                
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(30px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                
                @keyframes pulse-soft {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
                
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                .animate-slide-up {
                    animation: slide-up 0.4s ease-out;
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
                
                .animate-blob {
                    animation: blob 7s infinite;
                }
                
                .animate-pulse-soft {
                    animation: pulse-soft 2s ease-in-out infinite;
                }
                
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 3s ease infinite;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                
                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                
                ::-webkit-scrollbar-track {
                    background: rgba(17, 24, 39, 0.5);
                    border-radius: 4px;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #6366f1, #8b5cf6, #ec4899);
                    border-radius: 4px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #4f46e5, #7c3aed, #db2777);
                }
            `}</style>
    </div>

  );
};

const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return showIntro ? <IntroScreen /> : <Chat />;

};

export default App;
