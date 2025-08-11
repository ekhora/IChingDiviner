import { Button } from "@/components/ui/button";
import HexagramVisualization from "./hexagram-visualization";
import { useLanguage } from "@/contexts/LanguageContext";
import { ZODIAC_ANIMALS, FIVE_ELEMENTS } from "../../../server/data/hexagrams";

interface HexagramDetailModalProps {
  hexagram: any;
  onClose: () => void;
}

export default function HexagramDetailModal({ hexagram, onClose }: HexagramDetailModalProps) {
  const { t } = useLanguage();
  
  const getLineAnalysis = (arrayIndex: number) => {
    const lineNumber = 6 - arrayIndex; // Convert array index to traditional line number
    const animal = ZODIAC_ANIMALS[arrayIndex % 12];
    const element = FIVE_ELEMENTS[arrayIndex % 5];
    
    return {
      lineNumber,
      animal,
      element,
      description: `${t('results.line')} ${lineNumber} represents ${animal} energy with ${element} element influence.`
    };
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-serif font-semibold text-slate-800">
              {hexagram.chineseName} - {hexagram.name}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600"
            >
              <i className="fas fa-times text-xl"></i>
            </Button>
          </div>
          
          <div className="space-y-6">
            {/* Hexagram Visualization */}
            <div className="text-center">
              <div className="inline-flex flex-col p-4 bg-slate-50 rounded-lg">
                <HexagramVisualization lines={hexagram.lines} size="lg" showLineNumbers={true} />
              </div>
              <p className="text-sm text-slate-500 mt-2">Hexagram #{hexagram.number}</p>
              <p className="text-xs text-slate-400 mt-1">{t('modal.lineNumbers')}</p>
            </div>

            {/* Traditional Meaning */}
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">{t('modal.meaning')}</h4>
              <p className="text-slate-700">{hexagram.description}</p>
            </div>

            {/* Judgment */}
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">{t('modal.judgment')}</h4>
              <p className="text-slate-700 italic">"{hexagram.judgment}"</p>
            </div>

            {/* Image */}
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">{t('modal.image')}</h4>
              <p className="text-slate-700 italic">"{hexagram.image}"</p>
            </div>

            {/* Line Analysis */}
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">{t('modal.lineAnalysis')}</h4>
              <div className="space-y-3">
                {hexagram.lines.map((isYang: boolean, index: number) => {
                  const lineNumber = 6 - index; // Convert array index to traditional line number
                  const analysis = getLineAnalysis(index);
                  return (
                    <div key={index} className={`border-l-4 pl-4 ${isYang ? 'border-gold' : 'border-blue-300'}`}>
                      <p className="font-medium text-sm">
                        {t('results.line')} {lineNumber} ({isYang ? t('modal.yang') : t('modal.yin')}): {analysis.animal} - {analysis.element}
                      </p>
                      <p className="text-xs text-slate-600">{analysis.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Five Elements & Animals for each line */}
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">{t('modal.elementalAssociations')}</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {hexagram.lines.map((line: boolean, index: number) => {
                  const lineNum = 6 - index; // Top to bottom (Line 6 at top, Line 1 at bottom)
                  const analysis = getLineAnalysis(index);
                  const colorClasses = [
                    'bg-red-50', 'bg-green-50', 'bg-blue-50', 
                    'bg-yellow-50', 'bg-orange-50', 'bg-purple-50'
                  ];
                  
                  return (
                    <div key={index} className={`${colorClasses[index]} p-3 rounded`}>
                      <span className="font-medium">{t('results.line')} {lineNum}:</span> {analysis.animal}, {analysis.element}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
