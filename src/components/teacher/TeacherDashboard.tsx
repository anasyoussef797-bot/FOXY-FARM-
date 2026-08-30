import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { CHARACTERS } from '../../assets/characters';
import { Homework, Question, SubjectCategory, UserRole } from '../../types';
import { StorageService } from '../../services/storageService';
import { FarmTileView } from '../farm/FarmTileView';
import {
  Award,
  BookOpen,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  Coins,
  Eye,
  FileCheck,
  GraduationCap,
  Layers,
  Plus,
  Search,
  Send,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  X,
  Zap,
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const {
    currentUser,
    allUsers,
    homeworks,
    submissions,
    classrooms,
    createTeacherHomework,
    gradeHomeworkSubmission,
    teacherAwardStudent,
    triggerCelebration,
  } = useGame();

  const [activeTab, setActiveTab] = useState<'overview' | 'classes' | 'homework' | 'grading' | 'rewards' | 'analytics'>('overview');
  const [selectedStudentForFarmView, setSelectedStudentForFarmView] = useState<string | null>(null);

  // Homework Creator State
  const [isCreatingHw, setIsCreatingHw] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSubject, setNewSubject] = useState<SubjectCategory>('Mathematics');
  const [newGrade, setNewGrade] = useState('Grade 4');
  const [newDifficulty, setNewDifficulty] = useState<'Easy' | 'Medium' | 'Challenging'>('Medium');
  const [newHost, setNewHost] = useState<'FOXY' | 'ADAM' | 'TALIA' | 'SPARK'>('ADAM');
  const [newCoins, setNewCoins] = useState(120);
  const [newXP, setNewXP] = useState(90);
  const [newDueDate, setNewDueDate] = useState('2026-09-10');
  const [newQuestions, setNewQuestions] = useState<Question[]>([
    {
      id: `q_new_1`,
      type: 'multiple_choice',
      prompt: 'What is 15 × 4?',
      options: ['50', '60', '70', '80'],
      correctAnswer: '60',
      points: 50,
      explanation: '15 multiplied by 4 equals 60.',
    },
    {
      id: `q_new_2`,
      type: 'true_false',
      prompt: 'A hexagon has 6 equal angles and 6 sides.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      points: 50,
      explanation: 'Yes, a standard hexagon contains exactly 6 sides.',
    },
  ]);

  // Grading modal state
  const [selectedSubForGrading, setSelectedSubForGrading] = useState<string | null>(null);
  const [gradingScore, setGradingScore] = useState<number>(100);
  const [gradingNote, setGradingNote] = useState<string>('Brilliant effort and accuracy! Keep up the marvelous work!');
  const [gradingBonusCoins, setGradingBonusCoins] = useState<number>(50);
  const [gradingBonusXP, setGradingBonusXP] = useState<number>(30);

  // Manual Reward State
  const [awardTargetStudent, setAwardTargetStudent] = useState<string>('student_1');
  const [awardCoins, setAwardCoins] = useState<number>(150);
  const [awardXP, setAwardXP] = useState<number>(100);
  const [awardReason, setAwardReason] = useState<string>('Outstanding Classroom Participation & Effort');
  const [awardChar, setAwardChar] = useState<'FOXY' | 'ADAM' | 'TALIA' | 'SPARK'>('FOXY');
  const [awardSuccessMsg, setAwardSuccessMsg] = useState<string | null>(null);

  const studentUsers = allUsers.filter((u) => u.role === 'STUDENT');

  const handleCreateHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const hw: Homework = {
      id: `hw_teacher_${Date.now()}`,
      title: newTitle,
      description: newDesc || 'Teacher assigned learning mission.',
      subject: newSubject,
      gradeLevel: newGrade,
      difficulty: newDifficulty,
      assignedByTeacherId: currentUser.id,
      teacherName: currentUser.name,
      targetClassIds: ['class_g4', 'class_g5'],
      dueDate: newDueDate,
      coinsReward: Number(newCoins),
      xpReward: Number(newXP),
      characterHost: newHost,
      missionPrompt: `${CHARACTERS[newHost].name} has prepared a ${newSubject} mission for you!`,
      questions: newQuestions,
      createdAt: new Date().toISOString().split('T')[0],
    };

    createTeacherHomework(hw);
    setIsCreatingHw(false);
    setNewTitle('');
    setNewDesc('');
    triggerCelebration();
  };

  const handleExecuteGrade = () => {
    if (!selectedSubForGrading) return;
    gradeHomeworkSubmission(selectedSubForGrading, gradingScore, gradingNote, gradingBonusCoins, gradingBonusXP);
    setSelectedSubForGrading(null);
    triggerCelebration();
  };

  const handleExecuteAward = (e: React.FormEvent) => {
    e.preventDefault();
    teacherAwardStudent(awardTargetStudent, Number(awardCoins), Number(awardXP), awardReason, awardChar);
    setAwardSuccessMsg(`Successfully awarded +${awardCoins} Coins & +${awardXP} XP!`);
    triggerCelebration();
    setTimeout(() => setAwardSuccessMsg(null), 3500);
  };

  const pendingSubmissions = submissions.filter((s) => s.status === 'submitted');
  const gradedSubmissions = submissions.filter((s) => s.status === 'graded' || s.status === 'approved');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-linear-to-r from-[#558B2F] via-[#689F38] to-[#7CB342] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex items-center justify-between gap-4 border-2 border-[#AFB42B]/40">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider mb-2 text-[#FFEE58]">
            <GraduationCap className="w-3.5 h-3.5 text-[#FFEE58]" />
            <span>Teacher Administration & Gamified Learning</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Impact Hub Teacher Dashboard
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#F1F8E9] mt-1">
            Assign missions, monitor real student farms, grade answers, and reward students with Coins and XP.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-black">
            <span className="bg-white/20 px-3 py-1 rounded-xl">
              👨‍🏫 {currentUser.name}
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-xl">
              🏫 Impact Hub Learning Academy - Cairo
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            setIsCreatingHw(true);
            setActiveTab('homework');
          }}
          className="hidden sm:flex items-center gap-2 px-5 py-3 bg-[#FFEE58] hover:bg-[#FFF59D] text-[#2E4018] font-black text-sm rounded-2xl shadow-lg transition-transform hover:scale-105 cursor-pointer shrink-0 border border-[#AFB42B]/40"
        >
          <Plus className="w-4 h-4 text-[#2E4018]" />
          <span>New Mission</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'overview', label: '📊 Overview & KPIs' },
          { id: 'classes', label: '👥 Class & Student Farms' },
          { id: 'homework', label: '📝 Missions Manager' },
          { id: 'grading', label: `📥 Submissions (${pendingSubmissions.length} Pending)` },
          { id: 'rewards', label: '🎖️ Reward Station' },
          { id: 'analytics', label: '📈 Learning Analytics' },
        ].map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-[#2E4018] text-white shadow-md'
                  : 'bg-white hover:bg-[#DCEDC8] text-[#2E4018] border border-[#AFB42B]/30'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-3xl border-2 border-[#AFB42B]/30 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-[#827717] uppercase">Enrolled Students</span>
                <div className="w-9 h-9 rounded-xl bg-[#DCEDC8] text-[#2E4018] flex items-center justify-center border border-[#C5E1A5]">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-[#2E4018]">{studentUsers.length}</p>
              <p className="text-xs text-[#558B2F] font-bold mt-1">100% Active in Foxy Farm</p>
            </div>

            <div className="bg-white rounded-3xl border-2 border-[#AFB42B]/30 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-[#827717] uppercase">Completion Rate</span>
                <div className="w-9 h-9 rounded-xl bg-[#DCEDC8] text-[#2E4018] flex items-center justify-center border border-[#C5E1A5]">
                  <FileCheck className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-[#2E4018]">88%</p>
              <p className="text-xs text-[#558B2F] font-bold mt-1">+12% vs previous term</p>
            </div>

            <div className="bg-white rounded-3xl border-2 border-[#AFB42B]/30 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-[#827717] uppercase">Average Score</span>
                <div className="w-9 h-9 rounded-xl bg-[#FFF9C4] text-[#827717] flex items-center justify-center border border-[#FFEE58]">
                  <Award className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-[#2E4018]">95.4%</p>
              <p className="text-xs text-[#827717] font-bold mt-1">High mastery rate</p>
            </div>

            <div className="bg-white rounded-3xl border-2 border-[#AFB42B]/30 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-[#827717] uppercase">Avg Learning Streak</span>
                <div className="w-9 h-9 rounded-xl bg-[#FFCCBC]/50 text-[#D84315] flex items-center justify-center border border-[#FFAB91]">
                  <Zap className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-[#2E4018]">4.8 Days</p>
              <p className="text-xs text-[#FF7043] font-bold mt-1">Daily engagement strong</p>
            </div>
          </div>

          {/* Quick Roster & Pending Submissions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Student Engagement Cards */}
            <div className="lg:col-span-2 bg-white rounded-3xl border-2 border-[#AFB42B]/30 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-black text-[#2E4018] flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#558B2F]" />
                  <span>Student Farms Overview</span>
                </h3>
                <span className="text-xs font-bold text-[#827717]">Class: Grade 4 - Nile Explorers</span>
              </div>

              <div className="space-y-3">
                {studentUsers.map((st) => {
                  const prof = StorageService.getStudentProfile(st.id);
                  return (
                    <div
                      key={st.id}
                      className="p-4 bg-[#F1F8E9]/50 hover:bg-[#DCEDC8]/50 rounded-2xl border-2 border-[#AFB42B]/20 flex items-center justify-between gap-3 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{st.avatar}</span>
                        <div>
                          <h4 className="text-sm font-black text-[#2E4018]">{st.name}</h4>
                          <p className="text-xs text-[#4E342E] font-semibold">
                            {st.grade || 'Grade 4'} • {prof.completedMissionsCount} Missions Done
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <span className="text-xs font-black text-[#558B2F] block">
                            Farm Level {prof.level}
                          </span>
                          <span className="text-[11px] font-bold text-[#827717] block">
                            🪙 {prof.coins} • ⚡ {prof.xp} XP
                          </span>
                        </div>

                        <button
                          onClick={() => setSelectedStudentForFarmView(st.id)}
                          className="px-3.5 py-1.5 bg-[#558B2F] hover:bg-[#33691E] text-white font-black text-xs rounded-xl shadow-[0_2px_0_#2E4018] active:translate-y-0.5 active:shadow-none flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Farm</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions & Pending */}
            <div className="bg-white rounded-3xl border-2 border-[#AFB42B]/30 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-black text-[#2E4018] mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FF7043]" />
                  <span>Pending Mission Reviews</span>
                </h3>

                {pendingSubmissions.length === 0 ? (
                  <div className="p-4 bg-[#DCEDC8] rounded-2xl border border-[#C5E1A5] text-center text-xs font-black text-[#2E4018]">
                    🎉 All student homework has been reviewed!
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {pendingSubmissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-3 bg-[#FFF9C4]/60 rounded-xl border border-[#FFEE58] flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs font-black text-[#2E4018]">{sub.studentName}</p>
                          <p className="text-[10px] font-bold text-[#827717]">Score: {sub.percentage}%</p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedSubForGrading(sub.id);
                            setActiveTab('grading');
                          }}
                          className="px-2.5 py-1 bg-[#558B2F] hover:bg-[#33691E] text-white font-black text-xs rounded-lg shadow-2xs cursor-pointer"
                        >
                          Grade
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#AFB42B]/20">
                <button
                  onClick={() => setActiveTab('rewards')}
                  className="w-full py-2.5 bg-linear-to-r from-[#558B2F] via-[#689F38] to-[#7CB342] hover:from-[#33691E] hover:to-[#558B2F] text-white font-black text-xs rounded-xl shadow-[0_2px_0_#2E4018] active:translate-y-0.5 active:shadow-none cursor-pointer"
                >
                  Open Reward Station 🎖️
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Classes & Student Farm Inspection */}
      {activeTab === 'classes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {classrooms.map((cls) => (
              <div key={cls.id} className="bg-white rounded-3xl border-2 border-[#AFB42B]/30 p-5 shadow-xs">
                <h3 className="text-base font-black text-[#2E4018]">{cls.name}</h3>
                <p className="text-xs text-[#4E342E] font-semibold">{cls.grade} • {cls.studentIds.length} Students</p>

                <div className="space-y-2 mt-4">
                  {cls.studentIds.map((stId) => {
                    const st = allUsers.find((u) => u.id === stId);
                    const prof = StorageService.getStudentProfile(stId);
                    if (!st) return null;

                    return (
                      <div
                        key={stId}
                        className="p-3 bg-[#F1F8E9]/50 rounded-xl border border-[#AFB42B]/20 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{st.avatar}</span>
                          <div>
                            <p className="text-xs font-black text-[#2E4018]">{st.name}</p>
                            <p className="text-[10px] text-[#558B2F] font-bold">Level {prof.level} Farm</p>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedStudentForFarmView(stId)}
                          className="px-3 py-1 bg-[#558B2F] hover:bg-[#33691E] text-white text-xs font-black rounded-lg shadow-2xs cursor-pointer flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Inspect Farm</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Missions Manager (Homework Creator) */}
      {activeTab === 'homework' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-[#2E4018]">Assigned Homework & Quests</h2>
              <p className="text-xs text-[#4E342E] font-medium">Create engaging game-style missions for your students.</p>
            </div>

            <button
              onClick={() => setIsCreatingHw(!isCreatingHw)}
              className="px-4 py-2 bg-[#558B2F] hover:bg-[#33691E] text-white font-black text-xs rounded-xl shadow-[0_2px_0_#2E4018] active:translate-y-0.5 active:shadow-none flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isCreatingHw ? 'Close Builder' : 'Create New Mission'}</span>
            </button>
          </div>

          {/* Create Homework Form */}
          {isCreatingHw && (
            <form
              onSubmit={handleCreateHomework}
              className="bg-white rounded-3xl border-4 border-[#AFB42B] p-6 shadow-xl space-y-4 animate-in fade-in duration-200"
            >
              <h3 className="text-base font-black text-[#2E4018] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#AFB42B]" />
                <span>Mission Creator Wizard</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-[#2E4018] block mb-1">Mission Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    placeholder="e.g. Nile Fractions & Geometry Quest"
                    className="w-full px-3 py-2 bg-[#F1F8E9] border border-[#AFB42B]/30 rounded-xl text-sm font-semibold text-[#2E4018] focus:border-[#558B2F] outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-[#2E4018] block mb-1">Subject</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#F1F8E9] border border-[#AFB42B]/30 rounded-xl text-sm font-semibold text-[#2E4018] focus:border-[#558B2F] outline-hidden"
                  >
                    <option value="Mathematics">📐 Mathematics</option>
                    <option value="English">📚 English</option>
                    <option value="Science">🔬 Science</option>
                    <option value="General Knowledge">🇪🇬 General Knowledge</option>
                    <option value="Arabic">🔤 Arabic</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-[#2E4018] block mb-1">Character Companion Guide</label>
                  <select
                    value={newHost}
                    onChange={(e) => setNewHost(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#F1F8E9] border border-[#AFB42B]/30 rounded-xl text-sm font-semibold text-[#2E4018] focus:border-[#558B2F] outline-hidden"
                  >
                    <option value="FOXY">🦊 Foxy (Mascot Guide)</option>
                    <option value="ADAM">👦 Adam (Math & Discovery)</option>
                    <option value="TALIA">👧 Talia (Language & Stories)</option>
                    <option value="SPARK">🤖 Spark (Robotics & Missions)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-[#2E4018] block mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F1F8E9] border border-[#AFB42B]/30 rounded-xl text-sm font-semibold text-[#2E4018] focus:border-[#558B2F] outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-[#2E4018] block mb-1">Coins Reward (🪙)</label>
                  <input
                    type="number"
                    value={newCoins}
                    onChange={(e) => setNewCoins(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F1F8E9] border border-[#AFB42B]/30 rounded-xl text-sm font-semibold text-[#2E4018] focus:border-[#558B2F] outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-[#2E4018] block mb-1">XP Reward (⚡)</label>
                  <input
                    type="number"
                    value={newXP}
                    onChange={(e) => setNewXP(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F1F8E9] border border-[#AFB42B]/30 rounded-xl text-sm font-semibold text-[#2E4018] focus:border-[#558B2F] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-[#2E4018] block mb-1">Mission Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={2}
                  placeholder="Explain the fun learning background of this mission..."
                  className="w-full px-3 py-2 bg-[#F1F8E9] border border-[#AFB42B]/30 rounded-xl text-sm font-semibold text-[#2E4018] focus:border-[#558B2F] outline-hidden"
                />
              </div>

              {/* Questions count info */}
              <div className="p-3 bg-[#DCEDC8] rounded-xl border border-[#C5E1A5] text-xs font-black text-[#2E4018] flex items-center justify-between">
                <span>Includes {newQuestions.length} pre-configured interactive questions.</span>
                <span className="text-[11px] text-[#558B2F] font-bold">Auto-graded on completion</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingHw(false)}
                  className="px-4 py-2 bg-[#F1F8E9] hover:bg-[#DCEDC8] text-[#2E4018] font-black text-xs rounded-xl cursor-pointer border border-[#AFB42B]/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#558B2F] hover:bg-[#33691E] text-white font-black text-xs rounded-xl shadow-[0_2px_0_#2E4018] active:translate-y-0.5 active:shadow-none cursor-pointer"
                >
                  Publish Mission to Class 🚀
                </button>
              </div>
            </form>
          )}

          {/* List of Existing Homeworks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {homeworks.map((hw) => {
              const char = CHARACTERS[hw.characterHost] || CHARACTERS.FOXY;
              return (
                <div key={hw.id} className="bg-white rounded-3xl border-2 border-[#AFB42B]/30 p-5 shadow-xs">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={char.image}
                        alt={char.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-xl object-cover border border-[#AFB42B]/40"
                      />
                      <div>
                        <span className="text-[10px] font-black uppercase text-[#2E4018] bg-[#DCEDC8] px-2 py-0.5 rounded-full border border-[#C5E1A5]">
                          {hw.subject} • {hw.gradeLevel}
                        </span>
                        <h4 className="text-sm font-black text-[#2E4018] mt-0.5">{hw.title}</h4>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#4E342E] leading-relaxed line-clamp-2 mt-1">{hw.description}</p>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#AFB42B]/20 text-xs font-black">
                    <span className="text-[#827717]">Due: {hw.dueDate}</span>
                    <span className="text-[#2E4018] bg-[#DCEDC8] px-2 py-0.5 rounded-md border border-[#C5E1A5]">
                      🪙 +{hw.coinsReward} | ⚡ +{hw.xpReward} XP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Submissions & Grading */}
      {activeTab === 'grading' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border-2 border-[#AFB42B]/30 p-6 shadow-xs">
            <h3 className="text-base font-black text-[#2E4018] mb-4">Student Submissions Directory</h3>

            <div className="space-y-3">
              {submissions.map((sub) => {
                const hw = homeworks.find((h) => h.id === sub.homeworkId);
                return (
                  <div
                    key={sub.id}
                    className="p-4 bg-[#F1F8E9]/50 rounded-2xl border-2 border-[#AFB42B]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{sub.studentAvatar}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-black text-[#2E4018]">{sub.studentName}</h4>
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                              sub.status === 'graded'
                                ? 'bg-[#DCEDC8] text-[#2E4018] border border-[#8BC34A]'
                                : 'bg-[#FFF9C4] text-[#827717] border border-[#FFEE58]'
                            }`}
                          >
                            {sub.status === 'graded' ? 'Graded ⭐' : 'Submitted'}
                          </span>
                        </div>
                        <p className="text-xs text-[#4E342E] font-semibold mt-0.5">
                          Mission: {hw?.title || sub.homeworkId} • Score: {sub.percentage}%
                        </p>
                        {sub.teacherNote && (
                          <p className="text-xs text-[#558B2F] font-bold italic mt-1">
                            Teacher Feedback: "{sub.teacherNote}"
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedSubForGrading(sub.id)}
                      className="px-4 py-2 bg-[#558B2F] hover:bg-[#33691E] text-white font-black text-xs rounded-xl shadow-[0_2px_0_#2E4018] active:translate-y-0.5 active:shadow-none cursor-pointer self-start sm:self-auto"
                    >
                      {sub.status === 'graded' ? 'Edit Grade / Feedback' : 'Grade Submission'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Manual Reward Dispenser */}
      {activeTab === 'rewards' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border-2 border-[#AFB42B]/30 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#DCEDC8] flex items-center justify-center text-3xl border border-[#C5E1A5]">
              🎖️
            </div>
            <div>
              <h2 className="text-lg font-black text-[#2E4018]">Teacher Star Reward Dispenser</h2>
              <p className="text-xs text-[#4E342E] font-semibold">
                Award exceptional students with bonus coins, XP, and mascot celebration notes!
              </p>
            </div>
          </div>

          {awardSuccessMsg && (
            <div className="p-3 bg-[#DCEDC8] border border-[#8BC34A] rounded-2xl text-xs font-black text-[#2E4018] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#558B2F]" />
              <span>{awardSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleExecuteAward} className="space-y-4">
            <div>
              <label className="text-xs font-black text-[#2E4018] block mb-1">Select Student</label>
              <select
                value={awardTargetStudent}
                onChange={(e) => setAwardTargetStudent(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#F1F8E9] border border-[#AFB42B]/30 rounded-xl text-sm font-bold text-[#2E4018] focus:border-[#558B2F] outline-hidden"
              >
                {studentUsers.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name} ({st.grade || 'Grade 4'})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-black text-[#2E4018] block mb-1">Award Coins (🪙)</label>
                <input
                  type="number"
                  value={awardCoins}
                  onChange={(e) => setAwardCoins(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#F1F8E9] border border-[#AFB42B]/30 rounded-xl text-sm font-bold text-[#2E4018] focus:border-[#558B2F] outline-hidden"
                />
              </div>
              <div>
                <label className="text-xs font-black text-[#2E4018] block mb-1">Award XP (⚡)</label>
                <input
                  type="number"
                  value={awardXP}
                  onChange={(e) => setAwardXP(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#F1F8E9] border border-[#AFB42B]/30 rounded-xl text-sm font-bold text-[#2E4018] focus:border-[#558B2F] outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-[#2E4018] block mb-1">Celebration Character Guide</label>
              <select
                value={awardChar}
                onChange={(e) => setAwardChar(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#F1F8E9] border border-[#AFB42B]/30 rounded-xl text-sm font-bold text-[#2E4018] focus:border-[#558B2F] outline-hidden"
              >
                <option value="FOXY">🦊 Foxy Mascot</option>
                <option value="ADAM">👦 Adam (Math & Science)</option>
                <option value="TALIA">👧 Talia (Language & Literacy)</option>
                <option value="SPARK">🤖 Spark (Robotics & Missions)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-black text-[#2E4018] block mb-1">Commendation Message</label>
              <input
                type="text"
                value={awardReason}
                onChange={(e) => setAwardReason(e.target.value)}
                placeholder="e.g. Star Math Problem Solver this week!"
                className="w-full px-3 py-2 bg-[#F1F8E9] border border-[#AFB42B]/30 rounded-xl text-sm font-bold text-[#2E4018] focus:border-[#558B2F] outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#558B2F] hover:bg-[#33691E] text-white font-black text-sm rounded-2xl shadow-[0_2px_0_#2E4018] active:translate-y-0.5 active:shadow-none transition-transform hover:scale-105 cursor-pointer"
            >
              Send Award & Coins to Student 🎁
            </button>
          </form>
        </div>
      )}

      {/* Tab 6: Learning Analytics */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border-2 border-[#AFB42B]/30 p-6 shadow-xs">
            <h3 className="text-base font-black text-[#2E4018] mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#558B2F]" />
              <span>Subject Performance Breakdown</span>
            </h3>
            <div className="space-y-3 text-xs font-black">
              <div>
                <div className="flex justify-between mb-1">
                  <span>📐 Mathematics</span>
                  <span className="text-[#558B2F]">96% Mastery</span>
                </div>
                <div className="w-full h-2 bg-[#DCEDC8] rounded-full overflow-hidden border border-[#AFB42B]/20">
                  <div className="h-full bg-[#558B2F] rounded-full" style={{ width: '96%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>📚 English & Vocabulary</span>
                  <span className="text-[#558B2F]">92% Mastery</span>
                </div>
                <div className="w-full h-2 bg-[#DCEDC8] rounded-full overflow-hidden border border-[#AFB42B]/20">
                  <div className="h-full bg-[#558B2F] rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>🔬 Science & Botany</span>
                  <span className="text-[#558B2F]">94% Mastery</span>
                </div>
                <div className="w-full h-2 bg-[#DCEDC8] rounded-full overflow-hidden border border-[#AFB42B]/20">
                  <div className="h-full bg-[#558B2F] rounded-full" style={{ width: '94%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>🇪🇬 Egypt Cultural & Nile Agriculture</span>
                  <span className="text-[#558B2F]">98% Mastery</span>
                </div>
                <div className="w-full h-2 bg-[#DCEDC8] rounded-full overflow-hidden border border-[#AFB42B]/20">
                  <div className="h-full bg-[#558B2F] rounded-full" style={{ width: '98%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border-2 border-[#AFB42B]/30 p-6 shadow-xs">
            <h3 className="text-base font-black text-[#2E4018] mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#AFB42B]" />
              <span>Gamification Impact Correlation</span>
            </h3>
            <p className="text-xs text-[#4E342E] leading-relaxed font-medium">
              Students who completed 5+ homework missions have harvested an average of <strong>28 crops</strong> and reached <strong>Farm Level 4+</strong>.
              The direct connection between learning tasks and farm upgrades has raised weekly completion rates to <strong>88%</strong>.
            </p>
          </div>
        </div>
      )}

      {/* Inspect Student's Farm Modal */}
      {selectedStudentForFarmView && (
        <div className="fixed inset-0 z-50 bg-[#2E4018]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-4 border-[#AFB42B] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-linear-to-r from-[#558B2F] via-[#689F38] to-[#7CB342] px-6 py-4 flex items-center justify-between text-white border-b-2 border-[#AFB42B]/40">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌾</span>
                <div>
                  <h3 className="text-lg font-black">
                    Live Farm View: {allUsers.find((u) => u.id === selectedStudentForFarmView)?.name}
                  </h3>
                  <p className="text-xs text-[#F1F8E9] font-semibold">
                    Real-time inspection of student crops, buildings, and farm animals
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudentForFarmView(null)}
                className="p-1.5 rounded-xl bg-black/20 hover:bg-black/30 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-[#C5E1A5]/40 overflow-y-auto flex items-center justify-center flex-1">
              <div className="grid grid-cols-8 gap-1.5 bg-[#558B2F]/20 p-4 rounded-3xl border-2 border-[#558B2F]/30 shadow-inner">
                {StorageService.getFarmTiles(selectedStudentForFarmView).map((tile) => (
                  <FarmTileView
                    key={tile.id}
                    tile={tile}
                    isSelected={false}
                    activeTool="select"
                    onClick={() => {}}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grading / Review Modal */}
      {selectedSubForGrading && (
        <div className="fixed inset-0 z-50 bg-[#2E4018]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border-4 border-[#AFB42B]">
            <h3 className="text-lg font-black text-[#2E4018] mb-3">Review & Grade Homework</h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-black text-[#2E4018] block mb-1">Score Percentage (%)</label>
                <input
                  type="number"
                  value={gradingScore}
                  onChange={(e) => setGradingScore(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#F1F8E9] border border-[#AFB42B]/30 rounded-xl text-sm font-black text-[#2E4018] focus:border-[#558B2F] outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-black text-[#2E4018] block mb-1">Teacher Feedback Note</label>
                <textarea
                  value={gradingNote}
                  onChange={(e) => setGradingNote(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-[#F1F8E9] border border-[#AFB42B]/30 rounded-xl text-sm font-semibold text-[#2E4018] focus:border-[#558B2F] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-black text-[#2E4018] block mb-1">Teacher Bonus Coins (🪙)</label>
                  <input
                    type="number"
                    value={gradingBonusCoins}
                    onChange={(e) => setGradingBonusCoins(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F1F8E9] border border-[#AFB42B]/30 rounded-xl text-sm font-bold text-[#2E4018] focus:border-[#558B2F] outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-[#2E4018] block mb-1">Teacher Bonus XP (⚡)</label>
                  <input
                    type="number"
                    value={gradingBonusXP}
                    onChange={(e) => setGradingBonusXP(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F1F8E9] border border-[#AFB42B]/30 rounded-xl text-sm font-bold text-[#2E4018] focus:border-[#558B2F] outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelectedSubForGrading(null)}
                  className="px-4 py-2 bg-[#F1F8E9] hover:bg-[#DCEDC8] text-[#2E4018] font-black text-xs rounded-xl cursor-pointer border border-[#AFB42B]/30"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExecuteGrade}
                  className="px-5 py-2 bg-[#558B2F] hover:bg-[#33691E] text-white font-black text-xs rounded-xl shadow-[0_2px_0_#2E4018] active:translate-y-0.5 active:shadow-none cursor-pointer"
                >
                  Save Grade & Send Praise ⭐
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
