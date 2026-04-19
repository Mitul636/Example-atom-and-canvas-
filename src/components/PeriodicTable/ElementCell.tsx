import React from 'react';
import { useDrag } from 'react-dnd';
import { ElementData, useElementStore } from '@/store/useElementStore';
import { getCategoryColor, useTemperatureColor } from '@/hooks/useTemperatureColor';
import clsx from 'clsx';

interface Props {
  element: ElementData;
}

export function ElementCell({ element }: Props) {
  const { 
    selectedElement, 
    setSelectedElement, 
    temperature, 
    searchQuery, 
    activeFilters 
  } = useElementStore();

  const tempColor = useTemperatureColor(element, temperature);
  const baseColor = getCategoryColor(element.category);

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'ELEMENT',
    item: { id: element.symbol, type: 'element', element },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [element]);

  // Determine if highlighted by search/filter
  const matchesSearch = searchQuery === '' || 
    element.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    element.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    element.number.toString() === searchQuery;

  const matchesFilter = activeFilters.length === 0 || 
    activeFilters.some(f => 
      element.category.toLowerCase().includes(f.toLowerCase()) ||
      element.block === f.toLowerCase()
    );

  const isDimmed = !matchesSearch || !matchesFilter;
  const isSelected = selectedElement?.number === element.number;

  return (
    <div
      ref={dragRef as any}
      onClick={() => setSelectedElement(element)}
      className={clsx(
        'relative flex flex-col items-center justify-center border border-gray-600/20 cursor-pointer select-none transition-all duration-200 p-1',
        baseColor,
        isDragging ? 'opacity-50' : 'opacity-100',
        isDimmed ? 'opacity-20 grayscale' : '',
        isSelected ? 'ring-2 ring-blue-600 ring-offset-2 z-10 scale-110 shadow-lg' : 'hover:scale-105 hover:shadow-md hover:z-10'
      )}
      style={{
        gridColumn: element.xpos,
        gridRow: element.ypos,
        backgroundColor: tempColor ? undefined : undefined, // We'll mix colors with an overlay
      }}
      title={`${element.name}\nConfigure: ${element.electron_configuration}\nEN: ${element.electronegativity_pauling}`}
    >
      {/* Temperature state overlay */}
      {tempColor && (
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{ backgroundColor: tempColor }}
        />
      )}
      <div className="text-[9px] font-mono self-start -mt-1 -ml-0.5">{element.number}</div>
      <div className="text-sm sm:text-lg font-bold leading-none">{element.symbol}</div>
      <div className="text-[7px] sm:text-[9px] truncate w-full text-center">{element.name}</div>
      <div className="text-[7px] text-gray-700 font-mono hidden sm:block">{element.atomic_mass.toFixed(2)}</div>
    </div>
  );
}
