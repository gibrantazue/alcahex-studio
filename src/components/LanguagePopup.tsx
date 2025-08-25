"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { setLocaleAction } from '../../i18n/set-locale';
import { SUPPORTED_LOCALES } from '@/lib/const';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', gradient: 'from-blue-500 to-purple-600' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩', gradient: 'from-red-500 to-orange-600' },
  { code: 'es', name: 'Español', flag: '🇪🇸', gradient: 'from-yellow-500 to-red-600' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', gradient: 'from-blue-600 to-indigo-700' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', gradient: 'from-pink-500 to-rose-600' },
  { code: 'ko', name: '한국어', flag: '🇰🇷', gradient: 'from-teal-500 to-cyan-600' },
  { code: 'zh', name: '中文', flag: '🇨🇳', gradient: 'from-emerald-500 to-green-600' },
];

export default function LanguagePopup() {
  const locale = useLocale();
  const t = useTranslations('Layout');
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const handleLanguageChange = async (langCode: string) => {
    await setLocaleAction(langCode);
    setIsOpen(false);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        buttonRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Hide/show based on scroll (optional enhancement)
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Modern Floating Language Button */}
      <div className={`
        fixed z-50 transition-all duration-500 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
        bottom-6 right-6 md:bottom-8 md:right-8 sm:bottom-4 sm:right-4
      `}>
        {/* Animated Background Glow */}
        <div className={`
          absolute inset-0 rounded-full blur-xl opacity-60
          bg-gradient-to-r ${currentLanguage.gradient}
          animate-pulse scale-110
          transition-all duration-700
        `} />
        
        {/* Main Button */}
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            relative w-16 h-16 md:w-18 md:h-18
            bg-white/90 dark:bg-gray-900/90
            backdrop-blur-xl
            border border-white/20 dark:border-gray-700/50
            rounded-2xl
            shadow-2xl shadow-black/10 dark:shadow-black/30
            hover:shadow-3xl hover:shadow-black/20
            transform transition-all duration-300 ease-out
            hover:scale-110 hover:-translate-y-1
            active:scale-95 active:translate-y-0
            group overflow-hidden
            focus:outline-none focus:ring-4 focus:ring-white/30
            before:absolute before:inset-0
            before:bg-gradient-to-br before:${currentLanguage.gradient}
            before:opacity-0 hover:before:opacity-10
            before:transition-opacity before:duration-300
          `}
          title={t('language')}
          aria-label="Change language"
        >
          {/* Rotating Border Animation */}
          <div className={`
            absolute inset-0 rounded-2xl
            bg-gradient-to-r ${currentLanguage.gradient}
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
            animate-spin-slow
            p-[1px]
          `}>
            <div className="w-full h-full rounded-2xl bg-white/90 dark:bg-gray-900/90" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <div className="relative">
              <span className={`
                text-2xl md:text-3xl
                transform transition-all duration-300
                group-hover:scale-125 group-hover:rotate-12
                drop-shadow-lg
              `}>
                {currentLanguage.flag}
              </span>
              
              {/* Sparkle Effect */}
              <div className={`
                absolute -top-1 -right-1 w-2 h-2
                bg-gradient-to-r ${currentLanguage.gradient}
                rounded-full opacity-0 group-hover:opacity-100
                animate-ping transition-opacity duration-300
              `} />
            </div>
            
            <span className={`
              text-[10px] md:text-xs font-bold
              bg-gradient-to-r ${currentLanguage.gradient}
              bg-clip-text text-transparent
              mt-1 tracking-wider
              transform transition-all duration-300
              group-hover:scale-110
            `}>
              {currentLanguage.code.toUpperCase()}
            </span>
          </div>
          
          {/* Ripple Effect */}
          <div className={`
            absolute inset-0 rounded-2xl
            bg-gradient-to-r ${currentLanguage.gradient}
            opacity-0 group-active:opacity-20
            transition-opacity duration-150
          `} />
        </button>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`
            absolute top-2 right-2 w-1 h-1
            bg-gradient-to-r ${currentLanguage.gradient}
            rounded-full opacity-60
            animate-bounce
            animation-delay-100
          `} />
          <div className={`
            absolute bottom-3 left-1 w-1.5 h-1.5
            bg-gradient-to-r ${currentLanguage.gradient}
            rounded-full opacity-40
            animate-bounce
            animation-delay-300
          `} />
        </div>
      </div>

      {/* Language Selection Popup */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modern Desktop Popup Menu */}
          <div
            ref={popupRef}
            className={`
              fixed z-50 transition-all duration-500 ease-out
              ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
              hidden md:block
              bottom-6 right-28
              min-w-[320px] max-w-[360px]
            `}
          >
            {/* Glassmorphism Background */}
            <div className={`
              relative
              bg-white/80 dark:bg-gray-900/80
              backdrop-blur-2xl
              border border-white/20 dark:border-gray-700/30
              rounded-3xl shadow-2xl shadow-black/10 dark:shadow-black/30
              overflow-hidden
              before:absolute before:inset-0
              before:bg-gradient-to-br before:from-white/10 before:to-transparent
              before:pointer-events-none
            `}>
              {/* Animated Header */}
              <div className={`
                relative px-6 py-4
                bg-gradient-to-r from-transparent via-white/5 to-transparent
                border-b border-white/10 dark:border-gray-700/20
              `}>
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-8 h-8 rounded-full
                    bg-gradient-to-r ${currentLanguage.gradient}
                    flex items-center justify-center
                    animate-pulse
                  `}>
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 12.236 11.618 14z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className={`
                    text-lg font-bold
                    bg-gradient-to-r ${currentLanguage.gradient}
                    bg-clip-text text-transparent
                  `}>
                    {t('language')}
                  </h3>
                </div>
              </div>
              
              {/* Language Grid */}
              <div className="p-4 space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
                {languages.map((language, index) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`
                      group w-full flex items-center space-x-4 p-4
                      rounded-2xl transition-all duration-300
                      hover:scale-[1.02] hover:-translate-y-0.5
                      transform-gpu
                      ${language.code === locale 
                        ? `bg-gradient-to-r ${language.gradient} text-white shadow-lg shadow-${language.gradient.split('-')[1]}-500/30` 
                        : 'hover:bg-white/50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300'
                      }
                    `}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={`
                      relative w-12 h-12 rounded-xl
                      ${language.code === locale 
                        ? 'bg-white/20 backdrop-blur-sm' 
                        : `bg-gradient-to-br ${language.gradient} opacity-80 group-hover:opacity-100`
                      }
                      flex items-center justify-center
                      transition-all duration-300
                      group-hover:scale-110 group-hover:rotate-3
                    `}>
                      <span className="text-2xl drop-shadow-sm">{language.flag}</span>
                      
                      {/* Shine Effect */}
                      <div className={`
                        absolute inset-0 rounded-xl
                        bg-gradient-to-r from-transparent via-white/30 to-transparent
                        opacity-0 group-hover:opacity-100
                        transform -skew-x-12 -translate-x-full group-hover:translate-x-full
                        transition-all duration-700
                      `} />
                    </div>
                    
                    <div className="flex-1 text-left">
                      <span className={`
                        text-base font-semibold block
                        ${language.code === locale ? 'text-white' : ''}
                        transition-colors duration-300
                      `}>
                        {language.name}
                      </span>
                      <span className={`
                        text-sm opacity-80
                        ${language.code === locale ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'}
                      `}>
                        {language.code.toUpperCase()}
                      </span>
                    </div>
                    
                    {language.code === locale && (
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Modern Mobile/Tablet Bottom Sheet */}
          <div
            className={`
              fixed bottom-0 left-0 right-0 z-50
              md:hidden
              transform transition-all duration-500 ease-out
              ${isOpen ? 'translate-y-0' : 'translate-y-full'}
            `}
          >
            {/* Glassmorphism Background */}
            <div className={`
              bg-white/90 dark:bg-gray-900/90
              backdrop-blur-2xl
              border-t border-white/20 dark:border-gray-700/30
              rounded-t-3xl shadow-2xl shadow-black/10
              overflow-hidden
              relative
              before:absolute before:inset-0
              before:bg-gradient-to-b before:from-white/10 before:to-transparent
              before:pointer-events-none
            `}>
              {/* Animated Handle */}
              <div className="flex justify-center pt-4 pb-2">
                <div className={`
                  w-12 h-1.5 rounded-full
                  bg-gradient-to-r ${currentLanguage.gradient}
                  animate-pulse
                `} />
              </div>
              
              {/* Modern Header */}
              <div className="px-6 py-6 border-b border-white/10 dark:border-gray-700/20">
                <div className="flex items-center space-x-4">
                  <div className={`
                    w-12 h-12 rounded-2xl
                    bg-gradient-to-r ${currentLanguage.gradient}
                    flex items-center justify-center
                    shadow-lg shadow-${currentLanguage.gradient.split('-')[1]}-500/30
                  `}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 12.236 11.618 14z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`
                      text-xl font-bold
                      bg-gradient-to-r ${currentLanguage.gradient}
                      bg-clip-text text-transparent
                    `}>
                      {t('language')}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Choose your preferred language
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Language Grid */}
              <div className="px-6 py-4 max-h-96 overflow-y-auto pb-safe space-y-3">
                {languages.map((language, index) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`
                      group w-full flex items-center space-x-5 p-5
                      rounded-2xl transition-all duration-300
                      hover:scale-[1.02] hover:-translate-y-1
                      transform-gpu
                      ${language.code === locale 
                        ? `bg-gradient-to-r ${language.gradient} text-white shadow-xl shadow-${language.gradient.split('-')[1]}-500/30` 
                        : 'hover:bg-white/60 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300'
                      }
                    `}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`
                      relative w-16 h-16 rounded-2xl
                      ${language.code === locale 
                        ? 'bg-white/20 backdrop-blur-sm' 
                        : `bg-gradient-to-br ${language.gradient} opacity-80 group-hover:opacity-100`
                      }
                      flex items-center justify-center
                      transition-all duration-300
                      group-hover:scale-110 group-hover:rotate-6
                      shadow-lg
                    `}>
                      <span className="text-3xl drop-shadow-sm">{language.flag}</span>
                      
                      {/* Ripple Effect */}
                      <div className={`
                        absolute inset-0 rounded-2xl
                        bg-white/30
                        opacity-0 group-active:opacity-100
                        transition-opacity duration-150
                      `} />
                    </div>
                    
                    <div className="flex-1 text-left">
                      <span className={`
                        text-lg font-bold block
                        ${language.code === locale ? 'text-white' : ''}
                        transition-colors duration-300
                      `}>
                        {language.name}
                      </span>
                      <span className={`
                        text-sm opacity-80
                        ${language.code === locale ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'}
                      `}>
                        {language.code.toUpperCase()}
                      </span>
                    </div>
                    
                    {language.code === locale && (
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Bottom Safe Area */}
              <div className="h-8" />
            </div>
          </div>
        </>
      )}
    </>
  );
}
