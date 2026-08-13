import React, { useState } from 'react';
import { TeacherUser } from '../../types';

interface TeacherManagementModalProps {
  teachers: TeacherUser[];
  onAddTeacher: (teacher: TeacherUser) => void;
  onUpdateTeacher: (teacher: TeacherUser) => void;
  onDeleteTeacher: (id: string) => void;
  onClose: () => void;
}

export const TeacherManagementModal: React.FC<TeacherManagementModalProps> = ({
  teachers,
  onAddTeacher,
  onUpdateTeacher,
  onDeleteTeacher,
  onClose
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<TeacherUser | null>(null);

  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [classCode, setClassCode] = useState('');
  const [username, setUsername] = useState('');
  const [passwordPlain, setPasswordPlain] = useState('123456');
  const [title, setTitle] = useState('GVCN');

  const handleOpenAddForm = () => {
    setEditingTeacher(null);
    setName('');
    setClassName('Lớp 9/');
    setClassCode('CLASS_9');
    setUsername('gv9');
    setPasswordPlain('123456');
    setTitle('GVCN');
    setShowForm(true);
  };

  const handleOpenEditForm = (t: TeacherUser) => {
    setEditingTeacher(t);
    setName(t.name);
    setClassName(t.className);
    setClassCode(t.classCode);
    setUsername(t.username);
    setPasswordPlain(t.passwordPlain || '123456');
    setTitle(t.title);
    setShowForm(true);
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !className || !username) return;

    if (editingTeacher) {
      onUpdateTeacher({
        ...editingTeacher,
        name,
        className,
        classCode: classCode || `CLASS_${username.toUpperCase()}`,
        username,
        passwordPlain,
        title
      });
    } else {
      const newTeacher: TeacherUser = {
        id: `t_${Date.now()}`,
        name,
        className,
        classCode: classCode || `CLASS_${username.toUpperCase()}`,
        username,
        passwordPlain,
        title,
        avatarUrl: '/teacher_avatar.png',
        role: 'teacher'
      };
      onAddTeacher(newTeacher);
    }
    setShowForm(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 z-[200] overflow-y-auto select-none">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 text-white shadow-2xl space-y-5 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-2xl border border-amber-500/40">
              ⚙️
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-amber-300">Quản Lý Tài Khoản GVCN Toàn Trường</h2>
              <p className="text-xs text-slate-400">Dành cho Thầy Võ Thiện Hảo (Admin System)</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold p-1 text-lg">✕</button>
        </div>

        <div className="overflow-y-auto custom-scrollbar space-y-4 pr-1">
          <div className="flex justify-between items-center bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-extrabold text-slate-200">Danh Sách {teachers.length} Tài Khoản Giáo Viên</span>
              <p className="text-[11px] text-slate-400">Mỗi tài khoản được phân quyền truy cập duy nhất 1 lớp</p>
            </div>
            <button
              onClick={handleOpenAddForm}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition"
            >
              + Thêm GVCN Mới
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSaveSubmit} className="p-4 bg-slate-950 rounded-2xl border border-amber-500/40 space-y-3 shadow-lg">
              <h3 className="font-extrabold text-xs text-amber-300 uppercase tracking-wider">
                {editingTeacher ? '✏️ Chỉnh Sửa Tài Khoản GVCN' : '➕ Tạo Mới Tài Khoản GVCN'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Họ và Tên Giáo Viên</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ví dụ: Cô Nguyễn Thị Mai"
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Tên Lớp Phụ Trách</label>
                  <input
                    type="text"
                    value={className}
                    onChange={e => setClassName(e.target.value)}
                    placeholder="Ví dụ: Lớp 9/1"
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Tên Đăng Nhập (Username)</label>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Ví dụ: gv91"
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Mật Khẩu Mặc Định</label>
                  <input
                    type="text"
                    value={passwordPlain}
                    onChange={e => setPasswordPlain(e.target.value)}
                    placeholder="Ví dụ: 123456"
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md"
                >
                  💾 Lưu Tài Khoản
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {teachers.map(t => (
              <div key={t.id} className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={t.avatarUrl} className="w-10 h-10 rounded-xl object-cover border border-amber-500/40" alt="Avatar" />
                  <div>
                    <div className="font-extrabold text-xs text-white flex items-center gap-1.5">
                      <span>{t.name}</span>
                      {t.role === 'admin' && (
                        <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-300 font-bold text-[9px] rounded">
                          ADMIN
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-teal-400 font-bold">🏫 {t.className}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      User: <strong>{t.username}</strong> • Pass: <strong>{t.passwordPlain || '123456'}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditForm(t)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-xs font-bold"
                    title="Chỉnh sửa"
                  >
                    ✏️
                  </button>
                  {t.role !== 'admin' && (
                    <button
                      onClick={() => {
                        if (confirm(`🗑️ Bạn có chắc muốn xóa tài khoản của ${t.name} (${t.className})?`)) {
                          onDeleteTeacher(t.id);
                        }
                      }}
                      className="p-1.5 bg-rose-950/50 hover:bg-rose-900 text-rose-300 rounded-lg text-xs font-bold"
                      title="Xóa tài khoản"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
