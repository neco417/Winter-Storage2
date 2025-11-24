import React from 'react';
import { LayoutGrid, Compass, Plus, User } from 'lucide-react';
import { Tab } from '../types';

interface BottomNavProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const navItems = [
    { tab: Tab.HOME, icon: LayoutGrid, label: 'Home' },
    { tab: Tab.DISCOVER, icon: Compass, label: 'Find' },
    { tab: Tab.IMPORT, icon: Plus, label: 'Add' },
    { tab: Tab.DASHBOARD, icon: User, label: 'Me' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-retro-bg/90 backdrop-blur-md border-t border-white/50 flex justify-around items-center z-50 pb-4 pt-2">
      {navItems.map((item) => {
        const isActive = currentTab === item.tab;
        return (
          <button
            key={item.tab}
            onClick={() => onTabChange(item.tab)}
            className={`relative flex flex-col items-center justify-center w-16 h-14 transition-all duration-300`}
          >
            <div className={`p-3 rounded-xl transition-all duration-300 ${
                isActive 
                ? 'shadow-neu-pressed text-slate-800 bg-slate-200/50' 
                : 'shadow-neu-flat text-slate-400'
            }`}>
                <item.icon 
                    size={22} 
                    strokeWidth={isActive ? 2.5 : 2}
                />
            </div>
            {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-slate-800 rounded-full"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;