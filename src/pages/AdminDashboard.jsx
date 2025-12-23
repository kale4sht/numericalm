import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  async function fetchResults() {
    try {
      // MODIFIKASI: Pastikan relasi 'profiles' terpanggil dengan benar
      // Jika foreign key di tabel screening_results bernama 'user_id', supabase biasanya otomatis mendeteksi
      const { data, error } = await supabase
        .from('screening_results')
        .select(`
          *,
          profiles (
            email,
            full_name,
            age
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResults(data);
      calculateStats(data);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  }

  const calculateStats = (data) => {
    const counts = { Rendah: 0, Sedang: 0, Tinggi: 0 };
    data.forEach(r => {
      // Handle jika kategori tidak sesuai case (misal 'rendah' vs 'Rendah')
      const cat = r.category ? (r.category.charAt(0).toUpperCase() + r.category.slice(1)) : 'Rendah';
      if (counts[cat] !== undefined) counts[cat]++;
    });
    
    const statsData = [
      { name: 'Rendah', count: counts.Rendah, color: '#7ED657' },
      { name: 'Sedang', count: counts.Sedang, color: '#F7E86A' },
      { name: 'Tinggi', count: counts.Tinggi, color: '#E67337' },
    ];
    setStats(statsData);
  };

  // Helper untuk mendapatkan nama tampilan
  const getDisplayName = (profile) => {
    if (!profile) return 'User Tidak Dikenal';
    if (profile.full_name) return profile.full_name;
    // Fallback: Ambil username dari email (misal: budi@gmail.com -> budi)
    if (profile.email) return profile.email.split('@')[0];
    return 'Tanpa Nama';
  };

  if (loading) return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="animate-spin text-nc-wood" size={40} /></div>;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-nc-wood text-center md:text-left">Admin Dashboard</h1>
      
      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
         {stats.map(stat => (
            <Card key={stat.name} className="border-2" style={{borderColor: stat.color}}>
               <CardContent className="p-6 flex items-center justify-between">
                  <div>
                     <p className="text-sm font-bold opacity-70">Kategori {stat.name}</p>
                     <p className="text-4xl font-extrabold" style={{color: stat.color}}>{stat.count}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full opacity-20" style={{backgroundColor: stat.color}}></div>
               </CardContent>
            </Card>
         ))}
      </div>

      {/* Grafik Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Statistik Kategori Kecemasan</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
              <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                {stats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabel Riwayat */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Submit Terbaru</CardTitle>
        </CardHeader>
        <CardContent className="p-0 md:p-6 pt-0">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm text-left min-w-[600px]">
              <thead className="text-xs text-nc-brown-dark uppercase bg-nc-cream/50 font-bold">
                <tr>
                  <th className="px-4 md:px-6 py-3 md:py-4 rounded-tl-xl">Tanggal</th>
                  <th className="px-4 md:px-6 py-3 md:py-4">Identitas Pengguna</th>
                  <th className="px-4 md:px-6 py-3 md:py-4">Skor Total</th>
                  <th className="px-4 md:px-6 py-3 md:py-4 rounded-tr-xl">Kategori</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.id} className="bg-white border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 md:px-6 py-3 md:py-4 font-medium">
                        {new Date(result.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                       {/* MODIFIKASI: Menggunakan helper function agar lebih aman */}
                       <div className="flex flex-col">
                          <span className="font-bold text-nc-wood text-base">
                              {getDisplayName(result.profiles)}
                          </span>
                          <span className="text-xs text-gray-500 mt-0.5">
                              {result.profiles?.age ? `${result.profiles.age} Tahun` : '-'} | {result.profiles?.email}
                          </span>
                       </div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 font-bold">{result.total_score}</td>
                    <td className="px-4 md:px-6 py-3 md:py-4">
                       <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap
                        ${result.category === 'Rendah' ? 'bg-nc-grass/20 text-nc-blue-dark' : 
                          result.category === 'Sedang' ? 'bg-nc-yellow/20 text-yellow-700' : 
                          'bg-nc-wood/20 text-nc-wood'}`}>
                        {result.category}
                      </span>
                    </td>
                  </tr>
                ))}
                 {results.length === 0 && (
                    <tr><td colSpan={4} className="text-center py-8 opacity-60">Belum ada data screening.</td></tr>
                 )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}