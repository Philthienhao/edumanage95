import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  LayoutGrid, 
  List, 
  Phone, 
  Award, 
  AlertTriangle, 
  ShieldAlert, 
  Eye, 
  X
} from 'lucide-react';

export const StudentList: React.FC = () => {
  const { 
    filteredStudents, 
    setSelectedStudentId, 
    addStudent, 
    activeClassId 
  } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [filterTeam, setFilterTeam] = useState<number | 'all'>('all');
  const [filterGender, setFilterGender] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newStudent, setNewStudent] = useState({
    fullName: '',
    studentId: '',
    gender: 'Nam' as 'Nam' | 'Nữ',
    dob: '2012-05-15',
    team: 1,
    address: '',
    fatherName: '',
    fatherPhone: '',
    motherName: '',
    motherPhone: '',
    emergencyPhone: '',
  });

  const displayedStudents = filteredStudents.filter(student => {
    if (filterTeam !== 'all' && student.team !== filterTeam) return false;
    if (filterGender !== 'all' && student.gender !== filterGender) return false;
    if (filterStatus === 'commended' && !student.isCommendedThisWeek) return false;
    if (filterStatus === 'violation' && !student.hasViolationThisWeek) return false;
    if (filterStatus === 'at_risk' && !student.isAtRisk) return false;
    return true;
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.fullName || !newStudent.studentId) return;

    const created: Student = {
      id: 'hs_' + Date.now(),
      studentId: newStudent.studentId,
      stt: filteredStudents.length + 1,
      fullName: newStudent.fullName,
      gender: newStudent.gender,
      dob: newStudent.dob,
      ethnicity: 'Kinh',
      religion: 'Không',
      team: Number(newStudent.team),
      address: newStudent.address || 'Đà Nẵng',
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80`,
      classId: activeClassId,
      family: {
        fatherName: newStudent.fatherName || 'Chưa cập nhật',
        fatherJob: 'Kinh doanh',
        fatherPhone: newStudent.fatherPhone || '0912345678',
        motherName: newStudent.motherName || 'Chưa cập nhật',
        motherJob: 'Nội trợ',
        motherPhone: newStudent.motherPhone || '0987654321',
        emergencyPhone: newStudent.emergencyPhone || newStudent.fatherPhone || '0912345678',
      },
      academic: {
        gpa: 8.0,
        academicRank: 'Giỏi',
        conductRank: 'Tốt',
        strongSubjects: ['Toán'],
        weakSubjects: [],
        goals: 'Học tập chăm chỉ',
        academicRemark: 'Học sinh mới nhập học Lớp 9/5_CS5.',
      },
      health: {
        height: 160,
        weight: 50,
        vision: '10/10',
        allergies: 'Không',
        healthNotes: 'Bình thường',
      },
      teacherNotes: {
        familyBackground: 'Đầy đủ',
        psychology: 'Bình thường',
        educationalNotes: 'Quan sát thêm',
        strengths: 'Chăm chỉ',
        areasToSupport: 'Cởi mở hơn',
      }
    };

    addStudent(created);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-7 h-7 text-teal-500" /> Danh Sách Học Sinh Lớp 9/5_CS5 ({displayedStudents.length})
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Quản lý toàn bộ thông tin cá nhân, gia đình và nề nếp thi đua
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 bg-slate-200 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${viewMode === 'grid' ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              <LayoutGrid className="w-4 h-4" /> Thẻ
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${viewMode === 'table' ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
            >
              <List className="w-4 h-4" /> Bảng
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl transition flex items-center gap-2 shadow-lg shadow-teal-500/25"
          >
            <Plus className="w-4 h-4" /> Thêm học sinh
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          <Filter className="w-4 h-4 text-teal-500" /> Bộ lọc thông minh
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-medium">
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Tổ học tập</label>
            <select
              value={filterTeam}
              onChange={(e) => setFilterTeam(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
            >
              <option value="all">Tất cả các Tổ</option>
              <option value="1">Tổ 1</option>
              <option value="2">Tổ 2</option>
              <option value="3">Tổ 3</option>
              <option value="4">Tổ 4</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Giới tính</label>
            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
            >
              <option value="all">Nam & Nữ</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Trạng thái thi đua</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-teal-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="commended">🏆 Được tuyên dương tuần</option>
              <option value="violation">⚠️ Có vi phạm kỷ luật</option>
              <option value="at_risk">🚨 Học sinh có nguy cơ</option>
            </select>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayedStudents.map((student) => (
            <div
              key={student.id}
              onClick={() => setSelectedStudentId(student.id)}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-teal-500/50 transition duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-lg">
                  STT #{student.stt} • {student.studentId}
                </span>

                <div className="flex items-center gap-1">
                  {student.isCommendedThisWeek && (
                    <span className="p-1 rounded-full bg-emerald-100 text-emerald-600" title="Được tuyên dương">
                      <Award className="w-3.5 h-3.5" />
                    </span>
                  )}
                  {student.hasViolationThisWeek && (
                    <span className="p-1 rounded-full bg-rose-100 text-rose-600" title="Có vi phạm">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </span>
                  )}
                  {student.isAtRisk && (
                    <span className="p-1 rounded-full bg-amber-100 text-amber-600" title="Có nguy cơ sa sút">
                      <ShieldAlert className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3.5 my-2">
                <img
                  src={student.avatarUrl}
                  alt={student.fullName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500/30 group-hover:scale-105 transition shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">
                    {student.fullName}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Tổ {student.team} • {student.gender} • {student.dob.slice(0,4)}
                  </div>
                  <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                    Hạnh kiểm: Tốt
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1 text-slate-600 dark:text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Mẹ: {student.family.motherName}</span>
                  <a 
                    href={`tel:${student.family.motherPhone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-teal-600 dark:text-teal-400 hover:underline font-semibold flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" /> {student.family.motherPhone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-800">
                  <th className="p-3.5">STT</th>
                  <th className="p-3.5">Họ và tên</th>
                  <th className="p-3.5">Mã HS</th>
                  <th className="p-3.5">Tổ</th>
                  <th className="p-3.5">Giới tính</th>
                  <th className="p-3.5">Hạnh kiểm</th>
                  <th className="p-3.5">Phụ huynh</th>
                  <th className="p-3.5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                {displayedStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-teal-50/50 dark:hover:bg-slate-800/60 transition">
                    <td className="p-3.5 font-bold text-slate-400">#{s.stt}</td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2.5">
                        <img src={s.avatarUrl} alt={s.fullName} className="w-8 h-8 rounded-full object-cover" />
                        <span className="font-bold text-slate-900 dark:text-white">{s.fullName}</span>
                      </div>
                    </td>
                    <td className="p-3.5 font-mono">{s.studentId}</td>
                    <td className="p-3.5">Tổ {s.team}</td>
                    <td className="p-3.5">{s.gender}</td>
                    <td className="p-3.5 text-emerald-600 font-bold">Tốt</td>
                    <td className="p-3.5">
                      <div>Mẹ: {s.family.motherName} ({s.family.motherPhone})</div>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setSelectedStudentId(s.id)}
                        className="px-3 py-1.5 bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold rounded-lg hover:bg-teal-500 hover:text-white transition inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> Xem
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-teal-500" /> Thêm Học Sinh Mới vào Classs95
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-4 text-xs font-medium">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    value={newStudent.fullName}
                    onChange={e => setNewStudent({...newStudent, fullName: e.target.value})}
                    placeholder="Nguyễn Văn A"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-teal-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Mã Học sinh *</label>
                  <input
                    type="text"
                    required
                    value={newStudent.studentId}
                    onChange={e => setNewStudent({...newStudent, studentId: e.target.value})}
                    placeholder="1800862600"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/25"
                >
                  Lưu học sinh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
