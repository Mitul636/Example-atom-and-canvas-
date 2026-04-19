import { create } from 'zustand';

export type ElementData = {
  name: string;
  appearance: string | null;
  atomic_mass: number;
  boil: number | null;
  category: string;
  density: number | null;
  discovered_by: string | null;
  melt: number | null;
  molar_heat: number | null;
  named_by: string | null;
  number: number;
  period: number;
  group: number;
  phase: string;
  source: string;
  summary: string;
  symbol: string;
  xpos: number;
  ypos: number;
  shells: number[];
  electron_configuration: string;
  electron_affinity: number | null;
  electronegativity_pauling: number | null;
  ionization_energies: number[];
  'cpk-hex': string | null;
  block: string;
};

interface ElementStore {
  selectedElement: ElementData | null;
  temperature: number; // in Kelvin
  language: string;
  searchQuery: string;
  activeFilters: string[]; // category, block, etc.
  setSelectedElement: (el: ElementData | null) => void;
  setTemperature: (temp: number) => void;
  setLanguage: (lang: string) => void;
  setSearchQuery: (query: string) => void;
  toggleFilter: (filter: string) => void;
  resetFilters: () => void;
}

export const useElementStore = create<ElementStore>((set) => ({
  selectedElement: null,
  temperature: 298.15, // Standard room temp ~25 C
  language: 'en',
  searchQuery: '',
  activeFilters: [],
  setSelectedElement: (el) => set({ selectedElement: el }),
  setTemperature: (temp) => set({ temperature: temp }),
  setLanguage: (lang) => set({ language: lang }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleFilter: (filter) =>
    set((state) => ({
      activeFilters: state.activeFilters.includes(filter)
        ? state.activeFilters.filter((f) => f !== filter)
        : [...state.activeFilters, filter],
    })),
  resetFilters: () => set({ activeFilters: [], searchQuery: '' }),
}));
