import { useState } from "react";
import ConsultationForm from "@/components/consultation-form";
import ReadingResults from "@/components/reading-results";
import HexagramDetailModal from "@/components/hexagram-detail-modal";
import { ConsultationResult } from "@/types/iching";

export default function Home() {
  const [consultationResult, setConsultationResult] = useState<ConsultationResult | null>(null);
  const [selectedHexagram, setSelectedHexagram] = useState<any>(null);

  const handleConsultationComplete = (result: ConsultationResult) => {
    setConsultationResult(result);
  };

  const handleHexagramClick = (hexagram: any) => {
    setSelectedHexagram(hexagram);
  };

  const handleCloseModal = () => {
    setSelectedHexagram(null);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-slate-800/30 backdrop-blur-glass border-b border-gold/20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 gradient-gold rounded-lg flex items-center justify-center">
                <i className="fas fa-yin-yang text-primary text-xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-serif font-semibold text-white">I Ching Oracle</h1>
                <p className="text-gold/80 text-sm">Ancient Wisdom for Modern Times</p>
              </div>
            </div>
            <button className="text-gold hover:text-white transition-colors">
              <i className="fas fa-question-circle text-xl"></i>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Consultation Form */}
        <ConsultationForm onConsultationComplete={handleConsultationComplete} />

        {/* Reading Results */}
        {consultationResult && (
          <ReadingResults 
            result={consultationResult} 
            onHexagramClick={handleHexagramClick}
          />
        )}
      </div>

      {/* Hexagram Detail Modal */}
      {selectedHexagram && (
        <HexagramDetailModal 
          hexagram={selectedHexagram} 
          onClose={handleCloseModal} 
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-800/30 backdrop-blur-glass border-t border-gold/20 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gold/80">
            <p className="text-sm">&copy; 2024 I Ching Oracle. Ancient wisdom meets modern technology.</p>
            <p className="text-xs mt-2">For entertainment and reflection purposes. Seek professional advice for important decisions.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
