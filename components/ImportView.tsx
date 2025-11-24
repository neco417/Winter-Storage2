
import React, { useState, useEffect } from 'react';
import { Share2, Plus, Loader2, Lock, Save, Trash2, FileText, Image as ImageIcon, Globe, Terminal, ShieldCheck } from 'lucide-react';
import { analyzeContent, AnalysisResult } from '../services/geminiService';
import { MoodboardCard } from '../types';

interface ImportViewProps {
  onAddCard: (card: MoodboardCard) => void;
}

type SlotStatus = 'idle' | 'processing' | 'secured';

interface BufferSlot {
  id: number;
  status: SlotStatus;
  data?: AnalysisResult;
}

const ImportView: React.FC<ImportViewProps> = ({ onAddCard }) => {
  const [inputText, setInputText] = useState('');
  
  // Initialize with some data to show the "working" state immediately
  const [slots, setSlots] = useState<BufferSlot[]>([
    { 
      id: 1, 
      status: 'secured', 
      data: { 
        summary: 'Swiss Design Grid Systems', 
        tags: ['Layout', 'Typography'], 
        moodColor: '#FF4500', 
        category: 'Reference' 
      } 
    },
    { 
      id: 2, 
      status: 'secured', 
      data: { 
        summary: 'React Three Fiber Basics', 
        tags: ['Code', '3D', 'Web'], 
        moodColor: '#61dafb', 
        category: 'Tutorial' 
      } 
    },
    ...Array.from({ length: 10 }).map((_, i) => ({ id: i + 3, status: 'idle' as SlotStatus }))
  ]);

  const [activeSlotId, setActiveSlotId] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simulate finding the next available slot
  const getNextEmptySlot = () => slots.find(s => s.status === 'idle')?.id;

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    const targetSlotId = getNextEmptySlot();
    if (!targetSlotId) return; // Grid full

    setIsAnalyzing(true);
    setActiveSlotId(targetSlotId);

    // Update slot to processing
    setSlots(prev => prev.map(s => s.id === targetSlotId ? { ...s, status: 'processing' } : s));

    try {
      const aiResult = await analyzeContent(inputText);
      
      // Update slot to secured with data
      setSlots(prev => prev.map(s => s.id === targetSlotId ? { 
        ...s, 
        status: 'secured', 
        data: aiResult 
      } : s));

    } catch (e) {
      console.error(e);
      // Reset slot on error
      setSlots(prev => prev.map(s => s.id === targetSlotId ? { ...s, status: 'idle' } : s));
      setActiveSlotId(null);
    } finally {
      setIsAnalyzing(false);
      setInputText(''); // Clear input buffer
    }
  };

  const handleSave = () => {
    const slot = slots.find(s => s.id === activeSlotId);
    if (!slot || !slot.data) return;
    
    const newCard: MoodboardCard = {
      id: Date.now().toString(),
      title: slot.data.summary || "Untitled Archive",
      tags: slot.data.tags,
      imageUrl: `https://picsum.photos/400/600?random=${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      x: 1500 + (Math.random() * 200 - 100), 
      y: 1500 + (Math.random() * 200 - 100),
      width: 220,
      rotation: (Math.random() * 10) - 5,
    };
    
    onAddCard(newCard);
    
    // Clear the slot after saving
    setSlots(prev => prev.map(s => s.id === activeSlotId ? { ...s, status: 'idle', data: undefined } : s));
    setActiveSlotId(null);
  };

  const handleDiscard = () => {
    setSlots(prev => prev.map(s => s.id === activeSlotId ? { ...s, status: 'idle', data: undefined } : s));
    setActiveSlotId(null);
  }

  // Get currently displayed data (either from a secured slot or analyzing state)
  const activeSlotData = slots.find(s => s.id === activeSlotId);

  return (
    <div className="w-full h-full bg-retro-bg relative overflow-hidden font-sans">
        {/* Fixed Header - INCREASED Z-INDEX TO 40 */}
        <div className="absolute top-0 left-0 right-0 z-40 px-6 pt-12 pb-4 flex justify-between items-end pointer-events-none bg-retro-bg/90 backdrop-blur-sm border-b border-white/20">
            <div className="pointer-events-auto">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tighter uppercase">Archive</h1>
                <p className="text-[10px] font-mono text-slate-500 tracking-widest uppercase mt-1">Securing your inspirations...</p>
            </div>
            <button className="pointer-events-auto w-10 h-10 rounded-full bg-retro-bg shadow-neu-flat flex items-center justify-center text-slate-500 active:shadow-neu-pressed transition">
                <Plus size={20} />
            </button>
        </div>

        {/* Scrollable Content */}
        <div className="w-full h-full overflow-y-auto pt-32 pb-24 px-6 scroll-smooth">
            
            {/* 1. Quick Import Hint (System Share) */}
            <div className="mb-6 flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                <div className="h-px flex-1 bg-slate-300"></div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase">
                    <Share2 size={12} />
                    <span>System Share Priority</span>
                </div>
                <div className="h-px flex-1 bg-slate-300"></div>
            </div>

            {/* 2. The "Archive Box" Device */}
            <div className="bg-retro-bg rounded-[2rem] p-6 shadow-neu-flat border border-white/40 relative">
                
                {/* Decor: Screws */}
                <div className="absolute top-4 left-4 text-slate-300"><div className="w-3 h-3 rounded-full shadow-neu-pressed flex items-center justify-center"><div className="w-1.5 h-px bg-slate-400 rotate-45"></div></div></div>
                <div className="absolute top-4 right-4 text-slate-300"><div className="w-3 h-3 rounded-full shadow-neu-pressed flex items-center justify-center"><div className="w-1.5 h-px bg-slate-400 rotate-45"></div></div></div>
                
                {/* 3. The Grid (Buffer) */}
                <div className="mt-4 mb-6">
                    <div className="flex justify-between items-center mb-2 px-1">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Archive Buffer</label>
                        <div className="flex gap-1">
                            <div className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.6)]"></div>
                            <span className="text-[8px] font-mono text-slate-400 uppercase">Online</span>
                        </div>
                    </div>
                    
                    {/* Matrix */}
                    <div className="bg-slate-200/50 p-3 rounded-xl shadow-neu-pressed border border-white/20">
                        <div className="grid grid-cols-4 gap-3">
                            {slots.map((slot) => (
                                <button
                                    key={slot.id}
                                    onClick={() => slot.status !== 'idle' && setActiveSlotId(slot.id)}
                                    className={`
                                        aspect-square rounded-lg flex items-center justify-center transition-all duration-300 relative overflow-visible group
                                        ${slot.status === 'idle' ? 'bg-retro-bg shadow-neu-pressed opacity-70' : ''}
                                        ${slot.status === 'processing' ? 'bg-retro-bg shadow-neu-pressed' : ''}
                                        ${slot.status === 'secured' ? 'bg-retro-bg shadow-neu-flat border-t border-white/60 -translate-y-[1px]' : ''}
                                        ${activeSlotId === slot.id ? 'ring-2 ring-slate-400 ring-offset-2 ring-offset-retro-bg z-20' : 'z-0'}
                                    `}
                                >
                                    <span className={`font-lcd text-lg ${slot.status === 'idle' ? 'text-slate-300/50' : 'text-slate-600 font-bold'}`}>
                                        {slot.id}
                                    </span>
                                    
                                    {/* Status Lights - Convex Effect */}
                                    {slot.status === 'processing' && (
                                        <>
                                            <div className="absolute inset-0 bg-yellow-500/5 animate-pulse rounded-lg"></div>
                                            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_6px_rgba(250,204,21,1)] animate-pulse"></div>
                                        </>
                                    )}
                                    {slot.status === 'secured' && (
                                        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_4px_rgba(74,222,128,0.8)]"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. Info / Detail Area (The "Ticket") */}
                <div className="min-h-[180px] relative">
                    {!activeSlotData || activeSlotData.status === 'idle' ? (
                        /* Idle State: Input Port */
                        <div className="animate-in fade-in duration-300">
                             <div className="flex justify-between items-end mb-2 px-1">
                                 <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Data Input Port</label>
                                 <Terminal size={10} className="text-slate-400" />
                             </div>
                             <div className="bg-retro-bg shadow-neu-pressed rounded-xl p-1 mb-4 border border-white/50">
                                <textarea
                                    className="w-full h-24 bg-slate-100/50 resize-none outline-none text-sm font-lcd text-slate-700 placeholder-slate-400 p-3 rounded-lg tracking-wider"
                                    placeholder="> PASTE_URL_OR_TEXT_HERE..."
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                />
                             </div>
                             <button 
                                onClick={handleAnalyze}
                                disabled={!inputText.trim() || isAnalyzing}
                                className="w-full h-12 rounded-xl bg-retro-bg shadow-neu-flat active:shadow-neu-pressed text-xs font-bold uppercase tracking-widest text-slate-600 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:active:shadow-neu-flat hover:text-blue-600"
                            >
                                {isAnalyzing ? <Loader2 size={14} className="animate-spin"/> : "INITIATE SEQUENCE"}
                            </button>
                        </div>
                    ) : (
                        /* Secured/Active State: The "Key Info" Card */
                        <div className="bg-white/60 rounded-xl p-4 shadow-neu-flat border border-white animate-in slide-in-from-bottom-2 duration-300 relative overflow-hidden">
                            {/* Background Texture */}
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Globe size={64} />
                            </div>

                            {/* Header Line */}
                            <div className="flex justify-between items-start border-b border-slate-300 pb-3 mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-800 rounded text-white flex items-center justify-center font-lcd text-xl shadow-lg">
                                        #{activeSlotData.id}
                                    </div>
                                    <div>
                                        <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">STATUS</div>
                                        <div className="flex items-center gap-1 text-xs font-bold text-green-600 uppercase">
                                            <ShieldCheck size={12} />
                                            {activeSlotData.status === 'processing' ? 'ANALYZING...' : 'SECURED'}
                                        </div>
                                    </div>
                                </div>
                                {/* Visual Barcode */}
                                <div className="flex flex-col items-end">
                                    <div className="h-6 w-24 bg-slate-800 flex items-center justify-center gap-px px-1 overflow-hidden rounded-sm">
                                        {Array.from({length: 16}).map((_,i) => (
                                            <div key={i} className={`w-0.5 h-full bg-white ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-30'}`}></div>
                                        ))}
                                    </div>
                                    <span className="font-lcd text-[10px] text-slate-400 mt-1 tracking-widest">NO.{Date.now().toString().slice(-8)}</span>
                                </div>
                            </div>

                            {/* Main Content Info */}
                            <div className="mb-4">
                                <label className="text-[9px] font-mono text-slate-400 uppercase block mb-1">CONTENT TITLE</label>
                                <h2 className="font-sans text-lg font-bold text-slate-800 leading-tight">
                                    {activeSlotData.data?.summary || "Analyzing Content..."}
                                </h2>
                            </div>

                            {/* Metadata Grid */}
                            <div className="grid grid-cols-3 gap-px bg-slate-300 border border-slate-300 rounded mb-4 overflow-hidden">
                                <div className="bg-slate-50 p-2 flex flex-col justify-center">
                                    <span className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">SOURCE</span>
                                    <span className="font-lcd text-sm text-slate-700 uppercase">WEB</span>
                                </div>
                                <div className="bg-slate-50 p-2 flex flex-col justify-center">
                                    <span className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">TYPE</span>
                                    <span className="font-lcd text-sm text-slate-700 uppercase">{activeSlotData.data?.category || "---"}</span>
                                </div>
                                <div className="bg-slate-50 p-2 flex flex-col justify-center">
                                    <span className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">TIME</span>
                                    <span className="font-lcd text-sm text-slate-700">14:02</span>
                                </div>
                            </div>

                            {/* Snapshot Status */}
                            <div className="flex gap-4 mb-4">
                                 <div className="flex items-center gap-1.5">
                                    <div className={`p-1 rounded-full ${activeSlotData.data ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-400'}`}>
                                        <FileText size={10} />
                                    </div>
                                    <span className="text-[9px] font-bold text-slate-500 uppercase">Text Saved</span>
                                 </div>
                                 <div className="flex items-center gap-1.5">
                                    <div className={`p-1 rounded-full ${activeSlotData.data ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-400'}`}>
                                        <ImageIcon size={10} />
                                    </div>
                                    <span className="text-[9px] font-bold text-slate-500 uppercase">Img Saved</span>
                                 </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-auto pt-2 border-t border-dashed border-slate-300">
                                <button 
                                    onClick={handleDiscard}
                                    className="flex-1 py-2 rounded-lg border border-slate-300 text-slate-500 text-[10px] font-bold uppercase tracking-wider hover:bg-slate-100"
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <Trash2 size={14} />
                                        Discard
                                    </div>
                                </button>
                                <button 
                                    onClick={handleSave}
                                    disabled={activeSlotData.status !== 'secured'}
                                    className="flex-[2] py-2 rounded-lg bg-slate-800 text-white shadow-lg text-[10px] font-bold uppercase tracking-wider active:scale-95 transition-transform disabled:opacity-50"
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <Lock size={14} />
                                        Archive to Vault
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ImportView;
