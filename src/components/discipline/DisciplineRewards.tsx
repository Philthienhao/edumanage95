import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, AlertTriangle, Plus, RefreshCw, Trash2, CheckCircle2 } from 'lucide-react';

export const DisciplineRewards: React.FC = () => {
  const { 
    students, 
    violations, 
    addViolation, 
    deleteViolation, 
    rewards, 
    addReward, 
    deleteReward, 
    resetDisciplineRewards 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'rewards' | 'violations'>('rewards');
  
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showViolationModal, setShowViolationModal] = useState(false);

  const [rewardForm, setRewardForm] = useState({
    studentId: students[0]?.id || '',
    reason: '',
    bonusPoints: 10,
    praisedBy: 'Thầy Võ Thiện Hảo'
  });

  const [violationForm, setViolationForm] = useState({
    studentId: students[0]?.id || '',
    type: 'Mất trật tự' as const,
    severity: 'Nhẹ' as const,
    description: '',
    loggedBy: 'Thầy Võ Thiện Hảo'
  });

  const handleSaveReward = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find(s => s.id === rewardForm.studentId);
    if (!st) return;
    addReward({
      studentId: st.id,
      studentName: st.fullName,
      date: new Date().toLocaleDateString('vi-VN'),
      reason: rewardForm.reason || 'Khen thưởng rèn luyện',
      praisedBy: rewardForm.praisedBy,
      bonusPoints: Number(rewardForm.bonusPoints)
    });
    setShowRewardModal(false);
    setRewardForm({ studentId: students[0]?.id || '', reason: '', bonusPoints: 10, praisedBy: 'Thầy Võ Thiện Hảo' });
  };

  const handleSaveViolation = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find(s => s.id === violationForm.studentId);
    if (!st) return;
    addViolation({
      studentId: st.id,
      studentName: st.fullName,
      date: new Date().toLocaleDateString('vi-VN'),
      type: violationForm.type,
      severity: violationForm.severity,
      loggedBy: violationForm.loggedBy,
      description: violationForm.description || 'Nhắc nhở nề nếp',
      resolution: 'Nhắc nhở và theo dõi',
      parentNotified: false
    });
    setShowViolationModal(false);
    setViolationForm({ studentId: students[0]?.id || '', type: 'Mất trật tự', severity: 'Nhẹ', description: '', loggedBy: 'Thầy Võ Thiện Hảo' });
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Thi Đua: Khen Thưởng & Kỷ Luật
          </h1>
          <p className="text-xs text-slate-500 mt-1">Lớp 9/5_CS5 • Thầy giáo Võ Thiện Hảo</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRewardModal(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Thêm Khen Thưởng
          </button>
          <button
            onClick={() => setShowViolationModal(true)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Ghi Nhận Vi Phạm
          </button>
          <button
            onClick={() => {
              if (window.confirm('⚠️ Reset toàn bộ số liệu vi phạm & khen thưởng về 0?')) {
                resetDisciplineRewards();
              }
            }}
            className="px-3 py-2 bg-slate-800 text-slate-200 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Về 0
          </button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('rewards')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${activeTab === 'rewards' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
        >
          <Award className="w-4 h-4" /> Danh Sách Khen Thưởng ({rewards.length})
        </button>
        <button
          onClick={() => setActiveTab('violations')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${activeTab === 'violations' ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
        >
          <AlertTriangle className="w-4 h-4" /> Danh Sách Vi Phạm ({violations.length})
        </button>
      </div>

      {activeTab === 'rewards' && (
        <div className="space-y-3">
          {rewards.length === 0 ? (
            <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border text-center text-slate-400 font-medium text-xs">
              Số liệu khen thưởng hiện tại là 0. Hãy nhấp vào <strong>"Thêm Khen Thưởng"</strong> để tuyên dương học sinh!
            </div>
          ) : (
            rewards.map(r => (
              <div key={r.id} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-sm text-emerald-600 dark:text-emerald-400">{r.studentName} — {r.reason}</h3>
                  <span className="text-xs text-slate-400">Người tuyên dương: {r.praisedBy} • Ngày: {r.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs rounded-full">
                    +{r.bonusPoints} điểm
                  </span>
                  <button onClick={() => deleteReward(r.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'violations' && (
        <div className="space-y-3">
          {violations.length === 0 ? (
            <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border text-center text-slate-400 font-medium text-xs">
              🎉 Số liệu vi phạm hiện tại là 0. Tinh thần rèn luyện của Lớp 9/5_CS5 rất tuyệt vời!
            </div>
          ) : (
            violations.map(v => (
              <div key={v.id} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-sm text-rose-600 dark:text-rose-400">{v.studentName} — {v.type} ({v.severity})</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{v.description}</p>
                  <span className="text-[11px] text-slate-400">Người ghi nhận: {v.loggedBy} • Ngày: {v.date}</span>
                </div>
                <button onClick={() => deleteViolation(v.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Reward Modal */}
      {showRewardModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl max-w-md w-full space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="font-extrabold text-lg text-emerald-600 flex items-center gap-2">🏆 Thêm Tuyên Dương / Khen Thưởng Mới</h3>
            <form onSubmit={handleSaveReward} className="space-y-3 text-xs font-medium">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Chọn Học sinh</label>
                <select
                  value={rewardForm.studentId}
                  onChange={e => setRewardForm({...rewardForm, studentId: e.target.value})}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.stt}. {s.fullName} ({s.studentId})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Nội dung / Lý do khen thưởng</label>
                <textarea
                  required
                  rows={3}
                  value={rewardForm.reason}
                  onChange={e => setRewardForm({...rewardForm, reason: e.target.value})}
                  placeholder="Ví dụ: Đạt điểm 10 khảo sát môn Toán..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Điểm thưởng (+)</label>
                <input
                  type="number"
                  value={rewardForm.bonusPoints}
                  onChange={e => setRewardForm({...rewardForm, bonusPoints: Number(e.target.value)})}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowRewardModal(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl">Hủy</button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl shadow-lg">Lưu Khen Thưởng</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Violation Modal */}
      {showViolationModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl max-w-md w-full space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="font-extrabold text-lg text-rose-600 flex items-center gap-2">⚠️ Ghi Nhận Vi Phạm Mới</h3>
            <form onSubmit={handleSaveViolation} className="space-y-3 text-xs font-medium">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Chọn Học sinh vi phạm</label>
                <select
                  value={violationForm.studentId}
                  onChange={e => setViolationForm({...violationForm, studentId: e.target.value})}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.stt}. {s.fullName} ({s.studentId})</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Loại vi phạm</label>
                  <select
                    value={violationForm.type}
                    onChange={e => setViolationForm({...violationForm, type: e.target.value as any})}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                  >
                    <option value="Mất trật tự">Mất trật tự</option>
                    <option value="Đi học muộn">Đi học muộn</option>
                    <option value="Không thuộc bài">Không thuộc bài</option>
                    <option value="Sử dụng điện thoại">Sử dụng điện thoại</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Mức độ</label>
                  <select
                    value={violationForm.severity}
                    onChange={e => setViolationForm({...violationForm, severity: e.target.value as any})}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                  >
                    <option value="Nhẹ">Nhẹ</option>
                    <option value="Trung bình">Trung bình</option>
                    <option value="Nặng">Nặng</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Mô tả vi phạm</label>
                <textarea
                  required
                  rows={3}
                  value={violationForm.description}
                  onChange={e => setViolationForm({...violationForm, description: e.target.value})}
                  placeholder="Mô tả hoàn cảnh vi phạm..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowViolationModal(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl">Hủy</button>
                <button type="submit" className="px-5 py-2 bg-rose-600 text-white font-bold rounded-xl shadow-lg">Lưu Vi Phạm</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
