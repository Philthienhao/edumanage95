import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Student, Severity } from '../../types';
import { 
  X, 
  PhoneCall, 
  MapPin, 
  Award, 
  AlertTriangle, 
  Activity, 
  Lock, 
  Bot, 
  Clock, 
  Plus, 
  BookOpen, 
  Sparkles,
  FileText,
  Mail,
  Edit,
  Save,
  StickyNote
} from 'lucide-react';

interface StudentDetailProps {
  student: Student;
  onClose: () => void;
}

export const StudentDetail: React.FC<StudentDetailProps> = ({ student, onClose }) => {
  const { 
    violations, 
    addViolation, 
    rewards, 
    addReward, 
    progressTimeline, 
    teacherUser,
    updateStudent 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'private_notes' | 'violations' | 'rewards' | 'timeline'>('private_notes');

  const studentViolations = violations.filter(v => v.studentId === student.id);
  const studentRewards = rewards.filter(r => r.studentId === student.id);
  const studentTimeline = progressTimeline.filter(t => t.studentId === student.id);

  const [showAddViolationModal, setShowAddViolationModal] = useState(false);
  const [showAddRewardModal, setShowAddRewardModal] = useState(false);

  const [privateNoteText, setPrivateNoteText] = useState(student.privateNote || '');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const [violationForm, setViolationForm] = useState({
    type: 'Mất trật tự' as any,
    severity: 'Nhẹ' as Severity,
    loggedBy: teacherUser.name,
    description: '',
    proofUrl: '',
    resolution: 'Nhắc nhở và ghi sổ theo dõi.',
    parentNotified: true,
  });

  const [rewardForm, setRewardForm] = useState({
    reason: '',
    praisedBy: teacherUser.name,
    proofUrl: '',
    bonusPoints: 10,
  });

  const handleSavePrivateNote = () => {
    updateStudent({
      ...student,
      privateNote: privateNoteText,
    });
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  const handleSaveViolation = (e: React.FormEvent) => {
    e.preventDefault();
    addViolation({
      studentId: student.id,
      studentName: student.fullName,
      date: new Date().toLocaleDateString('vi-VN'),
      ...violationForm,
    });
    setShowAddViolationModal(false);
    setViolationForm({
      type: 'Mất trật tự',
      severity: 'Nhẹ',
      loggedBy: teacherUser.name,
      description: '',
      proofUrl: '',
      resolution: 'Nhắc nhở và ghi sổ theo dõi.',
      parentNotified: true,
    });
  };

  const handleSaveReward = (e: React.FormEvent) => {
    e.preventDefault();
    addReward({
      studentId: student.id,
      studentName: student.fullName,
      date: new Date().toLocaleDateString('vi-VN'),
      ...rewardForm,
    });
    setShowAddRewardModal(false);
    setRewardForm({
      reason: '',
      praisedBy: teacherUser.name,
      proofUrl: '',
      bonusPoints: 10,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-6xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 my-auto overflow-hidden max-h-[92vh] flex flex-col">
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold font-mono">
              STT #{student.stt} • {student.studentId}
            </span>
            <h2 className="text-xl font-extrabold">{student.fullName}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Sidebar */}
          <div className="lg:col-span-4 p-5 bg-slate-50 dark:bg-slate-950/60 border-r border-slate-200 dark:border-slate-800 space-y-5">
            <div className="text-center">
              <img
                src={student.avatarUrl}
                alt={student.fullName}
                className="w-24 h-24 rounded-3xl object-cover mx-auto border-4 border-teal-500 shadow-lg"
              />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-3">{student.fullName}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tổ {student.team} • Giới tính: {student.gender} • Ngày sinh: {student.dob}
              </p>

              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                  HK: Tốt
                </span>
              </div>
            </div>

            {/* PROMINENT PRIVATE NOTE CARD IN LEFT SIDEBAR */}
            <div className="bg-amber-500/10 dark:bg-amber-500/15 p-4 rounded-2xl border border-amber-500/40 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <StickyNote className="w-4 h-4 text-amber-500" /> Đặc điểm riêng biệt (GVCN)
                </h4>
                {isSavedNotice && (
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                    ✓ Đã lưu
                  </span>
                )}
              </div>
              <textarea
                rows={3}
                value={privateNoteText}
                onChange={e => setPrivateNoteText(e.target.value)}
                placeholder="Ghi chú đặc điểm riêng (năng khiếu, tư duy, tính cách, lưu ý nề nếp...)..."
                className="w-full p-2.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs rounded-xl border border-amber-300 dark:border-amber-700/60 focus:outline-none focus:ring-2 focus:ring-amber-500 custom-scrollbar"
              />
              <button
                onClick={handleSavePrivateNote}
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl transition shadow-md flex items-center justify-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" /> Lưu Đặc Điểm Riêng
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-500" /> Thông tin cá nhân
              </h4>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Dân tộc:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{student.ethnicity}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Tôn giáo:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{student.religion}</span>
              </div>
              <div className="py-1">
                <span className="text-slate-500 block mb-1">Địa chỉ:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" /> {student.address}
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-teal-500" /> Thông tin gia đình
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <div>
                    <span className="font-bold block text-slate-800 dark:text-slate-200">Bố: {student.family.fatherName}</span>
                    <span className="text-[11px] text-slate-500">{student.family.fatherJob}</span>
                  </div>
                  <a href={`tel:${student.family.fatherPhone}`} className="px-2.5 py-1 bg-teal-500/10 text-teal-600 rounded-lg font-bold flex items-center gap-1">
                    <PhoneCall className="w-3 h-3" /> Gọi
                  </a>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <div>
                    <span className="font-bold block text-slate-800 dark:text-slate-200">Mẹ: {student.family.motherName}</span>
                    <span className="text-[11px] text-slate-500">{student.family.motherJob}</span>
                  </div>
                  <a href={`tel:${student.family.motherPhone}`} className="px-2.5 py-1 bg-teal-500/10 text-teal-600 rounded-lg font-bold flex items-center gap-1">
                    <PhoneCall className="w-3 h-3" /> Gọi
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Tabs */}
          <div className="lg:col-span-8 p-5 flex flex-col h-full overflow-hidden">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto custom-scrollbar shrink-0">
              {[
                { id: 'private_notes', label: '📌 Đặc điểm riêng (GVCN)', icon: <StickyNote className="w-4 h-4" /> },
                { id: 'violations', label: `⚠️ Vi phạm (${studentViolations.length})`, icon: <AlertTriangle className="w-4 h-4" /> },
                { id: 'rewards', label: `🏆 Khen thưởng (${studentRewards.length})`, icon: <Award className="w-4 h-4" /> },
                { id: 'timeline', label: 'Timeline Tiến bộ', icon: <Clock className="w-4 h-4" /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${activeTab === tab.id ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto pt-4 custom-scrollbar">
              {/* Tab Dac Diem Rieng */}
              {activeTab === 'private_notes' && (
                <div className="space-y-4">
                  <div className="p-5 bg-gradient-to-br from-amber-500/10 via-slate-50 to-amber-500/5 dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-950 rounded-3xl border border-amber-500/30 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-base text-amber-900 dark:text-amber-300 flex items-center gap-2">
                        <StickyNote className="w-5 h-5 text-amber-500" /> Ghi Chú Đặc Điểm Riêng Bột (Thầy Võ Thiện Hảo)
                      </h3>
                      {isSavedNotice && (
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full">
                          ✓ Đã lưu thành công!
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Mục note riêng tư dành cho GVCN ghi lại tính cách, sở trường, hoàn cảnh gia đình hoặc nề nếp riêng của học sinh <strong>{student.fullName}</strong>.
                    </p>

                    <textarea
                      rows={6}
                      value={privateNoteText}
                      onChange={e => setPrivateNoteText(e.target.value)}
                      placeholder="Ví dụ: Năng khiếu môn Toán & tư duy logic tốt. Đang ôn thi Chuyên Lê Quý Đôn. Nhắc nhở tập trung đầu giờ..."
                      className="w-full p-4 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-xs rounded-2xl border border-amber-300 dark:border-amber-700/60 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner custom-scrollbar"
                    />

                    <div className="flex justify-end gap-3 pt-1">
                      <button
                        onClick={handleSavePrivateNote}
                        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" /> Lưu Ghi Chú Đặc Điểm Học Sinh
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Vi Pham */}
              {activeTab === 'violations' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Nhật ký Vi phạm</h3>
                    <button
                      onClick={() => setShowAddViolationModal(true)}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Thêm vi phạm
                    </button>
                  </div>

                  {studentViolations.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 font-medium text-xs bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed">
                      Học sinh {student.fullName} không có vi phạm nào! 🎉
                    </div>
                  ) : (
                    studentViolations.map(v => (
                      <div key={v.id} className="p-4 bg-rose-50/50 dark:bg-slate-800/60 rounded-2xl border border-rose-200 dark:border-slate-800 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-rose-600 text-sm">{v.type} ({v.severity})</span>
                          <span className="text-xs text-slate-400">{v.date}</span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300">{v.description}</p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab Khen Thuong */}
              {activeTab === 'rewards' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Danh sách Khen thưởng</h3>
                    <button
                      onClick={() => setShowAddRewardModal(true)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Thêm khen thưởng
                    </button>
                  </div>

                  {studentRewards.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 font-medium text-xs bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed">
                      Chưa có khen thưởng cho {student.fullName}. Bấm <strong>"Thêm khen thưởng"</strong> để tuyên dương em!
                    </div>
                  ) : (
                    studentRewards.map(r => (
                      <div key={r.id} className="p-4 bg-emerald-50/50 dark:bg-slate-800/60 rounded-2xl border border-emerald-200 dark:border-slate-800 flex justify-between items-center">
                        <div>
                          <span className="font-bold text-emerald-600 text-sm">{r.reason}</span>
                          <span className="text-xs text-slate-400 block mt-0.5">Ngày: {r.date}</span>
                        </div>
                        <span className="px-3 py-1 bg-emerald-600 text-white font-extrabold text-xs rounded-full">
                          +{r.bonusPoints} điểm
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="space-y-3">
                  <h3 className="font-extrabold text-base mb-2">Dòng Thời Gian Tiến Bộ</h3>
                  {studentTimeline.length === 0 ? (
                    <div className="p-6 text-center text-slate-400 text-xs bg-slate-50 dark:bg-slate-800/40 rounded-2xl">
                      Chưa ghi nhận sự kiện tiến bộ nào.
                    </div>
                  ) : (
                    studentTimeline.map(t => (
                      <div key={t.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs">
                        <span className="font-bold text-teal-600">{t.title}</span> — {t.description}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Violation Modal */}
      {showAddViolationModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 z-[60]">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl max-w-md w-full space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="font-extrabold text-lg text-rose-600">⚠️ Thêm Vi Phạm Cho: {student.fullName}</h3>
            <form onSubmit={handleSaveViolation} className="space-y-3 text-xs font-medium">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Loại vi phạm</label>
                <select
                  value={violationForm.type}
                  onChange={e => setViolationForm({...violationForm, type: e.target.value as any})}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border"
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
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border"
                >
                  <option value="Nhẹ">Nhẹ</option>
                  <option value="Trung bình">Trung bình</option>
                  <option value="Nặng">Nặng</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Mô tả vi phạm</label>
                <textarea
                  required
                  rows={3}
                  value={violationForm.description}
                  onChange={e => setViolationForm({...violationForm, description: e.target.value})}
                  placeholder="Mô tả hoàn cảnh vi phạm..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddViolationModal(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 font-bold rounded-xl">Hủy</button>
                <button type="submit" className="px-5 py-2 bg-rose-600 text-white font-bold rounded-xl shadow-lg">Lưu Vi Phạm</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Reward Modal */}
      {showAddRewardModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 z-[60]">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl max-w-md w-full space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="font-extrabold text-lg text-emerald-600">🏆 Thêm Khen Thưởng Cho: {student.fullName}</h3>
            <form onSubmit={handleSaveReward} className="space-y-3 text-xs font-medium">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Lý do tuyên dương</label>
                <textarea
                  required
                  rows={3}
                  value={rewardForm.reason}
                  onChange={e => setRewardForm({...rewardForm, reason: e.target.value})}
                  placeholder="Ví dụ: Đạt điểm 10 khảo sát Toán..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border"
                />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Điểm thưởng (+)</label>
                <input
                  type="number"
                  value={rewardForm.bonusPoints}
                  onChange={e => setRewardForm({...rewardForm, bonusPoints: Number(e.target.value)})}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAddRewardModal(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 font-bold rounded-xl">Hủy</button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl shadow-lg">Lưu Khen Thưởng</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
