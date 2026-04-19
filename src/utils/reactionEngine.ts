import compoundsData from '@/data/compounds.json';
import { CanvasItem } from '@/store/useCanvasStore';

export default function reactionEngine(item1: CanvasItem, item2: CanvasItem) {
  const c1 = item1.symbolOrFormula;
  const c2 = item2.symbolOrFormula;

  // Simple heuristic: just check if the components list matches the required components.
  // We'll treat item1 and item2 as either single elements or already compounds.
  // For this naive version, let's just see if a combination exists.
  
  // Example hardcoded reactions
  if ((c1 === 'Na' && c2 === 'Cl') || (c1 === 'Cl' && c2 === 'Na')) {
    return compoundsData.find(c => c.formula === 'NaCl');
  }
  if ((c1 === 'H' && c2 === 'O') || (c1 === 'O' && c2 === 'H')) {
    return { formula: 'OH', name: 'Hydroxide Radical', color: '#ffcc00' };
  }
  if ((c1 === 'OH' && c2 === 'H') || (c1 === 'H' && c2 === 'OH')) {
    return compoundsData.find(c => c.formula === 'H2O');
  }
  if ((c1 === 'C' && c2 === 'O') || (c1 === 'O' && c2 === 'C')) {
    return { formula: 'CO', name: 'Carbon Monoxide', color: '#6b7280' };
  }
  if ((c1 === 'CO' && c2 === 'O') || (c1 === 'O' && c2 === 'CO')) {
    return compoundsData.find(c => c.formula === 'CO2');
  }
  
  // Return null if no reaction
  return null;
}
