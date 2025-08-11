import { useState } from 'react';
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

  return (
    <div className="relative">
      {/* Hamburger Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMenu}
        className="text-gold hover:text-white hover:bg-gold/20 transition-colors p-2"
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

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[9998]"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-glass rounded-lg shadow-xl border border-gold/20 z-[9999]">
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
        </>
      )}
    </div>
  );
}