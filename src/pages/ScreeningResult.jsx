import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import mascotHappy from '../assets/mascot-happy1 (1).png';
import mascotSad from '../assets/mascot-sad.png';
import mascotCry from '../assets/mascot-cry.png';

export default function ScreeningResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const [resultData, setResultData] = useState(null);

  // Efek untuk menangani penyimpanan data saat refresh (Restart browser)
  useEffect(() => {
    if (location.state && location.state.score !== undefined) {
      // Jika ada data dari navigasi (baru selesai screening), simpan ke state & localStorage
      setResultData(location.state);
      localStorage.setItem('lastScreeningResult', JSON.stringify(location.state));
    } else {
      // Jika tidak ada data navigasi (user melakukan refresh), ambil dari localStorage
      const saved = localStorage.getItem('lastScreeningResult');
      if (saved) {
        setResultData(JSON.parse(saved));
      } else {
        // Jika tidak ada data sama sekali, kembalikan ke halaman screening
        navigate('/screening');
      }
    }
  }, [location, navigate]);

  // Tampilkan loading sementara jika data belum siap
  if (!resultData) return null;

  const { score, category } = resultData;
  
  let mascotImage;
  let bgColor;
  let textColor;
  let borderColor; // Tambahan variabel untuk border agar lebih rapi

  // --- LOGIKA MODIFIKASI WARNA & MASKOT ---
  if (category === "Tinggi") {
    // Kategori Tinggi: Maskot Menangis & Warna Oren Tua
    mascotImage = mascotCry;
    bgColor = "bg-orange-100";
    textColor = "text-orange-700"; 
    borderColor = "border-orange-200";
  } else if (category === "Sedang") {
    // Kategori Sedang: Maskot Sedih & Warna Kuning
    mascotImage = mascotSad;
    bgColor = "bg-nc-yellow";
    textColor = "text-yellow-700";
    borderColor = "border-yellow-200";
  } else {
    // Kategori Rendah (else): Maskot Senang & Warna Hijau
    mascotImage = mascotHappy;
    bgColor = "bg-nc-grass";
    textColor = "text-nc-grass-dark";
    borderColor = "border-green-200";
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center">
      
      {/* Gambar Maskot */}
      <img 
        src={mascotImage} 
        alt={`Mascot ${category}`} 
        className="h-48 mx-auto mb-8 drop-shadow-xl hover:scale-105 transition-transform" 
      />
      
      {/* Card Utama */}
      <Card className={`border-4 ${bgColor.replace('bg-', 'border-')}/30`}>
        <CardHeader>
          <CardTitle className="text-4xl">Hasil Screening Anda</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Badge Skor & Kategori */}
          <div className={`${bgColor} bg-opacity-20 p-8 rounded-[30px] inline-block mx-auto`}>
             <h2 className={`text-5xl font-extrabold ${textColor} mb-2`}>{category}</h2>
             <p className="text-xl font-bold opacity-80">Skor: {score}</p>
          </div>

          {/* Keterangan Range Skor */}
          <div className="text-left bg-white p-6 rounded-2xl text-sm text-gray-600 space-y-2 border-2 border-gray-100">
            <p><strong>Keterangan Skor:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Rendah: Skor 12 - 19</li>
              <li>Sedang: Skor 20 - 27</li>
              <li>Tinggi: Skor 28 - 36</li>
            </ul>
            <p className="mt-4 text-xs italic">Range skor: 12-36. Mean=24, SD=4</p>
          </div>

           {/* Catatan Penting */}
           <div className="bg-nc-sky/10 p-6 rounded-2xl text-sm text-nc-brown-dark border-2 border-nc-sky/20">
            <p className="font-bold mb-2">Catatan Penting:</p>
            <p>Hasil screening tidak dapat menggantikan penilaian profesional dari tenaga ahli. Jika Anda membutuhkan penanganan lebih lanjut, kami selalu menyarankan untuk berkonsultasi dengan profesional.</p>
          </div>
          
          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link to="/learn">
              <Button size="lg" className="w-full sm:w-auto bg-nc-sky hover:bg-nc-blue-dark">Baca Tips Belajar</Button>
            </Link>
             <Link to="/">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">Kembali ke Beranda</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}