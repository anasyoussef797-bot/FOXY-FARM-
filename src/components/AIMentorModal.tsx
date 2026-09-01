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

interface AIMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  onRewardBonus?: (coins: number, water: number) => void;
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
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<string>('foxy');
  const [subject, setSubject] = useState<string>('Nile Science & Farming STEM');
  const [inputPrompt, setInputPrompt] = useState<string>(initialTopic ? `Can you explain: ${initialTopic}` : '');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'mentor',
      character: 'Foxy',
      text: '🦊 "Marhaban! I am Foxy, lead farmer at Impact Hub Egypt! Ask me any homework question about plants, mathematics, solar energy, or Egyptian agriculture!"',
      timestamp: 'Just now',
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
        }),
      });

      const data = await res.json();
      const mentorMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        sender: 'mentor',
        character: characterProfile.name,
        text: data.reply || 'Great question! Keep studying and your farm will flourish!',
        timestamp: 'Now',
      };
      setMessages((prev) => [...prev, mentorMsg]);

      // Small learning bonus
      if (onRewardBonus) {
        onRewardBonus(5, 1);
      }
    } catch (err) {
      console.error('Error contacting AI mentor endpoint:', err);
      const fallbackMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        sender: 'mentor',
        character: characterProfile.name,
        text: `${characterProfile.name} says: "Remember to break down scientific questions step by step. Great curiosity!"`,
        timestamp: 'Now',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ai-mentor-modal-overlay" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-amber-400/80 bg-slate-800 shadow-md">
              <img
                src={characterProfile.avatarUrl}
                alt={characterProfile.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  AI Farm Mentor • {characterProfile.name}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                  Online
                </span>
              </div>
              <p className="text-xs text-slate-400">{characterProfile.specialty}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-close-ai-modal"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Character Switcher Tabs */}
        <div className="p-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
          {CHARACTERS_DATA.map((c) => {
            const isSelected = selectedCharacter === c.id;
            return (
              <button
                key={c.id}
                id={`mentor-tab-${c.id}`}
                onClick={() => setSelectedCharacter(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <img
                  src={c.avatarUrl}
                  alt={c.name}
                  className="w-5 h-5 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span>{c.name}</span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">({c.role.split('&')[0]})</span>
              </button>
            );
          })}
        </div>

        {/* Chat History Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-h-[380px]">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-700 bg-slate-800">
                    <img
                      src={characterProfile.avatarUrl}
                      alt={msg.character}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <div
                  className={`p-4 rounded-2xl max-w-[85%] text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none shadow-md'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  {!isUser && (
                    <div className="flex items-center justify-between gap-3 mt-2 pt-2 border-t border-slate-700/50 text-[10px] text-slate-400">
                      <span>{msg.character || characterProfile.name} • Impact Hub Mentor</span>
                      <button
                        onClick={() => handleSpeak(msg.text)}
                        className="hover:text-amber-400 flex items-center gap-1 font-semibold transition-colors"
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX className="w-3 h-3 text-amber-400" /> Stop Audio
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3" /> Read Aloud
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 items-center text-xs text-amber-300">
              <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 animate-pulse">
                <BrainCircuit className="w-4 h-4 text-amber-400" />
              </div>
              <span className="italic">{characterProfile.name} is formulating the scientific explanation...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Homework Prompts */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-500 font-bold text-[10px] uppercase shrink-0">Quick Ask:</span>
          {[
            'Explain drip irrigation math',
            'How do root nodules fix nitrogen?',
            'How do solar pumps work in Egypt?',
            'Why are honeybees crucial for agriculture?',
          ].map((promptText, i) => (
            <button
              key={i}
              onClick={() => setInputPrompt(promptText)}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60 whitespace-nowrap text-xs transition-colors shrink-0"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <input
            id="input-mentor-prompt"
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={`Ask ${characterProfile.name} any science, math or farm question...`}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
          <button
            id="btn-send-mentor-prompt"
            type="submit"
            disabled={!inputPrompt.trim() || loading}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Ask Mentor</span>
          </button>
        </form>
      </div>
    </div>
  );
};
