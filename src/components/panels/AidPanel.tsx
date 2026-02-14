import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { ArrowRightLeft, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function AidPanel() {
  const { aidPosts, activePanel } = useAppStore();
  const isOpen = activePanel === 'aid';

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
            <button className="flex-1 py-2 rounded-xl gradient-emerald text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              Offer Help
            </button>
            <button className="flex-1 py-2 rounded-xl gradient-coral text-secondary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              Ask for Help
            </button>
          </div>

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
                    post.type === 'offer'
                      ? 'gradient-emerald text-accent-foreground'
                      : 'gradient-coral text-secondary-foreground'
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

                <button className="w-full mt-3 py-2 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                  Respond →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
