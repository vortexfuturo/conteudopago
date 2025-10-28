import React from 'react';
import { Home, TrendingUp, MessageCircle, Menu, Zap } from 'lucide-react';

export function BottomNavigation() {
  const navItems = [
    { icon: Zap, label: 'Mural', active: true, available: true },
    { icon: Home, label: 'Feed', active: false, available: false },
    { icon: TrendingUp, label: 'Em alta', active: false, available: false },
    { icon: MessageCircle, label: 'Chat', active: false, available: false },
    { icon: Menu, label: 'Menu', active: false, available: false }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-900 z-50 safe-area-bottom">
      <div className="grid grid-cols-5 max-w-md mx-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className={`relative flex flex-col items-center justify-center py-2.5 px-2 transition-all duration-200 ${
                item.active
                  ? 'text-white'
                  : item.available
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-600'
              }`}
              disabled={!item.available}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 mb-0.5 ${item.active ? 'text-white' : ''}`} />
                {!item.available && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-[8px] text-gray-400">🔒</span>
                  </div>
                )}
              </div>
              <span className={`text-[10px] font-medium ${item.active ? 'text-white' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
