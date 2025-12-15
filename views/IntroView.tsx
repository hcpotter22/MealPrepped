import React from 'react';
import { ChefHat, ArrowRight } from 'lucide-react';
import { Button } from '../components/SharedComponents';

export const IntroView = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-stone-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-olive-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-stone-200/50 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-md">
        <div className="w-24 h-24 bg-olive-600 rounded-full flex items-center justify-center shadow-xl shadow-olive-600/20 mb-4">
          <ChefHat className="w-12 h-12 text-white" />
        </div>
        
        <div className="space-y-4">
          <h1 className="font-serif text-5xl font-bold text-stone-900 tracking-tight">
            MealPrepped
          </h1>
          <p className="text-stone-500 text-lg leading-relaxed">
            Your personal AI chef. Create custom recipes and organized grocery lists in seconds.
          </p>
        </div>

        <div className="w-full pt-8">
          <Button onClick={onStart} className="w-full py-4 text-lg" icon={ArrowRight}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};