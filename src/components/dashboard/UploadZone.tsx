import { useState, useRef } from 'react'
import styles from './UploadZone.module.css'

interface UploadZoneProps {
  onFiles?: (files: File[]) => void
}

export default function UploadZone({ onFiles }: UploadZoneProps) {
  const [active, setActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setActive(true) }
  const handleDragLeave = () => setActive(false)
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setActive(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length) onFiles?.(files)
  }

  return (
    <div
      className={`${styles.zone} ${active ? styles.zoneActive : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <div className={styles.uploadIcon}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 15L12 3M12 3L8 7M12 3L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <div className={styles.title}>Drop pitch decks here</div>
        <div className={styles.subtitle}>or <strong>browse files</strong> to upload</div>
      </div>
      <div className={styles.fileTypes}>
        {['PDF', 'PPTX', 'PPT', 'DOCX', 'KEY'].map((t) => (
          <span key={t} className={styles.fileType}>{t}</span>
        ))}
      </div>
      <button className={styles.uploadBtn} onClick={(e) => e.stopPropagation()}>
        Select Files
      </button>
      <input
        ref={inputRef}
        type="file"
        className={styles.hiddenInput}
        multiple
        accept=".pdf,.pptx,.ppt,.docx,.key"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? [])
          if (files.length) onFiles?.(files)
        }}
      />
    </div>
  )
}
