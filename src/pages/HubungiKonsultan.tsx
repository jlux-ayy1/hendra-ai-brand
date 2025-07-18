import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Testimoni {
  nama: string;
  komentar: string;
}

interface Konsultan {
  nama: string;
  jabatan: string;
  foto: string;
  pengalaman: string;
  rating: number;
  testimoni: Testimoni[];
}

const KONSULTAN: Konsultan = {
  nama: "Hendra Pratama, S.MB.",
  jabatan: "Brand Consultant & AI Specialist",
  foto: "/konsultan-hendra.png",
  pengalaman: "10+ tahun membantu UMKM naik kelas",
  rating: 4.9,
  testimoni: [
    {
      nama: "Rina, Owner Kopi Mantap",
      komentar: "Konsultasi dengan Pak Hendra sangat membantu! Brand saya jadi lebih profesional dan omzet naik."
    },
    {
      nama: "Agus, Pemilik Laundry Kilat",
      komentar: "Solusi brandingnya praktis dan mudah dipahami. Sangat direkomendasikan untuk UMKM!"
    }
  ]
};

const WHATSAPP_LINK = "https://wa.me/6281234567890?text=Halo%20Kak%20Hendra,%20saya%20ingin%20konsultasi%20branding%20UMKM";

const HubungiKonsultan = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl flex items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-700 hover:text-blue-900 px-2 py-1 rounded transition"
          aria-label="Kembali"
        >
          <ArrowLeft className="h-6 w-6 mr-1" />
          <span className="hidden md:inline font-medium">Kembali</span>
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl flex flex-col items-center">
        <img src={KONSULTAN.foto} alt="Konsultan" className="w-28 h-28 rounded-full mb-4 border-4 border-blue-200 object-cover" />
        <h1 className="text-2xl font-bold text-blue-700 mb-1">{KONSULTAN.nama}</h1>
        <div className="text-gray-600 mb-2">{KONSULTAN.jabatan}</div>
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-5 w-5 text-yellow-400" />
          <span className="font-semibold text-yellow-600">{KONSULTAN.rating}</span>
          <span className="text-gray-500">/ 5.0</span>
        </div>
        <div className="mb-4 text-center text-gray-700">{KONSULTAN.pengalaman}</div>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg transition-all duration-200 flex items-center gap-2">
            <MessageCircle className="h-5 w-5" /> Chat Konsultan via WhatsApp
          </Button>
        </a>
        <div className="mt-8 w-full">
          <h2 className="text-lg font-bold text-blue-700 mb-3">Testimoni Klien</h2>
          <div className="space-y-4">
            {KONSULTAN.testimoni.map((t, i) => (
              <div key={i} className="bg-blue-50 rounded-lg p-4 shadow flex flex-col">
                <div className="text-gray-700 italic mb-1">"{t.komentar}"</div>
                <div className="text-sm text-blue-800 font-semibold">- {t.nama}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          Ingin konsultasi lebih lanjut? Hubungi admin di <a href="mailto:support@hendraai.com" className="text-blue-600 underline">support@hendraai.com</a>
        </div>
      </div>
    </div>
  );
};

export default HubungiKonsultan; 