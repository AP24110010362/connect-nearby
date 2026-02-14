import { motion } from 'framer-motion';
import { CommunityUser } from '@/store/appStore';
import { STATUS_CONFIG } from '@/lib/constants';
import { MessageCircle, UserPlus, X } from 'lucide-react';

interface UserProfileCardProps {
  user: CommunityUser;
  sharedInterests?: string[];
  onClose: () => void;
}

export default function UserProfileCard({ user, sharedInterests = [], onClose }: UserProfileCardProps) {
  const status = STATUS_CONFIG[user.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-[340px]"
    >
      <div className="rounded-2xl bg-card border border-border shadow-card-hover overflow-hidden">
        {/* Header */}
        <div className="gradient-primary p-4 pb-8 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors"
          >
            <X className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>

        {/* Avatar */}
        <div className="flex justify-center -mt-8 relative z-10">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full border-4 border-card bg-card"
            />
            <div
              className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-card ${status.dotClass}`}
            />
          </div>
        </div>

        {/* Info */}
        <div className="p-4 pt-2 text-center">
          <h3 className="font-display text-lg font-bold text-card-foreground">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.university}</p>
          <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
            {status.label} • {user.distance}m away
          </span>
          <p className="mt-2 text-sm text-card-foreground/80">{user.bio}</p>

          {/* Interests */}
          <div className="flex flex-wrap gap-1.5 justify-center mt-3">
            {user.interests.map((interest) => {
              const isShared = sharedInterests.includes(interest.name);
              return (
                <span
                  key={interest.name}
                  className={`text-xs px-2 py-1 rounded-full ${
                    isShared
                      ? 'gradient-primary text-primary-foreground font-medium'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {interest.emoji} {interest.name}
                </span>
              );
            })}
          </div>

          {sharedInterests.length > 0 && (
            <p className="text-xs text-accent mt-2 font-medium">
              ✨ {sharedInterests.length} shared interest{sharedInterests.length > 1 ? 's' : ''}!
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-2 mt-4">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              <UserPlus className="w-4 h-4" />
              Connect
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-muted text-card-foreground text-sm font-medium hover:bg-muted/80 transition-colors">
              <MessageCircle className="w-4 h-4" />
              Message
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
