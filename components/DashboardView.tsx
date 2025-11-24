import React from 'react';
import { Settings, Edit2, ChevronRight, HardDrive, BarChart2, RefreshCw, LogOut } from 'lucide-react';

const DashboardView: React.FC = () => {
  return (
    <div className="w-full h-full bg-retro-bg flex flex-col overflow-y-auto pb-24 font-sans">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tighter">PERSONAL</h1>
        <button className="w-10 h-10 rounded-full bg-retro-bg shadow-neu-flat flex items-center justify-center text-slate-500 active:shadow-neu-pressed">
            <LogOut size={18} />
        </button>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center mt-8 mb-12">
        <div className="relative">
            <div className="w-36 h-36 rounded-full bg-retro-bg shadow-neu-flat p-1">
                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden border-4 border-retro-bg">
                     <img src="https://picsum.photos/200/200?grayscale" alt="User" className="w-full h-full object-cover opacity-80" />
                </div>
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-retro-bg shadow-neu-flat flex items-center justify-center text-slate-600 border border-white">
                <Edit2 size={14} />
            </button>
        </div>
        
        <div className="mt-6 text-center">
            <h2 className="text-xl font-bold text-slate-800">your name</h2>
            <p className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-widest">id: 8492-3291</p>
        </div>
      </div>

      {/* Menu List - Pill Shaped Buttons */}
      <div className="px-6 space-y-4">
          <MenuItem icon={Settings} label="Account Settings" />
          <MenuItem icon={BarChart2} label="Data Statistics" />
          <MenuItem icon={HardDrive} label="Offline Manager" />
          <MenuItem icon={RefreshCw} label="Update Log" />
      </div>
    </div>
  );
};

const MenuItem = ({ icon: Icon, label }: { icon: any, label: string }) => (
    <button className="w-full h-16 bg-retro-bg shadow-neu-flat rounded-2xl px-6 flex items-center justify-between active:shadow-neu-pressed transition-all group">
        <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 group-active:bg-slate-300">
                 <Icon size={16} />
            </div>
            <span className="text-sm font-medium text-slate-700">{label}</span>
        </div>
        <div className="w-8 h-8 flex items-center justify-center text-slate-400">
             <ChevronRight size={18} />
        </div>
    </button>
);

export default DashboardView;