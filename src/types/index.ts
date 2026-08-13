export type Gender = 'Nam' | 'Nữ';
export type AcademicRank = 'Xuất sắc' | 'Giỏi' | 'Khá' | 'Trung bình' | 'Yếu';
export type ConductRank = 'Tốt' | 'Khá' | 'Trung bình' | 'Yếu';
export type Severity = 'Nhẹ' | 'Trung bình' | 'Nặng';

export type ActiveTab = 'dashboard' | 'students' | 'rewards' | 'violations' | 'progress' | 'parents' | 'diary' | 'journal' | 'analytics' | 'settings' | 'birthday' | 'slo_builder' | 'smart_pickup' | 'reports' | 'ai_assistant' | 'repeated_violations' | 'academic_decline';

export type PickupStatus = 'calling' | 'waiting' | 'exited' | 'recalled' | 'cancelled';

export interface PickupQueueItem {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  avatarUrl: string;
  callerName: string;
  callerRelation: string;
  callerPhone: string;
  licensePlate?: string;
  gateNumber: string;
  callTime: string;
  status: PickupStatus;
  callCount: number;
  elapsedSeconds: number;
}

export interface PickupLogItem extends PickupQueueItem {
  exitTime?: string;
  durationSeconds?: number;
}

export interface PickupSettings {
  schoolName: string;
  gateName: string;
  autoRepeatTimes: number;
  voiceGender: 'female' | 'male';
  voiceSpeed: number;
  voiceVolume: number;
  alertAfterMinutes: number;
}

export interface SloItem {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  title: string;
  baselineScore: number;
  currentScore: number;
  targetScore: number;
  deadline: string;
  status: string;
  actionPlan: string;
  atRisk: boolean;
  riskReason?: string;
}

export interface FamilyInfo {
  fatherName: string;
  fatherJob: string;
  fatherPhone: string;
  motherName: string;
  motherJob: string;
  motherPhone: string;
  guardianName?: string;
  guardianPhone?: string;
  emergencyPhone: string;
}

export interface AcademicProfile {
  gpa: number;
  academicRank: AcademicRank;
  conductRank: ConductRank;
  strongSubjects: string[];
  weakSubjects: string[];
  goals: string;
  academicRemark: string;
}

export interface HealthProfile {
  height: number;
  weight: number;
  vision: string;
  allergies?: string;
  healthNotes: string;
}

export interface TeacherConfidentialNote {
  familyBackground: string;
  psychology: string;
  educationalNotes: string;
  strengths: string;
  areasToSupport: string;
}

export interface Student {
  id: string;
  studentId: string;
  stt: number;
  fullName: string;
  gender: Gender;
  dob: string;
  ethnicity: string;
  religion: string;
  team: number;
  address: string;
  email?: string;
  avatarUrl: string;
  classId: string;
  privateNote?: string;
  
  family: FamilyInfo;
  academic: AcademicProfile;
  health: HealthProfile;
  teacherNotes: TeacherConfidentialNote;
  
  isCommendedThisWeek?: boolean;
  hasViolationThisWeek?: boolean;
  isAtRisk?: boolean;
  riskReason?: string;
}

export interface ViolationRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  type: 'Đi học muộn' | 'Không thuộc bài' | 'Mất trật tự' | 'Không mặc đồng phục' | 'Sử dụng điện thoại' | 'Trốn học' | 'Vô lễ' | 'Khác';
  severity: Severity;
  loggedBy: string;
  description: string;
  proofUrl?: string;
  resolution: string;
  parentNotified: boolean;
}

export interface RewardRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  reason: string;
  praisedBy: string;
  proofUrl?: string;
  bonusPoints: number;
}

export interface ProgressTimeline {
  id: string;
  studentId: string;
  date: string;
  title: string;
  description: string;
  type?: 'academic' | 'conduct' | 'health' | 'award' | 'milestone';
  category?: string;
  badgeText?: string;
  loggedBy?: string;
}
export type ProgressTimelineItem = ProgressTimeline;

export interface ClassJournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  images?: string[];
  files?: string[];
  taggedStudentIds?: string[];
}

export interface ParentContactLog {
  id: string;
  studentId: string;
  date: string;
  reason: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message?: string;
  time?: string;
  read?: boolean;
  isRead?: boolean;
  isDone?: boolean;
  type?: string;
  description?: string;
  studentId?: string;
  dueDate?: string;
}

export interface ClassInfo {
  id: string;
  className?: string;
  name?: string;
  academicYear?: string;
  schoolYear?: string;
  schoolName?: string;
  totalStudents: number;
  teacherName?: string;
  homeroomTeacher?: string;
  roomNumber?: string;
}

export interface TeacherProfile {
  id?: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  phone?: string;
  subject?: string;
  classAssigned?: string;
  bio?: string;
  schoolLogo: string;
  classPhoto?: string;
}

export interface TeacherUser {
  id: string;
  username: string;
  passwordPlain?: string;
  name: string;
  title: string;
  className: string;
  classCode: string;
  avatarUrl: string;
  role: 'admin' | 'teacher';
}

