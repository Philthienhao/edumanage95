import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Student, 
  ViolationRecord, 
  RewardRecord, 
  ProgressTimelineItem, 
  ClassJournalEntry, 
  ParentContactLog, 
  NotificationItem, 
  ClassInfo,
  ActiveTab
} from '../types';
import { 
  mockClasses, 
  mockStudents, 
  mockViolations, 
  mockRewards, 
  mockProgressTimeline, 
  mockClassJournals, 
  mockParentLogs, 
  mockNotifications 
} from '../data/mockData';

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  activeClassId: string;
  setActiveClassId: (classId: string) => void;
  classes: ClassInfo[];
  
  students: Student[];
  selectedStudentId: string | null;
  setSelectedStudentId: (id: string | null) => void;
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student | null) => void;
  addStudent: (student: Student) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (id: string) => void;
  
  violations: ViolationRecord[];
  addViolation: (record: Omit<ViolationRecord, 'id'>) => void;
  deleteViolation: (id: string) => void;
  
  rewards: RewardRecord[];
  addReward: (record: Omit<RewardRecord, 'id'>) => void;
  deleteReward: (id: string) => void;
  
  resetDisciplineRewards: () => void;
  
  progressTimeline: ProgressTimelineItem[];
  addProgressItem: (item: Omit<ProgressTimelineItem, 'id'>) => void;
  
  journals: ClassJournalEntry[];
  addJournal: (entry: Omit<ClassJournalEntry, 'id'>) => void;
  
  parentLogs: ParentContactLog[];
  addParentLog: (log: Omit<ParentContactLog, 'id'>) => void;
  
  notifications: NotificationItem[];
  toggleNotificationDone: (id: string) => void;
  
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredStudents: Student[];
  
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  toggleDarkMode: () => void;
  
  teacherUser: { name: string; email: string; avatar: string; schoolLogo: string; role: string };
  teacherProfile: { name: string; role: string; avatar: string; schoolLogo: string; classPhoto: string; email: string };
  isLoggedIn: boolean;
  login: (email: string, provider?: string) => void;
  logout: () => void;
  
  exportDataJSON: () => void;
  importDataJSON: (jsonString: string) => boolean;
  resetToMockData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [activeClassId, setActiveClassId] = useState<string>('9/5_CS5');
  const [classes] = useState<ClassInfo[]>(mockClasses);
  
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [violations, setViolations] = useState<ViolationRecord[]>(mockViolations);
  const [rewards, setRewards] = useState<RewardRecord[]>(mockRewards);
  const [progressTimeline, setProgressTimeline] = useState<ProgressTimelineItem[]>(mockProgressTimeline);
  const [journals, setJournals] = useState<ClassJournalEntry[]>(mockClassJournals);
  const [parentLogs, setParentLogs] = useState<ParentContactLog[]>(mockParentLogs);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [darkMode, setDarkModeState] = useState<boolean>(() => {
    return localStorage.getItem('EDUMANAGE_DARK_MODE') === 'true';
  });

  const [teacherUser, setTeacherUser] = useState({
    name: 'Thầy Võ Thiện Hảo',
    email: 'vo.thien.hao@sky-line.edu.vn',
    avatar: './teacher_avatar.png',
    schoolLogo: './school_logo.png',
    role: 'GVCN Lớp 9/5_CS5 Sky-Line'
  });

  const teacherProfile = {
    name: 'Thầy Võ Thiện Hảo',
    role: 'GVCN Lớp 9/5_CS5 Sky-Line',
    avatar: './teacher_avatar.png',
    schoolLogo: './school_logo.png',
    classPhoto: './class_photo.jpg',
    email: 'vo.thien.hao@sky-line.edu.vn'
  };
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    localStorage.setItem('EDUMANAGE_DARK_MODE', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const setDarkMode = (dark: boolean) => {
    setDarkModeState(dark);
  };

  const toggleDarkMode = () => {
    setDarkModeState(prev => !prev);
  };

  const selectedStudent = students.find(s => s.id === selectedStudentId) || null;

  const setSelectedStudent = (student: Student | null) => {
    setSelectedStudentId(student ? student.id : null);
  };

  const addStudent = (newStudent: Student) => {
    setStudents(prev => [newStudent, ...prev]);
  };

  const updateStudent = (updatedStudent: Student) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    if (selectedStudentId === id) setSelectedStudentId(null);
  };

  const addViolation = (record: Omit<ViolationRecord, 'id'>) => {
    const newRecord: ViolationRecord = {
      ...record,
      id: 'v_' + Date.now(),
    };
    setViolations(prev => [newRecord, ...prev]);
  };

  const deleteViolation = (id: string) => {
    setViolations(prev => prev.filter(v => v.id !== id));
  };

  const addReward = (record: Omit<RewardRecord, 'id'>) => {
    const newRecord: RewardRecord = {
      ...record,
      id: 'r_' + Date.now(),
    };
    setRewards(prev => [newRecord, ...prev]);
  };

  const deleteReward = (id: string) => {
    setRewards(prev => prev.filter(r => r.id !== id));
  };

  const resetDisciplineRewards = () => {
    setViolations([]);
    setRewards([]);
    setStudents(prev => prev.map(s => ({
      ...s,
      isCommendedThisWeek: false,
      hasViolationThisWeek: false,
    })));
  };

  const addProgressItem = (item: Omit<ProgressTimelineItem, 'id'>) => {
    const newItem: ProgressTimelineItem = {
      ...item,
      id: 't_' + Date.now(),
    };
    setProgressTimeline(prev => [newItem, ...prev]);
  };

  const addJournal = (entry: Omit<ClassJournalEntry, 'id'>) => {
    const newEntry: ClassJournalEntry = {
      ...entry,
      id: 'j_' + Date.now(),
    };
    setJournals(prev => [newEntry, ...prev]);
  };

  const addParentLog = (log: Omit<ParentContactLog, 'id'>) => {
    const newLog: ParentContactLog = {
      ...log,
      id: 'pc_' + Date.now(),
    };
    setParentLogs(prev => [newLog, ...prev]);
  };

  const toggleNotificationDone = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n } : n));
  };

  const filteredStudents = students.filter(s => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase().trim();
    return (
      s.fullName.toLowerCase().includes(query) ||
      s.studentId.toLowerCase().includes(query) ||
      s.address.toLowerCase().includes(query) ||
      s.family.fatherName.toLowerCase().includes(query) ||
      s.family.motherName.toLowerCase().includes(query) ||
      s.family.fatherPhone.includes(query) ||
      s.family.motherPhone.includes(query)
    );
  });

  const login = (email: string, provider: string = 'Email') => {
    setIsLoggedIn(true);
    setTeacherUser(prev => ({
      ...prev,
      email,
      name: 'Thầy Võ Thiện Hảo',
    }));
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const exportDataJSON = () => {
    const fullData = {
      version: '3.0',
      exportedAt: new Date().toISOString(),
      students,
      violations,
      rewards,
    };
    const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CLASSS95_SKYLINE_BACKUP_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.students && Array.isArray(data.students)) {
        setStudents(data.students);
        if (data.violations) setViolations(data.violations);
        if (data.rewards) setRewards(data.rewards);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const resetToMockData = () => {
    setStudents(mockStudents);
    setViolations(mockViolations);
    setRewards(mockRewards);
    setProgressTimeline(mockProgressTimeline);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeClassId,
        setActiveClassId,
        classes,
        students,
        selectedStudentId,
        setSelectedStudentId,
        selectedStudent,
        setSelectedStudent,
        addStudent,
        updateStudent,
        deleteStudent,
        violations,
        addViolation,
        deleteViolation,
        rewards,
        addReward,
        deleteReward,
        resetDisciplineRewards,
        progressTimeline,
        addProgressItem,
        journals,
        addJournal,
        parentLogs,
        addParentLog,
        notifications,
        toggleNotificationDone,
        searchQuery,
        setSearchQuery,
        filteredStudents,
        darkMode,
        setDarkMode,
        toggleDarkMode,
        teacherUser,
        teacherProfile,
        isLoggedIn,
        login,
        logout,
        exportDataJSON,
        importDataJSON,
        resetToMockData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    return {
      students: mockStudents,
      teacherUser: { name: "Thầy Võ Thiện Hảo", email: "vo.thien.hao@sky-line.edu.vn", avatar: "./teacher_avatar.jpg", schoolLogo: "./school_logo.png", role: "GVCN Lớp 9/5_CS5 Sky-Line" },
      teacherProfile: { name: "Thầy Võ Thiện Hảo", role: "GVCN Lớp 9/5_CS5 Sky-Line", avatar: "./teacher_avatar.jpg", schoolLogo: "./school_logo.png", classPhoto: "./95.jpg", email: "vo.thien.hao@sky-line.edu.vn" },
      activeTab: "smart_pickup",
      setActiveTab: () => {},
      searchQuery: "",
      setSearchQuery: () => {},
      filteredStudents: mockStudents,
      violations: [],
      rewards: [],
      darkMode: false,
      setDarkMode: () => {},
      toggleDarkMode: () => {}
    } as any;
  }
  return context;
};