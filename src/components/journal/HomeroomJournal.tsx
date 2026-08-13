import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Plus, Search, Calendar } from 'lucide-react';

export const HomeroomJournal: React.FC = () => {
  const { journals, addJournal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJournals = journals.filter(j => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return j.title.toLowerCase().includes(query) || j.content.toLowerCase().includes(query);
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-teal-500" /> Nhật Ký Chủ Nhiệm Classs95
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Ghi chép các sự kiện, hoạt động tập thể
          </p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Tìm nhật ký theo từ khóa..."
          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm rounded-2xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-teal-500"
        />
      </div>

      <div className="space-y-6">
        {filteredJournals.map((j) => (
          <div key={j.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="font-bold text-lg text-slate-900 dark:text-white">{j.title}</h2>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {j.date}
              </span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{j.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
