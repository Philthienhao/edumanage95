import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SloItem } from '../../types';
import { Target, Plus, TrendingUp, AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

export const SloBuilderKit: React.FC = () => {
  const { students, teacherUser } = useApp();

  const [sloList, setSloList] = useState<SloItem[]>([
    {
      id: 'slo01',
      studentId: 'hs01',
      studentName: 'Nguyễn Văn An',
      subject: 'Toán học & Tin học',
      title: 'Đạt giải Học sinh giỏi Toán cấp Trường & GPA 9.0',
      baselineScore: 7.5,
      currentScore: 8.8,
      targetScore: 9.0,
      deadline: 'Cuối Học kỳ I',
      status: 'Đang đạt tiến độ (85%)',
      actionPlan: 'Bồi dưỡng chuyên đề Hình học nâng cao và giải thuật Tin học 2 buổi/tuần.',
      atRisk: false
    },
    {
      id: 'slo02',
      studentId: 'hs02',
      studentName: 'Trần Thị Ngọc Bích',
      subject: 'Tiếng Anh & Văn học',
      title: 'Thi nòng cốt HSG Tiếng Anh & Đạt IELTS 6.5 Junior',
      baselineScore: 8.0,
      currentScore: 9.3,
      targetScore: 9.5,
      deadline: 'Học kỳ II',
      status: 'Vượt mục tiêu (100%)',
      actionPlan: 'Phát huy làm Trưởng nhóm câu lạc bộ Tiếng Anh khối 8.',
      atRisk: false
    },
    {
      id: 'slo03',
      studentId: 'hs03',
      studentName: 'Lê Minh Cường',
      subject: 'Toán học & Kỷ luật Nề nếp',
      title: 'Vươn lên danh hiệu Học sinh Khá & Không đi muộn',
      baselineScore: 5.0,
      currentScore: 6.2,
      targetScore: 7.0,
      deadline: 'Cuối Học kỳ I',
      status: 'Cần hỗ trợ gấp (45%)',
      actionPlan: 'Phân công bạn Nguyễn Văn An ngồi cùng bàn kèm bài tập về nhà mỗi ngày.',
      atRisk: true,
      riskReason: 'Vẫn còn 3 lần đi muộn trong tháng 9'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    studentId: students[0]?.id || '',
    subject: 'Toán học',
    title: '',
    baselineScore: 6.0,
    targetScore: 8.5,
    deadline: 'Cuối Học kỳ I',
    actionPlan: ''
  });

  const handleAddSlo = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find(s => s.id === formData.studentId);
    const newSlo: SloItem = {
      id: 'slo_' + Date.now(),
      studentId: formData.studentId,
      studentName: student ? student.fullName : 'Học sinh',
      subject: formData.subject,
      title: formData.title || 'Mục tiêu học tập mới',
      baselineScore: Number(formData.baselineScore),
      currentScore: Number(formData.baselineScore),
      targetScore: Number(formData.targetScore),
      deadline: formData.deadline,
      status: 'Mới khởi tạo (0%)',
      actionPlan: formData.actionPlan || 'Phối hợp với phụ huynh.',
      atRisk: false
    };
    setSloList([newSlo, ...sloList]);
    setShowModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-teal-500/30">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/40 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Student Learning Objectives (SLO) Builder Kit
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Bộ Công Cụ Quản Lý & Đánh Giá Mục Tiêu Học Tập (SLO)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Thiết lập chỉ số xuất phát (Baseline), mức mục tiêu (Target) và theo dõi tiến độ cho từng học sinh Lớp 8A1 của {teacherUser.name}.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-2xl shadow-lg transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Thiết Lập Mục Tiêu SLO Mới
        </button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase">Mục tiêu SLO đang chạy</span>
          <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400 mt-2">{sloList.length} SLO</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase">Tỷ lệ đạt tiến độ</span>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">80%</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase">Nguy cơ không đạt</span>
          <div className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 mt-2">1 học sinh</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase">Mức tăng trưởng ĐTB</span>
          <div className="text-3xl font-extrabold text-amber-500 mt-2">+1.4 điểm</div>
        </div>
      </div>

      {/* SLO Matrix List */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-teal-500" /> Danh Sách Mục Tiêu Học Tập Học Sinh (SLO Dataset)
        </h3>

        <div className="space-y-4">
          {sloList.map(slo => {
            const progressPct = Math.min(100, Math.round(((slo.currentScore - slo.baselineScore) / (slo.targetScore - slo.baselineScore || 1)) * 100));
            return (
              <div key={slo.id} className={`p-5 rounded-2xl border transition ${slo.atRisk ? 'bg-rose-50/50 dark:bg-slate-800/80 border-rose-200' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">{slo.studentName}</span>
                      <span className="px-2.5 py-0.5 bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold text-xs rounded-md">
                        {slo.subject}
                      </span>
                      {slo.atRisk && (
                        <span className="px-2.5 py-0.5 bg-rose-500 text-white font-bold text-xs rounded-md flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3" /> NGUY CƠ
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-xs text-teal-600 dark:text-teal-400 mt-1">{slo.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1"><strong>Biện pháp:</strong> {slo.actionPlan}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200">
                      Xuất phát: <span className="text-slate-400">{slo.baselineScore}</span> ➔ Hiện tại: <span className="text-teal-600 font-extrabold">{slo.currentScore}</span> ➔ Mục tiêu: <span className="text-emerald-600 font-extrabold">{slo.targetScore}</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 block mt-1">Hạn chót: {slo.deadline}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    <span>Tiến độ hoàn thành SLO:</span>
                    <span className={slo.atRisk ? 'text-rose-600 font-extrabold' : 'text-teal-600 font-extrabold'}>{slo.status}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${slo.atRisk ? 'bg-rose-500' : 'bg-gradient-to-r from-teal-500 to-emerald-500'}`} style={{ width: `${Math.max(15, progressPct)}%` }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl max-w-lg w-full space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="font-extrabold text-lg text-teal-600">🎯 Thiết Lập Mục Tiêu SLO Mới</h3>
            <form onSubmit={handleAddSlo} className="space-y-3 text-xs font-medium">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Chọn Học sinh</label>
                <select
                  value={formData.studentId}
                  onChange={e => setFormData({...formData, studentId: e.target.value})}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.fullName} ({s.studentId})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Môn học / Kỹ năng</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Tiêu đề mục tiêu (SLO Title)</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="Ví dụ: Đạt GPA môn Toán từ 6.0 lên 8.5"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Điểm xuất phát (Baseline)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.baselineScore}
                    onChange={e => setFormData({...formData, baselineScore: Number(e.target.value)})}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Điểm mục tiêu (Target)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.targetScore}
                    onChange={e => setFormData({...formData, targetScore: Number(e.target.value)})}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl">Hủy</button>
                <button type="submit" className="px-5 py-2 bg-teal-600 text-white font-bold rounded-xl shadow-lg">Lưu Mục Tiêu SLO</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
