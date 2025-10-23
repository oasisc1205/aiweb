import React from 'react';
import { Page } from '../types';
import { HomeIcon, EvidenceIcon, GuideIcon, ExpertsIcon, SettingsIcon } from './icons/Icons';

interface HeaderProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
    page: Page;
    label: string;
    icon: React.ReactNode;
    currentPage: Page;
    onClick: (page: Page) => void;
}> = ({ page, label, icon, currentPage, onClick }) => {
    const isActive = currentPage === page;
    return (
        <button
            onClick={() => onClick(page)}
            className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
            {icon}
            <span className="text-xs sm:text-sm font-medium">{label}</span>
        </button>
    );
};

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span className="ml-3 text-xl font-bold text-gray-800 dark:text-white hidden sm:block">증거 보관함</span>
                    </div>
                </div>
            </div>
             <nav className="bg-gray-100 dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                    <div className="flex justify-around sm:justify-start sm:gap-4 h-14">
                        <NavItem page={Page.Home} label="홈" icon={<HomeIcon />} currentPage={currentPage} onClick={setCurrentPage} />
                        <NavItem page={Page.Evidence} label="증거" icon={<EvidenceIcon />} currentPage={currentPage} onClick={setCurrentPage} />
                        <NavItem page={Page.Guide} label="가이드" icon={<GuideIcon />} currentPage={currentPage} onClick={setCurrentPage} />
                        <NavItem page={Page.Experts} label="전문가" icon={<ExpertsIcon />} currentPage={currentPage} onClick={setCurrentPage} />
                        <NavItem page={Page.Settings} label="설정" icon={<SettingsIcon />} currentPage={currentPage} onClick={setCurrentPage} />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;