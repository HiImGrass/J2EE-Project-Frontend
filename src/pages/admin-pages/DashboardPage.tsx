import { useState } from 'react'
import { GraduationCap, School, UserRound, UserRoundPlus, Users } from 'lucide-react'

const registrations = [
  { date: '21/11', count: 2 },
  { date: '22/11', count: 3 },
  { date: '23/11', count: 1 },
  { date: '24/11', count: 4 },
  { date: '25/11', count: 5 },
  { date: '26/11', count: 3 },
  { date: '27/11', count: 4 },
]

const chartPoints = registrations.map((item, index) => ({
  ...item,
  x: 70 + index * 130,
  y: 220 - item.count * 34,
}))

const linePath = chartPoints.map(({ x, y }, index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ')
const areaPath = `${linePath} L ${chartPoints.at(-1)?.x} 230 L ${chartPoints[0].x} 230 Z`

const metrics = [
  {
    label: 'Tổng số học viên',
    value: '248',
    detail: 'Tài khoản học viên hệ thống',
    icon: Users,
    iconStyle: { backgroundColor: 'var(--admin-dashboard-student-icon-bg)', color: 'var(--admin-dashboard-student-icon)' },
  },
  {
    label: 'Tổng số giáo viên',
    value: '12',
    detail: 'Giáo viên đang giảng dạy',
    icon: UserRound,
    iconStyle: { backgroundColor: 'var(--admin-dashboard-teacher-icon-bg)', color: 'var(--admin-dashboard-teacher-icon)' },
  },
  {
    label: 'Lớp học đang mở',
    value: '14',
    detail: 'Lớp ở trạng thái hoạt động',
    icon: School,
    iconStyle: { backgroundColor: 'var(--admin-dashboard-class-icon-bg)', color: 'var(--admin-dashboard-class-icon)' },
  },
  {
    label: 'Học viên mới',
    value: '22',
    detail: 'Tham gia trong tuần gần nhất',
    icon: UserRoundPlus,
    iconStyle: { backgroundColor: 'var(--admin-dashboard-new-student-icon-bg)', color: 'var(--admin-dashboard-new-student-icon)' },
    trend: '+12.5%',
  },
]

export default function DashboardPage() {
  const [activePoint, setActivePoint] = useState<(typeof registrations)[number] | null>(null)

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <section className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <GraduationCap className="size-4" />
            <span>Quản trị hệ thống</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Tổng quan hệ thống</h1>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Theo dõi số lượng học viên, giáo viên, lớp học đang mở và lượt đăng ký mới 7 ngày gần nhất.
          </p>
        </section>

        <section aria-label="Số liệu tổng quan" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(({ label, value, detail, icon: MetricIcon, iconStyle, trend }) => (
            <article key={label} className="rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-sm font-medium text-muted-foreground">{label}</h2>
                <span style={iconStyle} className="flex size-10 shrink-0 items-center justify-center rounded-lg">
                  <MetricIcon className="size-5" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-5 flex items-baseline gap-2">
                <p className="text-3xl font-semibold tabular-nums tracking-tight">{value}</p>
                {trend && <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{trend}</span>}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
            </article>
          ))}
        </section>

        <section aria-label="Biểu đồ học viên đăng ký 7 ngày gần nhất" className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
          <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="font-semibold">Học viên đăng ký 7 ngày gần nhất</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Thống kê số tài khoản học viên mới theo ngày (21/11 – 27/11)
              </p>
            </div>
            <div className="rounded-lg bg-muted px-3 py-2 text-sm tabular-nums text-muted-foreground" aria-live="polite">
              {activePoint
                ? <><span className="font-medium text-foreground">{activePoint.date}:</span> {activePoint.count} học viên mới</>
                : <>Tổng 7 ngày: <span className="font-medium text-foreground">22 học viên</span></>}
            </div>
          </header>

          <div className="mt-5 overflow-x-auto pb-2">
            <svg viewBox="0 0 860 290" role="img" aria-label="Biểu đồ đường số học viên đăng ký từ ngày 21/11 đến 27/11" className="h-64 min-w-[650px] w-full overflow-visible sm:h-72">
              <defs>
                <linearGradient id="registration-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--admin-dashboard-chart-line)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="var(--admin-dashboard-chart-line)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[50, 110, 170, 230].map((y, index) => (
                <g key={y}>
                  <line x1="48" y1={y} x2="842" y2={y} className="stroke-border" strokeDasharray={index === 3 ? undefined : '4 5'} />
                  <text x="34" y={y + 4} textAnchor="end" className="fill-muted-foreground" fontSize="12">{6 - index * 2}</text>
                </g>
              ))}
              <path d={areaPath} fill="url(#registration-area)" />
              <path d={linePath} fill="none" stroke="var(--admin-dashboard-chart-line)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              {chartPoints.map((point) => (
                <g
                  key={point.date}
                  role="button"
                  tabIndex={0}
                  aria-label={`${point.date}: ${point.count} học viên mới`}
                  onMouseEnter={() => setActivePoint(point)}
                  onMouseLeave={() => setActivePoint(null)}
                  onFocus={() => setActivePoint(point)}
                  onBlur={() => setActivePoint(null)}
                  className="cursor-pointer outline-none"
                >
                  <circle cx={point.x} cy={point.y} r="14" fill="transparent" />
                  <circle cx={point.x} cy={point.y} r={activePoint?.date === point.date ? 7 : 5} fill="var(--card)" stroke="var(--admin-dashboard-chart-line)" strokeWidth="3" />
                  <text x={point.x} y={point.y - 14} textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">{point.count}</text>
                  <text x={point.x} y="260" textAnchor="middle" className="fill-muted-foreground" fontSize="12">{point.date}</text>
                </g>
              ))}
            </svg>
          </div>

          <footer className="flex flex-col gap-2 border-t pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
            <span className="text-muted-foreground">Trung bình: <strong className="font-medium text-foreground">3.1 học viên/ngày</strong></span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">Cao nhất: 5 học viên (25/11)</span>
          </footer>
        </section>
      </div>
    </div>
  )
}
