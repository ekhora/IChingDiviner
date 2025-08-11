import { ALL_HEXAGRAMS, ZODIAC_ANIMALS, FIVE_ELEMENTS, SIX_RELATIVES } from "../data/hexagrams";

export interface HexagramResult {
  primaryHexagram: typeof ALL_HEXAGRAMS[0];
  changingLines: number[];
  resultingHexagram: typeof ALL_HEXAGRAMS[0];
  strongestLine: {
    line: number;
    animal: string;
    element: string;
  };
  sixRelatives: Record<string, string>;
  interpretation: string;
}

export class IChingService {
  // Generate random hexagram (0-63)
  generateRandomHexagram(): typeof ALL_HEXAGRAMS[0] {
    const randomIndex = Math.floor(Math.random() * 64);
    return ALL_HEXAGRAMS[randomIndex];
  }

  // Generate changing lines (1-6 possible)
  generateChangingLines(): number[] {
    const changingLines: number[] = [];
    const numChangingLines = Math.floor(Math.random() * 6) + 1; // 1-6 changing lines
    
    while (changingLines.length < numChangingLines) {
      const line = Math.floor(Math.random() * 6) + 1; // 1-6
      if (!changingLines.includes(line)) {
        changingLines.push(line);
      }
    }
    
    return changingLines.sort((a, b) => a - b);
  }

  // Calculate resulting hexagram from primary + changing lines
  calculateResultingHexagram(primary: typeof ALL_HEXAGRAMS[0], changingLines: number[]): typeof ALL_HEXAGRAMS[0] {
    const newLines = [...primary.lines];
    
    // Apply changing lines (convert traditional line numbering to array index)
    // Line 1 = bottom = index 5, Line 6 = top = index 0
    changingLines.forEach(lineNum => {
      const index = 6 - lineNum; // Convert traditional line number to array index
      newLines[index] = !newLines[index]; // flip the line
    });
    
    // Find hexagram that matches these lines
    return ALL_HEXAGRAMS.find(hex => 
      hex.lines.every((line, i) => line === newLines[i])
    ) || primary;
  }

  // Assign zodiac animals and elements to each line
  assignLineAttributes(hexagram: typeof ALL_HEXAGRAMS[0], consultationDate: string) {
    return hexagram.lines.map((_, index) => ({
      line: 6 - index, // Convert array index to traditional line number (top to bottom: 6,5,4,3,2,1)
      animal: ZODIAC_ANIMALS[index % 12],
      element: FIVE_ELEMENTS[index % 5]
    }));
  }

  // Calculate Six Relatives from main trigram
  calculateSixRelatives(hexagram: typeof ALL_HEXAGRAMS[0]): Record<string, string> {
    const relatives: Record<string, string> = {};
    
    SIX_RELATIVES.forEach((relative, index) => {
      relatives[relative] = hexagram.lines[index] ? "Strong" : "Weak";
    });
    
    return relatives;
  }

  // Determine strongest line based on Chinese date/time
  determineStrongestLine(hexagram: typeof ALL_HEXAGRAMS[0], date: string, time: string) {
    // Simple algorithm based on date/time - in real implementation this would use Chinese calendar
    const dateNum = new Date(date).getTime();
    const timeNum = parseInt(time.replace(":", ""));
    const combinedEnergy = (dateNum + timeNum) % 6;
    
    const lineAttributes = this.assignLineAttributes(hexagram, date);
    return lineAttributes[combinedEnergy];
  }

  // Generate interpretation
  generateInterpretation(result: HexagramResult): string {
    const { primaryHexagram, changingLines, resultingHexagram } = result;
    
    let interpretation = `The oracle reveals ${primaryHexagram.name} (${primaryHexagram.chineseName}) as your primary guidance. `;
    
    if (changingLines.length > 0) {
      interpretation += `With ${changingLines.length} changing line${changingLines.length > 1 ? 's' : ''} (${changingLines.join(', ')}), `;
      interpretation += `the situation transforms into ${resultingHexagram.name} (${resultingHexagram.chineseName}). `;
    }
    
    interpretation += primaryHexagram.judgment;
    
    return interpretation;
  }

  // Perform a complete I Ching reading
  performReading(consultationDate: string, consultationTime: string): HexagramResult {
    const primaryHexagram = this.generateRandomHexagram();
    const changingLines = this.generateChangingLines();
    const resultingHexagram = this.calculateResultingHexagram(primaryHexagram, changingLines);
    const strongestLine = this.determineStrongestLine(primaryHexagram, consultationDate, consultationTime);
    const sixRelatives = this.calculateSixRelatives(primaryHexagram);
    
    const result: HexagramResult = {
      primaryHexagram,
      changingLines,
      resultingHexagram,
      strongestLine,
      sixRelatives,
      interpretation: ""
    };
    
    result.interpretation = this.generateInterpretation(result);
    
    return result;
  }

  // Perform multiple readings
  performMultipleReadings(numberOfDraws: number, consultationDate: string, consultationTime: string): HexagramResult[] {
    const results: HexagramResult[] = [];
    
    for (let i = 0; i < numberOfDraws; i++) {
      results.push(this.performReading(consultationDate, consultationTime));
    }
    
    return results;
  }

  // Generate summary from multiple readings
  generateSummary(results: HexagramResult[]): string {
    if (results.length === 1) {
      return results[0].interpretation;
    }

    const hexagramNames = results.map(r => r.primaryHexagram.name);
    const uniqueHexagrams = Array.from(new Set(hexagramNames));
    
    let summary = `Your ${results.length} readings reveal `;
    
    if (uniqueHexagrams.length === 1) {
      summary += `a consistent theme around ${uniqueHexagrams[0]}, suggesting a strong and clear message from the oracle. `;
    } else {
      summary += `multiple perspectives through ${uniqueHexagrams.join(', ')}, indicating the complexity of your situation requires careful consideration from different angles. `;
    }
    
    // Analyze changing lines patterns
    const totalChangingLines = results.reduce((sum, r) => sum + r.changingLines.length, 0);
    const avgChangingLines = totalChangingLines / results.length;
    
    if (avgChangingLines > 3) {
      summary += "The high number of changing lines across your readings suggests a time of significant transformation and movement. ";
    } else if (avgChangingLines < 2) {
      summary += "The relatively few changing lines suggest stability and that the current situation will persist. ";
    }
    
    summary += "Consider these readings together for the fullest understanding of your question.";
    
    return summary;
  }
}

export const ichingService = new IChingService();
