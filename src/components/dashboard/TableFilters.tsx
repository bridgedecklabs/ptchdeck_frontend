import { Search, X, ChevronDown } from 'lucide-react'
import styles from './TableFilters.module.css'

export interface FilterState {
  search: string
  status: string
  sector: string
  stage: string
  uploadedBy: string
  dateRange: string
}

interface TableFiltersProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
}

const STATUS_OPTIONS = ['All', 'Scored', 'Processing', 'Queued', 'Failed']
const SECTOR_OPTIONS = ['All', 'Fintech', 'SaaS', 'HealthTech', 'EdTech', 'CleanTech', 'Other']
const STAGE_OPTIONS  = ['All', 'Pre-Seed', 'Seed', 'Series A', 'Series B+']
const BY_OPTIONS     = ['All', 'Preet S.', 'Sarah J.', 'Marcus K.']
const DATE_OPTIONS   = ['All Time', 'Today', 'Last 7 Days', 'Last 30 Days', 'This Month']

export default function TableFilters({ filters, onChange }: TableFiltersProps) {
  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filters, [key]: value })

  return (
    <div className={styles.row}>
      <div className={styles.searchWrap}>
        <Search className={styles.searchIcon} size={14} />
        <input
          type="text"
          placeholder="Filter company..."
          className={styles.searchInput}
          value={filters.search}
          onChange={(e) => set('search', e.target.value)}
        />
        {filters.search && (
          <button className={styles.clearBtn} onClick={() => set('search', '')} aria-label="Clear search">
            <X size={12} />
          </button>
        )}
      </div>

      <div className={styles.dropdowns}>
        <Select label="Status"      value={filters.status}     options={STATUS_OPTIONS} onChange={(v) => set('status', v)} />
        <Select label="Sector"      value={filters.sector}     options={SECTOR_OPTIONS} onChange={(v) => set('sector', v)} />
        <Select label="Stage"       value={filters.stage}      options={STAGE_OPTIONS}  onChange={(v) => set('stage', v)} />
        <Select label="Uploaded By" value={filters.uploadedBy} options={BY_OPTIONS}     onChange={(v) => set('uploadedBy', v)} />
        <Select label="Date Range"  value={filters.dateRange}  options={DATE_OPTIONS}   onChange={(v) => set('dateRange', v)} />
      </div>
    </div>
  )
}

interface SelectProps {
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
}

function Select({ label, value, options, onChange }: SelectProps) {
  return (
    <div className={styles.selectWrap}>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      >
        {options.map((o) => (
          <option key={o} value={o === 'All' || o === 'All Time' ? '' : o}>
            {o === 'All' || o === 'All Time' ? label : o}
          </option>
        ))}
      </select>
      <ChevronDown className={styles.selectChevron} size={12} />
    </div>
  )
}
