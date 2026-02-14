import { create } from 'zustand';

export type AvailabilityStatus = 'available' | 'studying' | 'busy' | 'open-to-chat';

export interface UserInterest {
  name: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  emoji: string;
}

export interface CommunityUser {
  id: string;
  name: string;
  avatar: string;
  university: string;
  bio: string;
  status: AvailabilityStatus;
  interests: UserInterest[];
  lat: number;
  lng: number;
  distance?: number;
}

export interface MicroEvent {
  id: string;
  title: string;
  category: string;
  emoji: string;
  creatorName: string;
  lat: number;
  lng: number;
  spotsLeft: number;
  totalSpots: number;
  endsAt: string;
  attendees: string[];
}

export interface AidPost {
  id: string;
  type: 'offer' | 'need';
  title: string;
  description: string;
  category: string;
  emoji: string;
  userName: string;
  userAvatar: string;
  distance: number;
  createdAt: string;
}

export type PanelView = 'none' | 'events' | 'aid' | 'dashboard' | 'profile';

interface AppState {
  currentUser: CommunityUser | null;
  nearbyUsers: CommunityUser[];
  events: MicroEvent[];
  aidPosts: AidPost[];
  activePanel: PanelView;
  selectedUser: CommunityUser | null;
  connectionIndex: number;
  setActivePanel: (panel: PanelView) => void;
  setSelectedUser: (user: CommunityUser | null) => void;
}

const MOCK_INTERESTS: UserInterest[] = [
  { name: 'Photography', category: 'Creative', level: 'Advanced', emoji: '📸' },
  { name: 'Python', category: 'Tech', level: 'Expert', emoji: '🐍' },
  { name: 'Running', category: 'Sports', level: 'Intermediate', emoji: '🏃' },
  { name: 'Guitar', category: 'Creative', level: 'Beginner', emoji: '🎸' },
  { name: 'Machine Learning', category: 'Tech', level: 'Advanced', emoji: '🤖' },
  { name: 'Yoga', category: 'Wellness', level: 'Intermediate', emoji: '🧘' },
  { name: 'Spanish', category: 'Languages', level: 'Beginner', emoji: '🇪🇸' },
  { name: 'Calculus', category: 'Academic', level: 'Advanced', emoji: '📐' },
  { name: 'Writing', category: 'Creative', level: 'Expert', emoji: '✍️' },
  { name: 'Basketball', category: 'Sports', level: 'Intermediate', emoji: '🏀' },
  { name: 'React', category: 'Tech', level: 'Expert', emoji: '⚛️' },
  { name: 'Meditation', category: 'Wellness', level: 'Beginner', emoji: '🧠' },
];

// Center around a university campus (MIT area)
const CENTER_LAT = 42.3601;
const CENTER_LNG = -71.0942;

function randomOffset() {
  return (Math.random() - 0.5) * 0.015;
}

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const avatars = [
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Sofia',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Marcus',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Aisha',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Jake',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Luna',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Kai',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Priya',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Omar',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Zara',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Leo',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Mia',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Noah',
];

const names = ['Sofia Chen', 'Marcus Johnson', 'Aisha Patel', 'Jake Wilson', 'Luna Garcia', 'Kai Nakamura', 'Priya Sharma', 'Omar Hassan', 'Zara Kim', 'Leo Torres', 'Mia Rivera', 'Noah Zhang'];
const universities = ['MIT', 'Harvard', 'Boston University', 'Northeastern', 'Tufts', 'Wellesley'];
const statuses: AvailabilityStatus[] = ['available', 'studying', 'open-to-chat', 'busy'];
const bios = [
  'CS major who loves late-night coding sessions ☕',
  'Art history nerd exploring the intersection of tech & creativity',
  'Aspiring data scientist, always down for study groups',
  'Transfer student looking to meet new people!',
  'Grad student, coffee enthusiast, amateur photographer',
  'Freshman finding my people 🌱',
  'Math tutor by day, guitar player by night 🎶',
  'International student from Seoul, love trying new foods',
  'Pre-med but secretly want to be a writer',
  'Engineering major who runs 5ks for fun',
  'Philosophy major contemplating existence over coffee',
  'Film student, always looking for collaborators',
];

const mockUsers: CommunityUser[] = names.map((name, i) => ({
  id: `user-${i}`,
  name,
  avatar: avatars[i],
  university: universities[i % universities.length],
  bio: bios[i],
  status: statuses[i % statuses.length],
  interests: pickRandom(MOCK_INTERESTS, 3 + Math.floor(Math.random() * 3)),
  lat: CENTER_LAT + randomOffset(),
  lng: CENTER_LNG + randomOffset(),
  distance: Math.round(100 + Math.random() * 2000),
}));

const mockEvents: MicroEvent[] = [
  {
    id: 'event-1',
    title: '☕ Study session at Blue Bottle',
    category: 'Study',
    emoji: '📚',
    creatorName: 'Sofia Chen',
    lat: CENTER_LAT + 0.002,
    lng: CENTER_LNG - 0.003,
    spotsLeft: 3,
    totalSpots: 5,
    endsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    attendees: ['Marcus Johnson'],
  },
  {
    id: 'event-2',
    title: '🏃 Morning jog around the Charles',
    category: 'Sports',
    emoji: '🏃',
    creatorName: 'Jake Wilson',
    lat: CENTER_LAT - 0.004,
    lng: CENTER_LNG + 0.002,
    spotsLeft: 7,
    totalSpots: 10,
    endsAt: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
    attendees: ['Luna Garcia', 'Leo Torres'],
  },
  {
    id: 'event-3',
    title: '🎸 Open mic jam session',
    category: 'Creative',
    emoji: '🎵',
    creatorName: 'Kai Nakamura',
    lat: CENTER_LAT + 0.005,
    lng: CENTER_LNG + 0.004,
    spotsLeft: 4,
    totalSpots: 8,
    endsAt: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    attendees: ['Priya Sharma'],
  },
];

const mockAidPosts: AidPost[] = [
  { id: 'aid-1', type: 'offer', title: 'Python tutoring available', description: 'I have 2 free hours and love teaching Python basics. Happy to help with homework or projects!', category: 'Tech', emoji: '🐍', userName: 'Sofia Chen', userAvatar: avatars[0], distance: 300, createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString() },
  { id: 'aid-2', type: 'need', title: 'Need help with Calculus II', description: 'Struggling with integration techniques. Would love a 1-on-1 session.', category: 'Academic', emoji: '📐', userName: 'Jake Wilson', userAvatar: avatars[3], distance: 500, createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
  { id: 'aid-3', type: 'offer', title: 'Free photography lessons', description: 'Got my DSLR and free afternoon. Want to learn composition basics?', category: 'Creative', emoji: '📸', userName: 'Priya Sharma', userAvatar: avatars[6], distance: 800, createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString() },
  { id: 'aid-4', type: 'need', title: 'Looking for Spanish practice partner', description: 'Intermediate level, want to practice conversational Spanish over coffee.', category: 'Languages', emoji: '🇪🇸', userName: 'Leo Torres', userAvatar: avatars[9], distance: 200, createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString() },
  { id: 'aid-5', type: 'offer', title: 'Resume review for tech jobs', description: 'Senior CS student, interned at Google. Happy to review your resume!', category: 'Career', emoji: '💼', userName: 'Marcus Johnson', userAvatar: avatars[1], distance: 600, createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString() },
];

export const useAppStore = create<AppState>((set) => ({
  currentUser: {
    id: 'me',
    name: 'You',
    avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=CurrentUser',
    university: 'MIT',
    bio: 'Just joined ResonanceMap!',
    status: 'available',
    interests: [MOCK_INTERESTS[0], MOCK_INTERESTS[4], MOCK_INTERESTS[2]],
    lat: CENTER_LAT,
    lng: CENTER_LNG,
  },
  nearbyUsers: mockUsers,
  events: mockEvents,
  aidPosts: mockAidPosts,
  activePanel: 'none',
  selectedUser: null,
  connectionIndex: 73,
  setActivePanel: (panel) => set((s) => ({ activePanel: s.activePanel === panel ? 'none' : panel })),
  setSelectedUser: (user) => set({ selectedUser: user }),
}));
