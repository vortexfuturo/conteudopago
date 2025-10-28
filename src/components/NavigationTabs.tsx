import React from 'react';
import { Grid, Play, Radio, Image, MessageSquare } from 'lucide-react';

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  const tabs = [
    { id: 'feed', label: 'Feed', icon: Grid },
    { id: 'mídias', label: 'Mídias', icon: Play },
    { id: 'aovivo', label: 'Ao Vivo', icon: Radio },
    { id: 'stories', label: 'Stories', icon: Image },
    { id: 'mensagens', label: 'Chat', icon: MessageSquare }
  ];

  return (
    <div className="bg-black border-b border-gray-900 sticky top-[52px] z-10">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center justify-center space-x-1.5 px-4 py-3 font-medium text-xs whitespace-nowrap transition-all duration-200 border-b-2 ${
                isActive
                  ? 'text-white border-white'
                  : 'text-gray-500 border-transparent hover:text-gray-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
