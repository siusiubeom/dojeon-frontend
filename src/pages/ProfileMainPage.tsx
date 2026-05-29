import './ProfileMainPage.css'
import { useEffect, useRef, useState } from 'react'
import homeIcon from '../assets/home.svg'
import editIcon from '../assets/edit.svg'
import fileIcon from '../assets/file.svg'
import bookOpenIcon from '../assets/book-open.svg'
import profileIcon from '../assets/user.svg'
import settingIcon from '../assets/setting_icon.svg'
import { formatAchievementDate, profileMainMockData } from '../data/profile'

const tabs = [
  { icon: homeIcon, label: 'HOME' },
  { icon: editIcon, label: 'CLASS' },
  { icon: fileIcon, label: 'PRACTICE' },
  { icon: bookOpenIcon, label: 'NOTEBOOK' },
  { icon: profileIcon, label: 'PROFILE' },
]

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const subscriptionBenefits = [
  {
    label: 'Access to all courses classes',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4 3 8l9 4 9-4-9-4Z" />
        <path d="M7 10.5v4.2c0 1.3 2.2 2.8 5 2.8s5-1.5 5-2.8v-4.2" />
      </svg>
    ),
  },
  {
    label: 'Full access to connectivity',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M3 19c.4-3.1 2.2-5 5-5s4.6 1.9 5 5" />
        <path d="M12 14.4c1-.4 2.1-.4 3.4-.1 2 .6 3.2 2.2 3.6 4.7" />
      </svg>
    ),
  },
  {
    label: 'Full access to personal notebook',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5.5c2.3-1 4.6-.9 7 .4v14c-2.4-1.3-4.7-1.4-7-.4v-14Z" />
        <path d="M20 5.5c-2.3-1-4.6-.9-7 .4v14c2.4-1.3 4.7-1.4 7-.4v-14Z" />
      </svg>
    ),
  },
  {
    label: 'more coming soon',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 3 1.2 3.2L16.5 7l-3.3 1L12 11l-1.2-3L7.5 7l3.3-.8L12 3Z" />
        <path d="m6 12 .9 2.1L9 15l-2.1.9L6 18l-.9-2.1L3 15l2.1-.9L6 12Z" />
        <path d="m16.5 13 1.1 2.8 2.9.7-2.9.8-1.1 2.7-1.1-2.7-2.9-.8 2.9-.7 1.1-2.8Z" />
      </svg>
    ),
  },
]

const proPlanOptions = [
  { id: '1-month', label: '1 Month', price: '$15' },
  { id: '3-months', label: '3 Months', price: '$39', note: '$13/mo' },
  { id: '6-months', label: '6 Months', price: '$69', note: '$11.5/mo' },
  { id: '1-year', label: '1 Year', price: '$99', note: '$8.25/mo' },
]
const getCalendarDays = (year: number, month: number) => {
  const firstDayIndex = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const leadingEmptyDays = Array.from({ length: firstDayIndex }, () => null)
  const monthDays = Array.from({ length: daysInMonth }, (_, index) => index + 1)
  const calendarDays = [...leadingEmptyDays, ...monthDays]
  const trailingEmptyDays = Array.from(
    { length: (7 - (calendarDays.length % 7)) % 7 },
    () => null,
  )

  return [...calendarDays, ...trailingEmptyDays]
}

interface ProfileMainPageProps {
  nickname: string
  username: string
  onOpenHome: () => void
  onOpenClass: () => void
  onOpenPractice: () => void
  onOpenNotebook: () => void
  onOpenSetting: () => void
  onOpenAchievements: () => void
}

const formatStudyTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) {
    return `${minutes}m`
  }

  if (minutes === 0) {
    return `${hours}h`
  }

  return `${hours}h ${minutes}m`
}

function ProfileMainPage({
  nickname,
  username,
  onOpenHome,
  onOpenClass,
  onOpenPractice,
  onOpenNotebook,
  onOpenSetting,
  onOpenAchievements,
}: ProfileMainPageProps) {
  const [isSubscriptionSheetOpen, setIsSubscriptionSheetOpen] = useState(false)
  const [selectedSubscriptionPlan, setSelectedSubscriptionPlan] = useState<
    'free' | 'trial' | 'pro'
  >('trial')
  const [selectedProOptionId, setSelectedProOptionId] = useState(proPlanOptions[0].id)
  const subscriptionCloseButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!isSubscriptionSheetOpen) {
      return
    }

    subscriptionCloseButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSubscriptionSheetOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSubscriptionSheetOpen])
  const bottomNav = (
    <nav className="profile-main-bottom-nav">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          type="button"
          className={`profile-main-tab ${
            tab.label === 'PROFILE' ? 'profile-main-tab-active' : ''
          }`}
          onClick={() => {
            if (tab.label === 'HOME') {
              onOpenHome()
            }

            if (tab.label === 'CLASS') {
              onOpenClass()
            }

            if (tab.label === 'PRACTICE') {
              onOpenPractice()
            }

            if (tab.label === 'NOTEBOOK') {
              onOpenNotebook()
            }
          }}
        >
          <img className="profile-main-tab-icon" src={tab.icon} alt="" aria-hidden="true" />
          <span className="profile-main-tab-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  )

  const profileData = {
    ...profileMainMockData,
    user: {
      ...profileMainMockData.user,
      nickname: nickname.trim() || profileMainMockData.user.nickname,
      username: username.trim() || profileMainMockData.user.username,
    },
  }
  const { user, recentCourse, stats, attendance, recentAchievements } = profileData
  const calendarDays = getCalendarDays(attendance.year, attendance.month)
  const calendarTitle = `${monthNames[attendance.month - 1]} ${attendance.year}`
  const visibleAchievements = recentAchievements.slice(0, 4)
  const subscriptionCopy =
    user.subscriptionTier === 'FREE'
      ? 'Upgrade your plan for more learning features.'
      : `${user.subscriptionTier} plan is active.`
  const selectedProOption =
    proPlanOptions.find((option) => option.id === selectedProOptionId) ?? proPlanOptions[0]
  const subscriptionActionText =
    selectedSubscriptionPlan === 'trial'
      ? 'Start 7-day trial'
      : selectedSubscriptionPlan === 'pro'
        ? `Subscribe ${selectedProOption.label}`
        : 'Continue Free Plan'

  return (
    <main className="profile-main-screen">
      <section className="profile-main-content">
        <section className="profile-main-hero">
          <button
            type="button"
            className="profile-main-setting-button"
            onClick={onOpenSetting}
            aria-label="설정 열기"
          >
            <img src={settingIcon} alt="" aria-hidden="true" />
          </button>

          <div className="profile-main-identity">
            <div className="profile-main-avatar" aria-hidden="true">
              {user.profileImgUrl ? (
                <img className="profile-main-avatar-image" src={user.profileImgUrl} alt="" />
              ) : null}
            </div>
            <div className="profile-main-copy">
              <h1 className="profile-main-greeting">
                안녕하세요!
                <br />
                {user.nickname}님!
              </h1>
              <p className="profile-main-meta">
                @{user.username} <span aria-hidden="true">·</span> joined {user.joinedYear}
              </p>
            </div>
          </div>
        </section>

        <section className="profile-main-section">
          <h2 className="profile-main-section-title">Course</h2>
          <article className="profile-main-card profile-main-last-lesson">
            <p className="profile-main-card-label">Last lesson</p>
            {recentCourse ? (
              <p className="profile-main-last-copy">
                <span>{`${recentCourse.courseTitle}, ${recentCourse.lessonTitle}`}</span>
                <strong>{recentCourse.sectionSubtitle}</strong>
              </p>
            ) : (
              <p className="profile-main-empty-text">No recent lesson yet</p>
            )}
          </article>

          <div className="profile-main-card-grid">
            <article className="profile-main-card profile-main-stat-card">
              <p className="profile-main-card-label">Total lesson</p>
              <strong>{stats.totalCompletedLessons} lessons</strong>
            </article>
            <article className="profile-main-card profile-main-stat-card">
              <p className="profile-main-card-label">Total time studied</p>
              <strong>{formatStudyTime(stats.totalStudyMin)}</strong>
            </article>
          </div>
        </section>

        <section className="profile-main-section">
          <h2 className="profile-main-section-title">Streak</h2>
          <div className="profile-main-card-grid">
            <article className="profile-main-card profile-main-stat-card">
              <p className="profile-main-card-label">Current Streak</p>
              <strong>{stats.currentStreak}-day</strong>
            </article>
            <article className="profile-main-card profile-main-stat-card">
              <p className="profile-main-card-label">Best Streak</p>
              <strong>{stats.bestStreak}-day</strong>
            </article>
          </div>

          <article className="profile-main-calendar">
            <h3 className="profile-main-calendar-title">{calendarTitle}</h3>
            <div className="profile-main-weekdays" aria-hidden="true">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
            <div className="profile-main-calendar-grid" aria-label={`${calendarTitle} attendance`}>
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return <span key={`empty-${index}`} className="profile-main-calendar-empty" />
                }

                return (
                  <span
                    key={day}
                    className={`profile-main-calendar-day ${
                      attendance.activeDays.includes(day) ? 'profile-main-calendar-day-active' : ''
                    }`}
                  >
                    {day}
                  </span>
                )
              })}
            </div>
          </article>
        </section>

        <section className="profile-main-section">
          <div className="profile-main-section-header">
            <h2 className="profile-main-section-title">Achievements</h2>
            <button
              type="button"
              className="profile-main-section-link"
              onClick={onOpenAchievements}
            >
              see more
            </button>
          </div>
          <div className="profile-main-achievement-row">
            {visibleAchievements.length > 0 ? (
              visibleAchievements.map((achievement) => (
                <article key={achievement.badgeId} className="profile-main-achievement">
                  <div className="profile-main-achievement-medal" aria-hidden="true">
                    {achievement.imageUrl ? (
                      <img
                        className="profile-main-achievement-image"
                        src={achievement.imageUrl}
                        alt=""
                      />
                    ) : null}
                  </div>
                  <p className="profile-main-achievement-date">
                    {formatAchievementDate(achievement.earnedAt)}
                  </p>
                  <p className="profile-main-achievement-title">{achievement.title}</p>
                </article>
              ))
            ) : (
              <article className="profile-main-achievement-empty">
                <p className="profile-main-empty-text">No achievements yet</p>
              </article>
            )}
          </div>
        </section>

        <section className="profile-main-section profile-main-subscription-section">
          <h2 className="profile-main-section-title">Subscriptions</h2>
          <article className="profile-main-subscription-card">
            <p className="profile-main-subscription-placeholder">{subscriptionCopy}</p>
            <button
              type="button"
              className="profile-main-subscribe-button"
              onClick={() => setIsSubscriptionSheetOpen(true)}
            >
              {user.subscriptionTier === 'FREE' ? 'Subscribe now' : 'Manage subscription'}
            </button>
          </article>
        </section>
      </section>

      {bottomNav}
      {isSubscriptionSheetOpen && (
        <div
          className="subscription-sheet-backdrop"
          role="presentation"
          onClick={() => setIsSubscriptionSheetOpen(false)}
        >
          <section
            className="subscription-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="subscription-sheet-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="subscription-sheet-close"
              ref={subscriptionCloseButtonRef}
              onClick={() => setIsSubscriptionSheetOpen(false)}
              aria-label="구독 옵션 닫기"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <h2 id="subscription-sheet-title" className="subscription-sheet-title">
              What subscription gives you
            </h2>

            <div className="subscription-sheet-body">
              <ul className="subscription-benefit-list" aria-label="Subscription benefits">
                {subscriptionBenefits.map((benefit) => (
                  <li key={benefit.label} className="subscription-benefit-item">
                    <span className="subscription-benefit-icon">{benefit.icon}</span>
                    <span>{benefit.label}</span>
                  </li>
                ))}
              </ul>

              <div className="subscription-plan-list" aria-label="Subscription plans">
                <button
                  type="button"
                  className={`subscription-plan-row ${
                    selectedSubscriptionPlan === 'free' ? 'subscription-plan-row-selected' : ''
                  }`}
                  onClick={() => setSelectedSubscriptionPlan('free')}
                >
                  <span>Free Plan</span>
                </button>

                <button
                  type="button"
                  className={`subscription-plan-row ${
                    selectedSubscriptionPlan === 'trial' ? 'subscription-plan-row-selected' : ''
                  }`}
                  onClick={() => setSelectedSubscriptionPlan('trial')}
                >
                  <span>7-day Trial</span>
                  {selectedSubscriptionPlan === 'trial' && (
                    <svg className="subscription-check-icon" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m5 12 4.2 4.2L19 6.5" />
                    </svg>
                  )}
                </button>

                <section
                  className={`subscription-pro-panel ${
                    selectedSubscriptionPlan === 'pro' ? 'subscription-pro-panel-open' : ''
                  }`}
                >
                  <button
                    type="button"
                    className="subscription-pro-header"
                    onClick={() => setSelectedSubscriptionPlan('pro')}
                  >
                    <span>Pro Plan</span>
                  </button>

                  {selectedSubscriptionPlan === 'pro' && (
                    <div className="subscription-pro-options">
                      {proPlanOptions.map((option) => (
                        <label
                          key={option.id}
                          className={`subscription-pro-option ${
                            selectedProOptionId === option.id ? 'subscription-pro-option-selected' : ''
                          }`}
                        >
                          <input
                            type="radio"
                            name="subscription-pro-option"
                            value={option.id}
                            checked={selectedProOptionId === option.id}
                            onChange={() => setSelectedProOptionId(option.id)}
                          />
                          <span className="subscription-radio" aria-hidden="true" />
                          <span className="subscription-pro-option-label">{option.label}</span>
                          <span className="subscription-pro-option-price">
                            {option.price}
                            {option.note ? <small> ({option.note})</small> : null}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            </div>

            <div className="subscription-sheet-footer">
              <button
                type="button"
                className="subscription-sheet-action"
                onClick={() => setIsSubscriptionSheetOpen(false)}
              >
                {subscriptionActionText}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

export default ProfileMainPage
