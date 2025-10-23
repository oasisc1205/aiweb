import React from 'react';
import { EXPERT_ADS } from '../constants';
import { ExpertAd } from '../types';
import { LawyerIcon, DetectiveIcon } from './icons/Icons';

const AdCard: React.FC<{ ad: ExpertAd }> = ({ ad }) => {
    const typeDisplay = ad.type === 'lawyer' ? '변호사' : '탐정';
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <img className="w-full h-40 object-cover" src={ad.imageUrl} alt={ad.name} />
            <div className="p-6">
                <div className="flex items-center mb-2">
                    {ad.type === 'lawyer' ? <LawyerIcon className="w-6 h-6 text-blue-500 mr-2"/> : <DetectiveIcon className="w-6 h-6 text-indigo-500 mr-2"/>}
                    <span className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">{typeDisplay}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{ad.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{ad.description}</p>
                <a 
                    href={ad.targetUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                    더 알아보기
                </a>
            </div>
        </div>
    );
};


const ExpertAds: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">전문가 찾기</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">신뢰할 수 있는 법률 및 조사 전문가와 연결하세요.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {EXPERT_ADS.map(ad => (
                    <AdCard key={ad.id} ad={ad} />
                ))}
            </div>
        </div>
    );
};

export default ExpertAds;