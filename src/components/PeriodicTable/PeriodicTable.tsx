import React from 'react';
import elementsJson from '@/data/elements.json';
import { useElementStore, ElementData } from '@/store/useElementStore';
import { ElementCell } from './ElementCell';

const elements: ElementData[] = elementsJson as ElementData[];

export function PeriodicTable() {
  return (
    <div className="w-full max-w-[1400px] overflow-x-auto mx-auto pb-8">
      <div 
        className="grid gap-[2px] sm:gap-[4px] p-2 min-w-[800px]"
        style={{
          gridTemplateColumns: 'repeat(18, minmax(40px, 1fr))',
          gridTemplateRows: 'repeat(10, minmax(40px, 1fr))',
        }}
      >
        {elements.map((el) => (
          <ElementCell key={el.number} element={el} />
        ))}
      </div>
    </div>
  );
}
