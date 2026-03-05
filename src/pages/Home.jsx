import Navbar from '../components/Navbar';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

// Greetings
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Hey, Good Morning';
  if (hour < 16) return 'Hey, Good Afternoon';
  if (hour < 19) return 'Hey, Good Evening';
  return 'Hey, still awake ?';
};

const getDate = () => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
};

// Fake content that looks exactly like what the API will return
// When real API is ready, we just swap this object out
const MOCK_CONTENT = {
  id: '1',
  title: 'A Scandal in Bohemia',
  author: 'Arthur Conan Doyle',
  topic: 'Fiction',
  readTime: 10,
  description:
    "The King of Bohemia arrives at Baker Street in disguise, seeking Holmes's help to retrieve a compromising photograph held by the brilliant Irene Adler.",
  source: 'Project Gutenberg',
};

export default function Home() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f5f1] relative overflow-hidden">
      {/* Notebook background lines */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
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

      {/* Gradient blobs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#f3b98a] opacity-60 blur-2xl" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-[#8ac7b8] opacity-60 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#f8d67b] opacity-20 blur-2xl" />

      {/* Everything centered here */}
      <div className="relative z-10 px-20">
        {/* Navbar */}
        <Navbar />

        {/* Two col grid */}
        <div className="grid grid-cols-2 gap-8 mt-8 pt-4">
          {/* left col */}
          <div className="flex flex-col gap-7">
            {/* Greeting */}
            <div>
              <h1
                className="text-2xl font-semibold text-[#1C1917]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {getGreeting()} 👋
              </h1>
              <p className="text-[#A8A29E] text-sm mt-1">{getDate()}</p>
            </div>

            {/* Streak card */}
            <div className=" border border-[#E87C3B] rounded-xl self-start mt-10">
              <div className="flex items-center px-3 py-2">
                {/* Left side — icon + text */}
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔥</span>
                  <div>
                    <p className="text-sm font-semibold text-[#1C1917]">
                      3 day streak
                    </p>
                    <p className="text-xs text-[#A8A29E]">Keep it going!</p>
                  </div>
                </div>

                {/* Right side — big number */}
                <span className="text-2xl font-bold pl-6 text-[#E87C3B]">
                  3
                </span>
              </div>
            </div>

            {/* Quote card */}
            <div className="relative border-2 border-[#E87C3B] rounded-2xl p-6 max-w-sm">
              {/* Opening quote — top left */}
              <span
                className="absolute -top-4 -left-2 text-4xl text-[#E87C3B] bg-[#f7f5f1] px-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                ❝
              </span>

              {/* Quote text */}
              <p
                className="text-lg text-[#1C1917]/90 leading-relaxed mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                The man who does not read has no advantage over the man who
                cannot read.
              </p>

              {/* Author + closing quote on same line */}
              <div className="flex items-center justify-end gap-1">
                <p className="text-sm text-[#78716C]">— Mark Twain</p>
                <span
                  className="text-4xl text-[#E87C3B] bg-[#f7f5f1]/90 px-1 absolute -bottom-4 -right-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  ❞
                </span>
              </div>
            </div>
          </div>

          {/* ------------------Right div------------- */}
          <div className="pb-6 pt-3">
            <p className="text-xs font-medium text-[#E87C3B] uppercase tracking-wider mb-4">
              Today's Read
            </p>

            {/* Title */}
            <h2
              className="text-xl font-semibold text-[#1C1917] mb-1 pt-3"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {' '}
              {MOCK_CONTENT.title}{' '}
            </h2>

            {/* Author */}
            <p className="text-sm text-[#78716C] mb-3 ">
              {' '}
              - {MOCK_CONTENT.author}
            </p>

            {/* Description */}
            <p className="text-lg text-[#78716C] leading-relaxed mb-5 pt-5.5">
              {MOCK_CONTENT.description}
            </p>

            {/* Tags row */}
            <div className="flex items-center gap-7 mb-5 pt-4">
              {/* Topic tag */}
              <span className="text-sm border border-black/50 text-[#78716C] px-2.5 py-1 rounded-full ">
                {MOCK_CONTENT.topic}
              </span>

              {/* Read time */}
              <span className="text-sm border border-black/50 rounded-full px-2.5 py-1 text-[#78716C]">
                {MOCK_CONTENT.readTime} min read
              </span>

              {/* Source */}
              <span className="text-sm border border-black/50 rounded-full p-1  text-[#78716C]">
                {MOCK_CONTENT.source}
              </span>
            </div>

            {/* Start reading and Explore more topics buttons */}
            <div className="pt-6 flex flex-col  gap-2">
              <button
                onClick={() => navigate('/reader')}
                className="w-xs bg-[#E87C3B] text-white font-medium py-3
               rounded-xl hover:bg-[#D4692A] transition-colors text-sm"
              >
                Start Reading
              </button>

              {/* Explore button — NEW */}
              <button
                onClick={() => navigate('/library')}
                className="w-xs border border-[#E87C3B] text-sm font-medium rounded-xl text-[#78716C] hover:text-[#E87C3B]
             transition-colors mt-2 py-2.5"
              >
                More Topics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
