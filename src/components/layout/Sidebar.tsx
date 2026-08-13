import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';
import { 
  LayoutDashboard, 
  Target,
  Users, 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  PhoneCall, 
  BookOpen, 
  BarChart3, 
  Bot, 
  Settings, 
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, activeClassId, classes, teacherUser } = useApp();
  const activeClass = classes.find(c => c.id === activeClassId);

  const menuItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string; isAi?: boolean }[] = [
    { id: 'smart_pickup', label: '⚡ AI Smart Pickup', icon: <Sparkles className="w-5 h-5 text-amber-400" />, badge: 'AI LIVE', isAi: true },
    { id: 'slo_builder', label: '🎯 SLO Builder Kit', icon: <Target className="w-5 h-5 text-teal-400" />, badge: 'HOT', isAi: true },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'students', label: 'Danh sách học sinh', icon: <Users className="w-5 h-5" /> },
    { id: 'progress', label: 'Theo dõi tiến bộ', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'rewards', label: 'Khen thưởng', icon: <Award className="w-5 h-5" /> },
    { id: 'violations', label: 'Vi phạm', icon: <AlertTriangle className="w-5 h-5" /> },
    { id: 'parents', label: 'Phụ huynh', icon: <PhoneCall className="w-5 h-5" /> },
    { id: 'journal', label: 'Nhật ký chủ nhiệm', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'analytics', label: 'Thống kê & Báo cáo', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'ai_assistant', label: 'Trợ lý AI Chủ nhiệm', icon: <Bot className="w-5 h-5 text-teal-400" />, badge: 'PRO', isAi: true },
    { id: 'settings', label: 'Cài đặt & Dữ liệu', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 z-50 h-full w-72 bg-slate-900 text-slate-100 flex flex-col justify-between
        transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        border-r border-slate-800 shadow-xl
      `}>
        <div>
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/30 text-white font-extrabold text-xl">
                C
              </div>
              <div>
                <h1 className="font-bold text-lg text-white leading-tight flex items-center gap-1.5">
                  Classs95 <span className="text-teal-400 text-xs px-1.5 py-0.5 rounded bg-teal-500/20 font-semibold border border-teal-500/30">AI</span>
                </h1>
                <p className="text-xs text-slate-400">Giáo viên chủ nhiệm THCS</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mx-4 my-4 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">Lớp quản lý hiện tại</div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>{activeClass?.name || 'Lớp 8A1 (Classs95)'}</span>
                <span className="text-xs font-normal text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full">
                  {activeClass?.totalStudents || 35} HS
                </span>
              </div>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>

          <nav className="px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-260px)] custom-scrollbar">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose();
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group
                    ${isActive 
                      ? item.isAi 
                        ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-500/25 font-semibold' 
                        : 'bg-teal-500/15 text-teal-400 font-semibold border border-teal-500/30'
                      : item.isAi 
                        ? 'bg-slate-800/60 text-slate-200 hover:bg-slate-800 border border-teal-500/20 hover:border-teal-500/40' 
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-white'}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      <Sparkles className="w-2.5 h-2.5" />
                      {item.badge}
                    </span>
                  )}

                  {isActive && !item.badge && (
                    <ChevronRight className="w-4 h-4 text-teal-400" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-xs text-slate-400">
          <div className="flex items-center justify-between">
            <span>GVCN: <strong className="text-teal-400">{teacherUser.name}</strong></span>
            <span className="text-teal-400 font-semibold">v1.3.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};
