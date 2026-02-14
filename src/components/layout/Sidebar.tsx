import { useAppStore, PanelView } from '@/store/appStore';
import { Map, CalendarDays, ArrowRightLeft, BarChart3, User } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems: { id: PanelView; icon: typeof Map; label: string }[] = [
  { id: 'none', icon: Map, label: 'Map' },
  { id: 'events', icon: CalendarDays, label: 'Events' },
  { id: 'aid', icon: ArrowRightLeft, label: 'Aid' },
  { id: 'dashboard', icon: BarChart3, label: 'Health' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export default function Sidebar() {
  const { activePanel, setActivePanel } = useAppStore();

  return (
    <div className="absolute top-0 left-0 bottom-0 w-16 bg-card border-r border-border z-[600] flex flex-col items-center py-4">
      {/* Logo */}
      <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mb-6">
        <span className="text-primary-foreground text-lg font-bold font-display">R</span>
      </div>

      <nav className="flex-1 flex flex-col items-center gap-1">
        {navItems.map(({ id, icon: Icon, label }) => {
          const isActive = activePanel === id || (id === 'none' && activePanel === 'none');
          return (
            <button
              key={id}
              onClick={() => setActivePanel(id)}
              className="relative group w-11 h-11 flex items-center justify-center rounded-xl transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-xl bg-primary/10"
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                />
              )}
              <Icon
                className={`w-5 h-5 relative z-10 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-card-foreground'
                }`}
              />
              {/* Tooltip */}
              <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-foreground text-background text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                {label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* User avatar */}
      <div className="mt-auto">
        <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
          <span className="text-primary-foreground text-xs font-bold">Y</span>
        </div>
      </div>
    </div>
  );
}
