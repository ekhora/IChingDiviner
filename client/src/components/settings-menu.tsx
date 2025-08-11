import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from "@/components/ui/button";
import { useLanguage, type Language } from '@/contexts/LanguageContext';

export default function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const MenuPortal = () => {
    if (!isOpen) return null;

    return createPortal(
      <div className="fixed inset-0" style={{ zIndex: 99999 }}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/20"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu Content */}
        <div className="absolute top-20 right-4 w-48 bg-white shadow-2xl rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3 border-b border-slate-200 pb-2">
              {t('settings.language')}
            </h3>
            
            <div className="space-y-2">
              <Button
                variant={language === 'en' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleLanguageChange('en')}
                className={`w-full justify-start text-left ${
                  language === 'en' 
                    ? 'bg-gold text-primary hover:bg-yellow-400' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="mr-2">🇺🇸</span>
                {t('settings.english')}
              </Button>
              
              <Button
                variant={language === 'th' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleLanguageChange('th')}
                className={`w-full justify-start text-left ${
                  language === 'th' 
                    ? 'bg-gold text-primary hover:bg-yellow-400' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="mr-2">🇹🇭</span>
                {t('settings.thai')}
              </Button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMenu}
        className="text-gold hover:text-white hover:bg-gold/20 transition-colors p-2 relative z-10"
      >
        <div className="flex flex-col space-y-1">
          <div className={`w-5 h-0.5 bg-current transition-transform duration-200 ${
            isOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}></div>
          <div className={`w-5 h-0.5 bg-current transition-opacity duration-200 ${
            isOpen ? 'opacity-0' : ''
          }`}></div>
          <div className={`w-5 h-0.5 bg-current transition-transform duration-200 ${
            isOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}></div>
        </div>
      </Button>

      {/* Menu Portal */}
      <MenuPortal />
    </>
  );
}