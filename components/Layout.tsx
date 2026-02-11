
import React, { useState, useCallback, memo } from 'react';
import { Music, Menu, X, Youtube, Wand2, LucideIcon, CheckCircle2, Trophy, Star } from 'lucide-react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { TRACKS } from '../constants';
import { useProgress } from '../contexts/ProgressContext';

const YOUTUBE_URL = "https://www.youtube.com/@HarmoniaViva-HV";

interface NavItemProps { 
  to: string; 
  icon?: LucideIcon; 
  label: string; 
  onClick?: () => void; 
  activeColorClass: string; 
  activeBgClass: string; 
  activeBorderClass: string;
  isCompleted?: boolean;
}

// Reusable NavItem Component for consistent styling
const NavItem: React.FC<NavItemProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  onClick, 
  activeColorClass, 
  activeBgClass, 
  activeBorderClass,
  isCompleted
}) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => `
      w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 border border-transparent group
      ${isActive 
        ? `${activeBgClass} ${activeColorClass} ${activeBorderClass} font-medium shadow-sm` 
        : 'text-gray-400 hover:text-white hover:bg-white/5'}
    `}
  >
    <div className="flex items-center gap-3 truncate">
      {isCompleted ? (
        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
      ) : (
        Icon && <Icon className="w-4 h-4 shrink-0" />
      )}
      <span className="truncate text-left">{label}</span>
    </div>
  </NavLink>
);

// Memoized Sidebar Content
const SidebarContent = memo(({ onClose }: { onClose?: () => void }) => {
  const { completedLessons, getTrackProgress } = useProgress();

  return (
    <>
      <Link to="/" className="p-6 border-b border-gray-800 block cursor-pointer hover:bg-white/5 transition-colors" onClick={onClose}>
        <h1 className="font-bold text-xl text-white flex items-center gap-2">
          <Music className="text-pink-500 w-6 h-6" /> 
          Harmonia Viva
        </h1>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Suno Masterclass</p>
      </Link>

      <nav className="flex-1 overflow-y-auto py-6 space-y-8 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        
        {/* Ferramentas Section */}
        <div className="pb-2">
          <div className="py-2 px-6 mb-2 bg-gradient-to-r from-violet-900/10 to-transparent border-l-4 border-violet-500">
             <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-violet-400">
               <Wand2 className="w-4 h-4" />
               Ferramentas
             </h3>
          </div>
          <div className="space-y-1 px-4">
             <NavItem
               to="/generator"
               label="Gerador de Prompts"
               onClick={onClose}
               activeColorClass="text-violet-200"
               activeBgClass="bg-violet-500/10"
               activeBorderClass="border-violet-500/20"
             />
          </div>
        </div>

        {/* Dynamic Tracks */}
        {TRACKS.map((track) => {
          const progress = getTrackProgress(track.lessons);
          const isComplete = progress === 100;
          const isBonus = track.id === 'bonus';
          const isCreation = track.id === 'creation';

          // Visual Logic
          let titleColor, borderColor, bgHeader, activeColor, activeBg, activeBorder, progressBarColor;

          if (isBonus) {
             titleColor = 'text-yellow-400';
             borderColor = 'border-yellow-500';
             bgHeader = 'from-yellow-900/20';
             activeColor = 'text-yellow-200';
             activeBg = 'bg-yellow-500/10';
             activeBorder = 'border-yellow-500/30';
             progressBarColor = 'bg-yellow-500';
          } else if (isComplete) {
             titleColor = 'text-yellow-400';
             borderColor = 'border-yellow-500';
             bgHeader = isCreation ? 'from-pink-900/10' : 'from-green-900/10'; // Keep base nuance
             activeColor = 'text-yellow-200';
             activeBg = 'bg-yellow-500/10';
             activeBorder = 'border-yellow-500/30';
             progressBarColor = 'bg-yellow-500';
          } else if (isCreation) {
             titleColor = 'text-pink-400';
             borderColor = 'border-pink-500';
             bgHeader = 'from-pink-900/10';
             activeColor = 'text-pink-200';
             activeBg = 'bg-pink-500/10';
             activeBorder = 'border-pink-500/20';
             progressBarColor = 'bg-pink-600';
          } else {
             // Monetization
             titleColor = 'text-green-400';
             borderColor = 'border-green-500';
             bgHeader = 'from-green-900/10';
             activeColor = 'text-green-200';
             activeBg = 'bg-green-500/10';
             activeBorder = 'border-green-500/20';
             progressBarColor = 'bg-green-600';
          }

          return (
            <div key={track.id} className="pb-2">
              <div className={`py-2 px-6 mb-2 bg-gradient-to-r ${bgHeader} to-transparent border-l-4 ${borderColor}`}>
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${titleColor} ${isBonus ? 'animate-pulse' : ''}`}>
                    {isBonus ? <Star className="w-4 h-4 fill-yellow-500" /> : (isComplete ? <Trophy className="w-4 h-4" /> : <track.icon className="w-4 h-4" />)}
                    {track.title}
                  </h3>
                  <span className={`text-[10px] font-bold ${titleColor}`}>{progress}%</span>
                </div>
                {/* Progress Bar */}
                <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ease-out ${progressBarColor}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1 px-4">
                {track.lessons.map((lesson) => (
                  <NavItem
                    key={lesson.id}
                    to={`/lesson/${lesson.id}`}
                    label={lesson.title}
                    onClick={onClose}
                    activeColorClass={activeColor}
                    activeBgClass={activeBg}
                    activeBorderClass={activeBorder}
                    isCompleted={completedLessons.includes(lesson.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-6 border-t border-gray-800">
        <a 
          href={YOUTUBE_URL}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-sm group"
        >
          <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>Canal Harmonia Viva</span>
        </a>
      </div>
    </>
  );
});

export const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen(prev => !prev), []);

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans text-gray-100 bg-suno-dark relative">
      
      {/* Mobile/Tablet Header */}
      <header className="lg:hidden bg-suno-dark/95 backdrop-blur-md border-b border-gray-800 p-4 flex justify-between items-center sticky top-0 z-30 shadow-md">
        <Link 
          to="/"
          className="font-bold text-xl tracking-tight text-white flex items-center gap-2 focus:outline-none" 
          aria-label="Ir para a página inicial"
        >
          <Music className="text-pink-500" /> Harmonia Viva
        </Link>
        <button 
          onClick={toggleMobileMenu} 
          className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-72 
        bg-gray-900 lg:bg-suno-card/80 backdrop-blur-xl border-r border-gray-800 
        z-50 transform transition-transform duration-300 ease-in-out will-change-transform
        ${mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        <SidebarContent onClose={closeMobileMenu} />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-transparent relative flex flex-col">
        <Outlet />
        
        <footer className="mt-auto py-8 text-center text-gray-600 text-sm border-t border-gray-800/50 bg-suno-dark/50 backdrop-blur-sm">
          <p>© 2025 Harmonia Viva. Todos os direitos reservados.</p>
          <div className="flex items-center justify-center gap-4 mt-2">
             <a href="https://suno.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">Suno Oficial</a>
             <span>•</span>
             <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors flex items-center gap-1">
               <Youtube className="w-4 h-4" /> YouTube
             </a>
          </div>
        </footer>
      </main>
    </div>
  );
};
