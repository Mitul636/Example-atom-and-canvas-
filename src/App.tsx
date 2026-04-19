import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { PeriodicTable } from '@/components/PeriodicTable/PeriodicTable';
import { TemperatureSlider } from '@/components/TemperatureSlider/TemperatureSlider';
import { SearchFilter } from '@/components/SearchFilter/SearchFilter';
import { MixingCanvas } from '@/components/Canvas/MixingCanvas';
import { TabsPanel } from '@/components/Tabs/TabsPanel';
import { exportToPDF } from '@/utils/pdfExport';
import { Download, Atom, Beaker, Globe } from 'lucide-react';
import { useCanvasStore } from '@/store/useCanvasStore';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    document.documentElement.dir = e.target.value === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 py-3 px-6 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-inner">
          <Atom size={24} />
        </div>
        <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight">
          {t('app_title')}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <Globe size={16} />
          <select 
            value={i18n.language} 
            onChange={handleLanguageChange}
            className="bg-transparent border-none outline-none cursor-pointer"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="zh">中文</option>
            <option value="bn">বাংলা</option>
            <option value="ar">العربية</option>
            <option value="hi">हिन्दी</option>
            <option value="ja">日本語</option>
            <option value="pt">Português</option>
            <option value="ru">Русский</option>
          </select>
        </div>
        <button 
          onClick={() => exportToPDF('periodic-table-grid', 'periodic-table.pdf')}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-sm font-medium rounded-md transition-colors"
        >
          <Download size={16} /> {t('export_pdf')}
        </button>
      </div>
    </header>
  );
}

export default function App() {
  const { reactionLog, clearCanvas } = useCanvasStore();
  const { t } = useTranslation();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-200 flex flex-col">
        <Header />
        
        <main className="flex-1 p-4 md:p-6 lg:flex lg:gap-8 max-w-[1800px] mx-auto w-full">
          
          {/* Left Column: Periodic Table & Controls */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="grid md:grid-cols-2 gap-4">
              <SearchFilter />
              <TemperatureSlider />
            </div>

            <div 
              id="periodic-table-grid" 
              className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-x-auto"
            >
              <PeriodicTable />
            </div>

            {/* Mixing Canvas placed underneath the table */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2"><Beaker className="text-purple-500"/> {t('mixing_canvas', 'Mixing Canvas')}</h2>
                <button onClick={clearCanvas} className="text-sm text-red-500 hover:underline">{t('clear_canvas', 'Clear Canvas')}</button>
              </div>
              <MixingCanvas />
            </div>
          </div>

          {/* Right Column: Selected Element Details & Logs */}
          <div className="lg:w-[400px] xl:w-[500px] flex flex-col gap-6 shrink-0 mt-6 lg:mt-0">
            <TabsPanel />

            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex flex-col h-64">
              <h3 className="font-bold border-b pb-2 mb-2 dark:border-gray-700">{t('reaction_log', 'Reaction Log')}</h3>
              <div className="flex-1 overflow-y-auto font-mono text-sm">
                {reactionLog.length === 0 ? (
                  <div className="text-gray-400 italic">{t('no_reactions', 'No reactions yet.')}</div>
                ) : (
                  reactionLog.map((log, i) => (
                    <div key={i} className="py-1 text-green-600 dark:text-green-400">{'>'} {log}</div>
                  ))
                )}
              </div>
            </div>
          </div>

        </main>
      </div>
    </DndProvider>
  );
}
