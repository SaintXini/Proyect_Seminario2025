import { 
  Home, Plus, Calendar, MessageSquare, FolderOpen, User,
  FileText, Upload, Edit, Settings
} from 'lucide-react';

export const getMenuItems = (t) => [
  { id: 'dashboard', icon: Home, label: t.dashboard },
  { id: 'newProject', icon: Plus, label: t.newProject },
  { id: 'calendar', icon: Calendar, label: t.calendar },
  { id: 'meetings', icon: MessageSquare, label: t.meetings },
  { id: 'history', icon: FolderOpen, label: t.history },
  { id: 'profile', icon: User, label: t.profile },
];

export const getQuickActions = (t) => [
  { id: 'revision', icon: FileText, label: t.requestRevision, color: 'blue' },
  { id: 'material', icon: Upload, label: t.addMaterial, color: 'green' },
  { id: 'change', icon: Edit, label: t.requestChange, color: 'orange' },
  { id: 'support', icon: Settings, label: t.technicalSupport, color: 'purple' },
];