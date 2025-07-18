import React from "react";

interface TutorialStep {
  title: string;
  desc: string;
}

const STEPS: TutorialStep[] = [
  { title: "1. Daftar & Login", desc: "Buat akun HendraAI gratis, lalu login ke dashboard." },
  { title: "2. Isi Data Bisnis", desc: "Masukkan nama bisnis, jenis usaha, dan preferensi style branding Anda." },
  { title: "3. Generate Logo & Brand", desc: "Klik Generate untuk mendapatkan logo, palet warna, dan identitas brand secara otomatis." },
  { title: "4. Edit & Kustomisasi", desc: "Gunakan drag & drop editor untuk mengatur logo dan identitas brand sesuai keinginan." },
  { title: "5. Download & Terapkan", desc: "Download hasil branding dan gunakan untuk bisnis Anda di media sosial, kemasan, dan lainnya." }
];

const Tutorial = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 px-4 flex flex-col items-center">
    <h1 className="text-3xl font-bold text-blue-700 mb-8">Tutorial Penggunaan HendraAI</h1>
    <div className="w-full max-w-2xl space-y-6">
      {STEPS.map((item, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md p-6 flex gap-4 items-start">
          <div className="text-2xl font-bold text-blue-600 min-w-[40px]">{item.title}</div>
          <div className="text-gray-700 mt-1">{item.desc}</div>
        </div>
      ))}
    </div>
    <div className="mt-8 text-gray-500 text-sm">Butuh bantuan lebih lanjut? Hubungi support@hendraai.id</div>
  </div>
);

export default Tutorial; 