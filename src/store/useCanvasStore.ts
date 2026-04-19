import { create } from 'zustand';

export type CanvasItem = {
  id: string;
  type: 'element' | 'compound';
  symbolOrFormula: string;
  name: string;
  x: number;
  y: number;
  components?: string[]; // for compounds
  color?: string; // mostly for compounds
};

interface CanvasStore {
  items: CanvasItem[];
  reactionLog: string[];
  addItem: (item: CanvasItem) => void;
  updateItemPos: (id: string, x: number, y: number) => void;
  removeItem: (id: string) => void;
  clearCanvas: () => void;
  addReactionLog: (log: string) => void;
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  items: [],
  reactionLog: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  updateItemPos: (id, x, y) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, x, y } : item
      ),
    })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  clearCanvas: () => set({ items: [] }),
  addReactionLog: (log) =>
    set((state) => ({ reactionLog: [...state.reactionLog, log] })),
}));
