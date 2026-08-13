import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PhoneCall, Search, Plus, Clock } from 'lucide-react';

export const ParentDirectory: React.FC = () => {
  const { students, parentLogs, addParentLog } = useApp();
  const [searchParent, setSearchParent] = useState('');

  const filteredStudents = students.filter(s => {
    const query = searchParent.toLowerCase().trim();
    if (!query) return true;
    return (
      s.fullName.toLowerCase().includes(query) ||
      s.family.fatherName.toLowerCase().includes(query) ||
      s.family.motherName.toLowerCase().includes(query) ||
      s.family.fatherPhone.includes(query) ||
      s.family.motherPhone.includes(query)
    );
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <PhoneCall className="w-7 h-7 text-teal-500" /> Danh Bạ Phụ Huynh Classs95
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Tra cứu thông tin cha mẹ và người giám hộ
          </p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchParent}
          onChange={e => setSearchParent(e.target.value)}
          placeholder="Tìm theo Tên phụ huynh, SĐT, Tên học sinh..."
          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm rounded-2xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-teal-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map(student => (
          <div key={student.id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <img src={student.avatarUrl} alt={student.fullName} className="w-10 h-10 rounded-full object-cover border border-teal-500" />
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{student.fullName}</h3>
                <span className="text-xs text-slate-400">Mã HS: {student.studentId} • Tổ {student.team}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block">Bố: {student.family.fatherName}</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{student.family.fatherPhone}</span>
              </div>
              <a
                href={`tel:${student.family.fatherPhone}`}
                className="px-3 py-1.5 bg-teal-50 dark:bg-teal-950 text-teal-600 font-bold rounded-xl flex items-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Gọi Bố
              </a>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-slate-400 block">Mẹ: {student.family.motherName}</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{student.family.motherPhone}</span>
              </div>
              <a
                href={`tel:${student.family.motherPhone}`}
                className="px-3 py-1.5 bg-teal-50 dark:bg-teal-950 text-teal-600 font-bold rounded-xl flex items-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Gọi Mẹ
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
