import { AvailabilityStatus } from '@/store/appStore';

export const STATUS_CONFIG: Record<AvailabilityStatus, { label: string; color: string; dotClass: string }> = {
  'available': { label: 'Available', color: 'hsl(166, 100%, 39%)', dotClass: 'bg-accent' },
  'studying': { label: 'Studying', color: 'hsl(243, 80%, 69%)', dotClass: 'bg-primary' },
  'busy': { label: 'Busy', color: 'hsl(0, 84%, 60%)', dotClass: 'bg-destructive' },
  'open-to-chat': { label: 'Open to Chat', color: 'hsl(348, 100%, 70%)', dotClass: 'bg-secondary' },
};

export const CATEGORY_COLORS: Record<string, string> = {
  'Tech': 'hsl(243, 80%, 69%)',
  'Creative': 'hsl(348, 100%, 70%)',
  'Sports': 'hsl(166, 100%, 39%)',
  'Academic': 'hsl(45, 93%, 58%)',
  'Languages': 'hsl(200, 80%, 55%)',
  'Wellness': 'hsl(280, 70%, 65%)',
  'Career': 'hsl(30, 90%, 55%)',
  'Study': 'hsl(243, 80%, 69%)',
  'Social': 'hsl(348, 100%, 70%)',
};

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || 'hsl(243, 80%, 69%)';
}
