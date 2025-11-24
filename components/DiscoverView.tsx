import React, { useState } from 'react';
import { Search, Mail, ChevronDown } from 'lucide-react';

const DiscoverView: React.FC = () => {
  const featured = [
    { id: 1, h: 'h-64' },
    { id: 2, h: 'h-48' },
    { id: 3, h: 'h-40' },
    { id: 4, h: 'h-56' },
    { id: 5, h: 'h-48' },
    { id: 6, h: 'h-64' },
  ];

  return (
    <div className="w-full h-full bg-retro-bg flex flex-col pt-12 pb-24 px-6 overflow-hidden font-sans">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tighter">DISCOVER</h1>
        <button className="w-10 h-10 rounded-full bg-retro-bg shadow-neu-flat flex items-center justify-center text-slate-500 active:shadow-neu-pressed">
            <Mail size={18} />
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-5xl font-black text-slate-800 leading-[0.9] tracking-tighter">
            Find your <br />
            <span className="text-slate-400">inspiration.</span>
        </h2>
      </div>

      {/* Search Bar - Neumorphic inset */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
        </div>
        <input 
            type="text" 
            className="w-full h-14 bg-retro-bg shadow-neu-pressed rounded-2xl pl-12 pr-4 text-sm text-slate-700 placeholder-slate-400 focus:outline-none font-medium"
            placeholder="Search public inspirations..."
        />
      </div>

      {/* Masonry Grid Layout */}
      <div className="flex-1 overflow-y-auto -mx-6 px-6">
        <div className="columns-2 gap-4 space-y-4 pb-8">
            {featured.map((item, idx) => (
                <div key={idx} className={`w-full ${item.h} rounded-2xl bg-retro-bg shadow-neu-flat overflow-hidden relative break-inside-avoid group`}>
                     <div className="absolute inset-2 rounded-xl overflow-hidden bg-gray-200">
                        <img 
                            src={`https://picsum.photos/300/400?random=${idx + 20}`} 
                            alt="Inspiration" 
                            className="w-full h-full object-cover opacity-90 grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
                        />
                     </div>
                     {/* Dot indicators */}
                     <div className="absolute bottom-4 right-4 flex space-x-1 z-10">
                        <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
                        <div className="w-1 h-1 bg-white/50 rounded-full shadow-sm"></div>
                     </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverView;