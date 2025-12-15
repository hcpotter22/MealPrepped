import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  icon: Icon
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  disabled?: boolean;
  icon?: React.ElementType;
}) => {
  const baseStyle = "flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-olive-600 text-white shadow-lg shadow-olive-600/20 hover:bg-olive-700",
    secondary: "bg-stone-200 text-stone-900 hover:bg-stone-300",
    outline: "border border-stone-300 text-stone-700 hover:bg-stone-50",
    ghost: "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {disabled && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
      {!disabled && Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
};

export const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-3xl shadow-sm border border-stone-100/50 ${className}`}>
    {children}
  </div>
);

export const Input = ({ 
  label, 
  value, 
  onChange, 
  placeholder,
  className = ''
}: { 
  label?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  placeholder?: string;
  className?: string;
}) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    {label && <label className="text-sm font-medium text-stone-500 uppercase tracking-wider pl-1">{label}</label>}
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-white border border-stone-200 text-stone-900 text-lg rounded-2xl focus:ring-2 focus:ring-olive-500 focus:border-olive-500 block w-full p-4 placeholder-stone-300 transition-all outline-none"
    />
  </div>
);

export const TextArea = ({ 
  label, 
  value, 
  onChange, 
  placeholder 
}: { 
  label?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; 
  placeholder?: string;
}) => (
  <div className="flex flex-col gap-2">
    {label && <label className="text-sm font-medium text-stone-500 uppercase tracking-wider pl-1">{label}</label>}
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className="bg-white border border-stone-200 text-stone-900 text-base rounded-2xl focus:ring-2 focus:ring-olive-500 focus:border-olive-500 block w-full p-4 placeholder-stone-300 transition-all outline-none resize-none"
    />
  </div>
);

export const Header = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="pt-8 pb-6 px-6 bg-white sticky top-0 z-10 border-b border-stone-100">
    <h1 className="font-serif text-3xl font-bold text-stone-900">{title}</h1>
    {subtitle && <p className="text-stone-500 mt-1">{subtitle}</p>}
  </div>
);