import React, { useState } from 'react';
import { X, ClipboardList, Gamepad2, ArrowRight, Info } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import mascotSantai from '../assets/mascot-santai.png';

export default function OnboardingModal() {
  const { isOpen, closeModal } = useModal();
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const handleNext = () => setStep(step + 1);
  const handleClose = () => {
    closeModal();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 transition-opacity duration-300">
      <div className="bg-white rounded-[40px] max-w-lg w-full p-8 relative border-4 border-nc-sky shadow-2xl flex flex-col min-h-[550px] animate-in zoom-in-95 duration-200">
        <button 
          onClick={handleClose} 
          className="absolute top-6 right-6 text-gray-400 hover:text-nc-wood transition-colors bg-gray-100 rounded-full p-2 z-10"
        >
          <X size={20} />
        </button>

        <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6 pt-4">
          
          {step === 1 && (
            <div className="w-full animate-in slide-in-from-right-4 duration-300">
              {/* --- 2. GUNAKAN VARIABEL IMPORT DI SINI --- */}
              <img 
                src={mascotSantai} 
                alt="Welcome" 
                className="h-40 mx-auto drop-shadow-lg mb-0 hover:scale-105 transition-transform" 
              />
              
              <h2 className="text-3xl font-extrabold text-nc-wood mb-2">Selamat Datang!</h2>
              <p className="text-xl font-bold text-nc-sky mb-4">Your first step to stress free math!</p>
              <div className="bg-nc-cream p-4 rounded-2xl border-2 border-nc-wood/10">
                <p className="text-gray-600 leading-relaxed text-sm">
                  NumeriCalm adalah platform yang dirancang untuk siapa saja yang ingin merasakan pengalaman belajar matematika tanpa rasa cemas.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="w-full animate-in slide-in-from-right-4 duration-300">
               <div className="bg-nc-wood/10 w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6 text-nc-wood border-4 border-nc-wood/20">
                <ClipboardList size={56} />
              </div>
              <h2 className="text-2xl font-bold text-nc-wood mb-4">Fitur Screening</h2>
              <p className="text-gray-600 leading-relaxed text-sm mb-4 px-4">
                Di sini, kamu bisa mencoba fitur screening math anxiety, khususnya untuk anak berusia 10-12 tahun.
              </p>
              <div className="bg-nc-cream p-4 rounded-2xl border-2 border-nc-wood/10 text-xs text-gray-500 italic">
                Pemeriksaan singkat dan ringan untuk melihat apakah terdapat gambaran kecemasan seseorang saat menghadapi hal-hal terkait matematika.
              </div>
            </div>
          )}

           {step === 3 && (
            <div className="w-full animate-in slide-in-from-right-4 duration-300">
               <div className="bg-nc-sky/10 w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6 text-nc-sky border-4 border-nc-sky/20">
                <Gamepad2 size={56} />
              </div>
              <h2 className="text-2xl font-bold text-nc-sky mb-4">Game & Edukasi</h2>
              <p className="text-gray-600 leading-relaxed text-sm mb-4 px-4">
                NumeriCalm menyediakan game yang bikin latihan matematika terasa lebih menyenangkan dan tanpa rasa cemas!
              </p>
               <div className="bg-nc-sky/10 p-4 rounded-2xl border-2 border-nc-sky/20 text-xs text-nc-blue-dark">
                Temukan juga berbagai fitur seru lainnya yang bikin pengalamanmu dengan matematika jadi berbeda.
              </div>
            </div>
          )}

        </div>

        <div className="mt-8 pt-4">
          {step < 3 ? (
            <button 
              onClick={handleNext}
              className="w-full bg-nc-wood hover:bg-[#D05A2B] text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
            >
              Lanjut <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button 
              onClick={handleClose}
              className="w-full bg-nc-sky hover:bg-[#5D9CEC] text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Mulai Sekarang!
            </button>
          )}

          <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className={`h-2.5 rounded-full transition-all duration-300 ${step === i ? 'w-8 bg-nc-wood' : 'w-2.5 bg-gray-200'}`} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}