import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 py-6">
      {/* Centered container */}
      <div className="py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-[#E87C3B] rounded-xl flex items-center justify-center">
            <span className="text-white text-sm">📖</span>
          </div>

          <span
            className="text-lg font-semibold text-[#1C1917]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Just Read
          </span>
        </button>

        {/* Button group box */}
        <div className="flex items-center gap-2 border border-[#E87C3B] rounded-2xl p-1">
          <button
            onClick={() => navigate('/home')}
            className={`px-4 py-2 text-sm font-medium rounded-xl
                        transition-all duration-200
                        ${
                          isActive('/home')
                            ? 'text-[#E87C3B]'
                            : 'text-[#1C1917] hover:text-[#E87C3B] hover:-translate-y-0.5'
                        }`}
          >
            home
          </button>

          <button
            onClick={() => navigate('/library')}
            className={`px-4 py-2 text-sm font-medium rounded-xl
                        transition-all duration-200
                        ${
                          isActive('/library')
                            ? 'text-[#E87C3B]'
                            : 'text-[#1C1917] hover:text-[#E87C3B] hover:-translate-y-0.5'
                        }`}
          >
            Library
          </button>

          <button
            onClick={() => navigate('/progress')}
            className={`px-4 py-2 text-sm font-medium rounded-xl
                        transition-all duration-200
                        ${
                          isActive('/progress')
                            ? 'text-[#E87C3B]'
                            : 'text-[#1C1917] hover:text-[#E87C3B] hover:-translate-y-0.5'
                        }`}
          >
            Progress
          </button>

          <button
            onClick={() => navigate('/settings')}
            className={`px-4 py-2 text-sm font-medium rounded-xl
                        transition-all duration-200
                        ${
                          isActive('/settings')
                            ? 'text-[#E87C3B]'
                            : 'text-[#1C1917] hover:text-[#E87C3B] hover:-translate-y-0.5'
                        }`}
          >
            Settings
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
