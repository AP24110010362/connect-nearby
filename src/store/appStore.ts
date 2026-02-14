import { create } from 'zustand';
import { toast } from 'sonner';

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
  connected?: boolean;
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
  rsvped?: boolean;
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
  responded?: boolean;
}

export interface ChatMessage {
  id: string;
  from: string;
  text: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  text: string;
  time: string;
  read: boolean;
}

export type PanelView = 'none' | 'events' | 'aid' | 'dashboard' | 'profile' | 'chat' | 'notifications' | 'create-event' | 'create-aid';

interface AppState {
  currentUser: CommunityUser;
  nearbyUsers: CommunityUser[];
  events: MicroEvent[];
  aidPosts: AidPost[];
  activePanel: PanelView;
  selectedUser: CommunityUser | null;
  connectionIndex: number;
  chatUser: CommunityUser | null;
  chatMessages: ChatMessage[];
  notifications: Notification[];
  searchQuery: string;
  setActivePanel: (panel: PanelView) => void;
  setSelectedUser: (user: CommunityUser | null) => void;
  rsvpEvent: (eventId: string) => void;
  connectUser: (userId: string) => void;
  openChat: (user: CommunityUser) => void;
  sendMessage: (text: string) => void;
  createEvent: (event: Omit<MicroEvent, 'id' | 'attendees' | 'rsvped'>) => void;
  createAidPost: (post: Omit<AidPost, 'id' | 'responded' | 'createdAt'>) => void;
  respondAid: (aidId: string) => void;
  setSearchQuery: (q: string) => void;
  markNotificationRead: (id: string) => void;
  updateStatus: (status: AvailabilityStatus) => void;
}

const MOCK_INTERESTS: UserInterest[] = [
  { name: 'Photography', category: 'Creative', level: 'Advanced', emoji: '📸' },
  { name: 'Python', category: 'Tech', level: 'Expert', emoji: '🐍' },
  { name: 'Cricket', category: 'Sports', level: 'Intermediate', emoji: '🏏' },
  { name: 'Guitar', category: 'Creative', level: 'Beginner', emoji: '🎸' },
  { name: 'Machine Learning', category: 'Tech', level: 'Advanced', emoji: '🤖' },
  { name: 'Yoga', category: 'Wellness', level: 'Intermediate', emoji: '🧘' },
  { name: 'Hindi', category: 'Languages', level: 'Expert', emoji: '🇮🇳' },
  { name: 'Calculus', category: 'Academic', level: 'Advanced', emoji: '📐' },
  { name: 'Writing', category: 'Creative', level: 'Expert', emoji: '✍️' },
  { name: 'Badminton', category: 'Sports', level: 'Intermediate', emoji: '🏸' },
  { name: 'React', category: 'Tech', level: 'Expert', emoji: '⚛️' },
  { name: 'Meditation', category: 'Wellness', level: 'Beginner', emoji: '🧠' },
];

// Center around IIT Delhi campus
const CENTER_LAT = 28.5459;
const CENTER_LNG = 77.1926;

function randomOffset() {
  return (Math.random() - 0.5) * 0.015;
}

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const avatars = [
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Aarav',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Meera',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Rohan',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Ananya',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Vikram',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Sneha',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Arjun',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Diya',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Kabir',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Ishita',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Aditya',
  'https://api.dicebear.com/9.x/adventurer/svg?seed=Kavya',
];

const names = ['Aarav Sharma', 'Meera Patel', 'Rohan Gupta', 'Ananya Singh', 'Vikram Reddy', 'Sneha Nair', 'Arjun Mehta', 'Diya Iyer', 'Kabir Khan', 'Ishita Das', 'Aditya Joshi', 'Kavya Rao'];
const universities = ['IIT Delhi', 'IIT Bombay', 'JNU', 'Delhi University', 'BITS Pilani', 'IIIT Hyderabad'];
const statuses: AvailabilityStatus[] = ['available', 'studying', 'open-to-chat', 'busy'];
const bios = [
  'CS major who loves late-night coding sessions with chai ☕',
  'Art history nerd exploring the intersection of tech & creativity',
  'Aspiring data scientist, always down for study groups',
  'Transfer student looking to meet new people!',
  'Grad student, chai enthusiast, amateur photographer',
  'Freshman finding my people 🌱',
  'Math tutor by day, guitar player by night 🎶',
  'Exchange student from Bangalore, love trying street food',
  'Pre-med but secretly want to be a writer',
  'Engineering major who plays badminton for fun',
  'Philosophy major contemplating existence over filter coffee',
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
  connected: false,
}));

const mockEvents: MicroEvent[] = [
  {
    id: 'event-1',
    title: '☕ Study session at Chaayos',
    category: 'Study',
    emoji: '📚',
    creatorName: 'Aarav Sharma',
    lat: CENTER_LAT + 0.002,
    lng: CENTER_LNG - 0.003,
    spotsLeft: 3,
    totalSpots: 5,
    endsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    attendees: ['Meera Patel'],
    rsvped: false,
  },
  {
    id: 'event-2',
    title: '🏏 Evening cricket at the ground',
    category: 'Sports',
    emoji: '🏏',
    creatorName: 'Vikram Reddy',
    lat: CENTER_LAT - 0.004,
    lng: CENTER_LNG + 0.002,
    spotsLeft: 7,
    totalSpots: 10,
    endsAt: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
    attendees: ['Arjun Mehta', 'Kabir Khan'],
    rsvped: false,
  },
  {
    id: 'event-3',
    title: '🎸 Open mic jam session',
    category: 'Creative',
    emoji: '🎵',
    creatorName: 'Sneha Nair',
    lat: CENTER_LAT + 0.005,
    lng: CENTER_LNG + 0.004,
    spotsLeft: 4,
    totalSpots: 8,
    endsAt: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    attendees: ['Diya Iyer'],
    rsvped: false,
  },
];

const mockAidPosts: AidPost[] = [
  { id: 'aid-1', type: 'offer', title: 'Python tutoring available', description: 'I have 2 free hours and love teaching Python basics. Happy to help with homework or projects!', category: 'Tech', emoji: '🐍', userName: 'Aarav Sharma', userAvatar: avatars[0], distance: 300, createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString() },
  { id: 'aid-2', type: 'need', title: 'Need help with Calculus II', description: 'Struggling with integration techniques. Would love a 1-on-1 session.', category: 'Academic', emoji: '📐', userName: 'Ananya Singh', userAvatar: avatars[3], distance: 500, createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
  { id: 'aid-3', type: 'offer', title: 'Free photography lessons', description: 'Got my DSLR and free afternoon. Want to learn composition basics?', category: 'Creative', emoji: '📸', userName: 'Diya Iyer', userAvatar: avatars[7], distance: 800, createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString() },
  { id: 'aid-4', type: 'need', title: 'Looking for Hindi practice partner', description: 'Intermediate level, want to practice conversational Hindi over chai.', category: 'Languages', emoji: '🇮🇳', userName: 'Kabir Khan', userAvatar: avatars[8], distance: 200, createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString() },
  { id: 'aid-5', type: 'offer', title: 'Resume review for tech jobs', description: 'Senior CS student, interned at Flipkart. Happy to review your resume!', category: 'Career', emoji: '💼', userName: 'Rohan Gupta', userAvatar: avatars[2], distance: 600, createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString() },
];

const mockNotifications: Notification[] = [
  { id: 'n1', text: '🎉 Meera Patel accepted your connection request!', time: '2 min ago', read: false },
  { id: 'n2', text: '📚 New study session near you at Chaayos', time: '15 min ago', read: false },
  { id: 'n3', text: '🏏 Vikram Reddy is looking for cricket players nearby', time: '1 hour ago', read: false },
];

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: {
    id: 'me',
    name: 'You',
    avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=CurrentUser',
    university: 'IIT Delhi',
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
  chatUser: null,
  chatMessages: [],
  notifications: mockNotifications,
  searchQuery: '',

  setActivePanel: (panel) => set((s) => ({ activePanel: s.activePanel === panel ? 'none' : panel })),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setSearchQuery: (q) => set({ searchQuery: q }),

  rsvpEvent: (eventId) => set((s) => {
    const events = s.events.map((e) => {
      if (e.id === eventId && !e.rsvped && e.spotsLeft > 0) {
        toast.success(`You RSVP'd to "${e.title}"!`);
        return { ...e, rsvped: true, spotsLeft: e.spotsLeft - 1, attendees: [...e.attendees, 'You'] };
      }
      if (e.id === eventId && e.rsvped) {
        toast.info(`You left "${e.title}"`);
        return { ...e, rsvped: false, spotsLeft: e.spotsLeft + 1, attendees: e.attendees.filter((a) => a !== 'You') };
      }
      return e;
    });
    return { events };
  }),

  connectUser: (userId) => set((s) => {
    const nearbyUsers = s.nearbyUsers.map((u) => {
      if (u.id === userId) {
        const newConnected = !u.connected;
        if (newConnected) {
          toast.success(`Connection request sent to ${u.name}! 🎉`);
        } else {
          toast.info(`Disconnected from ${u.name}`);
        }
        return { ...u, connected: newConnected };
      }
      return u;
    });
    const selectedUser = s.selectedUser && s.selectedUser.id === userId
      ? { ...s.selectedUser, connected: !s.selectedUser.connected }
      : s.selectedUser;
    return { nearbyUsers, selectedUser };
  }),

  openChat: (user) => set({
    chatUser: user,
    activePanel: 'chat',
    selectedUser: null,
    chatMessages: [
      { id: 'sys-1', from: 'system', text: `You started a conversation with ${user.name}`, timestamp: new Date().toISOString() },
    ],
  }),

  sendMessage: (text) => set((s) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      from: 'me',
      text,
      timestamp: new Date().toISOString(),
    };
    // Simulate reply after 1s
    setTimeout(() => {
      const replies = [
        'Hey! Great to connect with you 😊',
        'Sure, that sounds awesome!',
        'I\'d love to meet up! When works for you?',
        'That\'s so cool! I\'m into that too!',
        'Let\'s do it! Meet at the campus café?',
      ];
      const reply: ChatMessage = {
        id: `msg-${Date.now()}-reply`,
        from: get().chatUser?.name || 'them',
        text: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date().toISOString(),
      };
      set((s2) => ({ chatMessages: [...s2.chatMessages, reply] }));
    }, 1200);
    return { chatMessages: [...s.chatMessages, newMsg] };
  }),

  createEvent: (eventData) => set((s) => {
    const newEvent: MicroEvent = {
      ...eventData,
      id: `event-${Date.now()}`,
      attendees: [],
      rsvped: false,
    };
    toast.success(`Event "${newEvent.title}" created! 🎉`);
    return { events: [newEvent, ...s.events], activePanel: 'events' };
  }),

  createAidPost: (postData) => set((s) => {
    const newPost: AidPost = {
      ...postData,
      id: `aid-${Date.now()}`,
      responded: false,
      createdAt: new Date().toISOString(),
    };
    toast.success(`Aid post "${newPost.title}" created! 🤝`);
    return { aidPosts: [newPost, ...s.aidPosts], activePanel: 'aid' };
  }),

  respondAid: (aidId) => set((s) => {
    const aidPosts = s.aidPosts.map((p) => {
      if (p.id === aidId && !p.responded) {
        toast.success(`You responded to "${p.title}"! ${p.userName} will be notified.`);
        return { ...p, responded: true };
      }
      return p;
    });
    return { aidPosts };
  }),

  markNotificationRead: (id) => set((s) => ({
    notifications: s.notifications.map((n) => n.id === id ? { ...n, read: true } : n),
  })),

  updateStatus: (status) => set((s) => {
    toast.success(`Status updated to ${status}`);
    return { currentUser: { ...s.currentUser, status } };
  }),
}));
