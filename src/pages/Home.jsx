import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import useUser from '../hooks/useUser'
import useLibrary from '../hooks/useLibrary'

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

const getDate = () => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

// badge uses \n to split text into two lines
// whitespace-pre-line on the element makes \n render as real line break
const BOOK_SUGGESTIONS = [
  {
    id: 'gutenberg-1342',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    topic: 'Fiction',
    badge: 'Book of\nthe Week',
  },
  {
    id: 'gutenberg-84',
    title: 'Frankenstein',
    author: 'Mary Shelley',
    topic: 'Fiction',
    badge: 'Book of\nthe Month',
  },
  {
    id: 'gutenberg-1080',
    title: 'A Modest Proposal',
    author: 'Jonathan Swift',
    topic: 'Philosophy',
    badge: 'All Time\nFavorite',
  },
]

export default function Home() {
  const { user } = useUser()
  const navigate = useNavigate()
  const { todaysRead, loading, error } = useLibrary(user.topics)

  // null = new user, has value = returning user
  const currentBook = null

  return (
    <div className="min-h-screen bg-[#f7f5f1]">

      {/* Notebook lines */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            to bottom,
            transparent, transparent 31px,
            rgba(180, 160, 140, 0.2) 31px,
            rgba(180, 160, 140, 0.2) 32px
          )`,
        }}
      />

      <div className="relative z-10 px-8">
        <Navbar />

        {/* Two column grid */}
        <div className="grid grid-cols-2 gap-16 mt-10 pb-16">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-10">

            {/* Greeting */}
            <div>
              <h1
                className="text-3xl font-semibold text-[#1C1917]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {getGreeting()} 👋
              </h1>
              <p className="text-sm text-[#A8A29E] mt-1.5">
                {getDate()}
              </p>
            </div>

            {/* Today's article */}
            <div className="flex flex-col gap-4">

              {/* Section label */}
              <p className="text-xs font-semibold text-[#E87C3B]
                uppercase tracking-widest">
                Today's Read
              </p>

              {/* Loading skeleton */}
              {loading && (
                <div className="flex flex-col gap-3 animate-pulse">
                  <div className="h-7 bg-[#E0D5C8] rounded-lg w-3/4" />
                  <div className="h-4 bg-[#E0D5C8] rounded-lg w-1/3" />
                  <div className="h-16 bg-[#E0D5C8] rounded-lg w-full" />
                  <div className="h-4 bg-[#E0D5C8] rounded-lg w-1/2" />
                </div>
              )}

              {/* Error */}
              {error && !loading && (
                <p className="text-sm text-[#A8A29E]">{error}</p>
              )}

              {/* Article content */}
              {!loading && todaysRead && (
                <div className="flex flex-col gap-3">

                  <h2
                    className="text-2xl font-semibold text-[#1C1917]
                      leading-snug"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {todaysRead.title}
                  </h2>

                  <p className="text-sm text-[#A8A29E]">
                    {todaysRead.author}
                  </p>

                  {/* line-clamp-3 limits to 3 lines, adds ... after */}
                  <p className="text-base text-[#78716C]
                    leading-relaxed line-clamp-3">
                    {todaysRead.description}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-[#F0EBE3]
                      text-[#78716C] px-2.5 py-1 rounded-full">
                      {todaysRead.topic}
                    </span>
                    <span className="text-xs text-[#A8A29E]">·</span>
                    <span className="text-xs text-[#A8A29E]">
                      {user.dailyReadingTime} min read
                    </span>
                    <span className="text-xs text-[#A8A29E]">·</span>
                    <span className="text-xs text-[#A8A29E]">
                      {todaysRead.source}
                    </span>
                  </div>

                  {/* Text only buttons — no bg, no border */}
                  <div className="flex items-center gap-6 mt-1">
                    <button
                      onClick={() => navigate('/reader')}
                      className="text-sm font-semibold text-[#E87C3B]
                        hover:text-[#D4692A] transition-colors"
                    >
                      Read Today's Article →
                    </button>
                    <button
                      onClick={() => navigate('/library')}
                      className="text-sm text-[#A8A29E]
                        hover:text-[#E87C3B] transition-colors"
                    >
                      Explore
                    </button>
                  </div>

                </div>
              )}

            </div>

            {/* Streak — no card, just text */}
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="text-base font-semibold text-[#1C1917]">
                  3 day streak
                </p>
                <p className="text-xs text-[#A8A29E] mt-0.5">
                  Keep it going!
                </p>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-10">

            {/* NEW USER STATE */}
            {!currentBook && (
              <div className="flex flex-col gap-8">

                <p className="text-xs font-semibold text-[#E87C3B]
                  uppercase tracking-widest">
                  Start a Book
                </p>

                <p
                  className="text-base text-[#78716C] leading-relaxed"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Your daily articles are great for building a habit.
                  But starting a book takes it further — deeper focus,
                  richer vocabulary, real progress.
                </p>

                <div className="flex flex-col gap-5">

                  <p
                    className="text-lg font-semibold text-[#1C1917]"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    Here are some suggestions
                  </p>

                  {/* Suggestions table
                      overflow-hidden clips internal borders
                      to stay within rounded corners */}
                  <div className="border border-[#E0D5C8]
                    rounded-2xl overflow-hidden">

                    {BOOK_SUGGESTIONS.map((book, index) => (
                      <button
                        key={book.id}
                        onClick={() => navigate('/library')}
                        className={`
                          w-full text-left group
                          grid grid-cols-[1fr_auto]
                          hover:bg-[#FFF5EF] transition-colors
                          ${index !== BOOK_SUGGESTIONS.length - 1
                            ? 'border-b border-[#E0D5C8]'
                            : ''}
                        `}
                      >
                        {/* Left cell — book info */}
                        <div className="p-5 border-r border-[#E0D5C8]">
                          <p
                            className="text-lg font-semibold
                              text-[#1C1917] leading-snug
                              group-hover:text-[#E87C3B]
                              transition-colors"
                            style={{ fontFamily: "'Lora', serif" }}
                          >
                            {book.title}
                          </p>
                          <p className="text-sm text-[#A8A29E] mt-1">
                            {book.author} · {book.topic}
                          </p>
                        </div>

                        {/* Right cell — badge */}
                        <div className="p-5 flex items-center
                          justify-center min-w-[120px]">
                          <p
                            className="text-sm font-semibold
                              text-[#E87C3B] text-center
                              whitespace-pre-line leading-snug
                              group-hover:text-[#D4692A]
                              transition-colors"
                            style={{ fontFamily: "'Lora', serif" }}
                          >
                            {book.badge}
                          </p>
                        </div>

                      </button>
                    ))}

                  </div>

                </div>

                {/* Big bold statement */}
                <p
                  className="text-2xl font-bold text-[#1C1917]
                    leading-snug uppercase tracking-wide"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Don't think too much and waste time.
                  Just pick one.
                </p>

                <button
                  onClick={() => navigate('/library')}
                  className="text-sm font-semibold text-[#E87C3B]
                    hover:text-[#D4692A] transition-colors text-left"
                >
                  Explore Library →
                </button>

              </div>
            )}

            {/* RETURNING USER STATE */}
            {currentBook && (
              <div className="flex flex-col gap-6">

                <p className="text-xs font-semibold text-[#E87C3B]
                  uppercase tracking-widest">
                  Currently Reading
                </p>

                <div>
                  <h2
                    className="text-3xl font-semibold text-[#1C1917]
                      leading-snug"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {currentBook.title}
                  </h2>
                  <p className="text-base text-[#A8A29E] mt-2">
                    {currentBook.author}
                  </p>
                </div>

                <p className="text-base text-[#78716C]
                  leading-relaxed line-clamp-4">
                  {currentBook.description}
                </p>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs bg-[#F0EBE3]
                    text-[#78716C] px-2.5 py-1 rounded-full">
                    {currentBook.topic}
                  </span>
                  <span className="text-xs text-[#A8A29E]">·</span>
                  <span className="text-xs text-[#A8A29E]">
                    {currentBook.source}
                  </span>
                </div>

                <p className="text-sm text-[#A8A29E]">
                  Page {currentBook.currentPage} of {currentBook.totalPages}
                </p>

                <button
                  onClick={() => navigate('/reader')}
                  className="text-sm font-semibold text-[#E87C3B]
                    hover:text-[#D4692A] transition-colors text-left"
                >
                  Continue Reading →
                </button>

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  )
}