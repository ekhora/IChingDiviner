export interface HexagramResult {
  primaryHexagram: {
    number: number;
    name: string;
    chineseName: string;
    lines: boolean[];
    meaning: string;
    description: string;
    judgment: string;
    image: string;
  };
  changingLines: number[];
  resultingHexagram: {
    number: number;
    name: string;
    chineseName: string;
    lines: boolean[];
    meaning: string;
    description: string;
    judgment: string;
    image: string;
  };
  strongestLine: {
    line: number;
    animal: string;
    element: string;
  };
  sixRelatives: Record<string, string>;
  interpretation: string;
}

export interface ConsultationResult {
  id: string;
  results: HexagramResult[];
  summary: string;
  question: string;
  consultationDate: string;
  consultationTime: string;
  numberOfDraws: number;
}

export interface IChingConsultation {
  question: string;
  consultationDate: string;
  consultationTime: string;
  numberOfDraws: number;
}
