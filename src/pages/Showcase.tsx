import { Palette, Brush, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ShowcaseItem {
  logo: string;
  name: string;
  industry: string;
  palette: string[];
  tagline: string;
}

const SHOWCASES: ShowcaseItem[] = [
  { logo: '/logo1.png', name: 'Kopi Mantap', industry: 'Kedai Kopi', palette: ['#6D4C41', '#FFD54F', '#FFF8E1'], tagline: 'Ngopi, Ngobrol, Nikmati Hidup' },
  { logo: '/logo2.png', name: 'FreshMart', industry: 'Toko Buah', palette: ['#43A047', '#FBC02D', '#E1F5FE'], tagline: 'Segar Setiap Hari' },
  { logo: '/logo3.png', name: 'TechnoFix', industry: 'Service Gadget', palette: ['#1976D2', '#64B5F6', '#E3F2FD'], tagline: 'Solusi Gadget Anda' },
  { logo: '/logo4.png', name: 'Bakso Juara', industry: 'Kuliner', palette: ['#D84315', '#FFD600', '#FFF3E0'], tagline: 'Bakso Lezat, Harga Bersahabat' },
  { logo: '/logo5.png', name: 'BeautyGlow', industry: 'Kosmetik', palette: ['#F06292', '#BA68C8', '#FFF3E0'], tagline: 'Cantik Alami, Bersinar Setiap Hari' },
  { logo: '/logo6.png', name: 'FitLife Gym', industry: 'Fitness Center', palette: ['#388E3C', '#FBC02D', '#E1F5FE'], tagline: 'Sehat, Kuat, Bahagia' },
  { logo: '/logo7.png', name: 'EduSmart', industry: 'Bimbingan Belajar', palette: ['#0288D1', '#FFD600', '#FFF8E1'], tagline: 'Belajar Mudah, Prestasi Hebat' },
  { logo: '/logo8.png', name: 'Laundry Express', industry: 'Laundry', palette: ['#00BCD4', '#B2EBF2', '#E0F7FA'], tagline: 'Bersih, Cepat, Hemat' },
  { logo: '/logo9.png', name: 'PetCare', industry: 'Klinik Hewan', palette: ['#8D6E63', '#FFB300', '#FFF8E1'], tagline: 'Sayangi Hewan Anda' },
  { logo: '/logo10.png', name: 'Sushi House', industry: 'Restoran Jepang', palette: ['#E53935', '#FFF176', '#FFFDE7'], tagline: 'Rasa Jepang, Harga Bersahabat' },
  { logo: '/logo11.png', name: 'GreenLeaf', industry: 'Toko Organik', palette: ['#388E3C', '#C8E6C9', '#FFFDE7'], tagline: 'Hidup Sehat, Pilihan Alami' },
  { logo: '/logo12.png', name: 'AutoCare', industry: 'Bengkel Mobil', palette: ['#455A64', '#FFB300', '#FFF8E1'], tagline: 'Servis Cepat, Mobil Hebat' }
];

const Showcase = () => {
  const navigate = useNavigate();
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 px-4">
        <div className="w-full max-w-7xl flex items-center mb-4 mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-700 hover:text-blue-900 px-2 py-1 rounded transition"
            aria-label="Kembali"
          >
            <ArrowLeft className="h-6 w-6 mr-1" />
            <span className="hidden md:inline font-medium">Kembali</span>
          </button>
        </div>
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Contoh Hasil Brand AI</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {SHOWCASES.map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-blue-100 hover:shadow-2xl transition-all duration-200 hover:scale-105 focus-within:scale-105 cursor-pointer">
              <div className="w-20 h-20 mb-4 flex items-center justify-center bg-gray-50 rounded-full border-2 border-gray-200 overflow-hidden">
                <img src={item.logo} alt={item.name} className="h-16 w-16 object-contain" />
              </div>
              <div className="font-bold text-lg mb-1 text-blue-800">{item.name}</div>
              <div className="text-xs text-gray-500 mb-2">{item.industry}</div>
              <div className="flex items-center mb-2">
                <Palette className="h-4 w-4 mr-1 text-blue-500" />
                {item.palette.map((color, j) => (
                  <Tooltip key={j}>
                    <TooltipTrigger asChild>
                      <div className="h-4 w-4 rounded-full mx-0.5 border-2 border-gray-200" style={{ background: color }} tabIndex={0} aria-label={color} />
                    </TooltipTrigger>
                    <TooltipContent>{color}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
              <div className="italic text-gray-700 text-center mb-2">"{item.tagline}"</div>
              <div className="flex items-center gap-2 text-xs text-gray-400"><Brush className="h-4 w-4" />AI Generated</div>
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Showcase; 