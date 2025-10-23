import React, { useState, useEffect, useCallback } from 'react';
import { HOME_NEWS, SHOPPING_PRODUCTS } from '../constants';
import { NewspaperIcon, ShoppingCartIcon, TagIcon } from './icons/Icons';

type DisguiseType = 'weather' | 'news' | 'shopping';

const WeatherDisguise: React.FC = () => (
    <>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">오늘의 날씨</h1>
        <div className="text-center mt-4">
            <p className="text-lg text-gray-500 dark:text-gray-400">서울</p>
            <p className="text-6xl font-bold text-gray-800 dark:text-white my-2">28°C</p>
            <p className="font-medium text-blue-500">맑음</p>
        </div>
        <div className="mt-6 flex justify-around text-center text-sm text-gray-600 dark:text-gray-300">
            <div><p className="font-semibold">습도</p><p>65%</p></div>
            <div><p className="font-semibold">바람</p><p>3 m/s</p></div>
            <div><p className="font-semibold">체감</p><p>30°C</p></div>
        </div>
    </>
);

const NewsDisguise: React.FC = () => (
    <>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2"><NewspaperIcon /> 실시간 뉴스</h1>
        <div className="mt-4 space-y-4 max-h-80 overflow-y-auto pr-2">
            {HOME_NEWS.map(news => (
                <div key={news.id} className="border-b border-gray-200 dark:border-gray-700 pb-3">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{news.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{news.date}</p>
                </div>
            ))}
        </div>
    </>
);

const ShoppingDisguise: React.FC = () => (
    <>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2"><ShoppingCartIcon/> 스타일 쇼핑</h1>
        <div className="mt-4 grid grid-cols-2 gap-4 max-h-80 overflow-y-auto pr-2">
            {SHOPPING_PRODUCTS.map(product => (
                <div key={product.id}>
                    <img src={product.imageUrl} alt={product.name} className="w-full h-24 object-cover rounded-md" />
                    <p className="text-sm font-semibold mt-2 text-gray-800 dark:text-white">{product.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1"><TagIcon className="w-3 h-3"/>{product.price}</p>
                </div>
            ))}
        </div>
    </>
);


const DisguiseScreen: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    const [disguiseType, setDisguiseType] = useState<DisguiseType>('weather');
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        const types: DisguiseType[] = ['weather', 'news', 'shopping'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        setDisguiseType(randomType);
    }, []);

    const handleTitleClick = () => {
        const newCount = clickCount + 1;
        setClickCount(newCount);
        if (newCount >= 5) {
            onExit();
        }
    };

    const renderDisguise = () => {
        switch (disguiseType) {
            case 'news': return <NewsDisguise />;
            case 'shopping': return <ShoppingDisguise />;
            case 'weather':
            default: return <WeatherDisguise />;
        }
    };

    const getAppVersionText = () => {
        switch (disguiseType) {
            case 'news': return 'NewsFeed v2.1';
            case 'shopping': return 'StyleShop v1.5';
            case 'weather':
            default: return 'Weather App v1.0';
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-200 dark:bg-gray-800 flex flex-col items-center justify-center z-50 p-4">
            <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6">
                <div onClick={handleTitleClick} className="cursor-pointer">
                    {renderDisguise()}
                </div>
            </div>
            <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">{getAppVersionText()}</p>
        </div>
    );
};

export default DisguiseScreen;
