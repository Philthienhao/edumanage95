import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, Printer } from 'lucide-react';

export const AnalyticsReports: React.FC = () => {
  const { students, violations, rewards, teacherUser } = useApp();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-teal-500" /> Báo Cáo Classs95
          </h1>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 shadow-lg shadow-teal-500/25"
        >
          <Printer className="w-4 h-4" /> In Báo Cáo / Xuất PDF
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-4xl mx-auto space-y-6 text-slate-900 dark:text-white print:p-0 print:border-none print:shadow-none">
        <div className="text-center space-y-1 border-b pb-6 border-slate-200 dark:border-slate-800">
          <div className="text-xs uppercase font-extrabold tracking-widest text-slate-500">TRƯỜNG THCS CẦU GIẤY • NĂM HỌC 2025 - 2026</div>
          <h2 className="text-2xl font-black uppercase text-teal-700 dark:text-teal-400">
            BÁO CÁO TỔNG HỢP CLASSS95
          </h2>
          <p className="text-xs text-slate-500">Lớp: <strong>Lớp 8A1 (Classs95)</strong> • Thầy giáo chủ nhiệm: <strong>{teacherUser.name}</strong></p>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-sm uppercase text-slate-700 dark:text-slate-300 border-l-4 border-teal-500 pl-2">
            I. Thống kê Sĩ số
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-center">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border">
              <span className="text-slate-400 block">Tổng sĩ số</span>
              <strong className="text-lg">{students.length} HS</strong>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border">
              <span className="text-slate-400 block">Nam / Nữ</span>
              <strong className="text-lg">18 Nam / 17 Nữ</strong>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200">
              <span className="text-emerald-600 block">Lượt Tuyên dương</span>
              <strong className="text-lg text-emerald-600">{rewards.length} lượt</strong>
            </div>
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200">
              <span className="text-rose-600 block">Lượt Vi phạm</span>
              <strong className="text-lg text-rose-600">{violations.length} lần</strong>
            </div>
          </div>
        </div>

        <div className="pt-10 flex justify-between text-xs text-center font-semibold">
          <div>
            <span className="block text-slate-400">HIỆU TRƯỜNG / BGH</span>
            <span className="block mt-12 text-slate-400 italic">(Ký và ghi rõ họ tên)</span>
          </div>
          <div>
            <span className="block text-slate-400">Hà Nội, ngày 30 tháng 09 năm 2025</span>
            <span className="block font-bold text-slate-800 dark:text-slate-200 mt-1">THẦY GIÁO CHỦ NHIỆM</span>
            <span className="block mt-12 font-bold text-teal-600">{teacherUser.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
