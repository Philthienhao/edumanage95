import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  UserCheck, 
  Award, 
  AlertTriangle, 
  Bot, 
  TrendingUp, 
  Search, 
  ChevronRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  PhoneCall,
  StickyNote
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { 
    students, 
    teacherProfile, 
    searchQuery, 
    setSearchQuery,
    setSelectedStudent,
    setActiveTab,
    rewards,
    violations
  } = useApp();

  const totalStudents = students.length;
  const maleStudents = students.filter(s => s.gender === 'Nam').length;
  const femaleStudents = students.filter(s => s.gender === 'Nữ').length;
  const commendedThisWeek = rewards.length;
  const violatedThisWeek = violations.length;

  const filteredStudents = students.filter(s => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return s.fullName.toLowerCase().includes(q) || 
           s.studentId.toLowerCase().includes(q) ||
           (s.privateNote && s.privateNote.toLowerCase().includes(q)) ||
           (s.family.motherPhone && s.family.motherPhone.includes(q));
  });

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 font-mono font-bold text-xs border border-teal-500/30">
                SKY-LINE CS5
              </span>
              <span className="text-slate-400 text-xs font-semibold">GVCN: {teacherProfile.name}</span>
            </div>
            
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Lớp 9/5_CS5 Sky-Line 🎓
              </h1>
              <p className="text-slate-300 text-sm mt-1 max-w-xl">
                Hệ thống đã tự động ghi nhận <strong className="text-teal-400 font-bold">{commendedThisWeek} lượt tuyên dương</strong> và <strong className="text-amber-400 font-bold">{violatedThisWeek} vi phạm</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('ai_assistant')}
              className="px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-teal-500/30 transition transform hover:-translate-y-0.5"
            >
              <Bot className="w-4 h-4" /> Hỏi Trợ lý AI
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm nhanh học sinh Lớp 9/5_CS5 (Tên, Mã HS, Đặc điểm riêng, SĐT Mẹ, Tổ...)"
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm font-medium rounded-xl border border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition shadow-inner"
          />
        </div>
        <button 
          onClick={() => setActiveTab('students')}
          className="w-full sm:w-auto px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
        >
          <span>Xem tất cả {totalStudents} HS</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Quick Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => setActiveTab('students')}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition hover:border-teal-500 group"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Tổng Học Sinh</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{totalStudents} em</div>
            <div className="text-xs text-teal-600 dark:text-teal-400 font-bold mt-1 flex items-center gap-1">
              👉 Bấm xem danh sách ➜
            </div>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('students')}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition hover:border-blue-500 group"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Nam / Nữ</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{maleStudents} / {femaleStudents}</div>
            <div className="text-xs text-blue-500 font-bold mt-1">👉 Bấm xem chi tiết ➜</div>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('rewards')}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition hover:border-emerald-500 group"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Khen thưởng</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{commendedThisWeek} lượt</div>
            <div className="text-xs text-emerald-600 font-bold mt-1">👉 Bấm xem khen thưởng ➜</div>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('violations')}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition hover:border-rose-500 group"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Ghi nhận vi phạm</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-rose-600 dark:text-rose-400">{violatedThisWeek} lượt</div>
            <div className="text-xs text-rose-500 font-bold mt-1">👉 Bấm xem vi phạm ➜</div>
          </div>
        </div>
      </div>

      {/* Student List Preview */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-extrabold text-base text-slate-900 dark:text-white">
            Danh Sách 18 Học Sinh Lớp 9/5_CS5 & Đặc Điểm Riêng
          </h2>
          <button onClick={() => setActiveTab('students')} className="text-xs font-bold text-teal-600 hover:underline">
            Xem tất cả ➜
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredStudents.map(s => (
            <div 
              key={s.id}
              onClick={() => setSelectedStudent(s)}
              className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 cursor-pointer hover:shadow-md transition space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={s.avatarUrl} alt={s.fullName} className="w-12 h-12 rounded-2xl object-cover border-2 border-teal-500" />
                  <div>
                    <div className="font-extrabold text-sm text-slate-900 dark:text-white">{s.fullName}</div>
                    <div className="text-xs text-slate-400">STT #{s.stt} • Tổ {s.team} • {s.gender}</div>
                  </div>
                </div>
              </div>

              {s.privateNote && (
                <div className="p-2.5 bg-amber-500/10 dark:bg-amber-500/20 rounded-xl border border-amber-500/30 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-1.5">
                  <StickyNote className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{s.privateNote}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
