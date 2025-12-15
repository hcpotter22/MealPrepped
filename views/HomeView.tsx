import React from 'react';
import { Sparkles, History, Search } from 'lucide-react';
import { Button, Card, Header } from '../components/SharedComponents';
import { ViewState } from '../types';

interface HomeViewProps {
  onNavigate: (view: ViewState) => void;
  recentRecipes: any[];
}

export const HomeView = ({ onNavigate, recentRecipes }: HomeViewProps) => {
  return (
    <div className="flex flex-col h-full bg-stone-50">
      <Header title="Good Evening" subtitle="What are we cooking today?" />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-24 no-scrollbar">
        {/* Hero Section */}
        <section>
          <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white shadow-2xl">
            <img 
              src="https://picsum.photos/seed/salad/800/600" 
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              alt="Special"
            />
            <div className="relative z-10 p-8 flex flex-col h-64 justify-between bg-gradient-to-t from-black/80 via-transparent to-transparent">
              <span className="inline-block px-3 py-1 rounded-full bg-olive-500/90 text-xs font-bold uppercase tracking-wider w-fit">
                Today's Special
              </span>
              <div>
                <h2 className="font-serif text-3xl font-bold mb-2">Mediterranean Bowl</h2>
                <p className="text-stone-200 line-clamp-2">Fresh, healthy, and ready in 20 minutes. Perfect for a quick lunch.</p>
                <button 
                  onClick={() => onNavigate(ViewState.BROWSE)}
                  className="mt-4 text-sm font-bold border-b border-white pb-0.5 hover:text-olive-300 hover:border-olive-300 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => onNavigate(ViewState.GENERATE)}
              className="group flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm border border-stone-100 active:scale-95 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-olive-100 flex items-center justify-center mb-3 group-hover:bg-olive-200 transition-colors">
                <Sparkles className="w-6 h-6 text-olive-700" />
              </div>
              <span className="font-medium text-stone-900">Create New</span>
            </button>
            <button 
               onClick={() => onNavigate(ViewState.SAVED)}
               className="group flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm border border-stone-100 active:scale-95 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mb-3 group-hover:bg-stone-200 transition-colors">
                <History className="w-6 h-6 text-stone-700" />
              </div>
              <span className="font-medium text-stone-900">Saved</span>
            </button>
          </div>
        </section>

        {/* Recent / Trending Placeholder */}
        <section>
          <div className="flex items-center justify-between mb-4">
             <h3 className="font-serif text-xl font-bold text-stone-900">Trending Now</h3>
             <button onClick={() => onNavigate(ViewState.BROWSE)} className="text-olive-600 text-sm font-medium">See all</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-48">
                <div className="aspect-square rounded-2xl overflow-hidden mb-3 bg-stone-200">
                  <img src={`https://picsum.photos/seed/${i+10}/400/400`} className="w-full h-full object-cover" alt="Trending" />
                </div>
                <h4 className="font-bold text-stone-900 text-sm truncate">Roasted Veggie Salad</h4>
                <p className="text-stone-500 text-xs">25 mins • Easy</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};