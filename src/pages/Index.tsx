import { AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import CommunityMap from '@/components/map/CommunityMap';
import UserProfileCard from '@/components/map/UserProfileCard';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import EventsPanel from '@/components/panels/EventsPanel';
import AidPanel from '@/components/panels/AidPanel';
import DashboardPanel from '@/components/panels/DashboardPanel';

const Index = () => {
  const { selectedUser, currentUser, setSelectedUser } = useAppStore();

  const sharedInterests = selectedUser && currentUser
    ? selectedUser.interests
        .filter((i) => currentUser.interests.some((ci) => ci.name === i.name))
        .map((i) => i.name)
    : [];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Map Background */}
      <CommunityMap />

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Top Bar */}
      <TopBar />

      {/* Side Panels */}
      <EventsPanel />
      <AidPanel />
      <DashboardPanel />

      {/* User Profile Card */}
      <AnimatePresence>
        {selectedUser && (
          <UserProfileCard
            user={selectedUser}
            sharedInterests={sharedInterests}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
