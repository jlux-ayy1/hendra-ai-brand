import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SloganForm {
  nama: string;
  industri: string;
}

const DUMMY_SLOGANS = [
  "Solusi Modern untuk Bisnis Anda",
  "Meningkatkan Brand, Meningkatkan Omzet",
  "Brand Kuat, Bisnis Hebat",
  "Pilihan Tepat untuk UMKM",
  "Bersama Membangun Identitas Bisnis"
];

const SloganGenerator = () => {
  const [form, setForm] = useState<SloganForm>({ nama: "", industri: "" });
  const [generated, setGenerated] = useState(false);
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
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Slogan Generator</h1>
      <form onSubmit={handleGenerate} className="bg-white rounded-xl shadow-lg p-8 mb-8 w-full max-w-lg flex flex-col gap-4">
        <input name="nama" value={form.nama} onChange={handleChange} placeholder="Nama Bisnis" className="border px-4 py-2 rounded-lg" required />
        <input name="industri" value={form.industri} onChange={handleChange} placeholder="Industri" className="border px-4 py-2 rounded-lg" required />
        <button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg mt-2">Generate Slogan</button>
      </form>
      {generated && (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-8 flex flex-col gap-4">
          <h2 className="font-bold mb-2 text-blue-700">Hasil Slogan untuk {form.nama} ({form.industri}):</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            {DUMMY_SLOGANS.map((slogan, i) => (
              <li key={i} className="italic">"{slogan}"</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SloganGenerator; 