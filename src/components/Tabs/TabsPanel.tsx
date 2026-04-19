import React, { useState } from 'react';
import { useElementStore } from '@/store/useElementStore';
import { AtomViewer } from '@/components/AtomViewer/AtomViewer';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import elementsData from '@/data/elements.json';

export function TabsPanel() {
  const { selectedElement } = useElementStore();
  const [activeTab, setActiveTab] = useState<'properties' | 'atom'>('properties');

  const renderProperties = () => {
    if (!selectedElement) return <p className="text-gray-500">Select an element to view properties.</p>;
    
    return (
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
        <h2 className="text-2xl font-bold">{selectedElement.name} ({selectedElement.symbol})</h2>
        <p className="text-gray-700 dark:text-gray-300 text-sm">{selectedElement.summary}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
            <div className="text-xs text-gray-500">Atomic Mass</div>
            <div className="font-mono">{selectedElement.atomic_mass.toFixed(4)} u</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
            <div className="text-xs text-gray-500">Category</div>
            <div className="capitalize">{selectedElement.category}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
            <div className="text-xs text-gray-500">Electron Configuration</div>
            <div className="font-mono text-sm">{selectedElement.electron_configuration}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
            <div className="text-xs text-gray-500">Melting Point</div>
            <div>{selectedElement.melt ? `${selectedElement.melt} K` : 'Unknown'}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
            <div className="text-xs text-gray-500">Boiling Point</div>
            <div>{selectedElement.boil ? `${selectedElement.boil} K` : 'Unknown'}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
            <div className="text-xs text-gray-500">Discovered By</div>
            <div className="truncate" title={selectedElement.discovered_by || 'Unknown'}>{selectedElement.discovered_by || 'Unknown'}</div>
          </div>
        </div>

        {selectedElement.ionization_energies && selectedElement.ionization_energies.length > 0 && (
          <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded shadow-sm">
            <h3 className="text-sm font-semibold mb-2">Ionization Energies (kJ/mol)</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedElement.ionization_energies.map((e, i) => ({ n: `IE ${i+1}`, value: e }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="n" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col">
      <div className="flex border-b border-gray-300 dark:border-gray-600 mb-4 pb-2 gap-4">
        <button 
          onClick={() => setActiveTab('properties')}
          className={`font-semibold pb-1 border-b-2 transition-colors ${activeTab === 'properties' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
        >
          Properties
        </button>
        <button 
          onClick={() => setActiveTab('atom')}
          className={`font-semibold pb-1 border-b-2 transition-colors ${activeTab === 'atom' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
        >
          3D Atom
        </button>
      </div>
      
      <div className="flex-1">
        {activeTab === 'properties' && renderProperties()}
        {activeTab === 'atom' && <AtomViewer />}
      </div>
    </div>
  );
}
