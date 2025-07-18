import React from "react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "Apa itu HendraAI?",
    a: "HendraAI adalah platform AI untuk branding, pembuatan logo, identitas bisnis, dan brand guidelines modern khusus UMKM Indonesia."
  },
  {
    q: "Apakah hasil logo dan identitas brand bisa digunakan untuk bisnis saya?",
    a: "Tentu! Semua hasil dari HendraAI bisa digunakan untuk kebutuhan branding bisnis Anda, baik online maupun offline."
  },
  {
    q: "Bagaimana cara menggunakan fitur gratis?",
    a: "Anda bisa mencoba AI Brand Generator gratis hingga 3 kali. Setelah itu, Anda perlu berlangganan untuk akses penuh."
  },
  {
    q: "Bagaimana cara pembayaran langganan?",
    a: "Pembayaran bisa dilakukan melalui transfer bank, e-wallet, atau kartu kredit."
  },
  {
    q: "Apakah ada support jika saya mengalami kendala?",
    a: "Ya, tim support kami siap membantu Anda melalui email atau live chat WhatsApp."
  }
];

const FAQ = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 px-4 flex flex-col items-center">
    <h1 className="text-3xl font-bold text-blue-700 mb-8">FAQ - Pertanyaan Umum</h1>
    <div className="w-full max-w-2xl space-y-6">
      {FAQS.map((item, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md p-6">
          <div className="font-semibold text-blue-700 mb-2">{item.q}</div>
          <div className="text-gray-700">{item.a}</div>
        </div>
      ))}
    </div>
  </div>
);

export default FAQ; 