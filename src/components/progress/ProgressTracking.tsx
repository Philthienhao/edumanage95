import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, Calendar } from 'lucide-react';

export const ProgressTracking: React.FC = () => {
  const { progressTimeline, students, setSelectedStudentId, setActiveTab } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredTimeline = progressTimeline.filter(item => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-teal-500" /> Theo Dõi Tiến Bộ - Classs95
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Dòng thời gian tổng hợp mốc phát triển và thành tích lớp
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-2 rounded-xl transition ${filterCategory === 'all' ? 'bg-teal-500 text-white font-bold' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilterCategory('reward')}
            className={`px-3 py-2 rounded-xl transition ${filterCategory === 'reward' ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
          >
            🏆 Khen thưởng
          </button>
          <button
            onClick={() => setFilterCategory('violation')}
            className={`px-3 py-2 rounded-xl transition ${filterCategory === 'violation' ? 'bg-rose-500 text-white font-bold' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
          >
            ⚠️ Vi phạm
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative border-l-2 border-teal-500/30 pl-6 sm:pl-8 ml-3 space-y-8">
          {filteredTimeline.map((item) => {
            const student = students.find(s => s.id === item.studentId);
            return (
              <div key={item.id} className="relative group">
                <div className={`
                  absolute -left-[33px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center text-white ring-4 ring-white dark:ring-slate-900 shadow-md text-xs font-bold
                  ${item.category === 'reward' ? 'bg-emerald-500' : item.category === 'violation' ? 'bg-rose-500' : 'bg-teal-500'}
                `}>
                  {item.category === 'reward' ? '🏆' : item.category === 'violation' ? '⚠️' : '⭐'}
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3 mb-3">
                    {student && (
                      <div 
                        onClick={() => {
                          setSelectedStudentId(student.id);
                          setActiveTab('students');
                        }}
                        className="flex items-center gap-3 cursor-pointer group/st"
                      >
                        <img src={student.avatarUrl} alt={student.fullName} className="w-10 h-10 rounded-full object-cover border border-teal-500" />
                        <div>
                          <span className="font-bold text-sm text-slate-900 dark:text-white group-hover/st:text-teal-600 transition">
                            {student.fullName}
                          </span>
                          <span className="text-xs text-slate-400 block">Mã HS: {student.studentId} • Tổ {student.team}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {item.date}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
