import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid as GridIcon, Layers } from 'lucide-react';
import { MoodboardCard, ViewMode } from '../types';

interface HomeViewProps {
  cards: MoodboardCard[];
}

const HomeView: React.FC<HomeViewProps> = ({ cards }) => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.CANVAS);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const toggleView = () => {
    setViewMode(prev => prev === ViewMode.CANVAS ? ViewMode.GRID : ViewMode.CANVAS);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-retro-bg">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 pt-12 pb-4 flex justify-between items-end pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tighter">HOME</h1>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">Infinite Canvas</p>
        </div>
        
        <div className="flex items-center space-x-4 pointer-events-auto">
            <button className="w-10 h-10 rounded-full bg-retro-bg shadow-neu-flat flex items-center justify-center text-slate-600 active:shadow-neu-pressed transition">
                <Search size={18} />
            </button>
            <button 
                onClick={toggleView}
                className="w-10 h-10 rounded-full bg-retro-bg shadow-neu-flat flex items-center justify-center text-slate-600 active:shadow-neu-pressed transition"
            >
                {viewMode === ViewMode.CANVAS ? <GridIcon size={18} /> : <Layers size={18} />}
            </button>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === ViewMode.CANVAS ? (
        <div className="w-full h-full cursor-grab active:cursor-grabbing bg-retro-bg" ref={constraintsRef}>
           {/* Technical Grid Pattern */}
           <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
           
          <motion.div
            drag
            dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
            className="w-[3000px] h-[3000px] relative origin-center"
            initial={{ x: -500, y: -500, scale: 0.9 }}
            style={{ scale }}
          >
            {cards.map((card) => (
              <motion.div
                key={card.id}
                className="absolute bg-gray-100 p-3 shadow-neu-flat rounded-sm border border-white/40"
                style={{
                  left: card.x || 1500,
                  top: card.y || 1500,
                  width: card.width || 200,
                  height: 'auto',
                  rotate: card.rotation || 0,
                }}
                whileHover={{ scale: 1.05, zIndex: 50, rotate: 0, transition: { duration: 0.2 } }}
                drag
                dragElastic={0.1}
                dragMomentum={false}
              >
                {/* Card content */}
                <div className="relative w-full aspect-[3/4] bg-gray-200 overflow-hidden mb-3 shadow-inner rounded-sm">
                  <img 
                    src={card.imageUrl} 
                    alt={card.title} 
                    className="w-full h-full object-cover filter grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                    draggable={false}
                  />
                </div>
                <div className="px-1 font-mono">
                  <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xs font-bold text-slate-700 uppercase truncate max-w-[120px]">{card.title}</h3>
                      <span className="text-[9px] text-slate-400 border border-slate-300 px-1 rounded-sm">#{card.id}</span>
                  </div>
                  <div className="h-px w-full bg-slate-300 mb-2"></div>
                  <div className="flex justify-between items-center">
                    <p className="text-[9px] text-slate-500">{card.date}</p>
                    <div className="flex gap-1">
                        {card.tags.slice(0,1).map(t => (
                            <span key={t} className="text-[8px] px-1 bg-slate-200 text-slate-600 rounded-sm uppercase">{t}</span>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Zoom Controls */}
          <div className="absolute bottom-24 right-6 flex flex-col space-y-4 pointer-events-auto">
             <button 
                onClick={() => setScale(s => Math.min(s + 0.1, 2))}
                className="w-10 h-10 rounded-full bg-retro-bg shadow-neu-flat flex items-center justify-center text-slate-600 active:shadow-neu-pressed transition"
            >
                +
             </button>
             <button 
                onClick={() => setScale(s => Math.max(s - 0.1, 0.5))}
                className="w-10 h-10 rounded-full bg-retro-bg shadow-neu-flat flex items-center justify-center text-slate-600 active:shadow-neu-pressed transition"
            >
                -
             </button>
          </div>
        </div>
      ) : (
        // Grid View
        <div className="w-full h-full overflow-y-auto pt-28 px-4 pb-32 bg-retro-bg">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards.map((card) => (
              <div key={card.id} className="bg-retro-bg p-3 rounded-xl shadow-neu-flat">
                <div className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-gray-200 shadow-inner">
                    <img src={card.imageUrl} className="w-full h-full object-cover" alt={card.title} />
                </div>
                <h3 className="text-sm font-medium text-slate-700 truncate font-mono">{card.title}</h3>
                <p className="text-[10px] text-slate-400 font-mono mt-1">{card.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeView;