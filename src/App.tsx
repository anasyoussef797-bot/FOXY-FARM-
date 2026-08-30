import React, { useState, useEffect } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { I18nProvider, useTranslation } from './i18n';
import { Navbar } from './components/layout/Navbar';
import { GameToolbar } from './components/layout/GameToolbar';
import { FarmCanvas } from './components/farm/FarmCanvas';
import { StudentDashboard } from './components/student/StudentDashboard';
import { HomeworkHub } from './components/homework/HomeworkHub';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { FarmShop } from './components/shop/FarmShop';
import { InventoryModal } from './components/inventory/InventoryModal';
import { FarmMarketModal } from './components/market/FarmMarketModal';
import { AchievementsView } from './components/achievements/AchievementsView';
import { DailyQuestsModal } from './components/daily/DailyQuestsModal';
import { TutorialOverlay } from './components/tutorial/TutorialOverlay';
import { CharacterModal } from './components/dialogs/CharacterModal';
import { DinarBonusModal } from './components/happyFarm/DinarBonusModal';

const MainAppContent: React.FC = () => {
  const {
    currentUser,
    isShopOpen,
    setIsShopOpen,
    isInventoryOpen,
    setIsInventoryOpen,
    isMarketOpen,
    setIsMarketOpen,
    homeworks,
    submissions,
  } = useGame();

  const { isRTL } = useTranslation();

  const [activeView, setActiveView] = useState<
    'farm' | 'dashboard' | 'homework' | 'achievements' | 'teacher'
  >('farm');

  const [isDailyQuestsOpen, setIsDailyQuestsOpen] = useState(false);
  const [showDinarBonusModal, setShowDinarBonusModal] = useState(false);

  const isTeacher = currentUser.role === 'TEACHER';

  // Calculate pending homework count
  const submittedHwIds = new Set(submissions.map((s) => s.homeworkId));
  const pendingHomeworkCount = homeworks.filter((h) => !submittedHwIds.has(h.id)).length;

  useEffect(() => {
    const handleOpenHw = () => {
      setActiveView('homework');
    };
    window.addEventListener('open-homework-hub', handleOpenHw);
    return () => window.removeEventListener('open-homework-hub', handleOpenHw);
  }, []);

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen h-screen overflow-hidden bg-[#689F38] flex flex-col text-slate-900 font-sans antialiased selection:bg-[#FDD835] selection:text-amber-950 relative"
    >
      {/* Top Floating HUD Navigation Bar */}
      <Navbar
        currentTab={activeView}
        onTabChange={(tab) => {
          if (
            tab === 'farm' ||
            tab === 'dashboard' ||
            tab === 'homework' ||
            tab === 'achievements' ||
            tab === 'teacher'
          ) {
            setActiveView(tab);
          }
        }}
        onOpenDinarBonus={() => setShowDinarBonusModal(true)}
      />

      {/* Main Game Screen / View Container */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {activeView === 'farm' && (
          <FarmCanvas
            onOpenShop={() => setIsShopOpen(true)}
            onOpenInventory={() => setIsInventoryOpen(true)}
            onOpenHomework={() => setActiveView('homework')}
            onOpenAchievements={() => setActiveView('achievements')}
            onOpenTeacher={() => setActiveView('teacher')}
          />
        )}

        {activeView === 'dashboard' && (
          <div className="flex-1 overflow-y-auto pb-20">
            <StudentDashboard
              onNavigate={(v) => {
                if (v === 'farm' || v === 'homework' || v === 'achievements') {
                  setActiveView(v);
                } else if (v === 'shop') {
                  setIsShopOpen(true);
                } else if (v === 'inventory') {
                  setIsInventoryOpen(true);
                } else if (v === 'quests') {
                  setIsDailyQuestsOpen(true);
                }
              }}
            />
          </div>
        )}

        {activeView === 'homework' && (
          <div className="flex-1 overflow-y-auto pb-20">
            <HomeworkHub />
          </div>
        )}

        {activeView === 'achievements' && (
          <div className="flex-1 overflow-y-auto pb-20">
            <AchievementsView />
          </div>
        )}

        {activeView === 'teacher' && (
          <div className="flex-1 overflow-y-auto pb-20">
            <TeacherDashboard />
          </div>
        )}
      </main>

      {/* Floating Bottom Action Toolbar (Shown on non-farm views for navigation) */}
      {activeView !== 'farm' && (
        <GameToolbar
          currentTab={activeView}
          onTabChange={(tab) => {
            if (
              tab === 'farm' ||
              tab === 'dashboard' ||
              tab === 'homework' ||
              tab === 'achievements' ||
              tab === 'teacher'
            ) {
              setActiveView(tab);
            }
          }}
          onOpenShop={() => setIsShopOpen(true)}
          onOpenInventory={() => setIsInventoryOpen(true)}
          onOpenMarket={() => setIsMarketOpen(true)}
          onOpenQuests={() => setIsDailyQuestsOpen(true)}
          isTeacher={isTeacher}
          pendingHomeworkCount={pendingHomeworkCount}
        />
      )}

      {/* Full-Screen & Floating Modals */}
      {isShopOpen && <FarmShop onClose={() => setIsShopOpen(false)} />}
      {isInventoryOpen && <InventoryModal onClose={() => setIsInventoryOpen(false)} />}
      {isMarketOpen && <FarmMarketModal onClose={() => setIsMarketOpen(false)} />}
      {isDailyQuestsOpen && <DailyQuestsModal onClose={() => setIsDailyQuestsOpen(false)} />}
      {showDinarBonusModal && (
        <DinarBonusModal
          onClose={() => setShowDinarBonusModal(false)}
        />
      )}

      <TutorialOverlay />
      <CharacterModal />
    </div>
  );
};

export default function App() {
  return (
    <I18nProvider>
      <GameProvider>
        <MainAppContent />
      </GameProvider>
    </I18nProvider>
  );
}
