import React, { useState } from 'react';
import { GUIDE_CONTENT } from '../constants';
import { ChevronDownIcon, SparklesIcon } from './icons/Icons';
import { getAIResponse } from '../services/geminiService';

const AccordionItem: React.FC<{ category: typeof GUIDE_CONTENT[0]; isOpen: boolean; onClick: () => void; }> = ({ category, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <h2>
                <button
                    type="button"
                    className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={onClick}
                >
                    <span>{category.name}</span>
                    <ChevronDownIcon className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
            </h2>
            <div className={`${isOpen ? 'block' : 'hidden'} p-5 border-t-0 border-gray-200 dark:border-gray-700`}>
                 <ul className="space-y-4">
                    {category.articles.map(article => (
                         <li key={article.id}>
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{article.title}</h4>
                            <p className="text-gray-600 dark:text-gray-400">{article.content}</p>
                        </li>
                    ))}
                 </ul>
            </div>
        </div>
    );
};

const LegalGuide: React.FC = () => {
    const [openAccordion, setOpenAccordion] = useState<string | null>(GUIDE_CONTENT[0].id);
    const [prompt, setPrompt] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAccordionClick = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    const handleAskAI = async () => {
        if (!prompt.trim()) return;
        setIsLoading(true);
        setAiResponse('');
        const response = await getAIResponse(prompt);
        setAiResponse(response);
        setIsLoading(false);
    };

    return (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">단계별 법률 가이드</h1>
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
                    {GUIDE_CONTENT.map(category => (
                        <AccordionItem
                            key={category.id}
                            category={category}
                            isOpen={openAccordion === category.id}
                            onClick={() => handleAccordionClick(category.id)}
                        />
                    ))}
                </div>
            </div>
            
            <div className="lg:col-span-1">
                 <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 sticky top-24">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <SparklesIcon className="w-6 h-6 text-blue-500" />
                        AI 법률 비서
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-4">
                        상황에 대한 일반적인 질문을 해보세요. 이는 법적 조언이 아닙니다.
                    </p>
                    <textarea
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 h-28"
                        placeholder="예: 어떤 종류의 증거가 가장 효과적인가요?"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button
                        onClick={handleAskAI}
                        disabled={isLoading}
                        className="w-full mt-3 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
                    >
                         {isLoading ? '생각 중...' : 'AI에게 질문하기'}
                    </button>
                    {isLoading && <div className="mt-4 text-center text-gray-500">답변 생성 중...</div>}
                    {aiResponse && (
                         <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-md">
                            <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{aiResponse}</p>
                        </div>
                    )}
                 </div>
            </div>
        </div>
    );
};

export default LegalGuide;