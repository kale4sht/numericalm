import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { User, Mail, Calendar, Edit2, Save, X, History, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Import Mascot
import mascotHappy from '../assets/mascot-happy.png';

export default function Profile() {
  const { user } = useAuth(); 
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  
  // Data Profil
  const [profile, setProfile] = useState({
    full_name: '',
    age: '',
    email: ''
  });

  // Data Riwayat Screening
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (user) {
      getProfile();
      getHistory();
    }
  }, [user]);

  // 1. Ambil Data Profil
  const getProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setProfile({
          full_name: data.full_name || '',
          age: data.age || '',
          email: user.email 
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Ambil Riwayat Screening
  const getHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('screening_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }); 

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  // 3. Update Profil
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          age: parseInt(profile.age)
        })
        .eq('id', user.id);

      if (error) throw error;
      toast.success('Profil berhasil diperbarui!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Gagal memperbarui profil.');
      console.error(error);
    } finally {
      setSaveLoading(false);
    }
  };

  // Helper untuk warna badge kategori (DIMODIFIKASI)
  const getCategoryColor = (cat) => {
    // Rendah = Oren Tua
    if (cat === 'Rendah') return 'bg-orange-600 text-white';
    
    // Sedang = Kuning
    if (cat === 'Sedang') return 'bg-nc-yellow text-nc-brown-dark';
    
    // Tinggi = Hijau
    if (cat === 'Tinggi') return 'bg-nc-grass text-white';
    
    return 'bg-gray-200 text-gray-800';
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-nc-wood" size={40} /></div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-[#FFE8D1] rounded-[40px] p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 text-center md:text-left w-full">
           <h1 className="text-4xl font-extrabold text-nc-wood mb-2">Halo, {profile.full_name || 'Teman!'} 👋</h1>
           <p className="text-nc-brown-card/80 text-lg">Bagaimana perasaanmu belajar matematika hari ini?</p>
        </div>
        
        {/* Mascot Decoration */}
        <img 
            src={mascotHappy} 
            alt="Mascot" 
            className="absolute -bottom-6 right-0 md:right-20 w-32 md:w-48 opacity-20 md:opacity-100 transform rotate-12 pointer-events-none" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI: Identitas Diri */}
        <div className="lg:col-span-1">
          <Card className="border-4 border-nc-sky/30 shadow-md h-full">
            <CardHeader className="bg-nc-sky/10 rounded-t-[28px] pb-6">
              <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center shadow-sm mb-4 border-4 border-white">
                <User size={48} className="text-nc-sky" />
              </div>
              <CardTitle className="text-center text-2xl text-nc-wood">Identitas Diri</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {isEditing ? (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-gray-500 ml-1">Nama Lengkap</label>
                    <input 
                      type="text" 
                      value={profile.full_name}
                      onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                      className="w-full p-3 rounded-xl border-2 border-nc-sky/30 focus:outline-none focus:border-nc-sky"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-500 ml-1">Umur</label>
                    <input 
                      type="number" 
                      value={profile.age}
                      onChange={(e) => setProfile({...profile, age: e.target.value})}
                      className="w-full p-3 rounded-xl border-2 border-nc-sky/30 focus:outline-none focus:border-nc-sky"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button type="submit" className="flex-1 bg-nc-sky hover:bg-nc-blue-dark" disabled={saveLoading}>
                      {saveLoading ? <Loader2 className="animate-spin" /> : <><Save size={18} className="mr-2"/> Simpan</>}
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => setIsEditing(false)} className="px-3">
                      <X size={20} />
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl">
                    <div className="bg-white p-2 rounded-full shadow-sm text-nc-wood"><User size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Nama</p>
                      <p className="font-bold text-gray-800 text-lg">{profile.full_name || '-'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl">
                    <div className="bg-white p-2 rounded-full shadow-sm text-nc-wood"><Calendar size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Umur</p>
                      <p className="font-bold text-gray-800 text-lg">{profile.age ? `${profile.age} Tahun` : '-'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl">
                    <div className="bg-white p-2 rounded-full shadow-sm text-nc-wood"><Mail size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Email</p>
                      <p className="font-bold text-gray-800 break-all">{profile.email}</p>
                    </div>
                  </div>

                  <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full border-nc-wood text-nc-wood hover:bg-nc-wood hover:text-white">
                    <Edit2 size={16} className="mr-2" /> Edit Profil
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* KOLOM KANAN: Riwayat Aktivitas */}
        <div className="lg:col-span-2">
          <Card className="border-4 border-gray-100 shadow-sm h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b-2 border-gray-100">
              <CardTitle className="flex items-center gap-2 text-xl text-gray-700">
                <History className="text-nc-wood" /> Riwayat Screening
              </CardTitle>
              <span className="text-sm font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                Total: {history.length}
              </span>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center p-6 text-gray-400">
                  <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <History size={40} />
                  </div>
                  <p className="mb-4">Kamu belum pernah melakukan screening.</p>
                </div>
              ) : (
                <div className="overflow-y-auto max-h-[500px] p-6 space-y-4">
                  {history.map((item) => (
                    <div key={item.id} className="group bg-white border-2 border-gray-100 hover:border-nc-sky rounded-2xl p-4 transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm hover:shadow-md">
                       <div>
                          <p className="text-xs text-gray-400 font-bold mb-1">
                            {new Date(item.created_at).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                          <p className="text-lg font-bold text-gray-800">Skor Kecemasan: {item.total_score}</p>
                       </div>
                       
                       <div className="flex items-center gap-3 w-full sm:w-auto">
                          <span className={`px-4 py-2 rounded-xl text-sm font-bold flex-1 sm:flex-none text-center ${getCategoryColor(item.category)}`}>
                            {item.category}
                          </span>
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}