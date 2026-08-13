import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, 
  Sparkles, 
  Send, 
  ShieldAlert, 
  TrendingUp, 
  FileText, 
  Printer
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AIAssistant: React.FC = () => {
  const { students, setActiveTab } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Xin chào Cô Trần Thị Hương! Tôi là Trợ lý AI Giáo viên Chủ nhiệm Classs95. Tôi sẵn sàng hỗ trợ Cô tra cứu, sinh nhận xét và phát hiện cảnh báo nguy cơ sớm cho 35 học sinh!',
      timestamp: 'Vừa xong',
    }
  ]);

  const presetQueries = [
    'Trong tháng 9, học sinh nào tiến bộ nhất?',
    'Những học sinh đã vi phạm trên 3 lần?',
    'Cho tôi thông tin phụ huynh của Nguyễn Văn An.',
    'Những học sinh cần mời phụ huynh trong tuần này.',
    'So sánh tình hình lớp giữa học kỳ I và học kỳ II.',
  ];

  const handleProcessQuery = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: 'u_' + Date.now(),
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let responseText = '';
      const q = queryText.toLowerCase();

      if (q.includes('tiến bộ nhất') || q.includes('tháng 9')) {
        responseText = `[Phân tích AI Classs95 - Học sinh Tiến bộ Tháng 9]\nDựa trên dữ liệu điểm kiểm tra và rèn luyện:\n\n1. **Trần Thị Ngọc Bích**: Đạt GPA 9.3, Giải Nhất Hùng biện Tiếng Anh cấp Trường.\n2. **Nguyễn Văn An**: Đạt GPA 8.8 (Điểm 10 Toán), giúp đỡ bạn học yếu.\n3. **Vũ Đức Đạt**: Tiến bộ môn Toán (+2.0 điểm so với đầu năm).\n\n💡 *Đề xuất sư phạm*: Tuyên dương 3 em này trong tiết Sinh hoạt lớp để khích lệ phong trào.`;
      } else if (q.includes('vi phạm trên 3 lần') || q.includes('vi phạm')) {
        responseText = `[Danh sách Cảnh báo Vi phạm - Classs95 AI]\nHọc sinh cần lưu ý đặc biệt:\n\n• **Lê Minh Cường** (Tổ 2): 3 lần vi phạm (Đi học muộn, Không chuẩn bị bài Văn, Mất trật tự).\n• **Bùi Gia Huy** (Tổ 4): 2 lần vi phạm (Sử dụng điện thoại trong giờ Lý).\n\n💡 *Biện pháp khuyến nghị*: Mời phụ huynh em Bùi Gia Huy và phân công bạn giỏi kèm bài em Lê Minh Cường.`;
      } else if (q.includes('phụ huynh') && q.includes('nguyễn văn an')) {
        const an = students.find(s => s.fullName.includes('Nguyễn Văn An'));
        if (an) {
          responseText = `[Thông tin Phụ huynh - Nguyễn Văn An (Classs95)]\n\n• **Bố**: ${an.family.fatherName} (${an.family.fatherJob}) - SĐT: **${an.family.fatherPhone}**\n• **Mẹ**: ${an.family.motherName} (${an.family.motherJob}) - SĐT: **${an.family.motherPhone}**\n• **Địa chỉ**: ${an.address}`;
        }
      } else if (q.includes('mời phụ huynh')) {
        responseText = `[Danh sách Học sinh Cần Mời Phụ huynh Tuần này]\n\n1. **Bùi Gia Huy**: Sử dụng điện thoại trong giờ Lý & Điểm kiểm tra Toán dưới 4.0.\n2. **Lê Minh Cường**: Đi học muộn & quên bài tập về nhà môn Văn.`;
      } else if (q.includes('so sánh') || q.includes('học kỳ')) {
        responseText = `[Báo cáo So sánh Tình hình Lớp HK I vs HK II (Classs95)]\n\n• Tỷ lệ Học lực Giỏi/Xuất sắc tăng từ 45% lên **58%**.\n• Tỷ lệ vi phạm kỷ luật giảm **35%**.\n• Điểm rèn luyện TB toàn lớp đạt **9.1/10 điểm**.`;
      } else {
        responseText = `[Trả lời từ Classs95 AI Assistant]\nTôi đã ghi nhận câu hỏi "${queryText}". Dữ liệu sĩ số hiện tại là 35 em, trong đó 28 em Hạnh kiểm Tốt, 5 em được tuyên dương tuần này. Cô có thể nhấp các câu gợi ý để xem phân tích chi tiết hơn!`;
      }

      const aiMsg: ChatMessage = {
        id: 'ai_' + Date.now(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl border border-teal-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/40 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Classs95 AI Assistant Workspace
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Trợ Lý AI Chủ Nhiệm 🤖
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Tự động tổng hợp nhận xét, phát hiện sớm nguy cơ sa sút, đề xuất giải pháp sư phạm và sinh báo cáo.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleProcessQuery('Trong tháng 9, học sinh nào tiến bộ nhất?')}
            className="px-4 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition"
          >
            <TrendingUp className="w-4 h-4" /> Top Tiến Bộ
          </button>
          <button
            onClick={() => handleProcessQuery('Những học sinh đã vi phạm trên 3 lần?')}
            className="px-4 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition"
          >
            <ShieldAlert className="w-4 h-4" /> Cảnh Báo Nguy Cơ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[640px]">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Classs95 AI Assistant</h3>
                <p className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">Trực tuyến</p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-teal-600 text-white font-medium shadow-md' : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700'}`}>
                  <pre className="whitespace-pre-wrap font-sans">{msg.text}</pre>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 items-center text-teal-600 dark:text-teal-400 font-bold text-xs p-2 animate-pulse">
                <Bot className="w-4 h-4" /> AI đang tìm kiếm dữ liệu Classs95...
              </div>
            )}
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 overflow-x-auto flex items-center gap-2 custom-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap">Gợi ý câu hỏi:</span>
            {presetQueries.map((pq, idx) => (
              <button
                key={idx}
                onClick={() => handleProcessQuery(pq)}
                className="px-3 py-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 whitespace-nowrap transition"
              >
                {pq}
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <form onSubmit={(e) => { e.preventDefault(); handleProcessQuery(inputQuery); }} className="flex items-center gap-2">
              <input
                type="text"
                value={inputQuery}
                onChange={e => setInputQuery(e.target.value)}
                placeholder="Nhập câu hỏi tự nhiên bằng Tiếng Việt..."
                className="flex-1 p-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm rounded-2xl border border-transparent focus:border-teal-500 focus:outline-none"
              />
              <button
                type="submit"
                className="p-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-2xl shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-500" /> Cảnh Báo Nguy Cơ Sớm
            </h3>

            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-xs space-y-1">
              <div className="font-bold text-rose-600">Bùi Gia Huy (Tổ 4)</div>
              <p className="text-slate-600 dark:text-slate-300">Điểm Toán 1 tiết &lt; 4.0 và có vi phạm sử dụng điện thoại.</p>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-xs space-y-1">
              <div className="font-bold text-amber-600">Lê Minh Cường (Tổ 2)</div>
              <p className="text-slate-600 dark:text-slate-300">Hay quên bài tập về nhà môn Văn & đi học muộn.</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-500 to-teal-700 p-5 rounded-3xl text-white shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
              <FileText className="w-4 h-4" /> Báo Cáo Classs95 AI
            </div>
            <button
              onClick={() => setActiveTab('analytics')}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" /> Đến Trang Báo Cáo & In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
