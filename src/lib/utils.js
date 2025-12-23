import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const screeningQuestions = [
  "Saya merasakan sakit kepala ketika pelajaran matematika",
  "Nafsu makan saya menurun ketika akan menghadapi tes matematika",
  "Saya merasa lemas ketika mengingat ujian matematika",
  "Saya merasa takut saat mengikuti pelajaran matematika",
  "Saya merasa gugup ketika mengerjakan tugas matematika",
  "Saya merasa pelajaran matematika memberikan banyak tekanan",
  "Tangan saya gemetar ketika mengerjakan soal-soal matematika",
  "Saya tidak dapat duduk dengan tenang ketika mengerjakan soal matematika.",
  "Saya sering menelan ludah ketika mendapat soal matematika",
  "Saya sulit mengingat materi pelajaran matematika",
  "Saya tidak dapat berpikir saat guru bertanya soal matematika.",
  "Saya sulit mengingat materi materi matematika yang sudah diajarkan"
];

export const calculateCategory = (score) => {
  if (score < 20) return "Rendah";
  if (score >= 20 && score < 28) return "Sedang";
  if (score >= 28) return "Tinggi";
  return "Tidak Diketahui";
};