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

export default function DesktopLanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('Layout');
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const handleLanguageChange = async (langCode: string) => {
    await setLocaleAction(langCode);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 lg:block hidden">
      <div className="relative">
        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            group flex items-center justify-center w-16 h-16
            bg-white/10 backdrop-blur-md border border-white/20
            rounded-full shadow-lg hover:shadow-xl
            transition-all duration-300 ease-out
            hover:bg-white/20 hover:scale-110
            ${isOpen ? 'bg-white/20 scale-110' : ''}
          `}
        >
          <div className={`
            relative w-10 h-10 rounded-full
            bg-gradient-to-r ${currentLanguage.gradient}
            flex items-center justify-center
            shadow-md group-hover:shadow-lg
            transition-all duration-300
            group-hover:scale-110
          `}>
            <span className="text-xl drop-shadow-sm">{currentLanguage.flag}</span>
            
            {/* Shine effect */}
            <div className={`
              absolute inset-0 rounded-full
              bg-gradient-to-r from-transparent via-white/30 to-transparent
              opacity-0 group-hover:opacity-100
              transform -skew-x-12 -translate-x-full group-hover:translate-x-full
              transition-all duration-700
            `} />
          </div>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute bottom-full mb-2 right-0 w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
            <div className="max-h-80 overflow-y-auto custom-scrollbar p-2">
              {languages.map((language, index) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`
                    group w-full flex items-center space-x-3 p-3
                    rounded-xl transition-all duration-300
                    hover:scale-[1.02]
                    ${language.code === locale 
                      ? `bg-gradient-to-r ${language.gradient} text-white shadow-md` 
                      : 'hover:bg-white/10 text-white/90'
                    }
                  `}
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className={`
                    relative w-8 h-8 rounded-lg
                    ${language.code === locale 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : `bg-gradient-to-br ${language.gradient} opacity-70 group-hover:opacity-100`
                    }
                    flex items-center justify-center
                    transition-all duration-300
                    group-hover:scale-110
                    shadow-sm
                  `}>
                    <span className="text-lg drop-shadow-sm">{language.flag}</span>
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className={`
                      text-sm font-medium
                      ${language.code === locale ? 'text-white' : 'text-white/90'}
                      transition-colors duration-300
                    `}>
                      {language.name}
                    </div>
                    <div className={`
                      text-xs
                      ${language.code === locale ? 'text-white/80' : 'text-white/60'}
                    `}>
                      {language.code.toUpperCase()}
                    </div>
                  </div>
                  
                  {language.code === locale && (
                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
