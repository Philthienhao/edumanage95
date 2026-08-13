import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Database, Download, Upload, RefreshCw, Moon, Sun, Shield } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { 
    exportDataJSON, 
    importDataJSON, 
    resetToMockData, 
    darkMode, 
    toggleDarkMode, 
    teacherUser, 
    login
  } = useApp();

  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importDataJSON(content);
      if (success) {
        setImportStatus('✅ Đã khôi phục dữ liệu thành công!');
      } else {
        setImportStatus('❌ File JSON không hợp lệ!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-7 h-7 text-teal-500" /> Cài Đặt Classs95 & Dữ Liệu
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-teal-500" /> Sao Lưu & Khôi Phục Dữ Liệu
          </h3>

          <div className="space-y-3">
            <button
              onClick={exportDataJSON}
              className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-2xl transition flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25"
            >
              <Download className="w-4 h-4" /> Tải về Bản Sao Lưu (Classs95 JSON)
            </button>

            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
                id="json-restore-input-classs95"
              />
              <label
                htmlFor="json-restore-input-classs95"
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Upload className="w-4 h-4" /> Chọn File JSON để Khôi Phục
              </label>
            </div>

            {importStatus && (
              <div className="p-3 text-xs font-bold rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-center">
                {importStatus}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-teal-500" />} Chế Độ Giao Diện
          </h3>
          <button
            onClick={toggleDarkMode}
            className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs rounded-2xl border border-slate-200 dark:border-slate-700"
          >
            {darkMode ? "Chuyển sang Light Mode" : "Chuyển sang Dark Mode"}
          </button>
        </div>
      </div>
    </div>
  );
};
