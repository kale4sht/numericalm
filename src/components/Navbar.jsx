import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Menu, X, LayoutDashboard, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/');
  };

  const closeMenu = () => setIsOpen(false);

  // Style untuk link navigasi text
  const linkStyle = "hover:text-nc-wood transition relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-nc-wood after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left";
  const activeLinkStyle = "text-nc-wood font-extrabold relative after:content-[''] after:absolute after:w-full after:scale-x-100 after:h-0.5 after:bottom-0 after:left-0 after:bg-nc-wood";

  const getLinkClass = (path) => location.pathname === path ? activeLinkStyle : linkStyle;

  return (
    <nav className="bg-white py-4 md:py-6 px-4 md:px-8 border-b-2 border-gray-50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link to={isAdmin ? "/admin" : "/"} className="flex items-center gap-3 group z-50" onClick={closeMenu}>
           <div className="grid grid-cols-2 gap-0.5 w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-110">
              <div className="bg-nc-sky rounded-tl-lg"></div>
              <div className="bg-nc-wood rounded-tr-lg"></div>
              <div className="bg-nc-grass rounded-bl-lg"></div>
              <div className="bg-nc-hair rounded-br-lg"></div>
           </div>
           <span className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight group-hover:text-nc-wood transition-colors">NumeriCalm</span>
        </Link>
        
        {/* DESKTOP MENU (Tengah) */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10 font-bold text-gray-600 text-lg">
          {isAdmin ? (
            <Link to="/admin" className="text-nc-wood flex items-center gap-2 hover:opacity-80 transition">
              <LayoutDashboard size={20} />
              Dashboard Admin
            </Link>
          ) : (
            <>
              <Link to="/" className={getLinkClass('/')}>Beranda</Link>
              <Link to="/learn" className={getLinkClass('/learn')}>Belajar</Link>
              <Link to="/screening" className={getLinkClass('/screening')}>Cek Kecemasan</Link>
              <Link to="/privacy" className={getLinkClass('/privacy')}>Privacy</Link>
              {/* Link Profil text dihapus dari sini, dipindah ke kanan digabung icon */}
            </>
          )}
        </div>

        {/* RIGHT SIDE BUTTONS (Profil Gabungan & Keluar) */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {/* 1. Tombol Profil (Icon + Text digabung) */}
              <Link to="/profile">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300 ${
                  location.pathname === '/profile' 
                    ? 'bg-nc-wood border-nc-wood text-white shadow-md' 
                    : 'border-gray-200 text-gray-600 hover:border-nc-wood hover:text-nc-wood'
                }`}>
                  <User size={20} />
                  <span className="font-bold text-sm">Profil Saya</span>
                </div>
              </Link>

              {/* 2. Tombol Keluar (Satu-satunya di navbar desktop) */}
              <button 
                onClick={handleSignOut}
                className="p-2 rounded-full text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                title="Keluar"
              >
                <LogOut size={24} />
              </button>
            </>
          ) : (
            // Jika belum login
            <>
              <Link to="/login">
                <button className="px-6 py-2 rounded-full border-2 border-nc-brown-card text-nc-brown-card font-bold hover:bg-nc-brown-card hover:text-white transition active:scale-95">
                  Masuk
                </button>
              </Link>
              <div className="p-2 rounded-full bg-gray-100 text-gray-400">
                <User size={24} />
              </div>
            </>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className="md:hidden text-nc-wood p-2 z-50 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* MOBILE MENU CONTENT */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {isAdmin ? (
            <Link to="/admin" onClick={closeMenu} className="text-2xl font-bold text-nc-wood flex items-center gap-2">
              <LayoutDashboard size={24} />
              Dashboard Admin
            </Link>
          ) : (
            <>
              <Link to="/" onClick={closeMenu} className="text-2xl font-bold text-gray-700 hover:text-nc-wood">Beranda</Link>
              <Link to="/learn" onClick={closeMenu} className="text-2xl font-bold text-gray-700 hover:text-nc-wood">Belajar</Link>
              <Link to="/screening" onClick={closeMenu} className="text-2xl font-bold text-gray-700 hover:text-nc-wood">Cek Kecemasan</Link>
              <Link to="/privacy" onClick={closeMenu} className="text-2xl font-bold text-gray-700 hover:text-nc-wood">Privacy</Link>
              
              {user && (
                 <Link to="/profile" onClick={closeMenu} className="text-2xl font-bold text-nc-wood flex items-center gap-2 bg-nc-cream px-6 py-2 rounded-full">
                    <User size={24} /> Profil Saya
                 </Link>
              )}
            </>
          )}
          
          <div className="flex flex-col gap-4 mt-4 w-full px-12">
            {user ? (
              <button 
                onClick={handleSignOut}
                className="w-full py-3 rounded-full border-2 border-red-200 text-red-500 font-bold hover:bg-red-50 transition flex items-center justify-center gap-2"
              >
                <LogOut size={20} /> Keluar
              </button>
            ) : (
              <Link to="/login" onClick={closeMenu} className="w-full">
                <button className="w-full py-3 rounded-full bg-nc-brown-card text-white font-bold hover:opacity-90 transition">
                  Masuk
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}