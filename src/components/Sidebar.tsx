"use client";

import React from 'react';
import SidebarLanguageSwitcher from './SidebarLanguageSwitcher';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  isExternal?: boolean;
  isButton?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

interface SidebarProps {
  navItems: NavItem[];
  isOpen?: boolean;
  onClose?: () => void;
  activeSection?: string;
  onItemClick?: (item: NavItem) => void;
  className?: string;
}

export default function Sidebar({ navItems, isOpen, onClose, activeSection, onItemClick, className = "" }: SidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <nav className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:relative lg:translate-x-0 lg:shadow-none ${className} flex flex-col overflow-hidden`}>
        
        {/* Close button for mobile */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation items */}
        <div className="p-4 flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  onClick={(e) => {
                    if (item.onClick) {
                      item.onClick(e);
                    } else if (!item.isExternal) {
                      e.preventDefault();
                      onItemClick?.(item);
                    }
                    onClose?.(); // Close sidebar on mobile after clicking
                  }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    item.isActive || activeSection === item.id
                      ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  } ${item.isButton ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}
                >
                  {item.icon && <span className="w-5 h-5">{item.icon}</span>}
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Language Switcher at Bottom */}
        <SidebarLanguageSwitcher isMobile={false} />
      </nav>
    </>
  );
}
