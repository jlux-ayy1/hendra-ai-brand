import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const dummyLogos = [
  '/logo1.png', '/logo2.png', '/logo3.png'
];
const dummyPalettes = [
  ['#1E40AF', '#6366F1', '#F472B6'],
  ['#F59E42', '#F7C873', '#F6F1D5'],
  ['#10B981', '#FBBF24', '#F87171']
];
const dummyFonts = [
  'Montserrat', 'Poppins', 'Roboto', 'Lato'
];

const BrandIdentity = () => {
  const [form, setForm] = useState({ nama: '', jenis: '', style: '' });
  const [generated, setGenerated] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState(0);
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [selectedFont, setSelectedFont] = useState(0);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleGenerate = e => {
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
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Brand Identity</h1>
      <form onSubmit={handleGenerate} className="bg-white rounded-xl shadow-lg p-8 mb-8 w-full max-w-lg flex flex-col gap-4">
        <input name="nama" value={form.nama} onChange={handleChange} placeholder="Nama Bisnis" className="border px-4 py-2 rounded-lg" required />
        <input name="jenis" value={form.jenis} onChange={handleChange} placeholder="Jenis Usaha" className="border px-4 py-2 rounded-lg" required />
        <input name="style" value={form.style} onChange={handleChange} placeholder="Preferensi Style (misal: modern, minimalis)" className="border px-4 py-2 rounded-lg" required />
        <button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg mt-2">Generate Brand Identity</button>
      </form>
      {generated && (
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h2 className="font-bold mb-2">Logo Preview</h2>
            <div className="flex gap-3 mb-4">
              {dummyLogos.map((logo, i) => (
                <img key={i} src={logo} alt="logo" className={`h-20 w-20 border-2 rounded-lg cursor-pointer ${selectedLogo === i ? 'border-blue-600' : 'border-gray-200'}`} onClick={() => setSelectedLogo(i)} />
              ))}
            </div>
            <h2 className="font-bold mb-2">Palet Warna</h2>
            <div className="flex gap-2 mb-4">
              {dummyPalettes.map((palette, i) => (
                <div key={i} className="flex gap-1 cursor-pointer" onClick={() => setSelectedPalette(i)}>
                  {palette.map((color, j) => (
                    <div key={j} className={`h-6 w-6 rounded-full border-2 ${selectedPalette === i ? 'border-blue-600' : 'border-gray-200'}`} style={{ background: color }} />
                  ))}
                </div>
              ))}
            </div>
            <h2 className="font-bold mb-2">Tipografi</h2>
            <div className="flex gap-2 mb-4">
              {dummyFonts.map((font, i) => (
                <div key={i} className={`px-4 py-2 rounded-lg border-2 cursor-pointer ${selectedFont === i ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`} style={{ fontFamily: font }} onClick={() => setSelectedFont(i)}>{font}</div>
              ))}
            </div>
            <div className="mb-2"><span className="font-semibold">Nama Brand:</span> {form.nama}</div>
            <div className="mb-2"><span className="font-semibold">Jenis Usaha:</span> {form.jenis}</div>
            <div className="mb-2"><span className="font-semibold">Style:</span> {form.style}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandIdentity; 