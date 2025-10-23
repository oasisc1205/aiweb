import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import LockerScreen from './components/LockerScreen';
import DisguiseScreen from './components/DisguiseScreen';
import Home from './components/Home';
import EvidenceManager from './components/EvidenceManager';
import LegalGuide from './components/LegalGuide';
import ExpertAds from './components/ExpertAds';
import Settings from './components/Settings';
import { Page } from './types';

const AUTO_DISGUISE_TIME_KEY = 'app_auto_disguise_time';

const App: React.FC = () => {
    const [isDisguised, setIsDisguised] = useState(() => {
        try {
            return sessionStorage.getItem('disguise_exited') !== 'true';
        } catch (error) {
            console.error("Could not access session storage", error);
            return true;
        }
    });

    const [isUnlocked, setIsUnlocked] = useState(false);
    const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
    const [autoDisguiseTime, setAutoDisguiseTime] = useState(() => {
        try {
            return parseInt(localStorage.getItem(AUTO_DISGUISE_TIME_KEY) || '30000', 10);
        } catch (error) {
            console.error("Could not access local storage", error);
            return 30000; // 30 seconds default
        }
    });

    const inactivityTimer = useRef<number | null>(null);

    const resetInactivityTimer = useCallback(() => {
        if (inactivityTimer.current) {
            clearTimeout(inactivityTimer.current);
        }
        if (autoDisguiseTime > 0 && isUnlocked && !isDisguised) {
            inactivityTimer.current = window.setTimeout(() => {
                setIsDisguised(true);
                try {
                    sessionStorage.removeItem('disguise_exited');
                } catch (error) {
                    console.error("Could not access session storage", error);
                }
            }, autoDisguiseTime);
        }
    }, [autoDisguiseTime, isUnlocked, isDisguised]);

    useEffect(() => {
        const events = ['mousemove', 'mousedown', 'keypress', 'touchstart', 'scroll'];
        
        events.forEach(event => document.addEventListener(event, resetInactivityTimer));
        
        resetInactivityTimer();

        return () => {
            events.forEach(event => document.removeEventListener(event, resetInactivityTimer));
            if (inactivityTimer.current) {
                clearTimeout(inactivityTimer.current);
            }
        };
    }, [resetInactivityTimer]);

    const handleUnlock = () => {
        setIsUnlocked(true);
    };
    
    const handleExitDisguise = () => {
        setIsDisguised(false);
        try {
            sessionStorage.setItem('disguise_exited', 'true');
        } catch (error) {
            console.error("Could not access session storage", error);
        }
    };

    const handleAutoDisguiseTimeChange = (time: number) => {
        setAutoDisguiseTime(time);
        try {
            localStorage.setItem(AUTO_DISGUISE_TIME_KEY, String(time));
        } catch (error) {
            console.error("Could not access local storage", error);
        }
    };

    const renderPage = () => {
        switch (currentPage) {
            case Page.Home:
                return <Home />;
            case Page.Evidence:
                return <EvidenceManager />;
            case Page.Guide:
                return <LegalGuide />;
            case Page.Experts:
                return <ExpertAds />;
            case Page.Settings:
                return <Settings 
                            autoDisguiseTime={autoDisguiseTime}
                            onAutoDisguiseTimeChange={handleAutoDisguiseTimeChange}
                        />;
            default:
                return <Home />;
        }
    };

    if (isDisguised) {
        return <DisguiseScreen onExit={handleExitDisguise} />;
    }

    if (!isUnlocked) {
        return <LockerScreen onUnlock={handleUnlock} />;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className="py-8 px-4 sm:px-6 lg:px-8">
                {renderPage()}
            </main>
        </div>
    );
};

export default App;
