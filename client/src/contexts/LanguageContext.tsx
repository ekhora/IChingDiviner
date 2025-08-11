import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'th';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'header.title': 'I Ching Oracle',
    'header.subtitle': 'Ancient Wisdom for Modern Times',
    
    // Form
    'form.title': 'Consult the Oracle',
    'form.question': 'Your Question',
    'form.questionPlaceholder': 'What wisdom do you seek from the I Ching? Be specific and sincere in your inquiry...',
    'form.date': 'Consultation Date',
    'form.time': 'Consultation Time',
    'form.numberOfDraws': 'Number of Draws (1-100)',
    'form.numberOfDrawsHelp': 'Multiple draws provide deeper insight into your question',
    'form.submit': 'Cast the Hexagrams',
    'form.submitting': 'Consulting Oracle...',
    
    // Results
    'results.title': 'Your Reading Results',
    'results.export': 'Export Reading',
    'results.yourQuestion': 'Your Question:',
    'results.consultedOn': 'Consulted on',
    'results.draws': 'draws',
    'results.draw': 'draw',
    'results.performed': 'performed',
    'results.drawNumber': 'Draw #',
    'results.primaryHexagram': 'Primary Hexagram',
    'results.changingLines': 'Changing Lines',
    'results.resultingHexagram': 'Resulting Hexagram',
    'results.strongestLine': 'Strongest Line',
    'results.interpretation': 'Interpretation',
    'results.none': 'None',
    'results.line': 'Line',
    'results.readFull': 'Read Full',
    'results.summary': "Oracle's Summary",
    'results.sixRelatives': 'Six Relatives Analysis',
    'results.influence': 'influence in current situation',
    
    // Hexagram Modal
    'modal.meaning': 'Traditional Meaning',
    'modal.judgment': 'Judgment',
    'modal.image': 'Image',
    'modal.lineAnalysis': 'Line Analysis (Traditional Counting: Line 6 = Top, Line 1 = Bottom)',
    'modal.yang': 'Yang',
    'modal.yin': 'Yin',
    'modal.elementalAssociations': 'Elemental Associations',
    'modal.lineNumbers': 'Line 6 (top) → Line 1 (bottom)',
    
    // Toast Messages
    'toast.consultationSuccess': 'Oracle Consulted',
    'toast.consultationSuccessDesc': 'reading have been cast',
    'toast.consultationError': 'Consultation Failed',
    'toast.consultationErrorDesc': 'Unable to consult the oracle. Please try again.',
    
    // Footer
    'footer.copyright': 'I Ching Oracle. Ancient wisdom meets modern technology.',
    'footer.disclaimer': 'For entertainment and reflection purposes. Seek professional advice for important decisions.',
    
    // Settings
    'settings.language': 'Language',
    'settings.english': 'English',
    'settings.thai': 'ไทย',
  },
  th: {
    // Header
    'header.title': 'อนุโลมตราไตรรัถ',
    'header.subtitle': 'ภูมิปัญญาโบราณสำหรับยุคใหม่',
    
    // Form
    'form.title': 'ปรึกษาพระรรษฎา',
    'form.question': 'คำถามของคุณ',
    'form.questionPlaceholder': 'คุณต้องการปัญญาอะไรจากอนุโลมตราไตรรัถ? ให้เจาะจงและจริงใจในการซักถาม...',
    'form.date': 'วันที่ปรึกษา',
    'form.time': 'เวลาปรึกษา',
    'form.numberOfDraws': 'จำนวนการจับ (1-100)',
    'form.numberOfDrawsHelp': 'การจับหลายครั้งให้ความเข้าใจที่ลึกซึ้งยิ่งขึ้นในคำถามของคุณ',
    'form.submit': 'จับฟืนเฟอง',
    'form.submitting': 'กำลังปรึกษาพระรรษฎา...',
    
    // Results
    'results.title': 'ผลการอ่าน',
    'results.export': 'ส่งออกการอ่าน',
    'results.yourQuestion': 'คำถามของคุณ:',
    'results.consultedOn': 'ปรึกษาเมื่อ',
    'results.draws': 'การจับ',
    'results.draw': 'การจับ',
    'results.performed': 'ดำเนินการแล้ว',
    'results.drawNumber': 'การจับที่',
    'results.primaryHexagram': 'ฟืนเฟองหลัก',
    'results.changingLines': 'เส้นเปลี่ยน',
    'results.resultingHexagram': 'ฟืนเฟองผลลัพธ์',
    'results.strongestLine': 'เส้นที่แข็งแกร่งที่สุด',
    'results.interpretation': 'การตีความ',
    'results.none': 'ไม่มี',
    'results.line': 'เส้น',
    'results.readFull': 'อ่านเต็ม',
    'results.summary': 'สรุปของพระรรษฎา',
    'results.sixRelatives': 'การวิเคราะห์หกญาติ',
    'results.influence': 'อิทธิพลในสถานการณ์ปัจจุบัน',
    
    // Hexagram Modal
    'modal.meaning': 'ความหมายดั้งเดิม',
    'modal.judgment': 'คำตัดสิน',
    'modal.image': 'ภาพ',
    'modal.lineAnalysis': 'การวิเคราะห์เส้น (การนับแบบดั้งเดิม: เส้น 6 = บน, เส้น 1 = ล่าง)',
    'modal.yang': 'หยาง',
    'modal.yin': 'หยิน',
    'modal.elementalAssociations': 'ความเชื่อมโยงธาตุ',
    'modal.lineNumbers': 'เส้น 6 (บน) → เส้น 1 (ล่าง)',
    
    // Toast Messages
    'toast.consultationSuccess': 'ปรึกษาพระรรษฎาแล้ว',
    'toast.consultationSuccessDesc': 'การอ่านได้ถูกจับแล้ว',
    'toast.consultationError': 'การปรึกษาล้มเหลว',
    'toast.consultationErrorDesc': 'ไม่สามารถปรึกษาพระรรษฎาได้ กรุณาลองใหม่อีกครั้ง',
    
    // Footer
    'footer.copyright': 'อนุโลมตราไตรรัถ ภูมิปัญญาโบราณพบกับเทคโนโลยีสมัยใหม่',
    'footer.disclaimer': 'สำหรับความบันเทิงและการไตร่ตรอง ขอคำแนะนำจากผู้เชี่ยวชาญสำหรับการตัดสินใจที่สำคัญ',
    
    // Settings
    'settings.language': 'ภาษา',
    'settings.english': 'English',
    'settings.thai': 'ไทย',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}