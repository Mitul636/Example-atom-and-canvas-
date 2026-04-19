import React from 'react';
import { useElementStore } from '@/store/useElementStore';

export function TemperatureSlider() {
  const { temperature, setTemperature } = useElementStore();

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemperature(Number(e.target.value));
  };

  // Convert K to C
  const tempC = temperature - 273.15;

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-semibold mb-2">Temperature: {tempC.toFixed(0)} °C ({temperature} K)</h3>
      <input 
        type="range" 
        min="0" 
        max="6000" 
        value={temperature} 
        onChange={handleSlider}
        className="w-full max-w-md h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between w-full max-w-md text-xs text-gray-500 mt-1">
        <span>0 K</span>
        <span>Room (~298 K)</span>
        <span>6000 K</span>
      </div>
    </div>
  );
}
