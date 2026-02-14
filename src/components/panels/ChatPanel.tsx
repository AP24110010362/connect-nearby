import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { ArrowLeft, Send } from 'lucide-react';

export default function ChatPanel() {
  const { activePanel, chatUser, chatMessages, sendMessage, setActivePanel } = useAppStore();
  const [text, setText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const isOpen = activePanel === 'chat';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  if (!isOpen || !chatUser) return null;

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text.trim());
    setText('');
  };

  return (
    <motion.div
      initial={{ x: -320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -320, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="absolute top-0 left-16 bottom-0 w-80 bg-card border-r border-border z-[500] flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center gap-3">
        <button onClick={() => setActivePanel('none')} className="p-1 rounded-lg hover:bg-muted transition-colors">
          <ArrowLeft className="w-4 h-4 text-card-foreground" />
        </button>
        <img src={chatUser.avatar} alt={chatUser.name} className="w-8 h-8 rounded-full bg-muted" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-card-foreground">{chatUser.name}</p>
          <p className="text-[10px] text-muted-foreground">{chatUser.university}</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {chatMessages.map((msg) => {
          if (msg.from === 'system') {
            return (
              <div key={msg.id} className="text-center">
                <span className="text-[10px] text-muted-foreground bg-muted px-3 py-1 rounded-full">{msg.text}</span>
              </div>
            );
          }
          const isMe = msg.from === 'me';
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                  isMe
                    ? 'gradient-primary text-primary-foreground rounded-br-md'
                    : 'bg-muted text-card-foreground rounded-bl-md'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 rounded-xl bg-background border border-border text-sm text-card-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            className="p-2.5 rounded-xl gradient-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
