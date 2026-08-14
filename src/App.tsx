import { LoginModal } from "./components/auth/LoginModal";
import { TeacherManagementModal } from "./components/admin/TeacherManagementModal";
import { TeacherUser } from "./types";
import { AppProvider } from "./context/AppContext";


import React, { useState, useEffect, useMemo } from 'react';
import { SmartPickupSystem } from './components/slo/SmartPickupSystem';
import { 
  X, 
  PhoneCall, 
  MapPin, 
  Award, 
  AlertTriangle, 
  Activity, 
  Clock, 
  Plus, 
  BookOpen, 
  Save, 
  StickyNote,
  Search,
  Users,
  UserCheck,
  TrendingUp,
  ChevronRight,
  Sun,
  Moon,
  Camera,
  Menu,
  Cake,
  TrendingDown,
  FileText,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';



export const teacherProfile = {
  name: 'Thầy Võ Thiện Hảo',
  role: 'GVCN Lớp 9/5_CS5 Sky-Line',
  avatar: './teacher_avatar.jpg',
  schoolLogo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%230f172a'/><text x='50%' y='55%' font-size='22' font-weight='bold' fill='%2314b8a6' text-anchor='middle' dominant-baseline='middle'>SL</text></svg>",
  classPhoto: './95.jpg',
  email: 'vo.thien.hao@sky-line.edu.vn'
};


const sanitizeStudent = (s: any) => ({
  id: s && s.id ? s.id : "hs_00",
  studentId: s && s.studentId ? s.studentId : "",
  stt: s && s.stt ? s.stt : 0,
  fullName: s && s.fullName ? s.fullName : "Học sinh",
  gender: s && s.gender ? s.gender : "Nam",
  dob: s && s.dob ? s.dob : "2012-01-01",
  address: s && s.address ? s.address : "Đà Nẵng",
  privateNote: s && s.privateNote ? s.privateNote : "",
  avatarUrl: s && s.avatarUrl ? s.avatarUrl : "./avatars/hs_01.jpg",
  family: {
    fatherName: s && s.family && s.family.fatherName ? s.family.fatherName : "Phụ huynh",
    fatherPhone: s && s.family && s.family.fatherPhone ? s.family.fatherPhone : "",
    motherName: s && s.family && s.family.motherName ? s.family.motherName : "Phụ huynh",
    motherPhone: s && s.family && s.family.motherPhone ? s.family.motherPhone : ""
  },
  health: {
    healthNotes: s && s.health && s.health.healthNotes ? s.health.healthNotes : "Bình thường"
  }
});

export const initialStudents = [
  { id: "hs_01", studentId: "1800862626", stt: 1, fullName: "Lê Phước An", gender: "Nam", dob: "2012-02-08", address: "39 Nhơn Hòa 5, Phường Hòa An, Phường An Khê, TP. Đà Nẵng", privateNote: "Năng khiếu môn Toán & tư duy logic tốt. Đang ôn thi Chuyên Lê Quý Đôn. Nhắc nhở tập trung đầu giờ.", family: { fatherName: "Phụ huynh Lê Phước An", fatherPhone: "0905193750", motherName: "Nguyễn Thị Bình", motherPhone: "0905193750" }, health: { healthNotes: "Ăn sáng tự túc" }, avatarUrl: "./avatars/hs_01.jpg" },
  { id: "hs_02", studentId: "2302021997", stt: 2, fullName: "Phạm Thái An", gender: "Nam", dob: "2012-11-21", address: "164/72 Nguyễn Chánh, Phường Hòa Minh, Phường Hòa Khánh, TP. Đà Nẵng", privateNote: "Tính tình sôi nổi, hòa đồng. Rất hăng hái tham gia phong trào múa hát & thể thao của Lớp 9/5.", family: { fatherName: "Phụ huynh Thái An", fatherPhone: "0989898926", motherName: "Phạm Hồng Anh", motherPhone: "0989898926" }, health: { healthNotes: "Bình thường" }, avatarUrl: "./avatars/hs_02.jpg" },
  { id: "hs_03", studentId: "2303224034", stt: 3, fullName: "Nguyễn Bảo Anh", gender: "Nữ", dob: "2010-07-13", address: "Số 15 Nguyễn Chu Sỹ, Phường Hòa Hiệp Nam, Phường Hải Vân, TP. Đà Nẵng", privateNote: "Học sinh ngoan, chu đáo. Làm cán sự môn Ngữ Văn rất chỉn chu. Thích đọc sách.", family: { fatherName: "Phụ huynh Bảo Anh", fatherPhone: "0703478686", motherName: "Nguyễn Thị Thảo", motherPhone: "0703478686" }, health: { healthNotes: "Bình thường" }, avatarUrl: "./avatars/hs_03.jpg" },
  { id: "hs_04", studentId: "2101203321", stt: 4, fullName: "Bùi Trần Gia Bảo", gender: "Nam", dob: "2012-08-02", address: "01 Phước Lý 14, Phường Hòa Minh, Phường Hòa Khánh, TP. Đà Nẵng", privateNote: "Đi học đúng giờ, chấp hành nghiêm nề nếp. Năng khiếu Tin học & công nghệ.", family: { fatherName: "Phụ huynh Gia Bảo", fatherPhone: "0931171115", motherName: "Trần Thị Ánh Hồng", motherPhone: "0931171115" }, health: { healthNotes: "Đã có Thẻ HS" }, avatarUrl: "./avatars/hs_04.jpg" },
  { id: "hs_05", studentId: "1800862634", stt: 5, fullName: "Phan Quốc Gia Bảo", gender: "Nam", dob: "2012-04-30", address: "K82/31/7 Nguyễn Lương Bằng, Phường Hòa Khánh Bắc, Phường Liên Chiểu, TP. Đà Nẵng", privateNote: "Tính tự lập cao (ăn sáng tự túc). Cần nhắc nhở giơ tay phát biểu xây dựng bài nhiều hơn.", family: { fatherName: "Phụ huynh Gia Bảo", fatherPhone: "0902808302", motherName: "Phạm Thị Lan Anh", motherPhone: "0902808302" }, health: { healthNotes: "Ăn sáng tự túc" }, avatarUrl: "./avatars/hs_05.jpg" },
  { id: "hs_06", studentId: "2302021965", stt: 6, fullName: "Nguyễn Văn Quốc Đạt", gender: "Nam", dob: "2012-01-07", address: "112 Trần Minh Tông, Phường Hòa Minh, Phường Hòa Khánh, TP. Đà Nẵng", privateNote: "Khá năng nổ trong các bài thảo luận nhóm Tổ 3. Thích bóng đá.", family: { fatherName: "Phụ huynh Quốc Đạt", fatherPhone: "0905606828", motherName: "Dương Thị Ngọc Lý", motherPhone: "0905606828" }, health: { healthNotes: "Đã có Thẻ HS" }, avatarUrl: "./avatars/hs_06.jpg" },
  { id: "hs_07", studentId: "1800967877", stt: 7, fullName: "Nguyễn Hoàng Ngọc Hân", gender: "Nữ", dob: "2012-10-10", address: "193 Nguyễn Văn Cừ, Phường Hòa Hiệp Bắc, Phường Hải Vân, TP. Đà Nẵng", privateNote: "Cẩn thận, khéo tay, trình bày bài vở đẹp. Rất tích cực giúp đỡ các bạn trong Tổ 4.", family: { fatherName: "Phụ huynh Ngọc Hân", fatherPhone: "0905424241", motherName: "Nguyễn Thị Bích Trâm", motherPhone: "0905424241" }, health: { healthNotes: "Bình thường" }, avatarUrl: "./avatars/hs_07.jpg" },
  { id: "hs_08", studentId: "2302021998", stt: 8, fullName: "Nguyễn Ngọc Bảo Hân", gender: "Nữ", dob: "2012-08-06", address: "116 Nguyễn Lương Bằng, Phường Hòa Khánh Bắc, Phường Liên Chiểu, TP. Đà Nẵng", privateNote: "Tính tình nhẹ nhàng, lễ phép với thầy cô. Cần động viên tự tin thuyết trình trước đám đông.", family: { fatherName: "Phụ huynh Bảo Hân", fatherPhone: "0988442244", motherName: "Đặng Thị Ngọc Lan", motherPhone: "0988442244" }, health: { healthNotes: "Bình thường" }, avatarUrl: "./avatars/hs_08.jpg" },
  { id: "hs_09", studentId: "2004779074", stt: 9, fullName: "Nguyễn Anh Khôi Kevin", gender: "Nam", dob: "2012-04-16", address: "630 Điện Biên Phủ, Phường Thanh Khê Tây, Phường Thanh Khê, TP. Đà Nẵng", privateNote: "Học sinh mới nhập học. Tiếng Anh chuẩn bản ngữ (IELTS). Cần hỗ trợ giao lưu với các bạn trong Tổ 1.", family: { fatherName: "Phụ huynh Kevin", fatherPhone: "0962645545", motherName: "Do Tiffany Tuyet", motherPhone: "0962645545" }, health: { healthNotes: "Học sinh mới" }, avatarUrl: "./avatars/hs_09.jpg" },
  { id: "hs_10", studentId: "1800862650", stt: 10, fullName: "Trần Vũ Gia Minh", gender: "Nữ", dob: "2012-06-15", address: "05 Phú Thạnh 5, Phường Hòa Minh, Quận Liên Chiểu, Phường Hòa Khánh, TP. Đà Nẵng", privateNote: "Nhiệt tình, có trách nhiệm với nhiệm vụ trực nhật lớp.", family: { fatherName: "Phụ huynh Gia Minh", fatherPhone: "0914533443", motherName: "Vũ Thị Châu Thanh", motherPhone: "0914533443" }, health: { healthNotes: "Bình thường" }, avatarUrl: "./avatars/hs_10.jpg" },
  { id: "hs_11", studentId: "2201363879", stt: 11, fullName: "Lê Võ Hoài Nam", gender: "Nam", dob: "2012-01-18", address: "288/5 Tôn Đản, Phường Hòa An, Phường An Khê, TP. Đà Nẵng", privateNote: "Tư duy môn Vật lý & Khoa học tốt. Thường xuyên tìm tòi thí nghiệm.", family: { fatherName: "Phụ huynh Hoài Nam", fatherPhone: "0916349024", motherName: "Võ Thị Thập", motherPhone: "0916349024" }, health: { healthNotes: "Bình thường" }, avatarUrl: "./avatars/hs_11.jpg" },
  { id: "hs_12", studentId: "2302021994", stt: 12, fullName: "Đinh Nguyễn Ý Nhi", gender: "Nữ", dob: "2012-06-21", address: "87 Thanh Nghị, Phường Hòa Minh, Phường Hòa Khánh, TP. Đà Nẵng", privateNote: "Khéo léo, tự túc ăn sáng. Cần quan tâm rèn luyện thể thao.", family: { fatherName: "Phụ huynh Ý Nhi", fatherPhone: "0905867865", motherName: "Nguyễn Thị Thu Hường", motherPhone: "0905867865" }, health: { healthNotes: "Ăn sáng tự túc" }, avatarUrl: "./avatars/hs_12.jpg" },
  { id: "hs_13", studentId: "2302160231", stt: 13, fullName: "Văn Ngọc Uyên Nhi", gender: "Nữ", dob: "2012-01-18", address: "Tổ 63, Phường Hòa Minh, Phường Hòa Khánh, TP. Đà Nẵng", privateNote: "Giao tiếp vui vẻ, hòa đồng. Có khiếu mỹ thuật và trang trí bảng lớp.", family: { fatherName: "Phụ huynh Uyên Nhi", fatherPhone: "0338937623", motherName: "Nguyễn Thị Phụng", motherPhone: "0338937623" }, health: { healthNotes: "Ăn sáng tự túc" }, avatarUrl: "./avatars/hs_13.jpg" },
  { id: "hs_14", studentId: "1800862689", stt: 14, fullName: "Phan Bảo Quyên", gender: "Nữ", dob: "2012-08-06", address: "285 Huỳnh Ngọc Huệ, Phường An Khê Tây, TP. Đà Nẵng", privateNote: "Lực học đều các môn. Lắng nghe thầy cô, gương mẫu nề nếp.", family: { fatherName: "Phụ huynh Bảo Quyên", fatherPhone: "0904555446", motherName: "Nguyễn Ngọc Cảm", motherPhone: "0904555446" }, health: { healthNotes: "Bình thường" }, avatarUrl: "./avatars/hs_14.jpg" },
  { id: "hs_15", studentId: "2202934881", stt: 15, fullName: "Nguyễn Thị Khánh Tâm", gender: "Nữ", dob: "2012-10-28", address: "Tổ 45, Phường Hòa Khê, TP. Đà Nẵng", privateNote: "Cần nhắc gia đình hoàn thiện thủ tục cấp đổi Thẻ HS mới.", family: { fatherName: "Phụ huynh Khánh Tâm", fatherPhone: "0937458554", motherName: "Nguyễn Thị An Bình", motherPhone: "0937458554" }, health: { healthNotes: "Chưa có Thẻ HS" }, avatarUrl: "./avatars/hs_15.jpg" },
  { id: "hs_16", studentId: "1800862547", stt: 16, fullName: "Nguyễn Hoàng Ngọc Trân", gender: "Nữ", dob: "2012-08-01", address: "886 Tôn Đức Thắng, Phường Hòa Khánh Bắc, Phường Liên Chiểu, TP. Đà Nẵng", privateNote: "Chăm chỉ, hoàn thành bài tập đúng hạn. Tự túc ăn sáng.", family: { fatherName: "Phụ huynh Ngọc Trân", fatherPhone: "0905004948", motherName: "Nguyễn Thị Phan Thúy", motherPhone: "0905004948" }, health: { healthNotes: "Ăn sáng tự túc" }, avatarUrl: "./avatars/hs_16.jpg" },
  { id: "hs_17", studentId: "2302021993", stt: 17, fullName: "Nguyễn Ngọc Long Vũ", gender: "Nam", dob: "2012-12-17", address: "33 Đặng Thai Mai, Phường Thạc Gián, Phường Thanh Khê, TP. Đà Nẵng", privateNote: "Đam mê các môn thể thao. Năng nổ trong các tiết Thể dục & phong trào bóng đá.", family: { fatherName: "Phụ huynh Long Vũ", fatherPhone: "0905086889", motherName: "Lê Thị Quyên", motherPhone: "0905086889" }, health: { healthNotes: "Ăn sáng tự túc" }, avatarUrl: "./avatars/hs_17.jpg" },
  { id: "hs_18", studentId: "2606688428", stt: 18, fullName: "Bùi Phạm Bảo Trân", gender: "Nữ", dob: "2012-05-08", address: "Tổ 45, Phường Hòa Khê, TP. Đà Nẵng", privateNote: "Rất đúng giờ, nghiêm túc. Tương tác tốt với giáo viên bộ môn.", family: { fatherName: "Phụ huynh Bảo Trân", fatherPhone: "0766576986", motherName: "Phạm Thị Liễu", motherPhone: "0766576986" }, health: { healthNotes: "Bình thường" }, avatarUrl: "./avatars/hs_18.jpg" }
];

export const initialViolations = [
  { id: 'v01', studentId: 'hs_01', studentName: 'Lê Phước An', date: '2026-09-15', type: 'Mất trật tự', severity: 'Nhẹ', description: 'Nói chuyện trong giờ môn Sử.' },
  { id: 'v02', studentId: 'hs_01', studentName: 'Lê Phước An', date: '2026-09-17', type: 'Mất trật tự', severity: 'Nhẹ', description: 'Gây mất trật tự khi cô giảng bài Toán.' },
  { id: 'v03', studentId: 'hs_05', studentName: 'Phan Quốc Gia Bảo', date: '2026-09-12', type: 'Đi học muộn', severity: 'Nhẹ', description: 'Đến lớp trễ 10 phút đầu giờ.' },
  { id: 'v04', studentId: 'hs_05', studentName: 'Phan Quốc Gia Bảo', date: '2026-09-16', type: 'Đi học muộn', severity: 'Nhẹ', description: 'Đến lớp trễ 15 phút giờ sinh hoạt.' }
];

export const initialAcademicDecline = [
  { id: 'ad01', studentId: 'hs_01', studentName: 'Lê Phước An', subject: 'Vật lý & Hóa học', reason: 'Điểm khảo sát Tuần này giảm 1.5 điểm so với tuần trước. Cần rèn thêm bài tập tự luận.', date: '2026-09-16' },
  { id: 'ad02', studentId: 'hs_15', studentName: 'Nguyễn Thị Khánh Tâm', subject: 'Ngữ Văn & Toán', reason: 'Chưa hoàn thành bài tập về nhà 2 buổi liên tiếp Tuần này. Cần phối hợp với phụ huynh nhắc nhở.', date: '2026-09-16' }
];


export const scheduleData = [
  { period: "Tiết 1", time: "08:00 - 08:45", t2: "HĐTN", t3: "ELA", t4: "NGỮ VĂN", t5: "IELTS", t6: "TOÁN" },
  { period: "Tiết 2", time: "08:50 - 09:35", t2: "NGỮ VĂN", t3: "ELA", t4: "NGỮ VĂN", t5: "IELTS", t6: "TOÁN" },
  { period: "Ra chơi sáng", time: "09:35 - 09:50", isBreak: true, label: "☕ GIỜ RA CHƠI SÁNG (15 PHÚT)" },
  { period: "Tiết 3", time: "09:50 - 10:35", t2: "NGỮ VĂN", t3: "TOÁN", t4: "ELA", t5: "NGỮ VĂN", t6: "ELA" },
  { period: "Tiết 4", time: "10:40 - 11:25", t2: "IELTS", t3: "TOÁN", t4: "ELA", t5: "NGỮ VĂN", t6: "ELA" },
  { period: "Nghỉ trưa", time: "11:25 - 13:15", isBreak: true, label: "🍱 ĂN TRƯA & NGHỈ TRƯA" },
  { period: "Tiết 5", time: "13:15 - 14:00", t2: "GDTC", t3: "KHTN", t4: "LỊCH SỬ", t5: "CLB/CXXH", t6: "ICT" },
  { period: "Tiết 6", time: "14:05 - 14:50", t2: "GDTC", t3: "ÂM NHẠC", t4: "GS", t5: "CLB/CXXH", t6: "ICT" },
  { period: "Ra chơi chiều", time: "14:50 - 15:05", isBreak: true, label: "🧃 GIỜ RA CHƠI CHIỀU (15 PHÚT)" },
  { period: "Tiết 7", time: "15:05 - 15:50", t2: "ELA", t3: "MỸ THUẬT", t4: "STEM", t5: "TOÁN/GDCD", t6: "KHTN" },
  { period: "Tiết 8", time: "15:55 - 16:40", t2: "ELA", t3: "KHTN", t4: "GS", t5: "TOÁN", t6: "ĐỊA LÍ" }
];

export const initialRewards = [
  { id: 'r01', studentId: 'hs_01', studentName: 'Lê Phước An', date: '2026-09-10', reason: 'Đạt điểm 10 môn Toán khảo sát đầu năm.', bonusPoints: 10 },
  { id: 'r02', studentId: 'hs_09', studentName: 'Nguyễn Anh Khôi Kevin', date: '2026-09-12', reason: 'Học sinh mới hòa nhập xuất sắc và hăng hái phát biểu.', bonusPoints: 15 }
];


class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    try { localStorage.clear(); } catch(e) {}
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("EduManage App Error:", error, errorInfo);
    try { localStorage.clear(); } catch(e) {}
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif", backgroundColor: "#0f172a", color: "#ffffff", minHeight: "100vh" }}>
          <h1 style={{ fontSize: "24px", color: "#2dd4bf" }}>🏫 EDU MANAGE 9/5 SKY-LINE</h1>
          <p style={{ margin: "20px 0", color: "#94a3b8" }}>Đã làm sạch bộ nhớ đệm. Vui lòng nhấn nút dưới để vào ứng dụng.</p>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }}
            style={{ padding: "14px 28px", backgroundColor: "#14b8a6", color: "#0f172a", border: "none", borderRadius: "12px", fontWeight: "bold", fontSize: "16px", cursor: "pointer" }}
          >
            🔄 MỞ ỨNG DỤNG LỚP 9/5
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  const [activeTab, setActiveTab] = useState<string>('smart_pickup');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showClassPhotoLightbox, setShowClassPhotoLightbox] = useState<boolean>(false);
  const [showTkbLightbox, setShowTkbLightbox] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

      const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem("EDUMANAGE_STUDENTS_DATA");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(sanitizeStudent);
        }
      }
      for (const legacyKey of ["EDUMANAGE_STUDENTS_V14", "EDUMANAGE_STUDENTS_V13", "EDUMANAGE_STUDENTS", "EDUMANAGE_STUDENTS_V15"]) {
        const legacySaved = localStorage.getItem(legacyKey);
        if (legacySaved) {
          const parsed = JSON.parse(legacySaved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map(sanitizeStudent);
          }
        }
      }
    } catch(e) {}
    return initialStudents.map(sanitizeStudent);
  });
    const [violations, setViolations] = useState(() => {
    try {
      const saved = localStorage.getItem("EDUMANAGE_VIOLATIONS_DATA");
      return saved ? JSON.parse(saved) : initialViolations;
    } catch(e) { return initialViolations; }
  });
    const [rewards, setRewards] = useState(() => {
    try {
      const saved = localStorage.getItem("EDUMANAGE_REWARDS_DATA");
      return saved ? JSON.parse(saved) : initialRewards;
    } catch(e) { return initialRewards; }
  });
    const [academicDeclineList, setAcademicDeclineList] = useState(() => {
    try {
      const saved = localStorage.getItem("EDUMANAGE_ACADEMIC_DECLINE_DATA");
      return saved ? JSON.parse(saved) : initialAcademicDecline;
    } catch(e) { return initialAcademicDecline; }
  });

    useEffect(() => {
    try { localStorage.setItem("EDUMANAGE_STUDENTS_DATA", JSON.stringify(students)); } catch(e) {}
  }, [students]);

  useEffect(() => {
    try { localStorage.setItem("EDUMANAGE_VIOLATIONS_DATA", JSON.stringify(violations)); } catch(e) {}
  }, [violations]);

  useEffect(() => {
    try { localStorage.setItem("EDUMANAGE_REWARDS_DATA", JSON.stringify(rewards)); } catch(e) {}
  }, [rewards]);

  useEffect(() => {
    try { localStorage.setItem("EDUMANAGE_ACADEMIC_DECLINE_DATA", JSON.stringify(academicDeclineList)); } catch(e) {}
  }, [academicDeclineList]);

    // ☁️ REAL-TIME 2-WAY CLOUD SYNC ENGINE (iPhone 📱 ⇄ Laptop 💻)
  const GITHUB_TOKEN = "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";
  const GITHUB_REPO_API = `https://api.github.com/repos/Philthienhao/edumanage95/contents/cloud_data_${currentTeacher.classCode}.json`;

  const [syncStatus, setSyncStatus] = useState<"synced" | "syncing" | "offline">("synced");
  const [lastSyncedTime, setLastSyncedTime] = useState<string>("");

  const syncPushToCloud = async (studentsData: any, rewardsData: any, violationsData: any, declineData: any) => {
    try {
      setSyncStatus("syncing");
      let sha = "";
      try {
        const getRes = await fetch(GITHUB_REPO_API, {
          headers: {
            "Authorization": `token ${GITHUB_TOKEN}`,
            "Accept": "application/vnd.github.v3+json"
          }
        });
        if (getRes.ok) {
          const getData = await getRes.json();
          sha = getData.sha;
        }
      } catch(e) {}

      const payload = {
        updatedAt: new Date().toISOString(),
        students: studentsData,
        rewards: rewardsData,
        violations: violationsData,
        academicDeclineList: declineData
      };

      const b64Content = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
      const bodyPayload: any = {
        message: "☁️ EduManage 9/5 Auto Cloud Sync Update",
        content: b64Content
      };
      if (sha) bodyPayload.sha = sha;

      const putRes = await fetch(GITHUB_REPO_API, {
        method: "PUT",
        headers: {
          "Authorization": `token ${GITHUB_TOKEN}`,
          "Accept": "application/vnd.github.v3+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyPayload)
      });

      if (putRes.ok) {
        setSyncStatus("synced");
        setLastSyncedTime(new Date().toLocaleTimeString("vi-VN"));
      }
    } catch(err) {
      console.warn("Cloud push error:", err);
      setSyncStatus("offline");
    }
  };

  const syncPullFromCloud = async () => {
    try {
      setSyncStatus("syncing");
      const res = await fetch(GITHUB_REPO_API, {
        headers: {
          "Authorization": `token ${GITHUB_TOKEN}`,
          "Accept": "application/vnd.github.v3+json"
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.content) {
          const decodedStr = decodeURIComponent(escape(atob(data.content.replace(/\n/g, ""))));
          const parsed = JSON.parse(decodedStr);
          if (parsed && parsed.students && Array.isArray(parsed.students) && parsed.students.length > 0) {
            setStudents(parsed.students.map(sanitizeStudent));
            if (parsed.rewards) setRewards(parsed.rewards);
            if (parsed.violations) setViolations(parsed.violations);
            if (parsed.academicDeclineList) setAcademicDeclineList(parsed.academicDeclineList);
            setSyncStatus("synced");
            setLastSyncedTime(new Date().toLocaleTimeString("vi-VN"));
          }
        }
      }
    } catch(err) {
      console.warn("Cloud pull error:", err);
      setSyncStatus("offline");
    }
  };

  useEffect(() => {
    syncPullFromCloud();
    const interval = setInterval(() => {
      syncPullFromCloud();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [editingPrivateNote, setEditingPrivateNote] = useState<string>('');
  const [modalTab, setModalTab] = useState<'violations' | 'rewards'>('violations');

  const [showAddRewardModal, setShowAddRewardModal] = useState<boolean>(false);
  const [showAddViolationModal, setShowAddViolationModal] = useState<boolean>(false);
  const [showAddDeclineModal, setShowAddDeclineModal] = useState<boolean>(false);

  const [rewardForm, setRewardForm] = useState({ studentId: 'hs_01', reason: '', bonusPoints: 10, date: new Date().toISOString().slice(0, 10) });
  const [violationForm, setViolationForm] = useState({ studentId: 'hs_01', type: 'Mất trật tự', severity: 'Nhẹ', description: '', date: new Date().toISOString().slice(0, 10) });
  const [declineForm, setDeclineForm] = useState({ studentId: 'hs_01', subject: 'Toán học', reason: '', date: new Date().toISOString().slice(0, 10) });

  useEffect(() => {
    if (selectedStudent) {
      setEditingPrivateNote(selectedStudent.privateNote || '');
    }
  }, [selectedStudent]);

  
      
  const handleAddTeacher = (newTeacher: TeacherUser) => {
    setTeachersList([...teachersList, newTeacher]);
    alert("✅ Đã tạo mới thành công tài khoản GVCN " + newTeacher.name + " (" + newTeacher.className + ")!");
  };

  const handleUpdateTeacher = (updated: TeacherUser) => {
    setTeachersList(teachersList.map(t => t.id === updated.id ? updated : t));
    if (currentTeacher.id === updated.id) {
      setCurrentTeacher(updated);
    }
    alert("✅ Đã cập nhật thành công tài khoản của " + updated.name + "!");
  };

  const handleDeleteTeacher = (id: string) => {
    setTeachersList(teachersList.filter(t => t.id !== id));
    alert("✅ Đã xóa tài khoản GVCN khỏi hệ thống!");
  };

  const handleSwitchTeacher = (teacher: TeacherUser) => {
    setCurrentTeacher(teacher);
    setShowLoginModal(false);
    alert("🔓 Đã chuyển sang tài khoản " + teacher.name + " (GVCN " + teacher.className + ") thành công!");
  };

  const handleUploadStudentAvatar = (e: React.ChangeEvent<HTMLInputElement>, studentId: string) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event: any) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_DIM = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round(height * (MAX_DIM / width));
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round(width * (MAX_DIM / height));
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.75);

          setStudents((prevStudents: any) => {
            const updated = prevStudents.map((s: any) =>
              s.id === studentId ? { ...s, avatarUrl: compressedBase64 } : s
            );
            try {
              localStorage.setItem("EDUMANAGE_STUDENTS_DATA", JSON.stringify(updated));
            } catch (err) {
              console.warn("Storage warning:", err);
            }
            return updated;
          });

          if (selectedStudent && selectedStudent.id === studentId) {
            setSelectedStudent((prev: any) => (prev ? { ...prev, avatarUrl: compressedBase64 } : null));
          }

          alert("✅ Đã tối ưu và lưu ảnh đại diện mới thành công vĩnh viễn trên iPhone!"); syncPushToCloud(updated, rewards, violations, academicDeclineList);
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  
  const handleRestoreFullRoster = () => {
    if (confirm("🔄 KHÔI PHỤC ĐẦY ĐỦ DANH SÁCH 18 HỌC SINH LỚP 9/5 VÀ CÁC THÔNG TIN CHÍNH THỨC?")) {
      setStudents(initialStudents);
      try {
        localStorage.setItem("EDUMANAGE_STUDENTS_DATA", JSON.stringify(initialStudents));
      } catch(e) {}
      alert("✅ Đã khôi phục thành công đầy đủ danh sách 18 học sinh Lớp 9/5!");
    }
  };

  const handleSavePrivateNote = () => {
    if (!selectedStudent) return;
    const updated = students.map((s: any) => s.id === selectedStudent.id ? { ...s, privateNote: editingPrivateNote } : s);
    setStudents(updated);
    setSelectedStudent({ ...selectedStudent, privateNote: editingPrivateNote });
    alert(`💾 Đã lưu ghi chú đặc điểm riêng của học sinh ${selectedStudent.fullName}!`);
  };

  const handleSaveReward = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find((s: any) => s.id === rewardForm.studentId);
    const newItem = { id: 'r_' + Date.now(), studentId: rewardForm.studentId, studentName: st ? st.fullName : 'Học sinh', reason: rewardForm.reason || 'Khen thưởng', bonusPoints: Number(rewardForm.bonusPoints) || 10, date: rewardForm.date };
    setRewards([newItem, ...rewards]);
    setShowAddRewardModal(false);
  };

  const handleSaveViolation = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find((s: any) => s.id === violationForm.studentId);
    const newItem = { id: 'v_' + Date.now(), studentId: violationForm.studentId, studentName: st ? st.fullName : 'Học sinh', type: violationForm.type, severity: violationForm.severity, description: violationForm.description || 'Vi phạm nề nếp', date: violationForm.date };
    setViolations([newItem, ...violations]);
    setShowAddViolationModal(false);
  };

  const handleSaveDecline = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find((s: any) => s.id === declineForm.studentId);
    const newItem = { id: 'ad_' + Date.now(), studentId: declineForm.studentId, studentName: st ? st.fullName : 'Học sinh', subject: declineForm.subject, reason: declineForm.reason || 'Cần cố gắng học tập', date: declineForm.date };
    setAcademicDeclineList([newItem, ...academicDeclineList]);
    setShowAddDeclineModal(false);
  };

  
    const handleResetDisciplineRewards = () => {
    if (confirm("🔄 BẠN CÓ CHẮC CHẮN MỐN RESET XÓA TẤT CẢ KHEN THƯỞNG VÀ VI PHẠM KHỎI ỨNG DỤNG?")) {
      setRewards([]);
      setViolations([]);
      setAcademicDeclineList([]);
      try {
        localStorage.setItem("EDUMANAGE_REWARDS_DATA", JSON.stringify([]));
        localStorage.setItem("EDUMANAGE_VIOLATIONS_DATA", JSON.stringify([]));
        localStorage.setItem("EDUMANAGE_ACADEMIC_DECLINE_DATA", JSON.stringify([]));
      } catch(e) {}
      alert("✅ Đã reset xóa toàn bộ dữ liệu khen thưởng và vi phạm thành công!"); syncPushToCloud(students, [], [], []);
    }
  };

  const handleResetToInitialDisciplineRewards = () => {
    if (confirm("🔄 KHÔI PHỤC DỮ LIỆU KHEN THƯỞNG & VI PHẠM BAN ĐẦU?")) {
      setRewards(initialRewards);
      setViolations(initialViolations);
      setAcademicDeclineList(initialAcademicDecline);
      try {
        localStorage.setItem("EDUMANAGE_REWARDS_DATA", JSON.stringify(initialRewards));
        localStorage.setItem("EDUMANAGE_VIOLATIONS_DATA", JSON.stringify(initialViolations));
        localStorage.setItem("EDUMANAGE_ACADEMIC_DECLINE_DATA", JSON.stringify(initialAcademicDecline));
      } catch(e) {}
      alert("✅ Đã khôi phục dữ liệu khen thưởng và vi phạm ban đầu thành công!"); syncPushToCloud(students, initialRewards, initialViolations, initialAcademicDecline);
    }
  };

  const handleResetSection = (sectionName: string) => {
    if (confirm(`🔄 RESET khôi phục dữ liệu ban đầu cho mục "${sectionName}"?`)) {
      if (sectionName === "Học sinh") {
        setStudents(initialStudents);
        localStorage.setItem("EDUMANAGE_STUDENTS_DATA", JSON.stringify(initialStudents));
      }
      if (sectionName === "Khen thưởng") {
        setRewards(initialRewards);
        localStorage.setItem("EDUMANAGE_REWARDS_DATA", JSON.stringify(initialRewards));
      }
      if (sectionName === "Vi phạm") {
        setViolations(initialViolations);
        localStorage.setItem("EDUMANAGE_VIOLATIONS_DATA", JSON.stringify(initialViolations));
      }
      if (sectionName === "Học tập sa sút") {
        setAcademicDeclineList(initialAcademicDecline);
        localStorage.setItem("EDUMANAGE_ACADEMIC_DECLINE_DATA", JSON.stringify(initialAcademicDecline));
      }
      alert(`✅ Đã reset khôi phục dữ liệu ban đầu mục "${sectionName}" thành công!`);
    }
  };


  
  const handleDeleteStudent = (id: string) => {
    if (confirm("🗑️ XÓA học sinh này khỏi danh sách?")) {
      setStudents(students.filter((s: any) => s.id !== id));
      if (selectedStudent && selectedStudent.id === id) setSelectedStudent(null);
    }
  };

  const handleDeleteReward = (id: string) => setRewards(rewards.filter((r: any) => r.id !== id));
  const handleDeleteViolation = (id: string) => setViolations(violations.filter((v: any) => v.id !== id));
  const handleDeleteDecline = (id: string) => setAcademicDeclineList(academicDeclineList.filter((ad: any) => ad.id !== id));
  const handleDeleteRepeatedViolation = (studentId: string, type: string) => {
    if (confirm("🗑️ XÓA cảnh báo vi phạm lặp lỗi này của học sinh?")) {
      setViolations(violations.filter((v: any) => !(v.studentId === studentId && v.type === type)));
    }
  };

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const birthdayStudentsThisMonth = useMemo(() => {
    return students.filter((s: any) => {
      if (!s.dob) return false;
      const parts = s.dob.split('-');
      return parts.length >= 3 && parseInt(parts[1], 10) === currentMonth;
    });
  }, [students, currentMonth]);

  const repeatedViolationStudents = useMemo(() => {
    const counts: Record<string, any> = {};
    violations.forEach((v: any) => {
      const key = `${v.studentId}___${v.type}`;
      if (!counts[key]) {
        counts[key] = { studentId: v.studentId, studentName: v.studentName, type: v.type, count: 0, dates: [] };
      }
      counts[key].count += 1;
      counts[key].dates.push(v.date);
    });
    return Object.values(counts).filter((item: any) => item.count >= 2);
  }, [violations]);

    const filteredStudents = students.filter((s: any) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const nameMatch = (s && s.fullName ? s.fullName : "").toLowerCase().includes(q);
    const idMatch = (s && s.studentId ? s.studentId : "").toLowerCase().includes(q);
    const noteMatch = (s && s.privateNote ? s.privateNote : "").toLowerCase().includes(q);
    const phoneMatch = (s && s.family && s.family.fatherPhone ? s.family.fatherPhone : "").includes(q) || (s && s.family && s.family.motherPhone ? s.family.motherPhone : "").includes(q);
    const addressMatch = (s && s.address ? s.address : "").toLowerCase().includes(q);
    return nameMatch || idMatch || noteMatch || phoneMatch || addressMatch;
  });


    const navItems = [
    { id: "smart_pickup", icon: "⚡", label: "AI Smart Pickup" },
    { id: "dashboard", icon: "🏠", label: "Dashboard" },
    { id: "switch_account", icon: "🔐", label: "🔐 ĐỔI TÀI KHOẢN / CẤP LỚP" },
    { id: "admin_teachers", icon: "⚙️", label: "⚙️ QUẢN LÝ GVCN (ADMIN)" },
    { id: "students", icon: "👨‍🎓", label: `Học sinh (${students.length})` },
    { id: "rewards", icon: "🏆", label: `Khen thưởng (${rewards.length})` },
    { id: "violations", icon: "⚠️", label: `Vi phạm (${violations.length})` },
    { id: "repeated_violations", icon: "🚨", label: `Lỗi >2 lần (${repeatedViolationStudents.length})` },
    { id: "academic_decline", icon: "📉", label: `Sa sút hằng tuần (${academicDeclineList.length})` },
    { id: "parents", icon: "📞", label: "Phụ huynh" },
    { id: "birthday", icon: "🎂", label: `Sinh nhật (${birthdayStudentsThisMonth.length})` }
  ];

  return (
    <div className={`flex flex-col md:flex-row h-screen w-screen overflow-hidden ${darkMode ? 'dark bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 bg-slate-900 text-white flex-col justify-between p-4 border-r border-slate-800 shrink-0">
        <div>
          <div className="flex items-center gap-3 p-2.5 mb-3 bg-slate-800/80 rounded-2xl border border-slate-700/60">
            <img src={teacherProfile.schoolLogo} className="h-9 object-contain bg-white p-1 rounded-xl" alt="Logo" />
            <div>
              <h1 className="font-extrabold text-xs text-white leading-tight">SKY-LINE CS5</h1>
              <p className="text-[10px] text-teal-400 font-bold">Lớp 9/5_CS5</p>
            </div>
          </div>

          <div onClick={() => setShowClassPhotoLightbox(true)} className="mb-3 relative rounded-2xl overflow-hidden cursor-pointer border border-teal-500/40 shadow-lg group">
            <img src={teacherProfile.classPhoto} className="w-full h-24 object-cover group-hover:scale-110 transition duration-300" alt="Class" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-2">
              <span className="text-[10px] font-extrabold text-teal-300">📸 Tập thể Lớp 9/5_CS5</span>
              <span className="text-[9px] text-slate-300">Phóng to toàn màn hình</span>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-bold">
                        {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "switch_account") setShowLoginModal(true);
                  else if (item.id === "admin_teachers") setShowTeacherMgmtModal(true);
                  else setActiveTab(item.id);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition flex items-center gap-2.5 ${activeTab === item.id ? "bg-teal-500 text-slate-950 font-extrabold shadow-lg" : "text-slate-300 hover:bg-slate-800"}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

                        <div className="border-t border-slate-800 pt-3 space-y-2">
          <div 
            onClick={() => setShowLoginModal(true)}
            className="flex items-center gap-2.5 p-2 bg-slate-800/80 hover:bg-slate-800 rounded-2xl cursor-pointer border border-slate-700/60 transition group shadow-md"
            title="Nhấp để đổi tài khoản hoặc chọn lớp"
          >
            <img src={currentTeacher.avatarUrl || teacherProfile.avatar} className="w-10 h-10 rounded-xl object-cover border-2 border-teal-400 shadow-md group-hover:scale-105 transition" alt="Teacher" />
            <div className="text-[11px] flex-1">
              <div className="font-extrabold text-white flex items-center justify-between">
                <span className="group-hover:text-teal-300 transition">{currentTeacher.name}</span>
                <span className="text-[10px]">🔓</span>
              </div>
              <div className="text-[10px] text-teal-400 font-bold">🏫 {currentTeacher.className}</div>
              <div className="text-[9px] text-amber-300 font-semibold mt-0.5">👉 Đổi tài khoản / Cấp lớp</div>
            </div>
          </div>

          <div className="flex gap-1.5 pt-1">
            <button
              onClick={() => setShowLoginModal(true)}
              className="flex-1 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition text-center flex items-center justify-center gap-1"
            >
              <span>🔐</span>
              <span>ĐỔI TÀI KHOẢN</span>
            </button>
            <button
              onClick={() => setShowTeacherMgmtModal(true)}
              className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition text-center flex items-center justify-center gap-1"
              title="Quản lý tài khoản toàn trường"
            >
              <span>⚙️</span>
              <span>GVCN</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE TOP HEADER */}
                  <header 
        className="md:hidden bg-slate-900 text-white px-4 pb-3 border-b border-slate-800 flex items-center justify-between shrink-0 shadow-lg"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 44px) + 10px)" }}
      >
        <div onClick={() => setShowLoginModal(true)} className="flex items-center gap-2.5 cursor-pointer">
          <img src={currentTeacher.avatarUrl || teacherProfile.avatar} className="w-9 h-9 rounded-full object-cover border-2 border-teal-400" alt="Teacher" />
          <div>
            <h1 className="font-extrabold text-xs text-white leading-none flex items-center gap-1">
              <span>{currentTeacher.name}</span>
              <span className="text-[10px]">🔓</span>
            </h1>
            <p className="text-[10px] text-teal-400 font-bold mt-0.5">🏫 {currentTeacher.className} (Đổi lớp)</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setShowLoginModal(true)} className="px-3 py-1.5 bg-teal-500 text-slate-950 font-black text-xs rounded-xl shadow-md">
            🔐 ĐỔI LỚP
          </button>
          <button onClick={() => setShowTeacherMgmtModal(true)} className="px-2.5 py-1.5 bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md">
            ⚙️ GVCN
          </button>
        </div>
      </header>

      {/* MOBILE SLIDE-OVER MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-slate-950/85 backdrop-blur-md flex justify-end">
          <div 
            className="w-4/5 max-w-sm bg-slate-900 text-white h-full p-5 flex flex-col justify-between overflow-y-auto shadow-2xl border-l border-slate-800"
            style={{ paddingTop: 'calc(env(safe-area-inset-top, 44px) + 12px)' }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <img src={teacherProfile.schoolLogo} className="h-7 bg-white p-1 rounded-lg" alt="Logo" />
                  <div>
                    <span className="font-black text-xs text-white uppercase tracking-wider block">MENU LỚP 9/5_CS5</span>
                    <span className="text-[10px] text-teal-400 font-bold">{teacherProfile.name}</span>
                  </div>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white font-extrabold text-lg p-1.5 bg-slate-800 rounded-xl">✕</button>
              </div>

              <nav className="space-y-1.5 font-bold text-xs">
                            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "switch_account") setShowLoginModal(true);
                  else if (item.id === "admin_teachers") setShowTeacherMgmtModal(true);
                  else setActiveTab(item.id);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition flex items-center gap-2.5 ${activeTab === item.id ? "bg-teal-500 text-slate-950 font-extrabold shadow-lg" : "text-slate-300 hover:bg-slate-800"}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
              </nav>
            </div>

            <div className="border-t border-slate-800 pt-4 text-center text-xs text-slate-400 space-y-2">
              <button onClick={() => setMobileMenuOpen(false)} className="w-full py-3 bg-teal-500 text-slate-950 font-black rounded-2xl shadow-lg text-xs">
                ✕ Đóng Menu Trượt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Desktop Header */}
        <header className="hidden md:flex h-16 border-b border-slate-200 dark:border-slate-800 px-6 items-center justify-between bg-white dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <img src={teacherProfile.schoolLogo} className="h-8 object-contain" alt="Logo" />
            <div className="h-5 w-px bg-slate-300 dark:bg-slate-700"></div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tra cứu học sinh, đặc điểm riêng, địa chỉ nhà, SĐT phụ huynh..."
              className="w-80 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

                    <div className="flex items-center gap-2">
            <button onClick={() => setShowLoginModal(true)} className="px-3 py-1.5 bg-teal-500 text-slate-950 font-black text-xs rounded-xl shadow-md hover:bg-teal-400 transition flex items-center gap-1">
              <span>🔐</span> <span>ĐỔI TÀI KHOẢN / CẤP LỚP</span>
            </button>
            {currentTeacher.role === "admin" && (
              <button onClick={() => setShowTeacherMgmtModal(true)} className="px-3 py-1.5 bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md hover:bg-amber-400 transition flex items-center gap-1">
                <span>⚙️</span> <span>QUẢN LÝ GVCN</span>
              </button>
            )}
            <button onClick={() => setShowClassPhotoLightbox(true)} className="px-3 py-1.5 bg-teal-500/20 text-teal-700 dark:text-teal-300 font-extrabold text-xs rounded-xl border border-teal-500/30">
              📸 Ảnh Lớp
            </button>
            <button onClick={() => setShowAddRewardModal(true)} className="px-3 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md">
              🏆 Thêm Khen
            </button>
            <button onClick={() => setShowAddViolationModal(true)} className="px-3 py-1.5 bg-rose-600 text-white font-bold text-xs rounded-xl shadow-md">
              ⚠️ Vi Phạm
            </button>
          </div>
        </header>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pt-3 pb-1 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="🔍 Tra cứu đặc điểm riêng, địa chỉ nhà, tên học sinh..."
            className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Viewport Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar pb-24 md:pb-6">
          {/* SMART PICKUP VIEW */}
          {activeTab === 'smart_pickup' && <SmartPickupSystem />}

          {/* DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-4 sm:space-y-6">
              {/* HERO BANNER */}
              <div className="relative overflow-hidden rounded-3xl shadow-xl border border-teal-500/30 group">
                <img src={teacherProfile.classPhoto} className="w-full h-52 sm:h-80 object-cover object-center" alt="Hero" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20 p-4 sm:p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 bg-teal-500 text-slate-950 font-black text-[10px] sm:text-xs uppercase rounded-full">
                      SKY-LINE CS5
                    </span>
                    <button onClick={() => setShowClassPhotoLightbox(true)} className="px-3 py-1.5 bg-white/20 backdrop-blur-md text-white font-bold text-[11px] rounded-xl border border-white/30">
                      🔍 Phóng To
                    </button>
                  </div>

                  <div>
                    <h1 className="text-xl sm:text-4xl font-black text-white leading-tight">
                      Lớp 9/5_CS5 Sky-Line 🎓
                    </h1>
                    <p className="text-xs text-teal-200 font-medium mt-1">
                      GVCN: <strong>{teacherProfile.name}</strong> • 18 Học sinh
                    </p>
                  </div>
                </div>
              </div>

              {/* 6 SMART DASHBOARD STAT CARDS GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div 
                  onClick={() => setActiveTab("students")} 
                  className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 cursor-pointer hover:scale-[1.03] active:scale-95 transition shadow-sm hover:shadow-md hover:border-teal-500 group"
                >
                  <span className="text-[11px] text-slate-400 font-bold block">Tổng Học Sinh</span>
                  <span className="text-xl font-black text-teal-500 block">{students.length} em</span>
                  <span className="text-[9px] text-slate-400 font-medium block">👉 Xem danh sách</span>
                </div>

                <div 
                  onClick={() => setActiveTab("rewards")} 
                  className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 cursor-pointer hover:scale-[1.03] active:scale-95 transition shadow-sm hover:shadow-md hover:border-emerald-500 group"
                >
                  <span className="text-[11px] text-slate-400 font-bold block">Khen Thưởng</span>
                  <span className="text-xl font-black text-emerald-500 block">{rewards.length} lượt</span>
                  <span className="text-[9px] text-slate-400 font-medium block">👉 Xem khen thưởng</span>
                </div>

                <div 
                  onClick={() => setActiveTab("violations")} 
                  className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 cursor-pointer hover:scale-[1.03] active:scale-95 transition shadow-sm hover:shadow-md hover:border-rose-500 group"
                >
                  <span className="text-[11px] text-slate-400 font-bold block">Ghi Nhận Vi Phạm</span>
                  <span className="text-xl font-black text-rose-500 block">{violations.length} lượt</span>
                  <span className="text-[9px] text-slate-400 font-medium block">👉 Xem sổ vi phạm</span>
                </div>

                <div 
                  onClick={() => setActiveTab("birthday")} 
                  className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 cursor-pointer hover:scale-[1.03] active:scale-95 transition shadow-sm hover:shadow-md hover:border-amber-500 group"
                >
                  <span className="text-[11px] text-slate-400 font-bold block">Sinh Nhật T{currentMonth}</span>
                  <span className="text-xl font-black text-amber-500 block">{birthdayStudentsThisMonth.length} em</span>
                  <span className="text-[9px] text-slate-400 font-medium block">👉 Xem danh sách</span>
                </div>

                <div 
                  onClick={() => setActiveTab("repeated_violations")} 
                  className="p-3.5 bg-rose-500/10 dark:bg-rose-950/50 rounded-2xl border border-rose-500/40 space-y-1 cursor-pointer hover:scale-[1.03] active:scale-95 transition shadow-md hover:shadow-lg hover:border-rose-600 group"
                >
                  <span className="text-[11px] text-rose-700 dark:text-rose-300 font-extrabold block">🚨 Lỗi &gt; 2 Lần</span>
                  <span className="text-xl font-black text-rose-600 dark:text-rose-400 block">{repeatedViolationStudents.length} em</span>
                  <span className="text-[9px] text-rose-700 dark:text-rose-300 font-extrabold block">👉 Cảnh báo lặp lỗi</span>
                </div>

                <div 
                  onClick={() => setActiveTab("academic_decline")} 
                  className="p-3.5 bg-orange-500/10 dark:bg-orange-950/50 rounded-2xl border border-orange-500/40 space-y-1 cursor-pointer hover:scale-[1.03] active:scale-95 transition shadow-md hover:shadow-lg hover:border-orange-600 group"
                >
                  <span className="text-[11px] text-orange-700 dark:text-orange-300 font-extrabold block">📉 Sa Sút Tuần</span>
                  <span className="text-xl font-black text-orange-600 dark:text-orange-400 block">{academicDeclineList.length} em</span>
                  <span className="text-[9px] text-orange-700 dark:text-orange-300 font-extrabold block">👉 Cảnh báo sa sút</span>
                </div>
              </div>

              {/* Student Roster Cards */}
              <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl border">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-extrabold text-sm sm:text-base">Danh Sách Học Sinh (18)</h3>
                  <button onClick={() => handleResetSection('Học sinh')} className="px-3 py-1 bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1">
                    🔄 Reset
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredStudents.map((s: any) => (
                    <div key={s.id} onClick={() => setSelectedStudent(s)} className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl flex flex-col justify-between cursor-pointer hover:shadow-md border border-slate-200/80 dark:border-slate-700/60 transition">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <img src={s.avatarUrl} className="w-11 h-11 rounded-xl object-cover" alt="Student" />
                            <div>
                              <div className="font-bold text-xs text-slate-900 dark:text-white">{s.fullName}</div>
                              <div className="text-[10px] text-slate-400">STT #{s.stt} • Tổ {s.stt % 4 + 1}</div>
                            </div>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); handleDeleteStudent(s.id); }} className="px-2.5 py-1 text-rose-500 hover:bg-rose-50 rounded-lg text-xs font-bold">🗑️ Xóa</button>
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium truncate">🏠 {s.address}</div>
                      </div>

                      {s.privateNote && (
                        <div className="mt-2 p-2 bg-teal-500/10 dark:bg-teal-500/20 rounded-xl border border-teal-500/30 text-[11px] text-teal-800 dark:text-teal-300 font-medium flex items-start gap-1.5">
                          <span className="shrink-0">📌</span>
                          <span className="line-clamp-2"><strong>Đặc điểm:</strong> {s.privateNote}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STUDENTS TAB */}
          {activeTab === 'students' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border">
                <div>
                  <h2 className="text-base sm:text-xl font-extrabold">Danh Sách Học Sinh ({students.length})</h2>
                  <p className="text-xs text-slate-400">Quản lý và chỉnh sửa đặc điểm 18 học sinh</p>
                </div>
                <button onClick={() => handleResetSection('Học sinh')} className="px-3 py-1.5 bg-slate-800 text-white font-bold text-xs rounded-xl">🔄 Reset</button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredStudents.map((s: any) => (
                  <div key={s.id} onClick={() => setSelectedStudent(s)} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-md">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={s.avatarUrl} className="w-12 h-12 rounded-2xl object-cover border-2 border-teal-500" alt="Student" />
                          <div>
                            <h3 className="font-bold text-xs sm:text-sm">{s.fullName}</h3>
                            <p className="text-[11px] text-slate-400">STT #{s.stt} • Tổ {s.stt % 4 + 1}</p>
                          </div>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); handleDeleteStudent(s.id); }} className="px-3 py-1.5 bg-rose-500/10 text-rose-600 font-extrabold text-xs rounded-xl hover:bg-rose-500 hover:text-white">🗑️ Xóa</button>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-2">🏠 <strong>Địa chỉ:</strong> {s.address}</div>
                    </div>

                    {s.privateNote && (
                      <div className="mt-2.5 p-2 bg-teal-50 dark:bg-teal-950/60 rounded-xl border border-teal-200 dark:border-teal-800 text-[11px] text-teal-800 dark:text-teal-300">
                        📌 <strong>Đặc điểm:</strong> {s.privateNote}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REPEATED VIOLATIONS TAB */}
          {activeTab === 'repeated_violations' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-rose-950/40 p-5 rounded-3xl border border-rose-500/40 text-white shadow-xl">
                <div>
                  <h2 className="text-base sm:text-xl font-extrabold text-rose-300">🚨 Cảnh Báo Học Sinh Vi Phạm 1 Lỗi Quá 2 Lần ({repeatedViolationStudents.length})</h2>
                  <p className="text-xs text-rose-200 mt-1">Hệ thống tự động phát hiện học sinh vi phạm cùng 1 lỗi nề nếp từ 2 lần trở lên để GVCN nhắc nhở kịp thời.</p>
                </div>
                <button onClick={() => handleResetSection("Vi phạm")} className="px-3 py-2 bg-slate-800 text-white font-bold text-xs rounded-xl self-start sm:self-auto">🔄 Reset</button>
              </div>

              {repeatedViolationStudents.length === 0 ? (
                <div className="p-10 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed text-slate-400 space-y-2">
                  <div className="text-4xl">🎉</div>
                  <h3 className="font-extrabold text-sm text-emerald-500">Tuyệt vời! Không có học sinh nào tái phạm quá 2 lần.</h3>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {repeatedViolationStudents.map((item: any, idx: number) => {
                    const st = students.find((s: any) => s.id === item.studentId);
                    return (
                      <div key={idx} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-rose-500/40 shadow-md space-y-3">
                        <div className="flex items-center gap-3">
                          <img src={st ? st.avatarUrl : ''} className="w-12 h-12 rounded-xl object-cover border-2 border-rose-500" alt="Student" />
                          <div>
                            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{item.studentName}</h3>
                            <span className="px-2 py-0.5 bg-rose-500/20 text-rose-600 dark:text-rose-300 font-extrabold text-[10px] rounded-md">
                              Vi phạm lỗi "{item.type}": {item.count} lần
                            </span>
                          </div>
                        </div>
                        <div className="p-2.5 bg-rose-50 dark:bg-rose-950/50 rounded-xl text-xs text-rose-800 dark:text-rose-200">
                          <strong>Các ngày ghi nhận:</strong> {item.dates.join(', ')}
                        </div>
                        {st && (
                          <a href={`tel:${(st && st.family ? (st && st.family ? st.family.motherPhone : "") : "")}`} className="block py-2 bg-rose-600 text-white font-extrabold text-xs rounded-xl text-center shadow-md">
                            📞 Liên Hệ Phụ Huynh Mẹ ({(st && st.family ? (st && st.family ? st.family.motherPhone : "") : "")})
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ACADEMIC DECLINE TAB */}
          {activeTab === 'academic_decline' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-orange-950/40 p-5 rounded-3xl border border-orange-500/40 text-white shadow-xl">
                <div>
                  <h2 className="text-base sm:text-xl font-extrabold text-orange-300">📉 Cảnh Báo Học Sinh Học Tập Sa Sút Hằng Tuần ({academicDeclineList.length})</h2>
                  <p className="text-xs text-orange-200 mt-1">Danh sách học sinh sa sút phong độ học tập dựa trên dữ liệu ghi nhận của GVCN.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowAddDeclineModal(true)} className="px-4 py-2 bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-lg">+ Ghi Nhận Sa Sút</button>
                  <button onClick={() => handleResetSection('Học tập sa sút')} className="px-3 py-2 bg-slate-800 text-white font-bold text-xs rounded-xl">🔄 Reset</button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {academicDeclineList.map((ad: any) => {
                  const st = students.find((s: any) => s.id === ad.studentId);
                  return (
                    <div key={ad.id} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-orange-500/40 shadow-md space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={st ? st.avatarUrl : ''} className="w-12 h-12 rounded-xl object-cover border-2 border-orange-500" alt="Student" />
                          <div>
                            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{ad.studentName}</h3>
                            <span className="px-2 py-0.5 bg-orange-500/20 text-orange-600 dark:text-orange-300 font-extrabold text-[10px] rounded-md">Môn: {ad.subject}</span>
                          </div>
                        </div>
                        <button onClick={() => handleDeleteDecline(ad.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl text-xs font-bold">🗑️ Xóa</button>
                      </div>
                      <div className="p-3 bg-orange-50 dark:bg-orange-950/50 rounded-xl text-xs text-orange-900 dark:text-orange-200">
                        <strong>Lý do sa sút:</strong> {ad.reason}
                      </div>
                      {st && (
                        <a href={`tel:${(st && st.family ? (st && st.family ? st.family.motherPhone : "") : "")}`} className="block py-2 bg-orange-600 text-white font-extrabold text-xs rounded-xl text-center shadow-md">
                          📞 Liên Hệ Phụ Huynh Mẹ ({(st && st.family ? (st && st.family ? st.family.motherPhone : "") : "")})
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* REWARDS TAB */}
          {activeTab === 'rewards' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border">
                <div>
                  <h2 className="text-base sm:text-xl font-extrabold text-emerald-600">🏆 Thi Đua & Khen Thưởng ({rewards.length})</h2>
                  <p className="text-xs text-slate-400">Tuyên dương những nỗ lực xuất sắc của học sinh Lớp 9/5_CS5</p>
                </div>
                                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={() => setShowAddRewardModal(true)} className="px-4 py-2 bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-lg">+ Thêm Khen Thưởng</button>
                  <button onClick={() => handleResetSection("Khen thưởng")} className="px-3 py-2 bg-slate-800 text-white font-bold text-xs rounded-xl">🔄 Khôi Phục Ban Đầu</button>
                  <button onClick={handleResetDisciplineRewards} className="px-3 py-2 bg-rose-950 text-rose-300 font-bold text-xs rounded-xl border border-rose-800">🗑️ Reset Xóa Xạch</button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {rewards.map((r: any) => (
                  <div key={r.id} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-emerald-500/30 flex justify-between items-start shadow-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white">{r.studentName}</span>
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-extrabold text-[10px] rounded-md">+{r.bonusPoints} điểm</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{r.reason}</p>
                    </div>
                    <button onClick={() => handleDeleteReward(r.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl text-xs font-bold">🗑️ Xóa</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIOLATIONS TAB */}
          {activeTab === 'violations' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border">
                <div>
                  <h2 className="text-base sm:text-xl font-extrabold text-rose-600">⚠️ Theo Dõi Vi Phạm Nề Nếp ({violations.length})</h2>
                  <p className="text-xs text-slate-400">Ghi nhận và nhắc nhở vi phạm kỷ luật của học sinh</p>
                </div>
                                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={() => setShowAddViolationModal(true)} className="px-4 py-2 bg-rose-600 text-white font-extrabold text-xs rounded-xl shadow-lg">+ Thêm Vi Phạm</button>
                  <button onClick={() => handleResetSection("Vi phạm")} className="px-3 py-2 bg-slate-800 text-white font-bold text-xs rounded-xl">🔄 Khôi Phục Ban Đầu</button>
                  <button onClick={handleResetDisciplineRewards} className="px-3 py-2 bg-rose-950 text-rose-300 font-bold text-xs rounded-xl border border-rose-800">🗑️ Reset Xóa Xạch</button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {violations.map((v: any) => (
                  <div key={v.id} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-rose-500/30 flex justify-between items-start shadow-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white">{v.studentName}</span>
                        <span className="px-2 py-0.5 bg-rose-500/20 text-rose-600 dark:text-rose-300 font-extrabold text-[10px] rounded-md">{v.type} ({v.severity})</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{v.description}</p>
                    </div>
                    <button onClick={() => handleDeleteViolation(v.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl text-xs font-bold">🗑️ Xóa</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PARENTS TAB */}
          {activeTab === 'parents' && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border">
                <h2 className="text-base sm:text-xl font-extrabold">📞 Danh Bạ Phụ Huynh Lớp 9/5_CS5</h2>
                <p className="text-xs text-slate-400">Liên lạc trực tiếp 1-Touch với phụ huynh học sinh</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {students.map((s: any) => (
                  <div key={s.id} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border space-y-3">
                    <div className="flex items-center gap-3 border-b pb-2">
                      <img src={s.avatarUrl} className="w-10 h-10 rounded-xl object-cover" alt="Student" />
                      <div>
                        <h3 className="font-bold text-xs text-slate-900 dark:text-white">{s.fullName}</h3>
                        <span className="text-[10px] text-slate-400">STT #{s.stt}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                        <div>
                          <span className="font-bold block">Bố: {s.family.fatherName}</span>
                          <span className="text-[10px] text-slate-400">{s.family.fatherPhone}</span>
                        </div>
                        <a href={`tel:${s.family.fatherPhone}`} className="px-3 py-1 bg-teal-500/20 text-teal-700 dark:text-teal-300 font-extrabold text-xs rounded-xl">📞 Gọi</a>
                      </div>

                      <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                        <div>
                          <span className="font-bold block">Mẹ: {s.family.motherName}</span>
                          <span className="text-[10px] text-slate-400">{s.family.motherPhone}</span>
                        </div>
                        <a href={`tel:${s.family.motherPhone}`} className="px-3 py-1 bg-teal-500/20 text-teal-700 dark:text-teal-300 font-extrabold text-xs rounded-xl">📞 Gọi</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          
          {/* TIMETABLE TAB */}
          {activeTab === ('tkb' as any) && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 p-5 rounded-3xl border border-teal-500/40 text-white shadow-xl">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-teal-500 text-slate-950 font-black text-[10px] rounded-full uppercase">Lớp 9/5_CS5</span>
                    <span className="text-xs text-teal-300 font-bold">Năm học 2026 - 2027</span>
                  </div>
                  <h2 className="text-base sm:text-2xl font-black text-white mt-1">📅 THỜI KHÓA BIỂU HỌC TẬP LỚP 9/5</h2>
                  <p className="text-xs text-slate-300">GVCN: <strong>Võ Thiện Hảo</strong> (0387806954) • Trường TH-THCS-THPT Sky-Line</p>
                </div>
                <button 
                  onClick={() => setShowTkbLightbox(true)}
                  className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2 transition"
                >
                  <span>🔍</span>
                  <span>Xem Ảnh Gốc TKB</span>
                </button>
              </div>

              {/* TIMETABLE TABLE */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-slate-900 text-white border-b border-slate-800">
                        <th className="p-3 font-extrabold text-center w-16">Tiết</th>
                        <th className="p-3 font-extrabold w-28">Thời gian</th>
                        <th className="p-3 font-extrabold text-center text-teal-300">Thứ Hai</th>
                        <th className="p-3 font-extrabold text-center text-teal-300">Thứ Ba</th>
                        <th className="p-3 font-extrabold text-center text-teal-300">Thứ Tư</th>
                        <th className="p-3 font-extrabold text-center text-teal-300">Thứ Năm</th>
                        <th className="p-3 font-extrabold text-center text-teal-300">Thứ Sáu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold">
                      {scheduleData.map((row: any, idx: number) => {
                        if (row.isBreak) {
                          return (
                            <tr key={idx} className="bg-amber-500/10 dark:bg-amber-500/5 text-amber-900 dark:text-amber-300 font-extrabold text-center">
                              <td className="p-2 text-center text-[10px] uppercase font-black" colSpan={2}>{row.period}</td>
                              <td className="p-2 text-xs" colSpan={5}>{row.label} ({row.time})</td>
                            </tr>
                          );
                        }
                        return (
                          <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                            <td className="p-3 text-center font-extrabold text-slate-500 dark:text-slate-400">{row.period}</td>
                            <td className="p-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">{row.time}</td>
                            <td className="p-2 text-center font-extrabold">
                              <span className="px-2.5 py-1 rounded-xl bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30 block shadow-sm">{row.t2}</span>
                            </td>
                            <td className="p-2 text-center font-extrabold">
                              <span className="px-2.5 py-1 rounded-xl bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 block shadow-sm">{row.t3}</span>
                            </td>
                            <td className="p-2 text-center font-extrabold">
                              <span className="px-2.5 py-1 rounded-xl bg-pink-500/15 text-pink-700 dark:text-pink-300 border border-pink-500/30 block shadow-sm">{row.t4}</span>
                            </td>
                            <td className="p-2 text-center font-extrabold">
                              <span className="px-2.5 py-1 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 block shadow-sm">{row.t5}</span>
                            </td>
                            <td className="p-2 text-center font-extrabold">
                              <span className="px-2.5 py-1 rounded-xl bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30 block shadow-sm">{row.t6}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* BIRTHDAY TAB */}
          {activeTab === 'birthday' && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border">
                <h2 className="text-base sm:text-xl font-extrabold text-amber-500">🎂 Nhắc Sinh Nhật Học Sinh Tháng {currentMonth}</h2>
                <p className="text-xs text-slate-400">Danh sách các em học sinh có ngày sinh trong tháng này</p>
              </div>

              {birthdayStudentsThisMonth.length === 0 ? (
                <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border text-slate-400 text-xs font-bold">
                  Không có học sinh nào sinh nhật trong tháng này.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {birthdayStudentsThisMonth.map((s: any) => (
                    <div key={s.id} className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={s.avatarUrl} className="w-12 h-12 rounded-2xl object-cover border-2 border-amber-400" alt="Student" />
                        <div>
                          <h3 className="font-bold text-xs text-amber-900 dark:text-amber-200">{s.fullName}</h3>
                          <p className="text-[11px] text-amber-700 dark:text-amber-400">Sinh ngày: 🎂 {s.dob}</p>
                        </div>
                      </div>
                      <button onClick={() => alert(`🎉 Gửi lời chúc mừng sinh nhật đến em ${s.fullName}!`)} className="px-3 py-1.5 bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl">
                        🎉 Chúc Mừng
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>

        {/* BOTTOM IPHONE NAVIGATION DOCK BAR */}
        <nav 
          className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-800 px-2 pt-2 flex items-center justify-around z-40"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 16px) + 6px)' }}
        >
          {[
            { id: 'dashboard', icon: '🏠', label: 'Trang chủ' },
            { id: 'students', icon: '👨‍🎓', label: 'Học sinh' },
            { id: 'rewards', icon: '🏆', label: 'Khen thưởng' },
            { id: 'violations', icon: '⚠️', label: 'Vi phạm' },
            { id: 'more', icon: '☰', label: 'Menu thêm' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'more') setMobileMenuOpen(true);
                else setActiveTab(item.id);
              }}
              className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition ${activeTab === item.id && item.id !== 'more' ? 'text-teal-400 font-bold' : 'text-slate-400'}`}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="text-[9px] mt-1 font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* STUDENT PROFILE MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 z-[110]">
          <div className="bg-slate-900 text-white w-full max-w-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-800 shadow-2xl">
            <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 font-mono font-bold text-xs">
                  STT #{selectedStudent.stt} • {selectedStudent.studentId}
                </span>
                <h2 className="text-lg font-extrabold">{selectedStudent.fullName}</h2>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="text-slate-400 hover:text-white font-bold p-1 text-lg">✕</button>
            </div>

            <div className="p-5 overflow-y-auto custom-scrollbar space-y-5">
                            <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <div className="relative group shrink-0 text-center">
                  <img src={selectedStudent.avatarUrl} className="w-20 h-20 rounded-2xl object-cover border-2 border-teal-500 shadow-lg mx-auto" alt="Student" />
                  <label className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 font-extrabold text-[11px] rounded-xl border border-teal-500/40 cursor-pointer transition">
                    <span>📸 Đổi Ảnh</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUploadStudentAvatar(e, selectedStudent.id)} />
                  </label>
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <h3 className="font-extrabold text-base">{selectedStudent.fullName}</h3>
                  <p className="text-xs text-slate-400">Tổ {selectedStudent.stt % 4 + 1} • Giới tính: {selectedStudent.gender} • Sinh ngày: {selectedStudent.dob}</p>
                  <div className="text-xs text-teal-400 font-bold">Mẹ: {(selectedStudent && selectedStudent.family ? selectedStudent.family.motherName : "")} ({(selectedStudent && selectedStudent.family ? selectedStudent.family.motherPhone : "")})</div>
                  <div className="text-xs text-slate-200 font-semibold">🏠 <strong>Địa chỉ nhà:</strong> {selectedStudent.address}</div>
                </div>
              </div>

              {/* 📌 DEDICATED PRIVATE NOTE SECTION */}
              <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 p-4 rounded-2xl border border-amber-500/40 space-y-3 shadow-lg">
                <span className="font-extrabold text-xs text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                  📌 Ghi Chú Đặc Điểm Riêng Của Học Sinh (Dành cho Thầy Võ Thiện Hảo)
                </span>
                <textarea
                  rows={3}
                  value={editingPrivateNote}
                  onChange={e => setEditingPrivateNote(e.target.value)}
                  placeholder="Nhập những điểm riêng biệt (tính cách, tư duy, năng khiếu, lưu ý nề nếp / gia đình)..."
                  className="w-full p-3 bg-slate-950/80 text-amber-100 text-xs rounded-xl border border-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-400"
                ></textarea>
                <div className="flex justify-end">
                  <button onClick={handleSavePrivateNote} className="px-4 py-2 bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg">
                    💾 Lưu Ghi Chú Đặc Điểm
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                <a href={`tel:${(selectedStudent && selectedStudent.family ? (selectedStudent && selectedStudent.family ? selectedStudent.family.motherPhone : "") : "")}`} className="px-4 py-2 bg-teal-600 text-white font-bold text-xs rounded-xl">
                  📞 Gọi Phụ Huynh Mẹ ({(selectedStudent && selectedStudent.family ? (selectedStudent && selectedStudent.family ? selectedStudent.family.motherPhone : "") : "")})
                </a>
                <button onClick={() => handleDeleteStudent(selectedStudent.id)} className="px-3 py-2 bg-rose-950 text-rose-300 border border-rose-800 font-bold text-xs rounded-xl">
                  🗑️ Xóa HS Này
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
      {/* LOGIN & CLASS SWITCHER MODAL */}
      {showLoginModal && (
        <LoginModal
          teachers={teachersList}
          onLogin={handleSwitchTeacher}
          onClose={() => setShowLoginModal(false)}
        />
      )}

      {/* TEACHER MANAGEMENT ADMIN MODAL */}
      {showTeacherMgmtModal && (
        <TeacherManagementModal
          teachers={teachersList}
          onAddTeacher={handleAddTeacher}
          onUpdateTeacher={handleUpdateTeacher}
          onDeleteTeacher={handleDeleteTeacher}
          onClose={() => setShowTeacherMgmtModal(false)}
        />
      )}

      {/* TKB LIGHTBOX MODAL */}
      {showTkbLightbox && (
        <div className="fixed inset-0 z-[300] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-teal-500/40 shadow-2xl space-y-3 p-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">📅</span>
                <div>
                  <h3 className="font-extrabold text-sm text-white">ẢNH GỐC THỜI KHÓA BIỂU LỚP 9/5</h3>
                  <p className="text-[10px] text-teal-400">Trường TH-THCS-THPT Sky-Line</p>
                </div>
              </div>
              <button onClick={() => setShowTkbLightbox(false)} className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs">✕ Đóng</button>
            </div>
            <div className="max-h-[75vh] overflow-auto rounded-2xl flex justify-center bg-slate-950 p-2">
              <img src="./TKB.jpg" className="max-w-full h-auto object-contain rounded-xl shadow-lg" alt="Thời khóa biểu Lớp 9/5" />
            </div>
            <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
              <span>Vuốt hoặc cuộn để xem ảnh full HD</span>
              <a href="./TKB.jpg" target="_blank" download="TKB_Lop_9_5.jpg" className="px-3 py-1.5 bg-teal-500 text-slate-950 font-extrabold rounded-xl text-xs">Tải Ảnh Về</a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function AppRoot() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <App />
      </AppProvider>
    </ErrorBoundary>
  );
}
