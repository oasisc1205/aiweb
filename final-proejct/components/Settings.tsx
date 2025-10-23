import React, { useState } from 'react';
import { TimerIcon } from './icons/Icons';

interface SettingsProps {
    autoDisguiseTime: number;
    onAutoDisguiseTimeChange: (time: number) => void;
}

const Settings: React.FC<SettingsProps> = ({ autoDisguiseTime, onAutoDisguiseTimeChange }) => {
    const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

    const handleDarkModeToggle = () => {
        const isDark = !darkMode;
        setDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">설정</h1>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                <div className="p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">PIN 변경</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">앱 잠금에 사용되는 PIN 번호를 변경합니다.</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                        변경
                    </button>
                </div>
                
                <div className="p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                           <TimerIcon /> 자동 위장 시간
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">지정된 시간 동안 활동이 없으면 위장 화면으로 전환됩니다.</p>
                    </div>
                    <select
                        value={autoDisguiseTime}
                        onChange={(e) => onAutoDisguiseTimeChange(Number(e.target.value))}
                        className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm"
                    >
                        <option value="30000">30초</option>
                        <option value="60000">1분</option>
                        <option value="300000">5분</option>
                        <option value="0">사용 안함</option>
                    </select>
                </div>

                <div className="p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">다크 모드</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">어두운 테마를 사용합니다.</p>
                    </div>
                     <button
                        onClick={handleDarkModeToggle}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                            darkMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                        }`}
                    >
                        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                            darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                    </button>
                </div>

                 <div className="p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">데이터 초기화</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">모든 증거와 데이터를 영구적으로 삭제합니다.</p>
                    </div>
                    <button 
                        onClick={() => alert('데이터가 초기화됩니다. 이 작업은 되돌릴 수 없습니다.')}
                        className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
                    >
                        초기화
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
