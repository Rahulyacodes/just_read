import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

// static data
const TOPICS = [
  { id: 'philosophy', label: 'Philosophy', emoji: '🧠' },
  { id: 'science', label: 'Science', emoji: '🔬' },
  { id: 'history', label: 'History', emoji: '📜' },
  { id: 'fiction', label: 'Fiction', emoji: '📖' },
  { id: 'technology', label: 'Technology', emoji: '💻' },
  { id: 'sports', label: 'Sports', emoji: '⚽' },
  { id: 'gaming', label: 'Gaming', emoji: '🎮' },
  { id: 'anime', label: 'Anime', emoji: '⛩️' },
  { id: 'news', label: 'News', emoji: '📰' },
  { id: 'self-improvement', label: 'Self Growth', emoji: '🌱' },
];

const DIFFICULTIES = [
  { id: 'beginner', label: 'Beginner', desc: 'Simple words, easy flow' },
  {
    id: 'intermediate',
    label: 'Intermediate',
    desc: 'Richer vocabulary, complex ideas',
  },
  { id: 'advanced', label: 'Advanced', desc: 'Dense text, academic language' },
];

const READ_TIMES = [10, 20, 30, 45, 60, 90, 120];

// --------------------------- Component -----------------------------

function Onboarding() {
  //which step we are on
  const [step, setStep] = useState(1);

  //controls whether the reading time dropdown in opened or not
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, setTopics, setDifficulty, setReadingTime, completeOnboarding } =
    useUser();

  const navigate = useNavigate();

  // ------------------topic toggle logic ---------------

  const toggleTopic = (topicId) => {
    const alreadySelected = user.topics.includes(topicId);

    if (alreadySelected) {
      setTopics(user.topics.filter((t) => t !== topicId));
    } else {
      setTopics([...user.topics, topicId]);
    }
  };

  // ─── Finish onboarding ──────────────────────────────────────────────────────

  const handleFinish = () => {
    completeOnboarding();
    navigate('/home');
  };

  // -------------------continue button logic------------------------

  const handleContinue = () => {
    if (step === 1 && user.topics.length === 0) return;
    if (step < 3) setStep(step + 1);
    else handleFinish();
  };

  return (
    // Outer wrapper - full screen
    <div className="min-h-screen relative overflow-hidden bg-[#f7f5f1]">
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

      {/* Notebook lines layer */}
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

      {/* Gradient blob — top left */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#f3b98a] opacity-60 blur-3xl" />

      {/* Gradient blob — right middle */}
      <div className="pointer-events-none absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-[#8ac7b8] opacity-60 blur-3xl" />

      {/* main content area - sits above blob */}
      <div className="relative min-h-screen flex flex-col justify-center items-center px-8 pt-8 pb-4">
        {/* content width limiter + flex col layout */}
        <div className="w-full max-w-md mx-auto flex flex-col flex-1 relative pb-20">
          {/* -------------------- progress section ------------------- */}
          <div className="mb-8">
            {/* step counter + back button row */}
            <div className="flex items-center justify-between mb-2">
              <span className=" text-s text-[#A8A29E]">Step {step} of 3</span>

              {/* back button only shows from step 2 onwards */}
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-s text-[#A8A29E] hover:text-[#1C1917] transition-colors"
                >
                  ← Back
                </button>
              )}
            </div>

            {/* progress bar */}
            <div className="w-full h-1 bg-[#E0D5C8] rounded-full">
              <div
                className="h-1 bg-[#E87C3B] rounded-full transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* step 1 : Selecting topics */}
          {step === 1 && (
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-[#1C1917] mb-1 mt-7 pt-4">
                What do you like?
              </h1>

              <p className="text-[#A8A29E] text-sm mb-6">
                Pick topics which fasinates you...
              </p>

              {/* Topics button grid */}
              <div className="grid grid-cols-2 gap-2 pt-5">
                {TOPICS.map((topic) => {
                  // check if topics are already in user.topics array
                  const selected = user.topics.includes(topic.id);

                  return (
                    <button
                      key={topic.id}
                      onClick={() => toggleTopic(topic.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border
                                 text-left transition-all duration-200 justify-center-safe 
                                 ${
                                   selected
                                     ? 'border-[#E87C3B] bg-[#FFF5EF]'
                                     : 'border-[#E0D5C8] bg-white/60'
                                 }`}
                    >
                      <span className="text-base">{topic.emoji}</span>
                      <span
                        className={`text-sm font-medium
                                      ${selected ? 'text-[#E87C3B]' : 'text-[#1C1917]'}`}
                      >
                        {topic.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ------------------step : 2 - Diffculty selection ---------------------*/}
          {step === 2 && (
            <div className="flex flex-col">
              <h1
                className="pt-4 text-lg text-[#1C1917] mb-1 font-semibold"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Your reading level ?
              </h1>

              <p className="text-[#A8A29E] text-sm mb-6">
                We'll match content to your level
              </p>

              {/* Difficulty option button */}
              <div className="flex flex-col gap-2 pt-5">
                {DIFFICULTIES.map((d) => {
                  // Check if this difficulty matches what user has selected
                  const selected = user.difficulty === d.id;

                  return (
                    <button
                      key={d.id}
                      onClick={() => setDifficulty(d.id)}
                      className={`flex flex-col px-2 py-4 rounded-xl border
                                 transition-all duration-200 items-center gap-0.5
                                 ${
                                   selected
                                     ? 'border-[#E87C3B] bg-[#FFF5EF]'
                                     : 'border-[#E0D5C8] bg-white/60'
                                 }`}
                    >
                      <span
                        className={`font-medium text-sm
                                      ${selected ? 'text-[#E87C3B]' : 'text-[#1C1917]'}`}
                      >
                        {d.label}
                      </span>
                      <span className="text-[#A8A29E] text-xs mt-0.5">
                        {d.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ------------------step 3 : Reading time selection-------------------- */}
          {step === 3 && (
            <div className="flex flex-col">
              <h1
                className="text-lg font-semibold text-[#1C1917] mb-1 pt-4"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {' '}
                Daily reading goal ?
              </h1>

              <p className="text-[#A8A29E] text-sm mb-6">
                How long do you want to read each day ?
              </p>

              {/* Custom dropdown container */}
              <div className="relative w-full pt-4">
                {/* Dropdown trigger button */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full flex items-center justify-center px-4 py-3.5
                    border border-[#E0D5C8] bg-white/60 rounded-xl text-sm
                             text-[#1C1917] hover:border-[#E87C3B] transition-colors"
                >
                  <span>{user.dailyReadingTime} minutes</span>

                  {/* Arrow — rotates 180deg when dropdown is open */}
                  <span
                    className={`text-[#A8A29E] transition-transform duration-200
                                   ${dropdownOpen ? 'rotate-180' : ''}`}
                  >
                    ▾
                  </span>
                </button>

                {/* Dropddown list - only renders when  dropdownopen is true */}
                {dropdownOpen && (
                    <div className='absolute top-full left-0 right-0 mt-1 bg-white
                                  border border-[#E0D5C8] rounded-xl shadow-lg
                                  overflow-hidden z-20'>
                        {READ_TIMES.map((time) => (
                            <button
                            key = {time}
                            onClick={() => {
                                setReadingTime(time)
                                setDropdownOpen(false)
                            }}
                            className={`w-full text-left px-4 py-3 text-sm transition-colors
                                   hover:bg-[#FFF5EF]
                                   ${user.dailyReadingTime === time
                                     ? 'text-[#E87C3B] font-medium bg-[#FFF5EF]'
                                     : 'text-[#1C1917]'}`}
                            >
                                {time} minutes
                            </button>
                        ))}

                    </div>
                )}
              </div>
            </div>
          )}

          <div className="absolute bottom-40 left-0 right-0 pt-4 flex justify-center border-t border-[#3b3630]">
            <button
              onClick={handleContinue}
              disabled={step === 1 && user.topics.length === 0}
              className="text-sm font-medium text-[#E87C3B] hover:text-[#D4692A]
                         disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {step === 3 ? "Lets's Read" : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
