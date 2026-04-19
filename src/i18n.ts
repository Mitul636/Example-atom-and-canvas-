import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// In a real app we'd load these from JSON files
const resources = {
  en: {
    translation: {
      "app_title": "ChemCraft",
      "export_pdf": "Export PDF",
      "temperature": "Temperature",
      "mixing_canvas": "Mixing Canvas",
      "clear_canvas": "Clear Canvas",
      "reaction_log": "Reaction Log",
      "properties": "Properties",
      "atom_3d": "3D Atom",
      "no_reactions": "No reactions yet. Drag elements onto the canvas to begin.",
      "search_placeholder": "Search element by name, symbol...",
      "reset": "Reset",
      "atomic_mass": "Atomic Mass",
      "category": "Category",
      "electron_config": "Electron Configuration",
      "melting_point": "Melting Point",
      "boiling_point": "Boiling Point",
      "discovered_by": "Discovered By",
      "select_element": "Select an element to view properties.",
      "unknown": "Unknown"
    }
  },
  es: {
    translation: {
      "app_title": "ChemCraft",
      "export_pdf": "Exportar PDF",
      "temperature": "Temperatura",
      "mixing_canvas": "Lienzo de Mezcla",
      "clear_canvas": "Limpiar Lienzo",
      "reaction_log": "Registro de Reacciones",
      "properties": "Propiedades",
      "atom_3d": "Átomo 3D",
      "no_reactions": "Aún no hay reacciones. Arrastre elementos al lienzo para comenzar.",
      "search_placeholder": "Buscar elemento por nombre, símbolo...",
      "reset": "Reiniciar",
      "atomic_mass": "Masa Atómica",
      "category": "Categoría",
      "electron_config": "Configuración Electrónica",
      "melting_point": "Punto de Fusión",
      "boiling_point": "Punto de Ebullición",
      "discovered_by": "Descubierto Por",
      "select_element": "Seleccione un elemento para ver sus propiedades.",
      "unknown": "Desconocido"
    }
  },
  bn: {
    translation: {
      "app_title": "কেমক্রাফট",
      "export_pdf": "PDF এক্সপোর্ট করুন",
      "temperature": "তাপমাত্রা",
      "mixing_canvas": "মিশ্রণ ক্যানভাস",
      "clear_canvas": "ক্যানভাস মুছুন",
      "reaction_log": "প্রতিক্রিয়া লগ",
      "properties": "বৈশিষ্ট্য",
      "atom_3d": "3D পরমাণু",
      "no_reactions": "এখনও কোন প্রতিক্রিয়া হয়নি। ক্যানভাসে উপাদান টেনে আনুন।",
      "search_placeholder": "নাম, প্রতীক দ্বারা খুঁজুন...",
      "reset": "রিসেট",
      "select_element": "বৈশিষ্ট্য দেখতে একটি উপাদান নির্বাচন করুন।"
    }
  },
  fr: { translation: { "export_pdf": "Exporter en PDF" } },
  de: { translation: { "export_pdf": "Als PDF exportieren" } },
  zh: { translation: { "export_pdf": "导出PDF" } },
  ar: { translation: { "export_pdf": "تصدير PDF" } },
  hi: { translation: { "export_pdf": "PDF निर्यात करें" } },
  ja: { translation: { "export_pdf": "PDF出力" } },
  pt: { translation: { "export_pdf": "Exportar PDF" } },
  ru: { translation: { "export_pdf": "Экспорт в PDF" } },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
