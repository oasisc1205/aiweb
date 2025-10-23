import React, { useState, useEffect } from 'react';
import { LockIcon } from './icons/Icons';

interface LockerScreenProps {
    onUnlock: () => void;
}

const PIN = '1234'; // 실제 앱에서는 이 값을 안전하게 저장하고 설정 가능해야 합니다.

const LockerScreen: React.FC<LockerScreenProps> = ({ onUnlock }) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);

    const handleInput = (num: string) => {
        if (input.length < 4) {
            setInput(prev => prev + num);
        }
    };

    const handleDelete = () => {
        setInput(prev => prev.slice(0, -1));
        setError(false);
    };

    useEffect(() => {
        if (input.length === 4) {
            if (input === PIN) {
                onUnlock();
            } else {
                setError(true);
                setTimeout(() => {
                    setInput('');
                    setError(false);
                }, 800);
            }
        }
    }, [input, onUnlock]);

    const renderDots = () => {
        const dots = [];
        for (let i = 0; i < 4; i++) {
            dots.push(
                <div key={i} className={`w-4 h-4 rounded-full transition-colors duration-200 ${input.length > i ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
            );
        }
        return dots;
    };
    
    const pinPadClasses = "w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl font-semibold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors";

    return (
        <div className="fixed inset-0 bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center z-50">
            <div className="text-center">
                <LockIcon className="w-12 h-12 mx-auto text-gray-500 dark:text-gray-400 mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">PIN 번호 입력</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">개인정보 보호를 위해 앱이 잠겨있습니다.</p>
                <div className={`flex gap-4 my-8 justify-center ${error ? 'animate-shake' : ''}`}>
                    {renderDots()}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button key={num} onClick={() => handleInput(num.toString())} className={pinPadClasses}>
                        {num}
                    </button>
                ))}
                <div className="w-16 h-16 sm:w-20 sm:h-20"></div> {/* Placeholder */}
                <button onClick={() => handleInput('0')} className={pinPadClasses}>
                    0
                </button>
                <button onClick={handleDelete} className={pinPadClasses}>
                    &larr;
                </button>
            </div>
            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default LockerScreen;