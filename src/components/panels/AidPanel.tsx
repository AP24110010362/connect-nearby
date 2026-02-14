import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { ArrowRightLeft, MapPin, Plus, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const AID_CATEGORIES = [
  { label: 'Tech', emoji: '💻' },
  { label: 'Academic', emoji: '📐' },
  { label: 'Creative', emoji: '🎨' },
  { label: 'Languages', emoji: '🗣️' },
  { label: 'Career', emoji: '💼' },
  { label: 'Other', emoji: '✨' },
];

export default function AidPanel() {
  const { aidPosts, activePanel, respondAid, currentUser } = useAppStore();
  const [showCreate, setShowCreate] = useState(false);
  const [aidType, setAidType] = useState<'offer' | 'need'>('offer');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(AID_CATEGORIES[0]);

  const isOpen = activePanel === 'aid';
  if (!isOpen) return null;

  const handleCreate = () => {
    if (!title.trim() || !description.trim()) return;
    useAppStore.getState().createAidPost({
      type: aidType,
      title,
      description,
      category: category.label,
      emoji: category.emoji,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      distance: Math.round(Math.random() * 500),
    });
    setTitle('');
    setDescription('');
    setShowCreate(false);
  };

  return (
    <motion.div
      initial={{ x: -320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -320, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="absolute top-0 left-16 bottom-0 w-80 bg-card border-r border-border z-[500] overflow-y-auto"
    >
      <div className="p-5">
        <h2 className="font-display text-xl font-bold text-card-foreground flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5 text-accent" />
          Aid Board
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Give help. Get help. Build community.</p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => { setAidType('offer'); setShowCreate(true); }}
            className="flex-1 py-2 rounded-xl gradient-emerald text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Offer Help
          </button>
          <button
            onClick={() => { setAidType('need'); setShowCreate(true); }}
            className="flex-1 py-2 rounded-xl gradient-coral text-secondary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Ask for Help
          </button>
        </div>

        {/* Create Aid Form */}
        <AnimatePresence>
          {showCreate && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 p-4 rounded-xl bg-background border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs uppercase font-bold px-2 py-0.5 rounded-full ${
                    aidType === 'offer' ? 'gradient-emerald text-accent-foreground' : 'gradient-coral text-secondary-foreground'
                  }`}>
                    {aidType === 'offer' ? '🤝 Offering Help' : '🙋 Asking for Help'}
                  </span>
                  <button onClick={() => setShowCreate(false)}>
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Title (e.g. Python tutoring)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-card border border-border text-sm text-card-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
                />
                <textarea
                  placeholder="Describe what you can help with or need..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-card border border-border text-sm text-card-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
                <div className="flex flex-wrap gap-1.5">
                  {AID_CATEGORIES.map((c) => (
                    <button
                      key={c.label}
                      onClick={() => setCategory(c)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                        category.label === c.label
                          ? 'gradient-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:text-card-foreground'
                      }`}
                    >
                      {c.emoji} {c.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleCreate}
                  disabled={!title.trim() || !description.trim()}
                  className={`w-full py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 ${
                    aidType === 'offer' ? 'gradient-emerald text-accent-foreground' : 'gradient-coral text-secondary-foreground'
                  }`}
                >
                  Post {aidType === 'offer' ? 'Offer' : 'Request'} 🚀
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5 space-y-3">
          {aidPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-background border border-border hover:shadow-card transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  post.type === 'offer' ? 'gradient-emerald text-accent-foreground' : 'gradient-coral text-secondary-foreground'
                }`}>
                  {post.type === 'offer' ? '🤝 Offering' : '🙋 Needed'}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <img src={post.userAvatar} alt={post.userName} className="w-8 h-8 rounded-full bg-muted shrink-0" />
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-card-foreground">{post.emoji} {post.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{post.description}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {post.distance}m away • {post.userName}
                  </div>
                </div>
              </div>

              <button
                onClick={() => respondAid(post.id)}
                disabled={post.responded}
                className={`w-full mt-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  post.responded
                    ? 'bg-accent/10 text-accent cursor-default'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
              >
                {post.responded ? '✓ Responded' : 'Respond →'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
