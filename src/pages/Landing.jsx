import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f5f1]">
      {/* NEW: Notebook lines */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 31px,
        rgba(180, 160, 140, 0.2) 31px,
        rgba(180, 160, 140, 0.2) 32px
      )`,
        }}
      />

      {/* NEW: Top navbar */}
      <nav className="relative z-20 flex items-center px-8 pt-5">
        {/* App icon + name */}
        <div className="flex items-center gap-2">
          {/* Icon box */}
          <div className="w-8 h-8 bg-[#E87C3B] rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">📖</span>
          </div>

          {/* App name */}
          <span className="text-[#1e1a16] font-semibold text-lg tracking-tight">
            Just Read
          </span>
        </div>
      </nav>

      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#f3b98a] opacity-60 blur-2xl" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-[#8ac7b8] opacity-60 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#f8d67b] opacity-60 blur-2xl" />

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-6 py-1">
        <div className="w-full max-w-4xl mx-auto">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-12 text-center">
            <section className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#fff8f2] px-4 py-2 text-sm font-semibold text-[#8f4f24]">
                <span className="h-2 w-2 rounded-full bg-[#e57b39]" />
                Learn deeply, every day
              </div>

              <div className="space-y-5">
                <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-[#1e1a16] sm:text-5xl lg:text-6xl [font-:'Lora',serif]">
                  Make reading your
                  <span className="block text-[#cb6b2d]">
                    best daily ritual.
                  </span>
                </h1>
                <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#5a5048] sm:text-lg">
                  Just Read helps you build a reading habit with focused,
                  high-quality content from books, essays, and trusted sources.
                  Clean sessions, smart progress, zero noise.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-center">
                <button
                  onClick={() => navigate('/onboarding')}
                  className="rounded-3xl bg-[#d97334] px-6 py-2 text-base font-semibold text-white shadow-[0_10px_30px_rgba(217,115,52,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#bf6228] active:translate-y-0"
                >
                  Start Reading
                </button>
                <button
                  onClick={() => navigate('/onboarding')}
                  className="rounded-3xl border border-[#e8ddd3] bg-white px-6 py-2 text-base font-semibold text-[#473f38] transition-colors duration-200 hover:bg-[#f8f3ee]"
                >
                  Explore Features
                </button>
              </div>
            </section>

            <section className="mx-auto grid w-full max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <article className="rounded-2xl bg-[#fffdfb]/60 p-5 transition-transform duration-200 hover:-translate-y-0.5">
                <p className="mb-3 text-2xl">📚</p>
                <h2 className="text-lg font-semibold text-[#1f1a15]">
                  Meaningful Content
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#6a6058]">
                  Curated reads that sharpen your thinking instead of endless
                  scrolling.
                </p>
              </article>

              <article className="rounded-2xl bg-[#f4fbf8]/70 p-5 transition-transform duration-200 hover:-translate-y-0.5">
                <p className="mb-3 text-2xl">⏱️</p>
                <h2 className="text-lg font-semibold text-[#1f1a15]">
                  10-Minute Sessions
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#6a6058]">
                  Structured reading blocks designed for busy days and steady
                  focus.
                </p>
              </article>

              <article className="rounded-2xl bg-[#fffaf0]/70 p-5 transition-transform duration-200 hover:-translate-y-0.5 sm:col-span-2 lg:col-span-1">
                <p className="mb-3 text-2xl">🔥</p>
                <h2 className="text-lg font-semibold text-[#1f1a15]">
                  Habit Momentum
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#6a6058]">
                  Keep streaks alive and turn consistency into your reading
                  superpower.
                </p>
              </article>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
