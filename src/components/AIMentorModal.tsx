import React, { useState } from 'react';
import { CHARACTERS_DATA } from '../data/initialData';
import {
  Sparkles,
  Send,
  X,
  Bot,
  Volume2,
  VolumeX,
  HelpCircle,
  BrainCircuit,
  GraduationCap,
  MessageSquare,
  BookOpen,
} from 'lucide-react';
import { playPopSound } from '../utils/audio';

interface AIMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  onRewardBonus?: (coins: number, water: number) => void;
  lang: 'ar' | 'en';
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  character?: string;
  timestamp: string;
}

export const AIMentorModal: React.FC<AIMentorModalProps> = ({
  isOpen,
  onClose,
  initialTopic = '',
  onRewardBonus,
  lang,
}) => {
  const isAr = lang === 'ar';
  const [selectedCharacter, setSelectedCharacter] = useState<string>('spark');
  const [subject, setSubject] = useState<string>('Nile Science & Farming STEM');
  const [inputPrompt, setInputPrompt] = useState<string>(initialTopic ? (isAr ? `هل يمكنك شرح: ${initialTopic}` : `Can you explain: ${initialTopic}`) : '');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'mentor',
      character: 'Spark',
      text: isAr
        ? '⚡ مرحباً بك يا بطل! أنا الروبوت سبارك المساعد الذكي لمزرعة فوكسي! اسألني أي سؤال عن العلوم، البناء الضوئي، الري بالتنقيط أو الواجبات المدرسية!'
        : '⚡ "Hello! I am Spark, your AI Study companion at Foxy Farm! Ask me any STEM homework question about photosynthesis, drip irrigation, or biology!"',
      timestamp: 'Now',
    },
  ]);

  if (!isOpen) return null;

  const characterProfile = CHARACTERS_DATA.find((c) => c.id === selectedCharacter) || CHARACTERS_DATA[0];

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const cleanText = text.replace(/[*#]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputPrompt.trim() || loading) return;

    const userText = inputPrompt.trim();
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: 'Now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/ask-mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          character: characterProfile.name,
          subject,
          prompt: userText,
          lang,
        }),
      });

      const data = await res.json();
      const replyText = data.reply || (isAr ? 'أحسنت! هذا سؤال ممتاز في العلوم والزراعة المستدامة.' : 'Great question! In sustainable agriculture, plants utilize natural sunlight and efficient irrigation.');

      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          sender: 'mentor',
          character: characterProfile.name,
          text: replyText,
          timestamp: 'Just now',
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          sender: 'mentor',
          character: characterProfile.name,
          text: isAr
            ? `🌱 إجابة من ${characterProfile.nameAr}: النباتات كائنات حية تصنع غذاءها بنفسها عبر عملية البناء الضوئي، والري بالتنقيط يوفر 60% من المياه الثمينة!`
            : `🌱 Helpful hint from ${characterProfile.name}: Plants convert solar light into glucose via photosynthesis, while drip irrigation preserves up to 60% of fresh water!`,
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="ai-mentor-modal"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="bg-slate-900 border-2 border-purple-500/50 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 border-b border-purple-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-2xl shadow-inner">
              ⚡
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                {isAr ? 'المعلم الذكي سبارك وروبوت الواجبات' : 'Spark AI STEM Tutor & Homework Solver'}
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 font-bold border border-purple-400/40">
                  Gemini AI
                </span>
              </h3>
              <p className="text-xs text-purple-200/80">
                {isAr
                  ? 'اطرح أي سؤال في العلوم، الرياضيات، الري الذكي وسيشرح لك خطوة بخطوة!'
                  : 'Ask any question on plant science, math, or irrigation to get guided explanations!'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playPopSound();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Character Squad Picker */}
        <div className="px-4 py-2.5 bg-slate-950/90 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-slate-400 shrink-0">
            {isAr ? 'اختر المعلم:' : 'Mentor:'}
          </span>
          {CHARACTERS_DATA.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                playPopSound();
                setSelectedCharacter(c.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all ${
                selectedCharacter === c.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30 ring-2 ring-purple-400/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{c.avatarUrl ? '🧑‍🌾' : '🦊'}</span>
              <span>{isAr ? c.nameAr : c.name}</span>
            </button>
          ))}
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 max-h-[380px] bg-slate-950/50">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-lg shrink-0">
                    ⚡
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 text-[10px] opacity-75">
                    <span>{isUser ? (isAr ? 'أنت' : 'You') : m.character || 'Spark AI'}</span>
                    <span>{m.timestamp}</span>
                  </div>
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-2 items-center text-xs text-purple-300 animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'سبارك يفكر ويحلل السؤال...' : 'Spark is analyzing and formulating response...'}</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSendMessage}
          className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={
              isAr
                ? 'اكتب سؤالك هنا (مثلاً: كيف تصنع النباتات الغذاء بالضوء؟)...'
                : 'Type your homework question here...'
            }
            className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-purple-400 outline-none"
          />

          <button
            type="submit"
            disabled={!inputPrompt.trim() || loading}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-black text-xs shadow-md shadow-purple-500/20 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{isAr ? 'إرسال' : 'Send'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
