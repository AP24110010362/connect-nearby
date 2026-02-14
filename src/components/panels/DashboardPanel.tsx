import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { Activity, TrendingUp, Users, Calendar, Heart } from 'lucide-react';

const weeklyData = [62, 58, 67, 71, 69, 73, 73];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const champions = [
  { name: 'Aarav Sharma', score: 142, avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Aarav' },
  { name: 'Meera Patel', score: 128, avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Meera' },
  { name: 'Diya Iyer', score: 115, avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Diya' },
];

export default function DashboardPanel() {
  const { connectionIndex, activePanel, nearbyUsers, events } = useAppStore();
  const isOpen = activePanel === 'dashboard';

  if (!isOpen) return null;

  const maxVal = Math.max(...weeklyData);

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
          <Activity className="w-5 h-5 text-primary" />
          Community Health
        </h2>

        <div className="mt-4 p-4 rounded-2xl gradient-primary text-primary-foreground">
          <p className="text-xs uppercase tracking-wider opacity-80">Connection Index</p>
          <div className="flex items-end gap-2 mt-1">
            <motion.span
              className="text-5xl font-display font-bold"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              {connectionIndex}
            </motion.span>
            <span className="text-lg opacity-80 mb-1">/100</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm opacity-90">
            <TrendingUp className="w-4 h-4" />
            +12% from last week
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          {[
            { label: 'Nearby', value: nearbyUsers.length, icon: Users },
            { label: 'Events', value: events.length, icon: Calendar },
            { label: 'Helped', value: 24, icon: Heart },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="p-3 rounded-xl bg-background border border-border text-center">
              <Icon className="w-4 h-4 mx-auto text-muted-foreground" />
              <p className="text-lg font-bold text-card-foreground mt-1">{value}</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <h3 className="text-sm font-semibold text-card-foreground mb-3">Weekly Trend</h3>
          <div className="flex items-end gap-1.5 h-24">
            {weeklyData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  className="w-full rounded-t-md gradient-primary"
                  initial={{ height: 0 }}
                  animate={{ height: `${(val / maxVal) * 80}px` }}
                  transition={{ delay: i * 0.05, type: 'spring', damping: 15 }}
                />
                <span className="text-[9px] text-muted-foreground">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-sm font-semibold text-card-foreground mb-3">🏆 Community Champions</h3>
          <div className="space-y-2">
            {champions.map((champ, i) => (
              <div key={champ.name} className="flex items-center gap-3 p-2 rounded-lg bg-background border border-border">
                <span className="text-sm font-bold text-muted-foreground w-5">{i + 1}</span>
                <img src={champ.avatar} alt={champ.name} className="w-8 h-8 rounded-full bg-muted" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">{champ.name}</p>
                  <p className="text-[10px] text-muted-foreground">{champ.score} connections</p>
                </div>
                {i === 0 && <span className="text-lg">👑</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
