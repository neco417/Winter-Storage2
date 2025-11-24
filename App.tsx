import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import HomeView from './components/HomeView';
import DiscoverView from './components/DiscoverView';
import ImportView from './components/ImportView';
import DashboardView from './components/DashboardView';
import { Tab, MoodboardCard } from './types';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.HOME);
  
  // Mock initial data for the canvas with organic positioning and rotation
  const [cards, setCards] = useState<MoodboardCard[]>([
    { id: '1', title: 'Typography Layouts', tags: ['Type', 'Swiss'], imageUrl: 'https://picsum.photos/400/600?random=1', x: 1450, y: 1380, width: 220, rotation: -2, date: '2023-10-24' },
    { id: '2', title: 'Neon Signs', tags: ['Light', 'Cyber'], imageUrl: 'https://picsum.photos/400/500?random=2', x: 1700, y: 1450, width: 200, rotation: 3, date: '2023-11-01' },
    { id: '3', title: 'Pottery Texture', tags: ['Craft', 'Detail'], imageUrl: 'https://picsum.photos/300/300?random=3', x: 1350, y: 1650, width: 180, rotation: -4, date: '2023-11-05' },
    { id: '4', title: 'Industrial Design', tags: ['Product'], imageUrl: 'https://picsum.photos/400/300?random=4', x: 1580, y: 1600, width: 240, rotation: 1.5, date: '2023-11-12' },
    { id: '5', title: 'Color Palette', tags: ['Color', 'Reference'], imageUrl: 'https://picsum.photos/200/200?random=5', x: 1250, y: 1450, width: 160, rotation: 5, date: '2023-11-15' },
  ]);

  const handleAddCard = (card: MoodboardCard) => {
    setCards(prev => [...prev, card]);
    setCurrentTab(Tab.HOME); // Redirect to home after import
  };

  const renderContent = () => {
    switch (currentTab) {
      case Tab.HOME:
        return <HomeView cards={cards} />;
      case Tab.DISCOVER:
        return <DiscoverView />;
      case Tab.IMPORT:
        return <ImportView onAddCard={handleAddCard} />;
      case Tab.DASHBOARD:
        return <DashboardView />;
      default:
        return <HomeView cards={cards} />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-retro-bg text-slate-700 font-sans selection:bg-slate-300 selection:text-slate-800">
      <main className="flex-1 relative overflow-hidden">
        {renderContent()}
      </main>
      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
};

export default App;