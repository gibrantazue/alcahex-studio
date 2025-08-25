"use client";

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { setLocaleAction } from '../../i18n/set-locale';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', gradient: 'from-blue-500 to-purple-600' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩', gradient: 'from-red-500 to-orange-600' },
  { code: 'es', name: 'Español', flag: '🇪🇸', gradient: 'from-yellow-500 to-red-600' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', gradient: 'from-blue-600 to-indigo-700' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', gradient: 'from-pink-500 to-rose-600' },
  { code: 'ko', name: '한국어', flag: '🇰🇷', gradient: 'from-teal-500 to-cyan-600' },
  { code: 'zh', name: '中文', flag: '🇨🇳', gradient: 'from-emerald-500 to-green-600' },
];

interface SidebarLanguageSwitcherProps {
  isMobile?: boolean;
}

export default function SidebarLanguageSwitcher({ isMobile = false }: SidebarLanguageSwitcherProps) {
  const locale = useLocale();
  const t = useTranslations('Layout');
  const [isExpanded, setIsExpanded] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const handleLanguageChange = async (langCode: string) => {
    await setLocaleAction(langCode);
    setIsExpanded(false);
  };

  if (isMobile) {
    return (
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`
              w-8 h-8 rounded-xl
              bg-gradient-to-r ${currentLanguage.gradient}
              flex items-center justify-center
              shadow-lg
            `}>
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 12.236 11.618 14z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className={`
                text-sm font-bold
                bg-gradient-to-r ${currentLanguage.gradient}
                bg-clip-text text-transparent
              `}>
                {t('language')}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {currentLanguage.name}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`
              p-2 rounded-xl transition-all duration-300
              hover:bg-gray-100 dark:hover:bg-gray-800
              ${isExpanded ? 'rotate-180' : ''}
            `}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Mobile Language Grid */}
        {isExpanded && (
          <div className="space-y-2 animate-in slide-in-from-top-2 duration-300 max-h-64 overflow-y-auto custom-scrollbar pb-4">
            {languages.map((language, index) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`
                  group w-full flex items-center space-x-3 p-3
                  rounded-xl transition-all duration-300
                  hover:scale-[1.02] hover:-translate-y-0.5
                  ${language.code === locale 
                    ? `bg-gradient-to-r ${language.gradient} text-white shadow-lg` 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`
                  relative w-10 h-10 rounded-xl
                  ${language.code === locale 
                    ? 'bg-white/20 backdrop-blur-sm' 
                    : `bg-gradient-to-br ${language.gradient} opacity-80 group-hover:opacity-100`
                  }
                  flex items-center justify-center
                  transition-all duration-300
                  group-hover:scale-110 group-hover:rotate-3
                  shadow-md
                `}>
                  <span className="text-lg drop-shadow-sm">{language.flag}</span>
                </div>
                
                <div className="flex-1 text-left">
                  <span className={`
                    text-sm font-semibold block
                    ${language.code === locale ? 'text-white' : ''}
                    transition-colors duration-300
                  `}>
                    {language.name}
                  </span>
                  <span className={`
                    text-xs opacity-80
                    ${language.code === locale ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'}
                  `}>
                    {language.code.toUpperCase()}
                  </span>
                </div>
                
                {language.code === locale && (
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop version
  return (
    <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
      {/* Desktop Compact Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          group w-full flex items-center justify-between p-3
          rounded-xl transition-all duration-300
          hover:bg-gray-50 dark:hover:bg-gray-800
          ${isExpanded ? 'bg-gray-50 dark:bg-gray-800' : ''}
        `}
      >
        <div className="flex items-center space-x-3">
          <div className={`
            relative w-8 h-8 rounded-lg
            bg-gradient-to-r ${currentLanguage.gradient}
            flex items-center justify-center
            shadow-md group-hover:shadow-lg
            transition-all duration-300
            group-hover:scale-110
          `}>
            <span className="text-lg drop-shadow-sm">{currentLanguage.flag}</span>
            
            {/* Shine effect */}
            <div className={`
              absolute inset-0 rounded-lg
              bg-gradient-to-r from-transparent via-white/30 to-transparent
              opacity-0 group-hover:opacity-100
              transform -skew-x-12 -translate-x-full group-hover:translate-x-full
              transition-all duration-700
            `} />
          </div>
          
          <div className="text-left">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 block">
              {currentLanguage.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {currentLanguage.code.toUpperCase()}
            </span>
          </div>
        </div>
        
        <svg 
          className={`
            w-4 h-4 text-gray-400 transition-transform duration-300
            ${isExpanded ? 'rotate-180' : ''}
          `} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

        {/* Desktop Expanded Language List */}
        {isExpanded && (
          <div className="mt-3 space-y-1 animate-in slide-in-from-top-2 duration-300 max-h-48 overflow-y-auto custom-scrollbar pb-2">
            {languages.map((language, index) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`
                group w-full flex items-center space-x-3 p-2.5
                rounded-lg transition-all duration-300
                hover:scale-[1.02]
                ${language.code === locale 
                  ? `bg-gradient-to-r ${language.gradient} text-white shadow-md` 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }
              `}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className={`
                relative w-7 h-7 rounded-md
                ${language.code === locale 
                  ? 'bg-white/20 backdrop-blur-sm' 
                  : `bg-gradient-to-br ${language.gradient} opacity-70 group-hover:opacity-100`
                }
                flex items-center justify-center
                transition-all duration-300
                group-hover:scale-110
                shadow-sm
              `}>
                <span className="text-sm drop-shadow-sm">{language.flag}</span>
              </div>
              
              <div className="flex-1 text-left">
                <span className={`
                  text-xs font-medium
                  ${language.code === locale ? 'text-white' : ''}
                  transition-colors duration-300
                `}>
                  {language.name}
                </span>
              </div>
              
              {language.code === locale && (
                <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
