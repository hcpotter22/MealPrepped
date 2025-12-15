import React, { useState, useEffect } from 'react';
import { Key, Save, ExternalLink, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Header, Button, Input } from '../components/SharedComponents';
import * as storage from '../services/storageService';

export const SettingsView = ({ onBack, onSave }: { onBack: () => void; onSave: (key: string) => void }) => {
  const [key, setKey] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedKey = storage.getApiKey();
    if (savedKey) setKey(savedKey);
  }, []);

  const handleSave = () => {
    onSave(key);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-stone-50">
      <div className="pt-8 pb-6 px-6 bg-white sticky top-0 z-10 border-b border-stone-100 flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-serif text-3xl font-bold text-stone-900">Settings</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-24">
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-olive-100 rounded-2xl flex items-center justify-center text-olive-600">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-stone-900 text-lg">API Configuration</h2>
              <p className="text-stone-500 text-sm">Connect your own personal AI chef</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
              <p className="text-sm text-stone-600 leading-relaxed">
                To generate recipes, this app requires a <strong>Google Gemini API Key</strong>. 
                Your key is stored securely on your device and never sent to our servers.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-900 uppercase tracking-wide">API Key</label>
              <Input 
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Paste your key here..."
              />
            </div>

            <Button 
              onClick={handleSave} 
              disabled={!key}
              className="w-full"
              icon={isSaved ? ShieldCheck : Save}
            >
              {isSaved ? "Saved Securely" : "Save Key"}
            </Button>

            <div className="flex justify-center">
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-olive-600 hover:text-olive-700 hover:underline"
              >
                Get a free API Key <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        <div className="text-center text-stone-400 text-xs py-4">
          <p>MealPrepped v1.0.0</p>
        </div>
      </div>
    </div>
  );
};