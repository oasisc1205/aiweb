import React from 'react';
import { HOME_NEWS, HOME_QA, HOME_STORIES } from '../constants';
import { ChatBubbleIcon, EyeIcon } from './icons/Icons';

const Home: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto space-y-12">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">홈</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">최신 정보와 커뮤니티 소식을 확인하고 힘을 얻으세요.</p>
            </div>

            {/* 최신 소식 및 정보 */}
            <section aria-labelledby="latest-news-heading">
                <h2 id="latest-news-heading" className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">최신 소식 및 정보</h2>
                <div className="space-y-4">
                    {HOME_NEWS.map(news => (
                        <div key={news.id} className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md transition-shadow hover:shadow-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{news.date}</p>
                            <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">{news.title}</h3>
                            <p className="text-gray-700 dark:text-gray-300 mt-2">{news.summary}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 커뮤니티 Q&A */}
            <section aria-labelledby="community-qa-heading">
                <h2 id="community-qa-heading" className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">커뮤니티 Q&A</h2>
                <div className="space-y-3">
                    {HOME_QA.map(qa => (
                        <div key={qa.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-start space-x-4">
                             <div className="flex-shrink-0 w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 font-bold">
                                {qa.author.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-800 dark:text-gray-200">{qa.question}</p>
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2 space-x-4">
                                    <span>작성자: {qa.author}</span>
                                    <div className="flex items-center gap-1">
                                        <ChatBubbleIcon className="w-4 h-4" />
                                        <span>답변 {qa.answers}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <EyeIcon className="w-4 h-4" />
                                        <span>조회 {qa.views}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 회원들의 이야기 */}
            <section aria-labelledby="user-stories-heading">
                <h2 id="user-stories-heading" className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">회원들의 이야기</h2>
                <div className="space-y-4">
                    {HOME_STORIES.map(story => (
                         <div key={story.id} className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
                             <blockquote className="italic text-gray-600 dark:text-gray-300">"{story.content}"</blockquote>
                             <footer className="text-right text-sm text-gray-500 dark:text-gray-400 mt-3">- {story.author}, {story.date}</footer>
                         </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
