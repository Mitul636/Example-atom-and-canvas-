import React, { useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Stage, Layer, Circle, Text, Group, Rect } from 'react-konva';
import { useCanvasStore } from '@/store/useCanvasStore';
import { getCategoryColor } from '@/hooks/useTemperatureColor';
import reactionEngine from '@/utils/reactionEngine';

export function MixingCanvas() {
  const { items, addItem, updateItemPos, removeItem, addReactionLog } = useCanvasStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  React.useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: 600,
      });
    }
  }, []);

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ['ELEMENT', 'COMPOUND'],
    drop: (item: any, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const x = clientOffset.x - containerRect.left;
      const y = clientOffset.y - containerRect.top;

      if (item.type === 'element') {
        addItem({
          id: Math.random().toString(36).substr(2, 9),
          type: 'element',
          symbolOrFormula: item.element.symbol,
          name: item.element.name,
          x,
          y,
          color: item.element.category.includes('metal') ? '#fca5a5' : '#93c5fd'
        });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleDragEnd = (e: any, id: string) => {
    const newX = e.target.x();
    const newY = e.target.y();
    updateItemPos(id, newX, newY);

    // Check for reactions
    const reactableItems = items.filter(i => {
      if (i.id === id) return false;
      const dist = Math.hypot(i.x - newX, i.y - newY);
      return dist < 60; // reaction radius
    });

    if (reactableItems.length > 0) {
      // Basic combination of 2 items
      const item2 = reactableItems[0];
      const result = reactionEngine(
        items.find(i => i.id === id) || { symbolOrFormula: '' } as any, 
        item2
      );
      
      if (result) {
        removeItem(id);
        removeItem(item2.id);
        addItem({
          id: Math.random().toString(36).substr(2, 9),
          type: 'compound',
          symbolOrFormula: result.formula,
          name: result.name,
          x: (newX + item2.x) / 2,
          y: (newY + item2.y) / 2,
          color: result.color || '#a855f7'
        });
        addReactionLog(`${result.name} (${result.formula}) formed!`);
      }
    }
  };

  return (
    <div 
      ref={(node) => {
        containerRef.current = node;
        dropRef(node);
      }}
      className={`w-full min-h-[600px] border-2 rounded-lg relative overflow-hidden bg-[#f8fafc] dark:bg-gray-900 ${isOver ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20' : 'border-dashed border-gray-300 dark:border-gray-700'}`}
    >
      <div className="absolute top-2 left-2 text-sm text-gray-400 font-medium z-10 pointer-events-none">
        Mixing Canvas - Drag elements here to combine
      </div>
      <Stage width={dimensions.width} height={dimensions.height}>
        <Layer>
          {items.map((item) => (
            <Group
              key={item.id}
              x={item.x}
              y={item.y}
              draggable
              onDragEnd={(e) => handleDragEnd(e, item.id)}
            >
              <Circle
                radius={25}
                fill={item.color || '#e2e8f0'}
                stroke="#64748b"
                strokeWidth={2}
                shadowBlur={5}
                shadowColor="rgba(0,0,0,0.2)"
              />
              <Text
                text={item.symbolOrFormula}
                fontSize={16}
                fontStyle="bold"
                align="center"
                verticalAlign="middle"
                offsetX={25}
                offsetY={8}
                width={50}
                fill="#1e293b"
              />
            </Group>
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
