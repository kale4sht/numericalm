import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Brain, Smile, BookOpen, Users, Lightbulb, Heart } from 'lucide-react';
import mascotSemangat from '../assets/mascot-semagat1.png';

export default function Learn() {
  const tips = [
    { title: "Ubah Pikiran Negatif", desc: "Coba ubah pikiran negatif tentang matematika. Katakan pada diri sendiri, “Matematika itu bisa dipelajari.”" },
    { title: "Biasakan Bertanya", desc: "Biasakan bertanya kalau tidak mengerti. Nggak apa-apa tanya ke guru atau teman. Itu tandanya kamu mau belajar." },
    { title: "Berani Mencoba Hal Baru", desc: "Matematika penuh hal baru, jadi nggak apa-apa kalau belum langsung bisa." },
    { title: "Jangan Cuma Menghafal", desc: "Jangan cuma mengandalkan hafalan. Lebih baik pahami caranya, bukan cuma menghafal." },
    { title: "Cari Referensi Lain", desc: "Kalau bingung, coba baca buku atau modul lain. Kadang penjelasan berbeda bisa bikin kamu lebih paham." },
    { title: "Minta Bantuan", desc: "Minta bantuan kalau materi terasa susah. Kamu bisa tanya guru, kakak, atau orang tua." },
    { title: "Suasana Belajar Nyaman", desc: "Ciptakan suasana belajar yang nyaman. Cari tempat yang tenang, rapi, dan bikin kamu semangat." },
    { title: "Kalimat Positif", desc: "Kasih kalimat positif ke diri sendiri. Misalnya, “Aku bisa belajar matematika pelan-pelan.”" },
    { title: "Cara Belajar Cocok", desc: "Gunakan cara belajar yang cocok buat kamu. Ada yang suka coret-coret, ada yang suka pakai warna, ada yang suka latihan banyak soal." },
    { title: "Bertanggung Jawab", desc: "Bertanggung jawab atas usahamu. Kalau kamu belajar dengan baik, hasilnya juga bisa jadi lebih baik." },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-nc-wood mb-6">Belajar Yuk!</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Pahami apa itu kecemasan matematika dan temukan cara seru untuk mengatasinya agar belajar jadi lebih menyenangkan.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-8">
          <Card className="border-4 border-nc-sky/30 shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="bg-nc-sky/20 p-3 rounded-xl">
                <Brain size={32} className="text-nc-sky" />
              </div>
              <CardTitle className="text-3xl text-gray-800">Apa itu Kecemasan Matematika?</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-600 text-lg leading-relaxed">
              <p className= "text-justify">
                Kadang kalau kamu merasa tegang, takut atau bahkan jadi ngga mau mengerjakan soal matematika. Itu namanya Kecemasan Matematika. Perasaan ini bisa muncul waktu belajar di kelas, ngerjain PR di rumah atau bahkan ketemu matematika di kehidupan sehari-hari. Kamu yang mengalami Kecemasan Matematika biasanya jadi ingin menghindar atau ngga mau berhadapan dengan matematika, karena kamu merasa takut salah atau bingung.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-4 border-nc-wood/30 h-full">
              <CardHeader>
                <CardTitle className="text-xl text-nc-wood flex items-center gap-2">
                  <Users size={24} /> Kenapa Bisa Muncul?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-4">
                <p>
                  <strong>Dari Lingkungan:</strong> Suasana kelas yang terlalu tegang, cara guru mengajar yang bikin kamu takut salah, atau keadaan kelas yang bikin kamu susah fokus.
                </p>
                <p>
                  <strong>Dari Diri Sendiri:</strong> Kamu yang belum paham materinya, sering ngerasa takut saat ngerjain soal, atau kamu merasa dirimu ngga cukup pintar.
                </p>
                <p className="italic text-nc-wood/80">
                  Kadang pikiran seperti “aku ngga bisa” atau “aku pasti salah” ini bisa bikin kamu putus asa.
                </p>
              </CardContent>
            </Card>

            <Card className="border-4 border-nc-grass-dark/30 h-full">
              <CardHeader>
                <CardTitle className="text-xl text-nc-grass-dark flex items-center gap-2">
                  <Heart size={24} /> Dampaknya Apa?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-4">
                <p>
                  <strong>Tubuh Tidak Nyaman:</strong> Wajar kalau kamu merasa pusing, sakit perut, mual, atau jantung berdebar waktu lihat soal matematika.
                </p>
                <p className="text-sm bg-orange-50 p-3 rounded-lg border border-orange-100">
                  Para peneliti menemukan bahwa saat seseorang merasa cemas dengan matematika, bagian otak yang biasanya merasakan sakit tubuh juga bisa ikut aktif.
                </p>
                <p>
                  <strong>Nilai Belajar:</strong> Anak yang punya kecemasan matematika tinggi biasanya jadi kurang fokus, cepat panik, cepat lupa materi, dan akhirnya nilainya jadi rendah.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col justify-center">
           <div className="bg-[#FFE8D1] rounded-[40px] p-8 text-center relative overflow-hidden">
              <h3 className="text-2xl font-bold text-nc-brown-card mb-4">Kamu Bisa!</h3>
              <p className="text-nc-brown-card/80 mb-6">Jangan biarkan rasa cemas menghalangimu. Mulai perlahan dan percaya diri.</p>
              
              {/* --- 2. GUNAKAN VARIABEL IMPORT DI SINI --- */}
              <img 
                src={mascotSemangat} 
                alt="Mascot Semangat" 
                className="w-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-300" 
              />
           </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex items-center gap-4 mb-8">
            <div className="bg-nc-grass p-3 rounded-2xl shadow-sm transform -rotate-3">
              <Smile size={40} className="text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800">10 Tips Belajar Lebih Tenang</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {tips.map((tip, idx) => (
            <div key={idx} className="group flex gap-5 items-start bg-white p-6 rounded-3xl shadow-sm border-2 border-gray-100 hover:border-nc-grass hover:shadow-md transition-all duration-300">
              <div className="bg-nc-grass text-white font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-lg shadow-sm group-hover:scale-110 transition-transform">
                {idx + 1}
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-nc-wood transition-colors">{tip.title}</h4>
                <p className="text-gray-600 leading-relaxed">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 p-8 bg-gray-50 rounded-[30px] border-2 border-gray-200">
        <div className="flex items-center gap-3 mb-4 opacity-70">
            <BookOpen size={20} />
            <h3 className="font-bold text-lg uppercase tracking-wider">Referensi Ilmiah</h3>
        </div>
        <ul className="space-y-3 text-sm text-gray-500 list-disc pl-5">
            <li>Anita, I. W. (2014). Pengaruh Kecemasan Matematika (Mathematics Anxiety) terhadap Kemampuan Koneksi Matematis Siswa SMP. Infinity Journal, 3(1), 125-132</li>
            <li>Lyons, I. M., & Beilock, S. L. (2012). When Math Hurts: Math Anxiety Predicts Pain Network Activation In Anticipation Of Doing Math. PloS one, 7(10), e48076.</li>
            <li>Milena, P. C., Nugraheni, P., & Yuzianah, D. (2022). Analisis Faktor Penyebab Kecemasan Belajar Matematika Pada Siswa SMA Ditinjau dari Hasil Belajar. Pythagoras: Jurnal Program Studi Pendidikan Matematika, 11(2), 133–140.</li>
            <li>Mulyana, A., Senajaya, A. J., & Ismunandar, D. (2021). Indikator-indikator kecemasan belajar matematika daring di era pandemik covid-19 menurut perspektif siswa sma kelas x. Proximal: Jurnal Penelitian Matematika Dan Pendidikan Matematika, 4(1), 14–22.</li>
            <li>Vahedi, S., & Farrokhi, F. (2011). A confirmatory factor analysis of the structure of abbreviated math anxiety scale. Iranian Journal of Psychiatry, 6(2), 47.</li>
            <li>Gleason, J. (2008). Relationships between pre-service elementary teachers' mathematics anxiety and content knowledge for teaching. Journal of Mathematical Sciences & Mathematics Education, 3(1), 39-47</li>
        </ul>
      </div>
    </div>
  );
}