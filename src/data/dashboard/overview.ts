export interface KpiStat {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: 'deals' | 'pipeline' | 'score' | 'time';
}

export interface RecentUpload {
  id: string;
  company: string;
  sector: string;
  stage: string;
  uploadedBy: string;
  uploadedAt: string;
  status: 'processing' | 'scored' | 'queued';
  score: number | null;
}

export interface ActivityItem {
  id: string;
  type: 'upload' | 'score' | 'move' | 'comment' | 'user';
  text: string;
  time: string;
  user: string;
}

export const kpiStats: KpiStat[] = [
  { id: 'deals', label: 'Deals Reviewed', value: '248', change: 12, changeLabel: 'vs last month', icon: 'deals' },
  { id: 'pipeline', label: 'Active Pipeline', value: '34', change: 5, changeLabel: 'vs last month', icon: 'pipeline' },
  { id: 'score', label: 'Avg. AI Score', value: '72.4', change: 3.1, changeLabel: 'vs last month', icon: 'score' },
  { id: 'time', label: 'Hours Saved', value: '1,840', change: 18, changeLabel: 'vs last month', icon: 'time' },
];

export const recentUploads: RecentUpload[] = [
  { id: 'ru1', company: 'Nexus AI', sector: 'AI/ML', stage: 'Series A', uploadedBy: 'Priya Sharma', uploadedAt: '2 hours ago', status: 'scored', score: 84 },
  { id: 'ru2', company: 'GreenWave Energy', sector: 'CleanTech', stage: 'Seed', uploadedBy: 'James Wu', uploadedAt: '4 hours ago', status: 'scored', score: 71 },
  { id: 'ru3', company: 'MedSync Health', sector: 'HealthTech', stage: 'Series B', uploadedBy: 'Priya Sharma', uploadedAt: '6 hours ago', status: 'processing', score: null },
  { id: 'ru4', company: 'FinFlow', sector: 'FinTech', stage: 'Seed', uploadedBy: 'Ananya Rao', uploadedAt: '1 day ago', status: 'scored', score: 67 },
  { id: 'ru5', company: 'CloudBridge', sector: 'SaaS', stage: 'Series A', uploadedBy: 'James Wu', uploadedAt: '1 day ago', status: 'queued', score: null },
  { id: 'ru6', company: 'DataVault', sector: 'Enterprise', stage: 'Series C', uploadedBy: 'Priya Sharma', uploadedAt: '2 days ago', status: 'scored', score: 90 },
];

export const activityFeed: ActivityItem[] = [
  { id: 'a1', type: 'score', text: 'Nexus AI scored 84/100 by AI engine', time: '2h ago', user: 'System' },
  { id: 'a2', type: 'move', text: 'FinFlow moved to Deep Dive stage', time: '3h ago', user: 'James Wu' },
  { id: 'a3', type: 'upload', text: 'MedSync Health pitch deck uploaded', time: '6h ago', user: 'Priya Sharma' },
  { id: 'a4', type: 'comment', text: 'Added analyst note on GreenWave Energy', time: '8h ago', user: 'Ananya Rao' },
  { id: 'a5', type: 'move', text: 'DataVault moved to Portfolio', time: '1d ago', user: 'James Wu' },
  { id: 'a6', type: 'user', text: 'New analyst Meera Patel joined the team', time: '2d ago', user: 'Admin' },
  { id: 'a7', type: 'upload', text: 'CloudBridge pitch deck uploaded via Slack', time: '2d ago', user: 'CloudBridge connector' },
];
