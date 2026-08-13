import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Sun, Moon, RefreshCw, Menu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { 
    searchQuery, 
    setSearchQuery, 
    darkMode, 
    toggleDarkMode, 
    teacherUser,
    resetDisciplineRewards
  } = useApp();

  const handleReset = () => {
    if (window.confirm('⚠️ Bạn có chắc chắn muốn RESET số liệu Vi phạm và Khen thưởng về 0 để bắt đầu đợt thi đua mới?')) {
      resetDisciplineRewards();
      alert('✅ Đã reset số liệu thi đua về 0 thành công!');
    }
  };

  return (
    <header className="h-16 sm:h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-sm transition-colors duration-200">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3">
          <img src={teacherUser.schoolLogo} alt="Sky-Line Logo" className="h-7 sm:h-9 object-contain bg-white/90 p-1 rounded-lg" />
          <div className="hidden sm:block h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
          <div className="relative hidden md:block w-72 lg:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tra cứu học sinh Lớp 9/5_CS5..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-xs font-medium rounded-xl border border-transparent focus:border-teal-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={handleReset}
          className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 rounded-xl text-xs font-bold transition hover:bg-rose-100 flex items-center gap-1.5"
          title="Reset tất cả vi phạm & khen thưởng về 0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Thi Đua Về 0</span>
        </button>

        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>

        <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
          <img
            src={teacherUser.avatar}
            alt={teacherUser.name}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-teal-500 object-cover shadow-sm"
          />
          <div className="hidden sm:block text-left">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              {teacherUser.name}
            </h3>
            <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold block">
              {teacherUser.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
