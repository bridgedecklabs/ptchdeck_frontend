import { Search, X, Calendar, ChevronDown } from 'lucide-react'
import styles from './ScoreFilters.module.css'

export interface ScoreFilterState {
  search: string
  scoreRange: string
  sector: string
  stage: string
  uploadedBy: string
  cohort: string
  dateRange: string
  duplicatesOnly: boolean
}

interface ScoreFiltersProps {
  filters: ScoreFilterState
  onChange: (f: ScoreFilterState) => void
}

const SCORE_RANGES   = ['All Scores', '75–100 (High)', '50–74 (Mid)', '0–49 (Low)']
const SECTOR_OPTIONS = ['All Sectors', 'Fintech', 'SaaS', 'HealthTech', 'EdTech', 'CleanTech', 'Other']
const STAGE_OPTIONS  = ['All Stages', 'Pre-Seed', 'Seed', 'Series A', 'Series B+']
const BY_OPTIONS     = ['All Users', 'Preet S.', 'Sarah J.', 'Marcus K.']
const COHORT_OPTIONS = ['All Cohorts', 'Batch 1', 'Batch 2', 'Batch 3', 'Batch 4']
const DATE_OPTIONS   = ['All Time', 'Today', 'Last 7 Days', 'Last 30 Days', 'This Month']

export default function ScoreFilters({ filters, onChange }: ScoreFiltersProps) {
  const set = <K extends keyof ScoreFilterState>(key: K, value: ScoreFilterState[K]) =>
    onChange({ ...filters, [key]: value })

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchWrap}>
        <Search className={styles.searchIcon} size={15} />
        <input
          type="text"
          placeholder="Search companies..."
          className={styles.searchInput}
          value={filters.search}
          onChange={(e) => set('search', e.target.value)}
        />
        {filters.search && (
          <button className={styles.clearBtn} onClick={() => set('search', '')} aria-label="Clear">
            <X size={12} />
          </button>
        )}
      </div>

      <div className={styles.filterRow}>
        <Select label="Score Range" value={filters.scoreRange} options={SCORE_RANGES}   onChange={(v) => set('scoreRange', v)} />
        <Select label="Sector"      value={filters.sector}     options={SECTOR_OPTIONS}  onChange={(v) => set('sector', v)} />
        <Select label="Stage"       value={filters.stage}      options={STAGE_OPTIONS}   onChange={(v) => set('stage', v)} />
        <Select label="Uploaded By" value={filters.uploadedBy} options={BY_OPTIONS}      onChange={(v) => set('uploadedBy', v)} />
        <Select label="Cohort"      value={filters.cohort}     options={COHORT_OPTIONS}  onChange={(v) => set('cohort', v)} />
        <Select label="Date Range"  value={filters.dateRange}  options={DATE_OPTIONS}    onChange={(v) => set('dateRange', v)} icon={<Calendar size={13} />} />

        <div className={styles.spacer} />

        <label className={styles.toggleLabel}>
          <span className={styles.toggleText}>Duplicates Only</span>
          <button
            role="switch"
            aria-checked={filters.duplicatesOnly}
            className={`${styles.toggle} ${filters.duplicatesOnly ? styles.toggleOn : ''}`}
            onClick={() => set('duplicatesOnly', !filters.duplicatesOnly)}
          >
            <span className={styles.toggleThumb} />
          </button>
        </label>
      </div>
    </div>
  )
}

interface SelectProps {
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
  icon?: React.ReactNode
}

function Select({ label, value, options, onChange, icon }: SelectProps) {
  const isEmpty = value === '' || value === options[0]
  return (
    <div className={styles.selectWrap}>
      {icon && <span className={`${styles.selectPrefixIcon} ${!isEmpty ? styles.selectPrefixIconActive : ''}`}>{icon}</span>}
      <select
        className={`${styles.select} ${icon ? styles.selectWithIcon : ''} ${!isEmpty ? styles.selectActive : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      >
        {options.map((o, i) => (
          <option key={o} value={i === 0 ? '' : o}>{o}</option>
        ))}
      </select>
      <ChevronDown className={styles.chevron} size={11} />
    </div>
  )
}
