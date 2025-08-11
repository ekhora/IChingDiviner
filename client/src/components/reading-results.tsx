import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HexagramVisualization from "./hexagram-visualization";
import { useLanguage } from "@/contexts/LanguageContext";
import { ConsultationResult } from "@/types/iching";

interface ReadingResultsProps {
  result: ConsultationResult;
  onHexagramClick: (hexagram: any) => void;
}

export default function ReadingResults({ result, onHexagramClick }: ReadingResultsProps) {
  const { t, language } = useLanguage();
  
  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(`${date}T${time}`);
    const locale = language === 'th' ? 'th-TH' : 'en-US';
    return dateObj.toLocaleDateString(locale, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const exportReading = () => {
    const exportData = {
      question: result.question,
      consultation: formatDateTime(result.consultationDate, result.consultationTime),
      numberOfDraws: result.numberOfDraws,
      summary: result.summary,
      readings: result.results.map((reading, index) => ({
        draw: index + 1,
        primaryHexagram: `${reading.primaryHexagram.name} (${reading.primaryHexagram.chineseName}) #${reading.primaryHexagram.number}`,
        changingLines: reading.changingLines.join(', ') || 'None',
        resultingHexagram: `${reading.resultingHexagram.name} (${reading.resultingHexagram.chineseName}) #${reading.resultingHexagram.number}`,
        strongestLine: `Line ${reading.strongestLine.line} (${reading.strongestLine.animal}/${reading.strongestLine.element})`,
        interpretation: reading.interpretation
      }))
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `iching-reading-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-white/95 backdrop-blur-glass shadow-2xl">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-semibold text-slate-800">
            <i className="fas fa-eye text-gold mr-2"></i>
            {t('results.title')}
          </h2>
          <Button 
            onClick={exportReading}
            className="bg-gold text-primary hover:bg-yellow-400 transition-colors"
          >
            <i className="fas fa-download mr-2"></i>
            {t('results.export')}
          </Button>
        </div>

        {/* Current Question Display */}
        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-slate-600 mb-1">{t('results.yourQuestion')}</p>
          <p className="text-slate-800 font-medium italic">"{result.question}"</p>
          <p className="text-xs text-slate-500 mt-2">
            {t('results.consultedOn')} {formatDateTime(result.consultationDate, result.consultationTime)} • 
            {result.numberOfDraws} {result.numberOfDraws > 1 ? t('results.draws') : t('results.draw')} {t('results.performed')}
          </p>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr className="gradient-primary text-white">
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('results.drawNumber')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('results.primaryHexagram')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('results.changingLines')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('results.resultingHexagram')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('results.strongestLine')}</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">{t('results.interpretation')}</th>
              </tr>
            </thead>
            <tbody>
              {result.results.map((reading, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-primary font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div 
                      className="flex items-center space-x-3 cursor-pointer hover:opacity-80"
                      onClick={() => onHexagramClick(reading.primaryHexagram)}
                    >
                      <HexagramVisualization lines={reading.primaryHexagram.lines} size="sm" />
                      <div>
                        <p className="font-semibold text-slate-800">
                          {reading.primaryHexagram.chineseName} ({reading.primaryHexagram.name})
                        </p>
                        <p className="text-xs text-slate-500">#{reading.primaryHexagram.number}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {reading.changingLines.length > 0 ? (
                        reading.changingLines.map((line) => (
                          <Badge key={line} variant="destructive" className="text-xs">
                            {t('results.line')} {line}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-slate-500">{t('results.none')}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div 
                      className="flex items-center space-x-3 cursor-pointer hover:opacity-80"
                      onClick={() => onHexagramClick(reading.resultingHexagram)}
                    >
                      <HexagramVisualization lines={reading.resultingHexagram.lines} size="sm" />
                      <div>
                        <p className="font-semibold text-slate-800">
                          {reading.resultingHexagram.chineseName} ({reading.resultingHexagram.name})
                        </p>
                        <p className="text-xs text-slate-500">#{reading.resultingHexagram.number}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gold rounded-full"></div>
                      <span className="text-sm font-medium">{t('results.line')} {reading.strongestLine.line}</span>
                      <span className="text-xs text-slate-500">
                        ({reading.strongestLine.animal}/{reading.strongestLine.element})
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 max-w-xs">
                    <p className="text-sm text-slate-700 line-clamp-2">
                      {reading.interpretation.substring(0, 100)}...
                    </p>
                    <Button 
                      variant="link" 
                      className="text-primary text-xs p-0 h-auto mt-1"
                      onClick={() => onHexagramClick(reading.primaryHexagram)}
                    >
                      {t('results.readFull')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Insight */}
        <div className="mt-8 bg-gradient-to-r from-gold/10 to-yellow-50 rounded-xl p-6 border border-gold/20">
          <h3 className="text-lg font-serif font-semibold text-slate-800 mb-3">
            <i className="fas fa-lightbulb text-gold mr-2"></i>
            {t('results.summary')}
          </h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            {result.summary}
          </p>
          
          {/* Six Relatives Analysis */}
          {result.results.length > 0 && (
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">{t('results.sixRelatives')}</h4>
              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(result.results[0].sixRelatives).slice(0, 3).map(([relative, strength], index) => (
                  <div key={relative} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-blue-500' : 
                        index === 1 ? 'bg-green-500' : 'bg-purple-500'
                      }`}></div>
                      <span className="font-medium text-sm">{relative}</span>
                    </div>
                    <p className="text-xs text-slate-600">{strength} {t('results.influence')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
