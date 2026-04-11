import { useState, useRef } from 'react'
import styles from './Upload.module.css'

type QueueStatus = 'queued' | 'processing' | 'scored' | 'error'

interface QueueEntry {
  id: string
  company: string
  sector: string
  stage: string
  status: QueueStatus
  analysisStep: string
  progress: number
  aiScore: number | null
}

const mockQueue: QueueEntry[] = [
  { id: 'q1', company: 'Lumina Health',  sector: 'HealthTech', stage: 'Series A',     status: 'processing', analysisStep: 'Extracting Financials', progress: 64,  aiScore: null },
  { id: 'q2', company: 'EcoGrid Energy', sector: 'CleanTech',  stage: 'Pre-Series A', status: 'scored',      analysisStep: '',                      progress: 100, aiScore: 8.4  },
  { id: 'q3', company: 'ChainLayer',     sector: 'Web3',       stage: 'Seed',         status: 'queued',      analysisStep: '',                      progress: 0,   aiScore: null },
  { id: 'q4', company: 'NeuroFlow AI',   sector: 'AI / ML',    stage: 'Seed',         status: 'processing', analysisStep: 'Benchmarking Data',      progress: 18,  aiScore: null },
]

type TabKey = 'All' | 'Queued' | 'Processing' | 'Scored'
const TABS: TabKey[] = ['All', 'Queued', 'Processing', 'Scored']

export default function Upload() {
  const [activeTab, setActiveTab] = useState<TabKey>('All')
  const [queue, setQueue] = useState(mockQueue)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = activeTab === 'All' ? queue : queue.filter(q => {
    if (activeTab === 'Queued')     return q.status === 'queued'
    if (activeTab === 'Processing') return q.status === 'processing'
    if (activeTab === 'Scored')     return q.status === 'scored'
    return true
  })

  const handleFiles = (files: File[]) => {
    const newEntries: QueueEntry[] = files.map((f, i) => ({
      id: `new-${Date.now()}-${i}`,
      company: f.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
      sector: 'Unknown', stage: 'Unknown',
      status: 'queued', analysisStep: '', progress: 0, aiScore: null,
    }))
    setQueue(q => [...newEntries, ...q])
  }

  const statusCls: Record<QueueStatus, string> = {
    processing: styles.sBlu,
    scored:     styles.sGrn,
    queued:     styles.sGry,
    error:      styles.sRed,
  }
  const statusLabel: Record<QueueStatus, string> = {
    processing: 'Processing', scored: 'Scored', queued: 'Queued', error: 'Failed',
  }

  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <h2 className={styles.heroTitle}>
            Batch Intelligence.<br />
            <span className={styles.heroAccent}>Accelerate Due Diligence.</span>
          </h2>
          <p className={styles.heroDesc}>
            Upload decks from your pipeline. Get AI-scored insights on market fit,
            team strength, and traction instantly.
          </p>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M4 5H10M4 8H8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              PDF, PPTX, DOCX
            </span>
            <span className={styles.heroBadge}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="3" y="6" width="8" height="7" rx="1" stroke="currentColor" strokeWidth="1.4"/><path d="M5 6V4C5 2.9 5.9 2 7 2C8.1 2 9 2.9 9 4V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              Encrypted
            </span>
          </div>
        </div>

        <div
          className={`${styles.uploadZone} ${dragActive ? styles.uploadZoneActive : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => { e.preventDefault(); setDragActive(false); const f = Array.from(e.dataTransfer.files); if (f.length) handleFiles(f) }}
          onClick={() => inputRef.current?.click()}
        >
          <div className={styles.uploadIconWrap}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className={styles.uploadTitle}>Drag and drop pitch decks</p>
          <p className={styles.uploadSub}>Or click to browse your local files</p>
          <button className={styles.uploadBtn} onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}>
            UPLOAD NOW
          </button>
          <input ref={inputRef} type="file" style={{ display: 'none' }} multiple accept=".pdf,.pptx,.ppt,.docx,.key"
            onChange={(e) => { const f = Array.from(e.target.files ?? []); if (f.length) handleFiles(f) }} />
        </div>
      </section>

      {/* ── Processing Queue ── */}
      <section className={styles.queueSection}>
        <div className={styles.queueHeader}>
          <div>
            <h3 className={styles.queueTitle}>Processing Queue</h3>
            <p className={styles.queueSub}>Track every deck from upload to final score in real time.</p>
          </div>
          <div className={styles.tabs}>
            {TABS.map((t) => (
              <button key={t} className={`${styles.tab} ${activeTab === t ? styles.tabActive : ''}`} onClick={() => setActiveTab(t)}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>COMPANY</th>
                <th className={styles.th}>STATUS</th>
                <th className={styles.th}>SECTOR</th>
                <th className={styles.th}>STAGE</th>
                <th className={styles.th}>ANALYSIS PROGRESS</th>
                <th className={`${styles.th} ${styles.thRight}`}>AI SCORE</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className={styles.tr}>
                  <td className={styles.td}>{item.company}</td>
                  <td className={styles.td}>
                    <span className={`${styles.statusBadge} ${statusCls[item.status]}`}>{statusLabel[item.status]}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.sectorBadge}>{item.sector}</span>
                  </td>
                  <td className={`${styles.td} ${styles.tdStageBold}`}>{item.stage}</td>
                  <td className={styles.td}>
                    <div className={styles.progressCell}>
                      {item.analysisStep && (
                        <div className={styles.progressMeta}>
                          <span>{item.analysisStep}</span>
                          <span>{item.progress}%</span>
                        </div>
                      )}
                      <div className={styles.progressBar}>
                        <div
                          className={`${styles.progressFill} ${
                            item.status === 'scored'     ? styles.pfGreen :
                            item.status === 'processing' ? styles.pfBlue  : ''
                          }`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className={`${styles.td} ${styles.tdRight}`}>
                    {item.aiScore !== null ? (
                      <span className={styles.scoreVal}>{item.aiScore.toFixed(1)} <span className={styles.scoreMax}>/ 10</span></span>
                    ) : (
                      <span className={styles.scoreDash}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.viewAllRow}>
          <button className={styles.viewAllBtn}>VIEW ALL HISTORY</button>
        </div>
      </section>

      {/* ── Bento bottom cards ── */}
      <section className={styles.bento}>
        <div className={styles.tipCard}>
          <span className={styles.tipTag}>TIP OF THE WEEK</span>
          <h4 className={styles.tipTitle}>Multi-file analysis now supports cross-comparison.</h4>
          <p className={styles.tipDesc}>Upload two decks simultaneously to generate a competitive gap analysis report automatically.</p>
          <button className={styles.tipLink}>Try Benchmarking →</button>
        </div>
        <div className={styles.proCard}>
          <div className={styles.proTop}>
            <div className={styles.proIconWrap}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="white"><path d="M10 2L12.4 7.26L18 8.1L14 12L15.1 17.6L10 14.9L4.9 17.6L6 12L2 8.1L7.6 7.26L10 2Z" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/></svg>
            </div>
            <span className={styles.proLabel}>Pro Plan</span>
          </div>
          <div className={styles.proBottom}>
            <p className={styles.proSmall}>Queue Priority</p>
            <h4 className={styles.proTitle}>High Performance</h4>
            <p className={styles.proDesc}>Your uploads are prioritized on dedicated AI nodes for 3× faster processing.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
