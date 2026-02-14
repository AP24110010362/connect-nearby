import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { Search, Bell, Wifi } from 'lucide-react';

export default function TopBar() {
  const { nearbyUsers, connectionIndex, setActivePanel, notifications, searchQuery, setSearchQuery } = useAppStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="absolute top-4 left-20 right-4 z-[500] flex items-center gap-3">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card/90 backdrop-blur-md border border-border shadow-card">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search people, interests, events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-card-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      {/* Status pills */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card/90 backdrop-blur-md border border-border shadow-card">
          <Wifi className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs font-medium text-card-foreground">{nearbyUsers.length} nearby</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card/90 backdrop-blur-md border border-border shadow-card">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-medium text-card-foreground">Index: {connectionIndex}</span>
        </div>

        <button
          onClick={() => setActivePanel('notifications')}
          className="relative p-2.5 rounded-xl bg-card/90 backdrop-blur-md border border-border shadow-card hover:shadow-card-hover transition-shadow"
        >
          <Bell className="w-4 h-4 text-card-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full gradient-coral text-[10px] text-secondary-foreground flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
