import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BrandGuidelineForm {
  nama: string;
}

const DUMMY_LOGOS = ["/logo1.png", "/logo2.png", "/logo3.png"];
const DUMMY_PALETTES = [
  ["#1E40AF", "#6366F1", "#F472B6"],
  ["#F59E42", "#F7C873", "#F6F1D5"],
  ["#10B981", "#FBBF24", "#F87171"]
];

const BrandGuidelines = () => {
  const [form, setForm] = useState<BrandGuidelineForm>({ nama: "" });
  const [generated, setGenerated] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState(0);
  const [selectedPalette, setSelectedPalette] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerated(true);
  };

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
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Brand Guidelines</h1>
      <form onSubmit={handleGenerate} className="bg-white rounded-xl shadow-lg p-8 mb-8 w-full max-w-lg flex flex-col gap-4">
        <input name="nama" value={form.nama} onChange={handleChange} placeholder="Nama Bisnis" className="border px-4 py-2 rounded-lg" required />
        <button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg mt-2">Generate Brand Guidelines</button>
      </form>
      {generated && (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-8 flex flex-col gap-4">
          <h2 className="font-bold mb-2 text-blue-700">Guideline untuk {form.nama}</h2>
          <div className="mb-4">
            <div className="font-semibold mb-1">Logo</div>
            <div className="flex gap-3 mb-2">
              {DUMMY_LOGOS.map((logo, i) => (
                <img key={i} src={logo} alt="logo" className={`h-16 w-16 border-2 rounded-lg cursor-pointer ${selectedLogo === i ? 'border-blue-600' : 'border-gray-200'}`} onClick={() => setSelectedLogo(i)} />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-1">Palet Warna</div>
            <div className="flex gap-2 mb-2">
              {DUMMY_PALETTES.map((palette, i) => (
                <div key={i} className="flex gap-1 cursor-pointer" onClick={() => setSelectedPalette(i)}>
                  {palette.map((color, j) => (
                    <div key={j} className={`h-6 w-6 rounded-full border-2 ${selectedPalette === i ? 'border-blue-600' : 'border-gray-200'}`} style={{ background: color }} />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mb-2"><span className="font-semibold">Aturan Penggunaan Logo:</span> Logo digunakan dengan background terang/gelap, jangan diubah warna/aspek rasio.</div>
          <div className="mb-2"><span className="font-semibold">Aturan Warna:</span> Gunakan palet warna utama untuk media digital & cetak.</div>
          <div className="mb-2"><span className="font-semibold">File Siap Pakai:</span> Download logo & guideline untuk kebutuhan branding.</div>
        </div>
      )}
    </div>
  );
};

export default BrandGuidelines; 