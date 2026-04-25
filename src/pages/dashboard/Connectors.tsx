import ConnectorEmailBanner from '../../components/dashboard/ConnectorEmailBanner'
import ConnectorGrid from '../../components/dashboard/ConnectorGrid'
import styles from './Connectors.module.css'

export interface ConnectorItem {
  id: string
  name: string
  category: string
  initial: string
  initialColor: string
  status: 'connected' | 'error' | 'not_connected' | 'coming_soon'
  admin?: string
  linkedOn?: string
  channel?: string
  errorMsg?: string
}

const mockConnectors: ConnectorItem[] = [
  {
    id: 'slack',
    name: 'Slack',
    category: 'MESSAGING',
    initial: 'S',
    initialColor: '#4a154b',
    status: 'connected',
    admin: 'Preet S',
    linkedOn: '1 Apr 2025',
    channel: '#pitch-decks channel',
  },
  {
    id: 'gdrive',
    name: 'Google Drive',
    category: 'STORAGE',
    initial: 'G',
    initialColor: '#4285f4',
    status: 'error',
    errorMsg: 'Token expired — Reconnect required',
    admin: 'Preet S',
    linkedOn: '3 Apr 2025',
    channel: 'PtchDeck Incoming',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    category: 'MESSAGING',
    initial: 'T',
    initialColor: '#229ed9',
    status: 'not_connected',
    channel: 'Bot listens to one group you choose',
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    category: 'MESSAGING',
    initial: 'T',
    initialColor: '#5059c9',
    status: 'not_connected',
    channel: 'Bot joins one channel you select',
  },
  {
    id: 'zoho',
    name: 'Zoho Cliq',
    category: 'MESSAGING',
    initial: 'Z',
    initialColor: '#e42527',
    status: 'not_connected',
    channel: 'Bot joins one channel you select',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    category: 'MESSAGING',
    initial: 'W',
    initialColor: '#25d366',
    status: 'coming_soon',
    channel: 'Coming in Phase 2',
  },
]

export default function Connectors() {
  const connected = mockConnectors.filter(
    (c) => c.status === 'connected' || c.status === 'error',
  )
  const available = mockConnectors.filter(
    (c) => c.status === 'not_connected' || c.status === 'coming_soon',
  )

  return (
    <div className={styles.page}>
      <ConnectorEmailBanner email="vertex-ventures@in.ptchdeck.com" />
      <ConnectorGrid label="CONNECTED" count={connected.filter((c) => c.status === 'connected').length} items={connected} />
      <ConnectorGrid label="AVAILABLE" count={available.filter((c) => c.status !== 'coming_soon').length} items={available} />
    </div>
  )
}
