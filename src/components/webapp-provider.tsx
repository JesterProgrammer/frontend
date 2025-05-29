// New component file for the Telegram WebApp provider

import React from "react";

// Define the Telegram WebApp interface
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        sendData: (data: string) => void;
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
        };
        BackButton: {
          isVisible: boolean;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
        };
        themeParams: {
          bg_color: string;
          text_color: string;
          hint_color: string;
          link_color: string;
          button_color: string;
          button_text_color: string;
        };
      };
    };
  }
}

interface TelegramWebAppProviderProps {
  children: React.ReactNode;
}

export const TelegramWebAppProvider: React.FC<TelegramWebAppProviderProps> = ({ children }) => {
  React.useEffect(() => {
    // Initialize Telegram WebApp
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      // Notify Telegram that the WebApp is ready
      window.Telegram.WebApp.ready();
      
      // Expand the WebApp to take the full height
      window.Telegram.WebApp.expand();
      
      // Add Telegram theme class to body
      document.body.classList.add('telegram-webapp');
      
      // Apply Telegram theme colors if available
      if (window.Telegram.WebApp.themeParams) {
        const themeParams = window.Telegram.WebApp.themeParams;
        
        // Create CSS variables for Telegram theme colors
        document.documentElement.style.setProperty('--tg-theme-bg-color', themeParams.bg_color);
        document.documentElement.style.setProperty('--tg-theme-text-color', themeParams.text_color);
        document.documentElement.style.setProperty('--tg-theme-hint-color', themeParams.hint_color);
        document.documentElement.style.setProperty('--tg-theme-link-color', themeParams.link_color);
        document.documentElement.style.setProperty('--tg-theme-button-color', themeParams.button_color);
        document.documentElement.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color);
      }
    }
    
    return () => {
      // Clean up
      if (typeof document !== 'undefined') {
        document.body.classList.remove('telegram-webapp');
      }
    };
  }, []);
  
  return <>{children}</>;
};