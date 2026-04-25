import { useRef, useState, useCallback } from 'react'
import { CloudUpload, Info } from 'lucide-react'
import styles from './UploadDropzone.module.css'

interface UploadDropzoneProps {
  onFilesSelected?: (files: File[]) => void
}

const ACCEPTED = '.pdf,.pptx,.docx,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.wordprocessingml.document'

export default function UploadDropzone({ onFilesSelected }: UploadDropzoneProps) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return
      const arr = Array.from(files)
      console.log('Files selected:', arr.map((f) => f.name))
      onFilesSelected?.(arr)
    },
    [onFilesSelected],
  )

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true) }

  const onDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragging(false)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
    e.target.value = ''
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Upload Pitch Deck</h2>
        <p className={styles.cardSub}>Files are processed automatically by the AI engine after upload</p>
      </div>

      <div
        className={`${styles.dropzone} ${dragging ? styles.dragging : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload area — click or drag files here"
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED}
          onChange={onInputChange}
          className={styles.hiddenInput}
          aria-hidden="true"
        />

        <div className={styles.uploadIcon}>
          <CloudUpload size={36} strokeWidth={1.5} />
        </div>

        <p className={styles.dropText}>
          {dragging ? 'Drop files here' : 'Drag & drop your pitch decks here'}
        </p>
        <p className={styles.dropSub}>or</p>

        <button
          type="button"
          className={styles.browseBtn}
          onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
        >
          Browse Files
        </button>

        <p className={styles.formatsText}>
          Supported formats: <strong>PDF, PPTX, DOCX</strong> &nbsp;·&nbsp; Max 25MB per file
        </p>
        <p className={styles.aiNote}>
          <Info size={13} />
          AI will automatically begin extraction after upload
        </p>
      </div>
    </div>
  )
}
