import { useEffect, useRef, useState } from 'react'
import './GrammarNotebookPage.css'
import { useGrammarScraps } from '../hooks/useGrammarScraps.ts'
import type { GrammarScrapItem } from '../types/scraps.types.ts'

interface GrammarNotebookPageProps {
  onBack: () => void
}

const previewGrammarScraps: GrammarScrapItem[] = [
  {
    scrapId: 'preview-grammar-1',
    sectionId: 5,
    targetType: 'GRAMMAR',
    courseTitle: 'Course 1',
    lessonTitle: 'lesson 5',
    grammarPoint: '-을까요?',
    createdAt: '2026-06-08T00:00:00.000Z',
  },
  {
    scrapId: 'preview-grammar-2',
    sectionId: 6,
    targetType: 'GRAMMAR',
    courseTitle: 'Course 1',
    lessonTitle: 'lesson 6',
    grammarPoint: '-고 싶어요',
    createdAt: '2026-06-08T00:00:00.000Z',
  },
  {
    scrapId: 'preview-grammar-3',
    sectionId: 7,
    targetType: 'GRAMMAR',
    courseTitle: 'Course 2',
    lessonTitle: 'lesson 1',
    grammarPoint: '-아/어요',
    createdAt: '2026-06-08T00:00:00.000Z',
  },
]

function GrammarNotebookPage({ onBack }: GrammarNotebookPageProps) {
  const [isRecentSort, setIsRecentSort] = useState(true)
  const { items, loading, loadingMore, hasMore, error, fetchNextPage, refetch } =
      useGrammarScraps()
  const visibleItems = import.meta.env.DEV && items.length === 0 ? previewGrammarScraps : items
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return
    if (!hasMore) return

    const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          if (entry?.isIntersecting && !loadingMore) {
            fetchNextPage()
          }
        },
        { rootMargin: '200px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [hasMore, loadingMore, fetchNextPage])

  const handleOpenGrammarDetail = () => {
    // Detail navigation can be wired here when a grammar detail route is available.
  }

  return (
      <main className="grammar-notebook-screen">
        <section className="grammar-notebook-content">
          <header className="grammar-notebook-header">
            <button
                type="button"
                className="grammar-notebook-back"
                onClick={onBack}
                aria-label="Go back"
            >
              <svg
                  className="grammar-notebook-back-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
              >
                <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
              </svg>
            </button>
            <h1 className="grammar-notebook-title">Grammar</h1>
          </header>

          <div className="grammar-notebook-sort-row">
            <button
                type="button"
                className="grammar-notebook-sort-button"
                onClick={() => setIsRecentSort((prev) => !prev)}
                aria-label="Sort"
            >
              <span>Recently viewed</span>
              <svg
                  className={`grammar-notebook-sort-icon ${isRecentSort ? 'is-recent' : 'is-alt'}`}
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
              >
                <path
                    d="M4.5 6.75L9 11.25L13.5 6.75"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {loading ? (
              <p className="grammar-notebook-status">Loading…</p>
          ) : error && visibleItems.length === 0 ? (
              <div className="notebook-empty-state">
                <p>Grammar sync unavailable.</p>
                <button type="button" onClick={() => void refetch()}>
                  Retry sync
                </button>
              </div>
          ) : visibleItems.length === 0 ? (
              <div className="notebook-empty-state">
                <p>No grammar scraps yet.</p>
                {error ? (
                  <button type="button" onClick={() => void refetch()}>
                    Retry sync
                  </button>
                ) : null}
              </div>
          ) : (
              <section className="grammar-notebook-card-list">
                {visibleItems.map((scrap) => (
                      <article
                        key={scrap.scrapId}
                        className="grammar-notebook-card"
                        role="button"
                        tabIndex={0}
                        onClick={handleOpenGrammarDetail}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            handleOpenGrammarDetail()
                          }
                        }}
                      >
                        <div className="grammar-notebook-card-top">
                          <p className="grammar-notebook-course">{scrap.courseTitle}</p>
                          <span className="grammar-notebook-badge">{scrap.lessonTitle}</span>
                        </div>
                        <div className="grammar-notebook-card-bottom">
                          <p className="grammar-notebook-topic">{scrap.grammarPoint}</p>
                        </div>
                        <svg
                            className="grammar-notebook-arrow"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            aria-hidden="true"
                        >
                          <path
                              d="M6.75 4.5L11.25 9L6.75 13.5"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                          />
                        </svg>
                      </article>
                ))}

                {hasMore && <div ref={sentinelRef} className="grammar-notebook-sentinel" />}

                {loadingMore && <p className="grammar-notebook-status">Loading more…</p>}
              </section>
          )}

        </section>
      </main>
  )
}

export default GrammarNotebookPage
