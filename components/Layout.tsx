import React, { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Scale, LogOut, Menu, X, Phone, Info, Search, Shield, User } from 'lucide-react';
import { logout, isAuthenticated } from '../services/auth';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const NavLink = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={() => setIsMenuOpen(false)}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          isActive 
            ? 'bg-flyo-gold text-flyo-navy font-bold' 
            : 'text-slate-300 hover:text-white hover:bg-slate-800'
        }`}
      >
        <Icon size={18} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-flyo-navy text-white sticky top-0 z-50 shadow-lg border-b border-flyo-gold/30">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-white p-1.5 rounded-full ring-2 ring-flyo-gold group-hover:shadow-lg transition-all">
               {/* Fallback logo icon if image fails */}
               <Scale className="text-flyo-navy" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight leading-none text-white">FLYO<span className="text-flyo-gold">Portal</span></h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Freedom Law Youth Organization</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" icon={Search} label="Verify" />
            <NavLink to="/info" icon={Info} label="About" />
            <NavLink to="/contact" icon={Phone} label="Contact" />
            {isAuth ? (
               <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-700">
                 <Link to="/admin" className="flex items-center gap-2 text-flyo-gold font-semibold hover:text-white transition-colors">
                   <Shield size={18} /> Admin
                 </Link>
                 <button 
                   onClick={handleLogout}
                   className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
                 >
                   <LogOut size={16} /> Logout
                 </button>
               </div>
            ) : (
              <Link to="/login" className="ml-4 flex items-center gap-2 text-slate-400 hover:text-white text-sm">
                <User size={16} /> Admin Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 p-4 space-y-2">
            <NavLink to="/" icon={Search} label="Verify Membership" />
            <NavLink to="/info" icon={Info} label="About FLYO" />
            <NavLink to="/contact" icon={Phone} label="Contact Us" />
            <div className="h-px bg-slate-800 my-2"></div>
            {isAuth ? (
              <>
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-flyo-gold font-bold">
                  <Shield size={18} /> Dashboard
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300">
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-slate-300">
                <User size={18} /> Admin Login
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-auto border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 text-flyo-gold">
            <Scale size={24} />
            <span className="font-bold text-lg">FLYO</span>
          </div>
          <p className="text-sm mb-2">Freedom Law Youth Organization</p>
          <p className="text-xs text-slate-600">&copy; {new Date().getFullYear()} FLYO Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;