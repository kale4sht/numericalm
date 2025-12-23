import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { screeningQuestions, calculateCategory } from '../lib/utils';
import { toast } from 'sonner';

export default function Screening() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleOptionChange = (questionIndex, value) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: value }));
  };

  const calculateTotalScore = () => {
    return Object.values(answers).reduce((sum, val) => sum + val, 0);
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < screeningQuestions.length) {
      toast.error('Mohon isi semua pertanyaan sebelum melanjutkan.');
      return;
    }

    setSubmitting(true);
    const totalScore = calculateTotalScore();
    const category = calculateCategory(totalScore);

    try {
      const payload = {
        total_score: totalScore,
        category: category,
        answers: answers,
        user_id: user ? user.id : null 
      };

      const { error } = await supabase.from('screening_results').insert([payload]);

      if (error) throw error;
      
      navigate('/screening/result', { state: { score: totalScore, category } });
    } catch (error) {
      toast.error('Gagal menyimpan hasil: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const options = [
    { label: 'Setuju', value: 3 },
    { label: 'Ragu-Ragu', value: 2 },
    { label: 'Tidak Setuju', value: 1 },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-nc-brown-card mb-4">Screening Kecemasan</h1>
        <p className="text-lg md:text-xl text-gray-600">Jawablah pertanyaan berikut sesuai kondisi Anda.</p>
      </div>

      <div className="bg-white rounded-[32px] md:rounded-[40px] border-4 border-[#FDE5D2] p-6 md:p-12 shadow-xl">
        {screeningQuestions.map((question, index) => (
          <div key={index} className="mb-8 md:mb-10 last:mb-0">
            <p className="font-bold text-lg md:text-xl text-gray-800 mb-4 md:mb-6">{index + 1}. {question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              {options.map((option) => (
                <label 
                  key={option.value} 
                  className={`
                    cursor-pointer rounded-2xl py-3 md:py-4 px-4 md:px-6 text-center font-bold text-base md:text-lg transition-all border-2
                    ${answers[index] === option.value 
                      ? 'bg-nc-grass text-white border-nc-grass shadow-lg transform -translate-y-1' 
                      : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-nc-grass hover:bg-nc-grass/5'}
                  `}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option.value}
                    onChange={() => handleOptionChange(index, option.value)}
                    className="hidden"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-6 md:pt-8 mt-6 md:mt-8 border-t-4 border-[#FDE5D2]">
          <button 
            onClick={handleSubmit} 
            disabled={submitting}
            className="w-full bg-nc-wood hover:bg-[#D05A2B] text-white font-bold text-xl md:text-2xl py-3 md:py-4 rounded-full shadow-lg transition-all transform active:scale-95 disabled:opacity-70"
          >
            {submitting ? 'Memproses...' : 'Lihat Hasil'}
          </button>
        </div>
      </div>
    </div>
  );
}