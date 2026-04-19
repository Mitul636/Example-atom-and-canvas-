import { ElementData } from '@/store/useElementStore';

export function useTemperatureColor(element: ElementData, currentTempK: number): string | null {
  // Returns a background color based on state of matter at current temperature.
  // temp is in Kelvin.
  
  if (!element.melt && !element.boil) {
    // If no phase data, keep default
    return null;
  }

  // Plasma logic (very simplified, usually > 3000K or so depending on element, 
  // but let's just say > 5000K for most things gives plasma tint, except tungsten)
  if (currentTempK > 5000) {
    return 'rgba(168, 85, 247, 0.4)'; // purple tint
  }

  const melt = element.melt || 0; // if no melt but boil exists, guess?
  const boil = element.boil || Infinity;

  if (currentTempK < melt) {
    // Solid -> blue-gray tint
    return 'rgba(148, 163, 184, 0.4)'; // tailwind slate-400 with opacity
  } else if (currentTempK >= melt && currentTempK < boil) {
    // Liquid -> orange/amber tint
    return 'rgba(245, 158, 11, 0.4)'; // tailwind amber-500
  } else {
    // Gas -> red/transparent tint
    return 'rgba(239, 68, 68, 0.3)'; // tailwind red-500
  }
}

export function getCategoryColor(category: string): string {
  if (category.includes('alkali metal')) return 'bg-orange-400';
  if (category.includes('alkaline earth metal')) return 'bg-yellow-400';
  if (category.includes('transition metal')) return 'bg-rose-300';
  if (category.includes('post-transition metal')) return 'bg-teal-300';
  if (category.includes('metalloid')) return 'bg-emerald-300';
  if (category.includes('noble gas')) return 'bg-purple-300';
  if (category.includes('lanthanide')) return 'bg-pink-300';
  if (category.includes('actinide')) return 'bg-fuchsia-300';
  if (category.includes('nonmetal')) return 'bg-blue-300'; // diatomic & polyatomic
  return 'bg-gray-300';
}
