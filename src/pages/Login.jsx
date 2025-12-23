import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient'; 
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { toast } from 'sonner';
import mascotJump from '../assets/mascot-jump.png';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  
  // State Input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        // --- PROSES DAFTAR (SIGN UP) ---
        
        // 1. Buat user auth baru & Kirim Metadata
        // Data 'full_name' dan 'age' akan otomatis ditangkap oleh Trigger SQL
        const { data, error } = await signUp({ 
          email, 
          password,
          options: {
            data: {
              full_name: fullName,
              age: parseInt(age)
            }
          }
        });
        
        if (error) throw error;

        // CATATAN: Langkah update manual dihapus karena sudah ditangani otomatis oleh Database Trigger.
        
        toast.success('Pendaftaran berhasil! Silakan masuk.');
        setIsSignUp(false); // Kembali ke mode login
        
      } else {
        // --- PROSES MASUK (LOGIN) ---
        const { data: { user }, error } = await signIn({ email, password });
        if (error) throw error;

        // --- Cek Role Admin ---
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        toast.success('Berhasil masuk!');
        
        if (profile?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      toast.error(error.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-8">
      <Card className="w-full max-w-md border-nc-sky/30">
        <CardHeader className="text-center">
          <img src={mascotJump} alt="Mascot" className="h-35 mx-auto mb-0.5" />
          
          <CardTitle className="text-3xl text-nc-sky">{isSignUp ? 'Buat Akun Baru' : 'Masuk'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Input Nama dan Umur (Hanya Muncul Saat Daftar) */}
            {isSignUp && (
              <>
                <div>
                  <label className="block text-sm font-bold text-nc-brown-dark mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-nc-sky focus:outline-none transition"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-nc-brown-dark mb-1">Umur (Tahun)</label>
                  <input
                    type="number"
                    required
                    placeholder="Contoh: 12"
                    min="5"
                    max="100"
                    className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-nc-sky focus:outline-none transition"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-bold text-nc-brown-dark mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-nc-sky focus:outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-nc-brown-dark mb-1">Password</label>
              <input
                type="password"
                required
                minLength={6}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-nc-sky focus:outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <Button type="submit" className="w-full bg-nc-sky hover:bg-nc-blue-dark" disabled={loading}>
              {loading ? 'Memproses...' : (isSignUp ? 'Daftar Sekarang' : 'Masuk')}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <p className="text-nc-brown-dark">
              {isSignUp ? 'Sudah punya akun?' : 'Belum punya akun?'}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-2 font-bold text-nc-sky hover:underline"
              >
                {isSignUp ? 'Masuk disini' : 'Daftar akun baru'}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}