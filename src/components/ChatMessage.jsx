import React from 'react';
import { UserIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

const ChatMessage = ({ message, isAi }) => {
    return (
        <div className={`max-w-full mx-auto flex items-start space-x-2 sm:space-x-4 p-3 sm:p-6 rounded-xl sm:rounded-2xl transition-colors duration-200 ${isAi ? 'bg-blue-50 sm:bg-blue-100' : 'bg-pink-50'}`}>
            <div className={`flex-shrink-0 rounded-full p-1.5 sm:p-2 ${isAi ? 'bg-blue-100 sm:bg-blue-200' : 'bg-green-100 sm:bg-green-200'}`}>
                {isAi ? (
                    <ComputerDesktopIcon className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                ) : (
                    <UserIcon className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                )}
            </div>
            <div className="flex-1 space-y-1 sm:space-y-2 min-w-0">
                <div className="flex items-center">
                    <p className={`font-medium text-sm sm:text-base ${isAi ? 'text-blue-800 sm:text-blue-900' : 'text-green-800 sm:text-green-900'}`}>
                        {isAi ? 'Progskill AI Assistant' : 'You'}
                    </p>
                </div>
                <div className="prose prose-sm max-w-none">
                    <p className="text-gray-600 sm:text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;