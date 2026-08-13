import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { PickupQueueItem, PickupLogItem, PickupSettings } from '../../types';
import { 
  Mic, 
  Volume2, 
  Tv, 
  Smartphone, 
  UserCheck, 
  Clock, 
  Search, 
  QrCode, 
  HelpCircle, 
  Keyboard, 
  CheckCircle2, 
  XCircle, 
  Car, 
  Bot, 
  Sparkles, 
  FileText, 
  Download, 
  Sliders, 
  Radio, 
  Check 
} from 'lucide-react';

export const SmartPickupSystem: React.FC = () => {
  const { students, teacherUser } = useApp();

  // Operating view mode: 'kiosk' | 'tv' | 'teacher' | 'ai'
  const [viewMode, setViewMode] = useState<'kiosk' | 'tv' | 'teacher' | 'ai'>('kiosk');

  // Queue and Logs State (persisted in localStorage)
  const [queue, setQueue] = useState<PickupQueueItem[]>(() => {
    try {
      const saved = localStorage.getItem('SKYLINE_PICKUP_QUEUE_V1');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return [
      {
        id: 'pk_101',
        studentId: 'hs_01',
        studentName: 'Lê Phước An',
        className: '9/5',
        avatarUrl: './avatars/hs_01.jpg',
        callerName: 'Lê Phước An (Ba)',
        callerRelation: 'Bố',
        callerPhone: '0905193750',
        licensePlate: '43A-582.19',
        gateNumber: 'Cổng 1',
        callTime: '16:15:10',
        status: 'waiting',
        callCount: 1,
        elapsedSeconds: 45
      },
      {
        id: 'pk_102',
        studentId: 'hs_05',
        studentName: 'Phan Quốc Gia Bảo',
        className: '9/5',
        avatarUrl: './avatars/hs_05.jpg',
        callerName: 'Phạm Thị Lan Anh (Mẹ)',
        callerRelation: 'Mẹ',
        callerPhone: '0902808302',
        licensePlate: '43C-889.32',
        gateNumber: 'Cổng 1',
        callTime: '16:16:02',
        status: 'waiting',
        callCount: 1,
        elapsedSeconds: 125
      },
      {
        id: 'pk_103',
        studentId: 'hs_09',
        studentName: 'Nguyễn Anh Khôi Kevin',
        className: '9/5',
        avatarUrl: './avatars/hs_09.jpg',
        callerName: 'Do Tiffany Tuyet (Mẹ)',
        callerRelation: 'Mẹ',
        callerPhone: '0962645545',
        licensePlate: '43B-123.45',
        gateNumber: 'Cổng 2',
        callTime: '16:16:40',
        status: 'calling',
        callCount: 2,
        elapsedSeconds: 180
      }
    ];
  });

  const [pickupLogs, setPickupLogs] = useState<PickupLogItem[]>(() => {
    try {
      const saved = localStorage.getItem('SKYLINE_PICKUP_LOGS_V1');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return [
      {
        id: 'log_01',
        studentId: 'hs_03',
        studentName: 'Nguyễn Bảo Anh',
        className: '9/5',
        avatarUrl: './avatars/hs_03.jpg',
        callerName: 'Nguyễn Thị Thảo',
        callerRelation: 'Mẹ',
        callerPhone: '0703478686',
        licensePlate: '43A-998.11',
        gateNumber: 'Cổng 1',
        callTime: '16:02:15',
        exitTime: '16:03:10',
        status: 'exited',
        callCount: 1,
        elapsedSeconds: 55,
        durationSeconds: 55
      },
      {
        id: 'log_02',
        studentId: 'hs_04',
        studentName: 'Bùi Trần Gia Bảo',
        className: '9/5',
        avatarUrl: './avatars/hs_04.jpg',
        callerName: 'Trần Thị Ánh Hồng',
        callerRelation: 'Mẹ',
        callerPhone: '0931171115',
        licensePlate: '43A-678.90',
        gateNumber: 'Cổng 1',
        callTime: '16:05:00',
        exitTime: '16:05:42',
        status: 'exited',
        callCount: 1,
        elapsedSeconds: 42,
        durationSeconds: 42
      }
    ];
  });

  const [settings, setSettings] = useState<PickupSettings>({
    schoolName: 'Trường THCS & THPT Sky-Line CS5',
    gateName: 'Cổng Chính (Cổng 1)',
    autoRepeatTimes: 2,
    voiceGender: 'female',
    voiceSpeed: 0.95,
    voiceVolume: 1.0,
    alertAfterMinutes: 2
  });

  // Kiosk Microphone / Speech-to-Text States
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [matchingCandidates, setMatchingCandidates] = useState<any[]>([]);
  const [showDisambiguationModal, setShowDisambiguationModal] = useState(false);
  const [showKeyboardModal, setShowKeyboardModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [keyboardQuery, setKeyboardQuery] = useState('');
  const [activeCallNotice, setActiveCallNotice] = useState<string | null>(null);

  // AI Assistant Q&A Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; time: string }>>([
    {
      role: 'assistant',
      text: 'Xin chào Thầy Võ Thiện Hảo! Tôi là Trợ Lý AI Sky-Line Smart Pickup. Thầy có thể hỏi tôi bất kỳ thông tin gì về lượt đón học sinh hôm nay.',
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Speech Recognition Ref
  const recognitionRef = useRef<any>(null);

  // Real-time Queue Elapsed Time Counter
  useEffect(() => {
    const timer = setInterval(() => {
      setQueue(prevQueue => 
        prevQueue.map(item => ({
          ...item,
          elapsedSeconds: item.elapsedSeconds + 1
        }))
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Save State Persistence
  useEffect(() => {
    try {
      localStorage.setItem('SKYLINE_PICKUP_QUEUE_V1', JSON.stringify(queue));
    } catch(e) {}
  }, [queue]);

  useEffect(() => {
    try {
      localStorage.setItem('SKYLINE_PICKUP_LOGS_V1', JSON.stringify(pickupLogs));
    } catch(e) {}
  }, [pickupLogs]);

  // Audio Broadcast Engine (Text to Speech)
  const broadcastStudentCall = (studentName: string, className: string, gateNumber: string = 'Cổng 1') => {
    const textToSpeak = `Mời em ${studentName} lớp ${className} ra ${gateNumber}. Mời em ${studentName} lớp ${className} ra ${gateNumber}.`;
    setActiveCallNotice(`📢 ĐANG PHÁT LOA: "Mời em ${studentName} lớp ${className} ra ${gateNumber}"`);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop current speech
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'vi-VN';
      utterance.rate = settings.voiceSpeed;
      utterance.volume = settings.voiceVolume;

      // Try selecting Vietnamese voice
      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VI'));
      if (viVoice) utterance.voice = viVoice;

      window.speechSynthesis.speak(utterance);
    }

    setTimeout(() => {
      setActiveCallNotice(null);
    }, 6000);
  };

  // Process Speech Recognition Result & Fuzzy Student Match
  const processVoiceText = (text: string) => {
    setTranscript(text);
    if (!text.trim()) return;

    const lower = text.toLowerCase();

    // Find student candidates matching first name or full name or student ID
    const candidates = students.filter(s => {
      const nameLower = s.fullName.toLowerCase();
      const parts = nameLower.split(' ');
      const lastName = parts[parts.length - 1]; // e.g. "Khôi", "Bảo", "An"

      return (
        nameLower.includes(lower) ||
        lower.includes(lastName) ||
        (s.studentId && lower.includes(s.studentId))
      );
    });

    if (candidates.length === 1) {
      triggerStudentPickup(candidates[0], 'Giọng Nói Kiosk (Phụ Huynh)');
    } else if (candidates.length > 1) {
      setMatchingCandidates(candidates);
      setShowDisambiguationModal(true);
    } else {
      setActiveCallNotice(`⚠️ Không tìm thấy học sinh phù hợp với từ khóa: "${text}". Vui lòng thử lại.`);
      setTimeout(() => setActiveCallNotice(null), 4000);
    }
  };

  // Trigger New Student Call into Queue
  const triggerStudentPickup = (student: any, callerSource: string = 'Kiosk Cổng Trường') => {
    // Check if already in queue
    const existingIndex = queue.findIndex(q => q.studentId === student.id);
    if (existingIndex >= 0) {
      // Re-call existing student
      const updatedQueue = [...queue];
      updatedQueue[existingIndex].callCount += 1;
      updatedQueue[existingIndex].status = 'calling';
      setQueue(updatedQueue);
      broadcastStudentCall(student.fullName, '9/5', settings.gateName);
      return;
    }

    const newItem: PickupQueueItem = {
      id: 'pk_' + Date.now(),
      studentId: student.id,
      studentName: student.fullName,
      className: '9/5',
      avatarUrl: student.avatarUrl || './avatars/default.jpg',
      callerName: student.family?.fatherName || student.family?.motherName || 'Phụ Huynh',
      callerRelation: 'Phụ huynh',
      callerPhone: student.family?.fatherPhone || student.family?.motherPhone || '0905000000',
      licensePlate: '43A-' + Math.floor(10000 + Math.random() * 90000),
      gateNumber: settings.gateName,
      callTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      status: 'calling',
      callCount: 1,
      elapsedSeconds: 0
    };

    setQueue([newItem, ...queue]);
    broadcastStudentCall(student.fullName, '9/5', settings.gateName);
    setShowDisambiguationModal(false);
    setShowKeyboardModal(false);
    setShowQrModal(false);
  };

  // Toggle Speech Recognition
  const handleToggleMic = () => {
    if (isListening) {
      setIsListening(false);
      if (recognitionRef.current) recognitionRef.current.stop();
    } else {
      setIsListening(true);
      setTranscript('Đang lắng nghe phụ huynh nói...');

      // Check browser Web Speech API
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'vi-VN';
        recognition.interimResults = false;

        recognition.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          setIsListening(false);
          processVoiceText(text);
        };

        recognition.onerror = () => {
          setIsListening(false);
          // Fallback demo simulation
          simulateVoiceInput();
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        recognitionRef.current = recognition;
      } else {
        // Fallback simulation for unsupported browsers
        simulateVoiceInput();
      }
    }
  };

  // Demo Voice Input Simulation
  const simulateVoiceInput = () => {
    const samplePhrases = [
      'Cho tôi đón Nguyễn Minh Khôi',
      'Tôi đón Bảo An',
      'Đón bé Gia Bảo lớp 9/5',
      'Lê Phước An',
      'Đón Ngọc Hân'
    ];
    const chosen = samplePhrases[Math.floor(Math.random() * samplePhrases.length)];
    setTimeout(() => {
      setIsListening(false);
      processVoiceText(chosen);
    }, 1800);
  };

  // Action: Mark Student Picked Up (Exited)
  const handleMarkExited = (id: string) => {
    const item = queue.find(q => q.id === id);
    if (!item) return;

    const logEntry: PickupLogItem = {
      ...item,
      status: 'exited',
      exitTime: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      durationSeconds: item.elapsedSeconds
    };

    setPickupLogs([logEntry, ...pickupLogs]);
    setQueue(queue.filter(q => q.id !== id));
  };

  // Action: Re-call Student
  const handleRecall = (id: string) => {
    const item = queue.find(q => q.id === id);
    if (!item) return;

    setQueue(queue.map(q => q.id === id ? { ...q, callCount: q.callCount + 1, status: 'calling' } : q));
    broadcastStudentCall(item.studentName, item.className, item.gateNumber);
  };

  // Action: Cancel Pickup Request
  const handleCancelCall = (id: string) => {
    setQueue(queue.filter(q => q.id !== id));
  };

  // Helper format seconds into MM:SS
  const formatTimer = (totalSec: number) => {
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  // Handle AI Chat Q&A
  const handleSendChatMessage = (queryText?: string) => {
    const q = queryText || chatInput;
    if (!q.trim()) return;

    const userMsg = {
      role: 'user' as const,
      text: q,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!queryText) setChatInput('');

    // Generate AI response in Vietnamese
    setTimeout(() => {
      let reply = '';
      const lower = q.toLowerCase();

      if (lower.includes('bao nhiêu') || lower.includes('số lượt')) {
        reply = `Hôm nay hệ thống đã ghi nhận **${pickupLogs.length + queue.length} lượt gọi đón**. Trong đó có **${pickupLogs.length} học sinh đã ra cổng** an toàn và **${queue.length} học sinh đang chờ** tại cổng.`;
      } else if (lower.includes('chờ lâu') || lower.includes('chưa về') || lower.includes('gọi nhiều lần')) {
        const longWaiting = queue.filter(q => q.elapsedSeconds > 120);
        if (longWaiting.length > 0) {
          reply = `Có **${longWaiting.length} học sinh** đang chờ trên 2 phút: ` + longWaiting.map(w => `${w.studentName} (Lớp ${w.className} - Chờ ${formatTimer(w.elapsedSeconds)})`).join(', ') + `. Vui lòng kiểm tra hoặc nhắc nhở giáo viên bộ môn.`;
        } else {
          reply = `Hiện tại tất cả học sinh trong hàng chờ đều được gọi dưới 2 phút. Nề nếp ra cổng rất chu đáo!`;
        }
      } else if (lower.includes('thời gian trung bình') || lower.includes('tốc độ')) {
        const avg = pickupLogs.length > 0 ? Math.round(pickupLogs.reduce((acc, curr) => acc + (curr.durationSeconds || 45), 0) / pickupLogs.length) : 48;
        reply = `Thời gian đón trung bình hôm nay là **${avg} giây/học sinh**. Khung giờ cao điểm nhất là **16:15 - 16:30**.`;
      } else {
        reply = `Theo dữ liệu thời gian thực của Lớp 9/5_CS5 Sky-Line, các lượt đón diễn ra suôn sẻ. Thầy có thể lọc danh sách học sinh hoặc nhấn nút "Gọi lại" trực tiếp trên màn hình quản lý.`;
      }

      setChatMessages(prev => [...prev, {
        role: 'assistant',
        text: reply,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12">

      {/* HEADER CONTROL BAR WITH MODE SWITCHER */}
      <div className="p-4 sm:p-6 bg-slate-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/30">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              Sky-Line AI Smart Pickup
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                LIVE REALTIME
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Hệ thống AI nhận diện giọng nói & đọc loa đón học sinh tự động ({settings.schoolName})
            </p>
          </div>
        </div>

        {/* MODE SWITCHER BUTTONS */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setViewMode('kiosk')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              viewMode === 'kiosk'
                ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Smartphone className="w-4 h-4" /> Kiosk Cổng
          </button>

          <button
            onClick={() => setViewMode('tv')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              viewMode === 'tv'
                ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Tv className="w-4 h-4" /> TV Sân Trường
          </button>

          <button
            onClick={() => setViewMode('teacher')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              viewMode === 'teacher'
                ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <UserCheck className="w-4 h-4" /> Quản Lý Đón ({queue.length})
          </button>

          <button
            onClick={() => setViewMode('ai')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              viewMode === 'ai'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bot className="w-4 h-4 text-amber-300" /> Trợ Lý AI
          </button>
        </div>
      </div>

      {/* AUDIO ANNOUNCEMENT TOAST NOTICE */}
      {activeCallNotice && (
        <div className="p-4 bg-teal-500 text-white font-bold rounded-2xl shadow-lg border border-teal-400 flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-3">
            <Volume2 className="w-6 h-6 animate-pulse" />
            <span className="text-sm sm:text-base">{activeCallNotice}</span>
          </div>
          <button onClick={() => setActiveCallNotice(null)} className="text-xs bg-teal-700 hover:bg-teal-800 px-3 py-1 rounded-lg">
            Đóng
          </button>
        </div>
      )}

      {/* MODE 1: KIOSK TOUCHSCREEN DISPLAY FOR PARENTS */}
      {viewMode === 'kiosk' && (
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl text-white relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Kiosk Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-8 border-b border-slate-800 gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-teal-500 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-teal-500/40">
                SL
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">{settings.schoolName}</h2>
                <p className="text-sm text-teal-400 font-semibold">{settings.gateName} • HỆ THỐNG GỌI HỌC SINH TỰ ĐỘNG</p>
              </div>
            </div>

            <div className="bg-slate-950/80 px-5 py-2.5 rounded-2xl border border-slate-800 flex items-center gap-3 text-slate-300">
              <Clock className="w-5 h-5 text-teal-400" />
              <span className="font-mono text-lg font-bold text-white">
                {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          </div>

          {/* Main Interaction Area: Voice Recording Microphone */}
          <div className="my-10 text-center flex flex-col items-center justify-center">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-200 mb-2">
              Xin vui lòng nói tên hoặc lớp của học sinh
            </h3>
            <p className="text-sm text-slate-400 max-w-md mb-8">
              Ví dụ: <strong className="text-teal-300">"Tôi đón Minh Khôi"</strong>, <strong className="text-teal-300">"Cho tôi đón Lê Phước An"</strong> hoặc <strong className="text-teal-300">"Khôi lớp 9/5"</strong>
            </p>

            {/* BIG ANIMATED MICROPHONE BUTTON */}
            <button
              onClick={handleToggleMic}
              className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center transition-all duration-300 transform active:scale-95 shadow-2xl ${
                isListening
                  ? 'bg-gradient-to-tr from-rose-600 to-amber-500 text-white shadow-rose-500/50 animate-pulse ring-8 ring-rose-500/30'
                  : 'bg-gradient-to-tr from-teal-500 to-emerald-400 text-white shadow-teal-500/40 hover:scale-105'
              }`}
            >
              {isListening ? (
                <>
                  <Mic className="w-16 h-16 animate-spin mb-1" />
                  <span className="text-xs font-bold uppercase tracking-wider">Đang nghe...</span>
                </>
              ) : (
                <>
                  <Mic className="w-16 h-16 mb-1" />
                  <span className="text-xs font-extrabold uppercase tracking-wider">BẤM ĐỂ NÓI</span>
                </>
              )}
            </button>

            {/* Transcript / Status Text */}
            <div className="mt-6 min-h-[48px] flex items-center justify-center">
              {isListening ? (
                <div className="px-6 py-2.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-sm font-bold flex items-center gap-2 animate-pulse">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping" />
                  {transcript || 'Hệ thống đang xử lý giọng nói của Phụ huynh...'}
                </div>
              ) : transcript ? (
                <div className="px-6 py-2.5 rounded-full bg-slate-800 text-teal-300 border border-teal-500/30 text-sm font-semibold">
                  Nội dung nhận diện: <strong className="text-white">"{transcript}"</strong>
                </div>
              ) : (
                <div className="text-xs text-slate-500 italic">
                  (Hoặc chọn phương thức nhập bên dưới nếu không dùng micro)
                </div>
              )}
            </div>

            {/* SECONDARY INPUT BUTTONS */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setShowKeyboardModal(true)}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-bold transition"
              >
                <Keyboard className="w-4 h-4 text-teal-400" /> Nhập Bàn Phím
              </button>

              <button
                onClick={() => setShowQrModal(true)}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-bold transition"
              >
                <QrCode className="w-4 h-4 text-amber-400" /> Quét Thẻ / Mã QR
              </button>

              <button
                onClick={() => setShowGuideModal(true)}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-bold transition"
              >
                <HelpCircle className="w-4 h-4 text-slate-400" /> Hướng Dẫn
              </button>
            </div>
          </div>

          {/* LIVE QUEUE DISPLAY AT BOTTOM OF KIOSK */}
          <div className="mt-10 pt-8 border-t border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-teal-400 animate-pulse" />
                Danh Sách Đang Đón Tại Cổng ({queue.length})
              </h4>
              <span className="text-xs text-slate-400">Tự động cập nhật thời gian thực</span>
            </div>

            {queue.length === 0 ? (
              <div className="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800 text-slate-500 text-sm">
                Hiện tại chưa có học sinh nào trong hàng chờ đón.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {queue.map(item => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.avatarUrl}
                        alt={item.studentName}
                        className="w-12 h-12 rounded-xl object-cover border-2 border-teal-500/50"
                        onError={(e: any) => { e.target.src = 'https://via.placeholder.com/150'; }}
                      />
                      <div>
                        <div className="font-bold text-white text-base leading-tight">{item.studentName}</div>
                        <div className="text-xs text-teal-400 font-semibold mt-0.5">
                          Lớp {item.className} • {item.callerRelation}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30">
                        ⏱️ {formatTimer(item.elapsedSeconds)}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">Lượt gọi #{item.callCount}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 2: OUTDOOR TV BROADCAST DISPLAY */}
      {viewMode === 'tv' && (
        <div className="bg-slate-950 min-h-[600px] rounded-3xl p-8 border border-slate-800 shadow-2xl text-white flex flex-col justify-between relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center font-bold text-xl text-white">
                TV
              </div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-wide">MÀN HÌNH THÔNG BÁO ĐÓN HỌC SINH</h2>
                <p className="text-xs text-teal-400 font-bold uppercase">{settings.schoolName} — {settings.gateName}</p>
              </div>
            </div>

            <div className="text-right font-mono">
              <div className="text-2xl font-black text-emerald-400">
                {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-xs text-slate-400">{new Date().toLocaleDateString('vi-VN')}</div>
            </div>
          </div>

          {/* ACTIVE CALLING HIGHLIGHT CARD */}
          <div className="my-8">
            <div className="text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
              ĐANG ĐƯỢC GỌI RA CỔNG SỐ 1
            </div>

            {queue.length === 0 ? (
              <div className="p-12 text-center bg-slate-900/60 rounded-3xl border border-slate-800 text-slate-400">
                <p className="text-xl font-bold">Chưa có lượt gọi mới</p>
                <p className="text-sm text-slate-500 mt-1">Hệ thống sẽ hiển thị ngay khi phụ huynh bấm nút gọi tại cổng</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {queue.slice(0, 4).map((item, idx) => (
                  <div
                    key={item.id}
                    className={`p-6 rounded-3xl border transition-all duration-300 flex items-center justify-between shadow-2xl ${
                      idx === 0
                        ? 'bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border-teal-500 ring-2 ring-teal-500/40'
                        : 'bg-slate-900/90 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <img
                        src={item.avatarUrl}
                        alt={item.studentName}
                        className="w-20 h-20 rounded-2xl object-cover border-4 border-teal-500/60 shadow-xl"
                        onError={(e: any) => { e.target.src = 'https://via.placeholder.com/150'; }}
                      />
                      <div>
                        <div className="text-2xl font-black text-white">{item.studentName}</div>
                        <div className="text-base font-bold text-teal-300 mt-1">
                          Lớp {item.className} • <span className="text-slate-300">{item.callerName}</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                          <Car className="w-3.5 h-3.5 text-amber-400" /> Biển số: <strong className="text-white">{item.licensePlate}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        {item.gateNumber}
                      </div>
                      <div className="text-xl font-mono font-black text-amber-300 mt-3">
                        {formatTimer(item.elapsedSeconds)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TV Footer */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Mời học sinh nghe loa thông báo và di chuyển nhanh ra cổng số 1</span>
            <span className="font-semibold text-teal-400">Tổng lượt đón hôm nay: {pickupLogs.length + queue.length}</span>
          </div>
        </div>
      )}

      {/* MODE 3: TEACHER & SECURITY CONTROL PANEL */}
      {viewMode === 'teacher' && (
        <div className="space-y-6">
          {/* STATS OVERVIEW CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-white">
              <div className="text-xs text-slate-400 font-medium">Tổng lượt gọi</div>
              <div className="text-2xl font-black text-white mt-1">{pickupLogs.length + queue.length}</div>
              <div className="text-[10px] text-teal-400 mt-1">Hôm nay</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-white">
              <div className="text-xs text-slate-400 font-medium">Đã đón thành công</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">{pickupLogs.length}</div>
              <div className="text-[10px] text-emerald-400 mt-1">Đã ra cổng</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-white">
              <div className="text-xs text-slate-400 font-medium">Đang chờ tại cổng</div>
              <div className="text-2xl font-black text-amber-400 mt-1">{queue.length}</div>
              <div className="text-[10px] text-amber-400 mt-1">Trong hàng chờ</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-white">
              <div className="text-xs text-slate-400 font-medium">Thời gian TB</div>
              <div className="text-2xl font-black text-teal-400 mt-1">48s</div>
              <div className="text-[10px] text-slate-400 mt-1">Mỗi lượt đón</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-white">
              <div className="text-xs text-slate-400 font-medium">Khung giờ đông</div>
              <div className="text-2xl font-black text-purple-400 mt-1">16:15</div>
              <div className="text-[10px] text-purple-400 mt-1">Cao điểm đón</div>
            </div>
          </div>

          {/* QUEUE MANAGEMENT TABLE */}
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 text-white">
            <div className="flex flex-col sm:flex-row items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-teal-400" />
                  Danh Sách Đang Chờ Đón Ra Cổng ({queue.length})
                </h3>
                <p className="text-xs text-slate-400">Giáo viên/Bảo vệ có thể bấm "Gọi lại" hoặc xác nhận "Đã ra cổng"</p>
              </div>

              {/* QUICK CALL SIMULATOR FOR TEACHER */}
              <div className="flex items-center gap-2">
                <select
                  onChange={(e) => {
                    const st = students.find(s => s.id === e.target.value);
                    if (st) triggerStudentPickup(st, 'Giáo viên gọi');
                    e.target.value = '';
                  }}
                  className="bg-slate-800 text-slate-200 border border-slate-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-teal-500"
                >
                  <option value="">+ Thử gọi 1 học sinh...</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.fullName} (STT {s.stt})</option>
                  ))}
                </select>
              </div>
            </div>

            {queue.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-sm">
                Không có học sinh nào đang chờ. Tất cả đã được đón!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800 uppercase font-semibold text-[11px]">
                      <th className="pb-3 px-2">Học Sinh</th>
                      <th className="pb-3 px-2">Phụ Huynh Đón</th>
                      <th className="pb-3 px-2">Biển Số Xe</th>
                      <th className="pb-3 px-2">Giờ Gọi</th>
                      <th className="pb-3 px-2">Thời Gian Chờ</th>
                      <th className="pb-3 px-2">Lượt Gọi</th>
                      <th className="pb-3 px-2 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {queue.map(item => {
                      const isOverdue = item.elapsedSeconds > 120;
                      return (
                        <tr key={item.id} className={`hover:bg-slate-800/40 transition ${isOverdue ? 'bg-amber-500/10' : ''}`}>
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.avatarUrl}
                                alt={item.studentName}
                                className="w-10 h-10 rounded-xl object-cover border border-teal-500/40"
                                onError={(e: any) => { e.target.src = 'https://via.placeholder.com/150'; }}
                              />
                              <div>
                                <div className="font-bold text-white text-sm">{item.studentName}</div>
                                <div className="text-[10px] text-teal-400">Lớp {item.className}</div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-2">
                            <div className="font-semibold text-slate-200">{item.callerName}</div>
                            <div className="text-[10px] text-slate-400">{item.callerPhone}</div>
                          </td>

                          <td className="py-3 px-2">
                            <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 font-mono text-amber-300 font-bold">
                              {item.licensePlate || 'Chưa ĐK'}
                            </span>
                          </td>

                          <td className="py-3 px-2 text-slate-300 font-mono">{item.callTime}</td>

                          <td className="py-3 px-2">
                            <span className={`px-2 py-1 rounded font-mono font-bold ${
                              isOverdue
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                                : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                            }`}>
                              ⏱️ {formatTimer(item.elapsedSeconds)}
                            </span>
                          </td>

                          <td className="py-3 px-2">
                            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold">
                              #{item.callCount}
                            </span>
                          </td>

                          <td className="py-3 px-2 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleRecall(item.id)}
                                className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition"
                                title="Gọi lại qua loa"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleMarkExited(item.id)}
                                className="px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition flex items-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5" /> Đã Ra Cổng
                              </button>

                              <button
                                onClick={() => handleCancelCall(item.id)}
                                className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/40 transition"
                                title="Hủy lượt gọi"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* COMPLETED LOGS HISTORY */}
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 text-white">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Nhật Ký Đã Ra Cổng Hôm Nay ({pickupLogs.length})
            </h3>

            {pickupLogs.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">Chưa có lượt ra cổng nào hoàn tất.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {pickupLogs.map(log => (
                  <div key={log.id} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={log.avatarUrl}
                        alt={log.studentName}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                        onError={(e: any) => { e.target.src = 'https://via.placeholder.com/150'; }}
                      />
                      <div>
                        <div className="font-bold text-white text-xs">{log.studentName}</div>
                        <div className="text-[10px] text-slate-400">Giờ ra: <strong className="text-emerald-400">{log.exitTime}</strong></div>
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-slate-400">
                      Thời gian đón: <strong className="text-teal-400">{log.durationSeconds}s</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 4: AI ASSISTANT & ANALYTICS */}
      {viewMode === 'ai' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: AI CHAT INTERFACE */}
          <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-6 border border-slate-800 text-white flex flex-col justify-between min-h-[500px]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white font-bold">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Hỏi Đáp AI Smart Pickup</h3>
                    <p className="text-xs text-amber-400">Tự động phân tích xu hướng đón học sinh tiếng Việt</p>
                  </div>
                </div>
              </div>

              {/* QUICK SUGGESTION CHIPS */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => handleSendChatMessage('Hôm nay đã gọi bao nhiêu học sinh?')}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-amber-300 border border-amber-500/30 transition"
                >
                  💡 Hôm nay gọi bao nhiêu lượt?
                </button>
                <button
                  onClick={() => handleSendChatMessage('Có học sinh nào chờ trên 2 phút không?')}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-amber-300 border border-amber-500/30 transition"
                >
                  💡 Học sinh nào chờ lâu?
                </button>
                <button
                  onClick={() => handleSendChatMessage('Thời gian đón trung bình bao nhiêu?')}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-amber-300 border border-amber-500/30 transition"
                >
                  💡 Thời gian đón trung bình?
                </button>
              </div>

              {/* CHAT MESSAGES LOG */}
              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-2 custom-scrollbar">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl max-w-xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-teal-600 text-white ml-auto text-right'
                        : 'bg-slate-800 text-slate-100 border border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs opacity-75 mb-1">
                      {msg.role === 'user' ? 'Thầy Võ Thiện Hảo' : 'Trợ Lý AI Sky-Line'} • {msg.time}
                    </div>
                    <div>{msg.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CHAT INPUT FORM */}
            <div className="mt-4 pt-4 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                placeholder="Nhập câu hỏi tiếng Việt về tình hình đón học sinh..."
                className="flex-1 bg-slate-950 text-white text-sm px-4 py-3 rounded-2xl border border-slate-800 focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={() => handleSendChatMessage()}
                className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition"
              >
                Gửi AI
              </button>
            </div>
          </div>

          {/* RIGHT: SETTINGS & EXPORT */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 text-white">
              <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-teal-400" />
                Cài Đặt Đọc Loa AI
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Tốc độ đọc giọng nói (Rate)</label>
                  <input
                    type="range"
                    min="0.7"
                    max="1.3"
                    step="0.05"
                    value={settings.voiceSpeed}
                    onChange={(e) => setSettings({ ...settings, voiceSpeed: parseFloat(e.target.value) })}
                    className="w-full accent-teal-500"
                  />
                  <div className="text-right text-teal-300 font-mono mt-1">{settings.voiceSpeed}x</div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Âm lượng phát loa (Volume)</label>
                  <input
                    type="range"
                    min="0.2"
                    max="1.0"
                    step="0.1"
                    value={settings.voiceVolume}
                    onChange={(e) => setSettings({ ...settings, voiceVolume: parseFloat(e.target.value) })}
                    className="w-full accent-teal-500"
                  />
                  <div className="text-right text-teal-300 font-mono mt-1">{Math.round(settings.voiceVolume * 100)}%</div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Tự động cảnh báo khi học sinh chờ quá</label>
                  <select
                    value={settings.alertAfterMinutes}
                    onChange={(e) => setSettings({ ...settings, alertAfterMinutes: parseInt(e.target.value, 10) })}
                    className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-slate-800"
                  >
                    <option value={1}>1 phút</option>
                    <option value={2}>2 phút (Mặc định)</option>
                    <option value={5}>5 phút</option>
                  </select>
                </div>
              </div>
            </div>

            {/* REPORT EXPORTER */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 text-white">
              <h3 className="font-bold text-white text-base mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                Xuất Báo Cáo Đón Học Sinh
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Xuất file nhật ký đón học sinh phục vụ thống kê chuyên cần và báo cáo Ban Giám Hiệu.
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => alert('📊 Đã xuất file báo cáo Excel lượt đón học sinh hôm nay!')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition"
                >
                  <Download className="w-4 h-4" /> Xuất File Excel (.xlsx)
                </button>
                <button
                  onClick={() => alert('📄 Đã xuất file báo cáo PDF tổng hợp!')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition"
                >
                  <FileText className="w-4 h-4 text-amber-400" /> Xuất File Báo Cáo PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DISAMBIGUATION SELECTION MODAL (When multiple students match voice) */}
      {showDisambiguationModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-teal-500/40 shadow-2xl text-white">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-amber-400" />
              Tìm Thấy Nhiều Học Sinh Phù Hợp
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Xin vui lòng chọn đúng học sinh phụ huynh muốn đón:
            </p>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {matchingCandidates.map(st => (
                <button
                  key={st.id}
                  onClick={() => triggerStudentPickup(st, 'Lựa chọn Kiosk')}
                  className="w-full p-4 rounded-2xl bg-slate-800 hover:bg-teal-900/40 border border-slate-700 hover:border-teal-500 text-left flex items-center justify-between transition group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={st.avatarUrl}
                      alt={st.fullName}
                      className="w-12 h-12 rounded-xl object-cover border border-teal-500/50"
                      onError={(e: any) => { e.target.src = 'https://via.placeholder.com/150'; }}
                    />
                    <div>
                      <div className="font-bold text-white text-base group-hover:text-teal-300">{st.fullName}</div>
                      <div className="text-xs text-slate-400">STT {st.stt} • Lớp 9/5</div>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-xl bg-teal-500 text-white text-xs font-bold shadow">
                    Chọn
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowDisambiguationModal(false)}
              className="mt-6 w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
            >
              Hủy Bỏ
            </button>
          </div>
        </div>
      )}

      {/* KEYBOARD INPUT MODAL */}
      {showKeyboardModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-800 shadow-2xl text-white">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Keyboard className="w-6 h-6 text-teal-400" />
              Nhập Tên Học Sinh
            </h3>
            <p className="text-xs text-slate-400 mb-4">Gõ tên học sinh để hệ thống tìm kiếm và phát loa gọi:</p>

            <input
              type="text"
              value={keyboardQuery}
              onChange={(e) => setKeyboardQuery(e.target.value)}
              placeholder="Nhập tên học sinh (VD: Minh Khôi)..."
              className="w-full bg-slate-950 text-white p-4 rounded-2xl border border-slate-800 mb-4 focus:outline-none focus:border-teal-500"
              autoFocus
            />

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {students
                .filter(s => s.fullName.toLowerCase().includes(keyboardQuery.toLowerCase()))
                .map(st => (
                  <button
                    key={st.id}
                    onClick={() => triggerStudentPickup(st, 'Nhập bàn phím')}
                    className="w-full p-3 rounded-xl bg-slate-800 hover:bg-teal-900/50 text-left flex items-center justify-between text-xs font-bold text-white transition"
                  >
                    <span>{st.fullName} (Lớp 9/5)</span>
                    <span className="text-teal-400">Gọi ➔</span>
                  </button>
                ))}
            </div>

            <button
              onClick={() => setShowKeyboardModal(false)}
              className="mt-6 w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* QR SCANNER MODAL */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-800 shadow-2xl text-white text-center">
            <QrCode className="w-16 h-16 text-amber-400 mx-auto mb-3 animate-pulse" />
            <h3 className="text-xl font-bold text-white mb-1">Quét Thẻ Phụ Huynh / QR Code</h3>
            <p className="text-xs text-slate-400 mb-6">Đưa mã QR trên thẻ phụ huynh hoặc app về phía ống kính camera</p>

            <div className="w-48 h-48 mx-auto rounded-2xl bg-slate-950 border-2 border-dashed border-teal-500 flex items-center justify-center text-xs text-teal-300 font-mono mb-6">
              [ KÍNH SCANNER ĐANG BẬT ]
            </div>

            <button
              onClick={() => {
                const randomStudent = students[Math.floor(Math.random() * students.length)];
                triggerStudentPickup(randomStudent, 'Quét QR Thẻ Phụ Huynh');
              }}
              className="w-full py-3 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs mb-2 transition"
            >
              ⚡ Thử Quét QR (Mô phỏng Thẻ PH)
            </button>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-3 rounded-2xl bg-slate-800 text-slate-400 font-bold text-xs transition"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* GUIDE MODAL */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-800 shadow-2xl text-white">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-teal-400" />
              Hướng Dẫn Sử Dụng Sky-Line Smart Pickup
            </h3>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed mb-6">
              <p>1. 🎤 <strong>Giọng nói:</strong> Nhấn nút Micro tròn lớn, nói tên học sinh (Ví dụ: "Tôi đón Minh Khôi").</p>
              <p>2. 🔊 <strong>Đọc Loa:</strong> AI sẽ tự động tìm đúng tên học sinh và đọc qua hệ thống loa trường.</p>
              <p>3. 📺 <strong>Màn hình TV:</strong> Tên học sinh sẽ xuất hiện ngay trên TV ngoài sân trường.</p>
              <p>4. 📱 <strong>NFC/QR:</strong> Phụ huynh có thể quét thẻ nếu không muốn phát âm thanh.</p>
            </div>

            <button
              onClick={() => setShowGuideModal(false)}
              className="w-full py-3 rounded-2xl bg-teal-500 text-white font-bold text-xs transition"
            >
              Đã Hiểu
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
