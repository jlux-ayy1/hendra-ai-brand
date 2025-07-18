import { useState, useEffect } from "react";
import { Palette, Sparkles, Brush, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "@/components/ui/sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BrandForm {
  nama: string;
  jenis: string;
  style: string;
}

const DUMMY_LOGOS = [
  "/logo1.png", "/logo2.png", "/logo3.png"
];
const DUMMY_PALETTES = [
  ["#1E40AF", "#6366F1", "#F472B6"],
  ["#F59E42", "#F7C873", "#F6F1D5"],
  ["#10B981", "#FBBF24", "#F87171"]
];

const Generator = () => {
  const [form, setForm] = useState<BrandForm>({ nama: "", jenis: "", style: "" });
  const [generated, setGenerated] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState(0);
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [generateCount, setGenerateCount] = useState(0);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dirty, setDirty] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setDirty(true);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (generateCount >= 3) {
      setShowSubscribe(true);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
      setGenerateCount((prev) => prev + 1);
      toast.success("Brand berhasil digenerate!");
      setDirty(false);
    }, 1200);
  };

  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [dirty]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center py-10">
        <Toaster />
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
        <h1 className="text-3xl font-bold text-blue-700 mb-2 flex items-center">
          <Sparkles className="mr-2" />AI Brand Generator
        </h1>
        <p className="mb-8 text-gray-600 text-center max-w-xl">
          Dapatkan logo profesional, palet warna, dan identitas brand lengkap untuk bisnis Anda dengan AI canggih + drag & drop editor yang mudah digunakan.
        </p>
        <form onSubmit={handleGenerate} className="bg-white rounded-xl shadow-lg p-8 mb-8 w-full max-w-lg flex flex-col gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <input name="nama" value={form.nama} onChange={handleChange} placeholder="Nama Bisnis" className="border px-4 py-2 rounded-lg" required />
            </TooltipTrigger>
            <TooltipContent>Nama brand/bisnis Anda</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <input name="jenis" value={form.jenis} onChange={handleChange} placeholder="Jenis Usaha" className="border px-4 py-2 rounded-lg" required />
            </TooltipTrigger>
            <TooltipContent>Jenis usaha (misal: kopi, laundry, dsb)</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <input name="style" value={form.style} onChange={handleChange} placeholder="Preferensi Style (misal: modern, minimalis)" className="border px-4 py-2 rounded-lg" required />
            </TooltipTrigger>
            <TooltipContent>Style visual brand (misal: modern, minimalis, klasik)</TooltipContent>
          </Tooltip>
          <button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg mt-2 transition-all duration-200 transform hover:scale-105 active:scale-95">
            {loading ? <span className="loader mr-2"></span> : null} Generate
          </button>
          <div className="text-xs text-gray-400 mt-2">Sisa percobaan gratis: {3 - generateCount > 0 ? 3 - generateCount : 0}</div>
        </form>
        {showSubscribe && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center">
              <h2 className="text-xl font-bold text-blue-700 mb-2">Batas Percobaan Gratis Tercapai</h2>
              <p className="text-gray-600 mb-4 text-center">Anda telah menggunakan 3x percobaan gratis. Silakan berlangganan untuk menggunakan fitur AI Brand Generator tanpa batas!</p>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-2 px-6 rounded-lg mb-2" onClick={() => navigate('/checkout?plan=pro')}>Langganan Sekarang</button>
              <button className="text-blue-700 hover:underline text-sm" onClick={() => setShowSubscribe(false)}>Kembali</button>
            </div>
          </div>
        )}
        {generated && (
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8 flex flex-col md:flex-row gap-8 transition-all duration-200 hover:shadow-2xl">
            <div className="flex-1">
              <h2 className="font-bold mb-2 flex items-center"><Brush className="mr-2" />Logo Preview</h2>
              <div className="flex gap-3 mb-4">
                {DUMMY_LOGOS.map((logo, i) => (
                  <img key={i} src={logo} alt="logo" className={`h-20 w-20 border-2 rounded-lg cursor-pointer ${selectedLogo === i ? 'border-blue-600' : 'border-gray-200'}`} onClick={() => setSelectedLogo(i)} />
                ))}
              </div>
              <h2 className="font-bold mb-2 flex items-center"><Palette className="mr-2" />Palet Warna</h2>
              <div className="flex gap-2 mb-4">
                {DUMMY_PALETTES.map((palette, i) => (
                  <div key={i} className="flex gap-1 cursor-pointer" onClick={() => setSelectedPalette(i)}>
                    {palette.map((color, j) => (
                      <div key={j} className={`h-6 w-6 rounded-full border-2 ${selectedPalette === i ? 'border-blue-600' : 'border-gray-200'}`} style={{ background: color }} />
                    ))}
                  </div>
                ))}
              </div>
              <div className="mb-2"><span className="font-semibold">Nama Brand:</span> {form.nama}</div>
              <div className="mb-2"><span className="font-semibold">Jenis Usaha:</span> {form.jenis}</div>
              <div className="mb-2"><span className="font-semibold">Style:</span> {form.style}</div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <h2 className="font-bold mb-2">Drag & Drop Editor (Demo)</h2>
              <div className="h-40 w-full border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 bg-gray-50 cursor-move select-none transition-all duration-200 hover:border-blue-400">
                Editor Area (Demo) - Drag & Drop
              </div>
              <p className="text-xs text-gray-400 mt-2">Fitur drag & drop editor akan tersedia di versi penuh.</p>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default Generator; 