import React from 'react';
import { cn } from '../../lib/utils';

// 1. Komponen Utama Card: Wrapper dengan border tebal dan shadow untuk efek "kartu"
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // cn(...) menggabungkan style dasar (rounded, border wood, shadow) dengan class tambahan
    className={cn("rounded-3xl border-4 border-nc-wood/20 bg-white shadow-xl", className)}
    {...props}
  />
));
Card.displayName = "Card";

// 2. CardHeader: Kontainer untuk bagian judul (padding rata)
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

// 3. CardTitle: Styling teks judul (font tebal, warna coklat gelap khusus tema)
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-2xl font-bold leading-none tracking-tight text-nc-brown-dark", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

// 4. CardContent: Area isi konten (padding atas 0 agar tidak terlalu jauh dari header)
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };