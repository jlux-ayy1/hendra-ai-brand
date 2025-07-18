import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CheckCircle, Star, Rocket, Crown, CreditCard, Banknote, Wallet, ArrowLeft } from "lucide-react";
import { Toaster, toast } from "@/components/ui/sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect } from "react";

const plans = {
  starter: {
    name: "Starter",
    price: "99,000",
    period: "sekali bayar",
    description: "Cocok untuk bisnis baru",
    icon: <Star className="h-8 w-8 text-yellow-400" />, 
    features: [
      "5 variasi logo",
      "3 palet warna",
      "Basic slogan generator",
      "Format PNG/JPG",
      "1x revisi"
    ]
  },
  pro: {
    name: "Pro",
    price: "249,000",
    period: "sekali bayar",
    description: "Paling populer untuk UMKM",
    icon: <Rocket className="h-8 w-8 text-blue-500" />, 
    features: [
      "15 variasi logo",
      "10 palet warna",
      "Advanced slogan generator",
      "Semua format (PNG, JPG, SVG, PDF)",
      "Brand guideline lengkap",
      "Unlimited revisi",
      "Social media templates"
    ]
  },
  enterprise: {
    name: "Enterprise",
    price: "499,000",
    period: "sekali bayar",
    description: "Untuk bisnis yang berkembang",
    icon: <Crown className="h-8 w-8 text-purple-600" />, 
    features: [
      "Unlimited variasi logo",
      "Unlimited palet warna",
      "Premium slogan generator",
      "Semua format + vector files",
      "Brand guideline profesional",
      "Unlimited revisi",
      "Full marketing kit",
      "1-on-1 konsultasi brand"
    ]
  }
};

const paymentMethods = [
  { id: 'bank', label: 'Transfer Bank', icon: <Banknote className="h-5 w-5 mr-2 text-blue-700" /> },
  { id: 'ewallet', label: 'E-Wallet', icon: <Wallet className="h-5 w-5 mr-2 text-purple-600" /> },
  { id: 'credit', label: 'Kartu Kredit/Debit', icon: <CreditCard className="h-5 w-5 mr-2 text-green-600" /> },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Checkout = () => {
  const query = useQuery();
  const planId = query.get("plan");
  const plan = plans[planId] || null;

  const navigate = useNavigate();

  const [buyer, setBuyer] = useState<{ name: string; email: string; phone: string }>({ name: '', email: '', phone: '' });
  const [payment, setPayment] = useState('');
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; phone?: boolean }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dirty, setDirty] = useState(false);

  const banks = [
    { id: 'bca', name: 'BCA', account: '1234567890', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Bank_Central_Asia_logo.svg' },
    { id: 'bri', name: 'BRI', account: '0987654321', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Logo_BRI.png' },
    { id: 'mandiri', name: 'Mandiri', account: '1122334455', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Bank_Mandiri_logo.svg' },
    { id: 'bni', name: 'BNI', account: '5566778899', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Logo_Bank_BNI.png' },
  ];
  const wallets = [
    { id: 'ovo', name: 'OVO', account: '081234567890', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Logo_OVO_purple.svg' },
    { id: 'gopay', name: 'GoPay', account: '081234567891', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Logo_GoPay.svg' },
    { id: 'dana', name: 'DANA', account: '081234567892', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Logo_DANA.svg' },
    { id: 'shopeepay', name: 'ShopeePay', account: '081234567893', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/ShopeePay_logo.svg' },
  ];
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [cardTouched, setCardTouched] = useState<{ number?: boolean; name?: boolean; expiry?: boolean; cvv?: boolean }>({});
  const handleCardChange = (e) => setCard({ ...card, [e.target.name]: e.target.value });
  const handleCardBlur = (e) => setCardTouched({ ...cardTouched, [e.target.name]: true });
  const cardValid = card.number.length === 16 && card.name && /^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry) && /^\d{3,4}$/.test(card.cvv);

  if (!plan) {
    return <div className="min-h-screen flex items-center justify-center">Paket tidak ditemukan.</div>;
  }

  const handleChange = e => { setBuyer({ ...buyer, [e.target.name]: e.target.value }); setDirty(true); };
  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };
  const isValid = buyer.name && buyer.email && buyer.phone && payment;

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitted(true);
    if (!(payment === 'credit' ? cardValid : isValid)) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Checkout berhasil!');
      setDirty(false);
    }, 1200);
  };

  useEffect(() => {
    const beforeUnload = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', beforeUnload);
    return () => window.removeEventListener('beforeunload', beforeUnload);
  }, [dirty]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
        <Toaster />
        <header className="w-full py-6 bg-white shadow-sm flex items-center mb-8 relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center text-blue-700 hover:text-blue-900 px-2 py-1 rounded transition"
            aria-label="Kembali"
          >
            <ArrowLeft className="h-6 w-6 mr-1" />
            <span className="hidden md:inline font-medium">Kembali</span>
          </button>
          <span className="text-2xl font-bold text-blue-700 tracking-tight mx-auto">HendraAI</span>
        </header>
        <main className="flex flex-1 items-center justify-center px-2">
          <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 p-0 max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">
            {/* Left: Paket Summary */}
            <div className="md:w-1/2 p-8 bg-gradient-to-b from-blue-50 to-purple-50 border-r border-blue-100 flex flex-col items-center justify-center">
              <div className="mb-2">{plan.icon}</div>
              <h1 className="text-2xl font-extrabold text-blue-700 mb-1">{plan.name} Plan</h1>
              <div className="text-base text-gray-500 mb-2">{plan.description}</div>
              <div className="text-3xl font-bold text-blue-600 mb-1">Rp {plan.price}</div>
              <div className="text-sm text-gray-400 mb-4">{plan.period}</div>
              <h2 className="text-base font-semibold mb-2 text-gray-800">Fitur Paket:</h2>
              <ul className="space-y-1 mb-2 w-full max-w-xs">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center text-gray-700 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            {/* Right: Formulir Pembeli & Pembayaran */}
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h2 className="text-xl font-bold mb-4 text-blue-700">Informasi Pembeli</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">Nama Lengkap</label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <input
                        type="text"
                        name="name"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${touched.name && !buyer.name ? 'border-red-400' : 'border-gray-200'}`}
                        value={buyer.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Nama lengkap"
                        required
                      />
                    </TooltipTrigger>
                    <TooltipContent>Nama lengkap sesuai identitas</TooltipContent>
                  </Tooltip>
                  {touched.name && !buyer.name && <span className="text-xs text-red-500">Nama wajib diisi</span>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">Email</label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <input
                        type="email"
                        name="email"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${touched.email && !buyer.email ? 'border-red-400' : 'border-gray-200'}`}
                        value={buyer.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Alamat email aktif"
                        required
                      />
                    </TooltipTrigger>
                    <TooltipContent>Email aktif untuk konfirmasi</TooltipContent>
                  </Tooltip>
                  {touched.email && !buyer.email && <span className="text-xs text-red-500">Email wajib diisi</span>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">Nomor HP</label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <input
                        type="tel"
                        name="phone"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${touched.phone && !buyer.phone ? 'border-red-400' : 'border-gray-200'}`}
                        value={buyer.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="08xxxxxxxxxx"
                        required
                      />
                    </TooltipTrigger>
                    <TooltipContent>Nomor HP aktif (WhatsApp)</TooltipContent>
                  </Tooltip>
                  {touched.phone && !buyer.phone && <span className="text-xs text-red-500">Nomor HP wajib diisi</span>}
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Metode Pembayaran</label>
                  <div className="flex flex-col gap-2">
                    {paymentMethods.map((m) => (
                      <label key={m.id} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${payment === m.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                        <input
                          type="radio"
                          name="payment"
                          value={m.id}
                          checked={payment === m.id}
                          onChange={() => setPayment(m.id)}
                          className="mr-2 accent-blue-600"
                          required
                        />
                        {m.icon}
                        <span className="font-medium text-gray-700">{m.label}</span>
                      </label>
                    ))}
                  </div>
                  {submitted && !payment && <span className="text-xs text-red-500">Pilih metode pembayaran</span>}
                  {/* Dinamis: Bank */}
                  {payment === 'bank' && (
                    <div className="mt-4">
                      <div className="font-semibold mb-2 text-gray-700">Pilih Bank Tujuan:</div>
                      <div className="grid grid-cols-2 gap-3">
                        {banks.map((bank) => (
                          <div key={bank.id} className="flex items-center p-3 border rounded-lg bg-white shadow-sm">
                            <img src={bank.logo} alt={bank.name} className="h-6 w-14 object-contain mr-2" />
                            <div>
                              <div className="font-bold text-gray-800 text-sm">{bank.name}</div>
                              <div className="text-xs text-gray-500">No. Rek: {bank.account}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Transfer ke salah satu rekening di atas setelah klik Bayar.</div>
                    </div>
                  )}
                  {/* Dinamis: E-Wallet */}
                  {payment === 'ewallet' && (
                    <div className="mt-4">
                      <div className="font-semibold mb-2 text-gray-700">Pilih E-Wallet:</div>
                      <div className="grid grid-cols-2 gap-3">
                        {wallets.map((w) => (
                          <div key={w.id} className="flex items-center p-3 border rounded-lg bg-white shadow-sm">
                            <img src={w.logo} alt={w.name} className="h-6 w-14 object-contain mr-2" />
                            <div>
                              <div className="font-bold text-gray-800 text-sm">{w.name}</div>
                              <div className="text-xs text-gray-500">No. HP: {w.account}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Transfer ke salah satu e-wallet di atas setelah klik Bayar.</div>
                    </div>
                  )}
                  {/* Dinamis: Kartu Kredit */}
                  {payment === 'credit' && (
                    <div className="mt-4">
                      <div className="font-semibold mb-2 text-gray-700">Isi Data Kartu Kredit/Debit:</div>
                      <div className="mb-2">
                        <input
                          type="text"
                          name="number"
                          maxLength={16}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-1 ${cardTouched.number && card.number.length !== 16 ? 'border-red-400' : 'border-gray-200'}`}
                          value={card.number}
                          onChange={handleCardChange}
                          onBlur={handleCardBlur}
                          placeholder="Nomor Kartu (16 digit)"
                          required
                        />
                        {cardTouched.number && card.number.length !== 16 && <span className="text-xs text-red-500">Nomor kartu harus 16 digit</span>}
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          name="name"
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-1 ${cardTouched.name && !card.name ? 'border-red-400' : 'border-gray-200'}`}
                          value={card.name}
                          onChange={handleCardChange}
                          onBlur={handleCardBlur}
                          placeholder="Nama di Kartu"
                          required
                        />
                        {cardTouched.name && !card.name && <span className="text-xs text-red-500">Nama wajib diisi</span>}
                      </div>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          name="expiry"
                          maxLength={5}
                          className={`w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-1 ${cardTouched.expiry && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry) ? 'border-red-400' : 'border-gray-200'}`}
                          value={card.expiry}
                          onChange={handleCardChange}
                          onBlur={handleCardBlur}
                          placeholder="MM/YY"
                          required
                        />
                        <input
                          type="text"
                          name="cvv"
                          maxLength={4}
                          className={`w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-1 ${cardTouched.cvv && !/^\d{3,4}$/.test(card.cvv) ? 'border-red-400' : 'border-gray-200'}`}
                          value={card.cvv}
                          onChange={handleCardChange}
                          onBlur={handleCardBlur}
                          placeholder="CVV"
                          required
                        />
                      </div>
                      {cardTouched.expiry && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry) && <span className="text-xs text-red-500 block">Format MM/YY</span>}
                      {cardTouched.cvv && !/^\d{3,4}$/.test(card.cvv) && <span className="text-xs text-red-500 block">CVV 3-4 digit</span>}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${(payment === 'credit' ? !cardValid : !isValid) || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={payment === 'credit' ? !cardValid : !isValid || loading}
                >
                  {loading ? <span className="loader mr-2"></span> : null} Bayar Sekarang
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default Checkout; 