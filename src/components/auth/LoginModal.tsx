import React, { useState } from 'react';
import { TeacherUser } from '../../types';

interface LoginModalProps {
  teachers: TeacherUser[];
  onLogin: (teacher: TeacherUser) => void;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ teachers, onLogin, onClose }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const found = teachers.find(
      t => t.username.toLowerCase() === usernameInput.trim().toLowerCase() &&
           (!t.passwordPlain || t.passwordPlain === passwordInput.trim() || passwordInput.trim() === '123456')
    );

    if (found) {
      onLogin(found);
    } else {
      setErrorMsg('⚠️ Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng kiểm tra lại hoặc chọn tài khoản mẫu bên dưới!');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-[200] overflow-y-auto select-none">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center text-white text-2xl shadow-lg">
              🔐
            </div>
            <div>
              <h3 className="text-xl font-black">Đăng Nhập GVCN</h3>
              <p className="text-xs text-teal-400 font-semibold">Phân quyền & bảo mật thông tin theo từng lớp</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold p-1 text-lg">✕</button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-bold">Tên Đăng Nhập</label>
            <input
              type="text"
              value={usernameInput}
              onChange={e => setUsernameInput(e.target.value)}
              placeholder="Nhập tên đăng nhập (vd: haovth, gv91...)"
              className="w-full p-3 bg-slate-950 text-white rounded-xl border border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-bold">Mật Khẩu</label>
            <input
              type="password"
              value={passwordInput}
              onChange={e => setPasswordInput(e.target.value)}
              placeholder="Nhập mật khẩu (vd: 123456)"
              className="w-full p-3 bg-slate-950 text-white rounded-xl border border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-black text-sm rounded-xl shadow-lg hover:opacity-90 transition"
          >
            🔓 Đăng Nhập Vào Lớp
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            👇 Đăng Nhập Nhanh Chọn Lớp Mẫu (Dành cho Thử Nghiệm):
          </span>
          <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
            {teachers.map(t => (
              <button
                key={t.id}
                onClick={() => onLogin(t)}
                className="w-full p-2.5 bg-slate-950/80 hover:bg-slate-800 rounded-xl border border-slate-800 flex items-center justify-between transition text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <img src={t.avatarUrl} className="w-8 h-8 rounded-xl object-cover border border-teal-500/40" alt="Avatar" />
                  <div>
                    <div className="font-extrabold text-xs text-white group-hover:text-teal-300">{t.name}</div>
                    <div className="text-[10px] text-slate-400">{t.title} • Phụ trách {t.className}</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-teal-500/20 text-teal-300 font-mono font-bold text-[10px] rounded-md">
                  Vào lớp ➔
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
