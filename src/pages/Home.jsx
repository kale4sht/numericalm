import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ClipboardList, Lightbulb, Gamepad2, Sparkles, ArrowRight, HelpCircle, Loader2 } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { useAuth } from '../context/AuthContext';
import mascotHappy from '../assets/mascot-happy.png'; 

export default function Home() {
  const { openModal } = useModal();
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-nc-wood" size={40} /></div>;
  }

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16 pt-6 md:pt-10 space-y-8 md:space-y-12 relative">
      
      {/* Tombol Panduan Floating */}
      <button 
        onClick={openModal}
        className="fixed bottom-6 right-6 z-50 bg-white text-nc-wood p-3 md:p-4 rounded-full shadow-xl border-4 border-nc-cream hover:border-nc-wood hover:scale-110 transition-all duration-300 group flex items-center gap-0 hover:gap-3 overflow-hidden"
      >
        <HelpCircle size={28} className="shrink-0 md:w-8 md:h-8" />
        <span className="max-w-0 group-hover:max-w-xs transition-all duration-500 ease-in-out font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 text-sm md:text-lg">
          Panduan
        </span>
      </button>

      {/* Header Text */}
      <div className="text-center space-y-3 md:space-y-4 max-w-4xl mx-auto animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-4xl md:text-7xl font-extrabold text-nc-wood tracking-tight">
          NumeriCalm
        </h1>
        <p className="text-xl md:text-3xl font-bold text-nc-sky font-sans">
          Your first step to stress free math!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:h-[600px]">
        
        {/* CARD MATH GAME (UTAMA) */}
        <div className="lg:col-span-7 bg-[#FFE8D1] rounded-[32px] md:rounded-[48px] p-6 md:p-10 relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border-4 border-[#FFE8D1] hover:border-[#FBCFA0] flex flex-col justify-between min-h-[400px] lg:min-h-0">
          
          <div className="absolute top-6 left-6 md:top-10 md:left-10 opacity-10 pointer-events-none">
             <h1 className="text-6xl md:text-9xl font-extrabold font-pixel text-nc-wood tracking-widest -rotate-12 select-none">GAME</h1>
          </div>

          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 md:gap-3 mb-2">
               <div className="bg-[#4A90E2] p-2 rounded-xl text-white"><Gamepad2 size={20} className="md:w-6 md:h-6" /></div>
               {/* Saya juga sarankan mengubah "Coming Soon" menjadi "Play Now" jika game sudah siap */}
               <span className="font-bold text-[#4A90E2] tracking-wider text-xs md:text-sm uppercase">Coming Soon</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#4A90E2] font-pixel leading-tight" style={{ textShadow: '2px 2px 0px white' }}>
              MATH GAME
            </h2>
          </div>
            
          {/* UPDATED: Menggunakan tag <a> untuk link eksternal */}
          <a 
            href="https://scratch.mit.edu/projects/1255122487"
            target="_blank" 
            rel="noopener noreferrer"
            className="relative z-20 bg-[#4A90E2] text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-bold shadow-[0_6px_0_rgb(50,100,180)] active:shadow-none active:translate-y-1 transition-all hover:brightness-110 flex items-center gap-3 w-max mt-4 md:mt-0"
          >
            Mainkan Game <ArrowRight size={20} />
          </a>

          {/* --- 2. PEMANGGILAN GAMBAR --- */}
          <img 
            src={mascotHappy} 
            alt="Mascot Happy" 
            className="absolute bottom-0 right-[-10px] md:right-[-20px] h-48 md:h-80 object-contain drop-shadow-2xl transform group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-500 z-10"
          />
        </div>

        {/* SIDE CARDS (KANAN) */}
        <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6 h-full">
          
          {/* Card Screening */}
          <div className="bg-[#8C5E35] rounded-[32px] md:rounded-[48px] p-6 md:p-8 flex-1 relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 text-white group border-4 border-[#8C5E35] hover:border-[#6B4525] flex flex-col justify-between min-h-[200px]">
            <div className="flex justify-between items-start relative z-10">
              <div>
                 <h2 className="text-2xl md:text-3xl font-bold mb-2">Screening</h2>
                 <span className="inline-block bg-[#FDF6E9] text-[#8C5E35] px-3 py-1 rounded-full text-[10px] md:text-xs font-bold">10-12 Tahun</span>
              </div>
              <div className="bg-white/10 p-3 rounded-2xl group-hover:rotate-12 transition duration-300 backdrop-blur-sm">
                <ClipboardList size={24} className="md:w-8 md:h-8 text-white" />
              </div>
            </div>

            <div className="relative z-10 flex justify-end mt-4 md:mt-0">
               <Link to="/screening" className="group/btn">
                 <span className="bg-white text-[#8C5E35] px-5 md:px-6 py-2 md:py-3 rounded-full font-bold shadow-lg group-hover/btn:bg-[#FDF6E9] transition-all flex items-center gap-2 text-sm md:text-base">
                    Mulai Cek <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
                 </span>
               </Link>
            </div>
            <Link to="/screening" className="absolute top-0 left-0 w-full h-full z-0"></Link>
          </div>

          {/* Card Belajar Yuk */}
          <div className="bg-[#5D9CEC] rounded-[32px] md:rounded-[48px] p-6 md:p-8 flex-1 relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 text-white group border-4 border-[#5D9CEC] hover:border-[#4A80C0] flex flex-col justify-between min-h-[200px]">
             <div className="flex justify-between items-start relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold">Belajar Yuk!</h2>
              <div className="bg-white/10 p-3 rounded-full group-hover:rotate-12 transition duration-300 backdrop-blur-sm">
                <Lightbulb size={24} className="md:w-8 md:h-8 text-[#F8E71C]" />
              </div>
            </div>
            
             <div className="relative z-10 flex justify-end mt-4 md:mt-0">
               <Link to="/learn" className="group/btn">
                 <span className="bg-white text-[#5D9CEC] px-5 md:px-6 py-2 md:py-3 rounded-full font-bold shadow-lg group-hover/btn:bg-[#FDF6E9] transition-all flex items-center gap-2 text-sm md:text-base">
                    Baca Tips <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
                 </span>
               </Link>
            </div>
            <Sparkles className="absolute -bottom-6 -left-6 text-white/10 w-32 h-32 md:w-40 md:h-40 rotate-12 pointer-events-none" />
            <Link to="/learn" className="absolute top-0 left-0 w-full h-full z-0"></Link>
          </div>

        </div>
      </div>
    </div>
  );
}