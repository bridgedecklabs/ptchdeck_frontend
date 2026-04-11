export type ConnectorStatus = 'connected' | 'disconnected' | 'error';

export interface ConnectorConfig {
  label: string;
  placeholder: string;
  type: 'text' | 'password';
}

export interface Connector {
  id: string;
  name: string;
  description: string;
  status: ConnectorStatus;
  icon: string;
  color: string;
  lastSync: string | null;
  messagesReceived: number;
  configFields: ConnectorConfig[];
  adminOnly: boolean;
}

export const connectors: Connector[] = [
  {
    id: 'whatsapp', name: 'WhatsApp', description: 'Receive pitch decks and deal flow directly via WhatsApp Business.',
    status: 'connected', icon: 'WA', color: '#25D366',
    lastSync: '10 minutes ago', messagesReceived: 142,
    configFields: [{ label: 'Phone Number ID', placeholder: '+1 234 567 8900', type: 'text' }, { label: 'API Token', placeholder: 'Bearer token...', type: 'password' }],
    adminOnly: true,
  },
  {
    id: 'slack', name: 'Slack', description: 'Auto-ingest pitch decks shared in designated Slack channels.',
    status: 'connected', icon: 'SL', color: '#4A154B',
    lastSync: '30 minutes ago', messagesReceived: 89,
    configFields: [{ label: 'Workspace Name', placeholder: 'your-workspace', type: 'text' }, { label: 'Bot OAuth Token', placeholder: 'xoxb-...', type: 'password' }, { label: 'Channel ID', placeholder: '#deal-flow', type: 'text' }],
    adminOnly: true,
  },
  {
    id: 'teams', name: 'Microsoft Teams', description: 'Connect Teams channels to capture inbound pitch decks.',
    status: 'disconnected', icon: 'MS', color: '#6264A7',
    lastSync: null, messagesReceived: 0,
    configFields: [{ label: 'Tenant ID', placeholder: 'Azure Tenant ID', type: 'text' }, { label: 'Client Secret', placeholder: 'App secret...', type: 'password' }],
    adminOnly: true,
  },
  {
    id: 'gmail', name: 'Gmail', description: 'Monitor a Gmail inbox for pitch deck attachments automatically.',
    status: 'error', icon: 'GM', color: '#EA4335',
    lastSync: '2 days ago', messagesReceived: 213,
    configFields: [{ label: 'Gmail Address', placeholder: 'deals@yourfund.com', type: 'text' }, { label: 'OAuth Refresh Token', placeholder: 'Refresh token...', type: 'password' }],
    adminOnly: true,
  },
  {
    id: 'zoho', name: 'Zoho Cliq', description: 'Integrate with Zoho Cliq for automated pitch deck routing.',
    status: 'disconnected', icon: 'ZC', color: '#E42527',
    lastSync: null, messagesReceived: 0,
    configFields: [{ label: 'Organization ID', placeholder: 'Zoho Org ID', type: 'text' }, { label: 'API Key', placeholder: 'API key...', type: 'password' }],
    adminOnly: true,
  },
];
