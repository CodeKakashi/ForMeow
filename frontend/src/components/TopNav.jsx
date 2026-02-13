import { NavLink } from 'react-router-dom';

const linkBase = "px-3 sm:px-4 py-2 rounded-full text-xs sm:text-base font-semibold transition-colors whitespace-nowrap";
const linkActive = "bg-white/70 text-foreground shadow-sm";
const linkInactive = "text-foreground/70 hover:text-foreground hover:bg-white/50";

export const TopNav = () => {
  return (
    <nav className="sticky top-0 z-40">
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/70 via-accent/70 to-primary/70 backdrop-blur-lg border-b border-white/40" />
      <div className="relative max-w-6xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-2 sm:gap-4">
        <NavLink
          to="/home"
          className="flex items-center gap-2 font-heading text-2xl text-foreground"
          aria-label="Go to home"
        >
          <span className="text-2xl">🐾</span>
          <span className="hidden sm:inline">To My Love</span>
        </NavLink>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-1 sm:gap-2 overflow-x-auto">
          <NavLink
            end
            to="/home"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about-her"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            About Her
          </NavLink>
          <NavLink
            to="/mood-picker"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Mood Picker
          </NavLink>
          <NavLink
            to="/cat-quiz"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Meow Quiz
          </NavLink>
          <NavLink
            to="/fun-facts"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Fun Facts
          </NavLink>
          <NavLink
            to="/coupon-vault"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Coupons
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
