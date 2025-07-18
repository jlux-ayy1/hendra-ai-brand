
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Toaster, toast } from "@/components/ui/sonner";
import { 
  Palette, Zap, Clock, Star, Check, ArrowRight, Sparkles, MousePointer, Brush, Target, Users, TrendingUp, Heart, Shield, Lightbulb 
} from "lucide-react";

// Feature, Plan, and Testimonial types for better type safety
interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
}

interface Testimonial {
  name: string;
  business: string;
  rating: number;
  comment: string;
}

const FEATURES: Feature[] = [
  {
    icon: <Zap className="h-6 w-6 text-blue-600" />, title: "AI Logo Generator", description: "Buat logo profesional dalam hitungan detik dengan AI canggih"
  },
  {
    icon: <Palette className="h-6 w-6 text-purple-600" />, title: "Palet Warna Otomatis", description: "Dapatkan kombinasi warna sempurna untuk brand Anda"
  },
  {
    icon: <MousePointer className="h-6 w-6 text-green-600" />, title: "Drag & Drop Editor", description: "Edit dan kustomisasi design dengan mudah tanpa skill desain"
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-orange-600" />, title: "Slogan Generator", description: "Buat tagline menarik yang memorable untuk bisnis Anda"
  },
  {
    icon: <Clock className="h-6 w-6 text-red-600" />, title: "Hasil Instan", description: "Dapatkan brand identity lengkap dalam 5 menit"
  },
  {
    icon: <Shield className="h-6 w-6 text-indigo-600" />, title: "Garansi Revisi", description: "Revisi unlimited sampai Anda puas dengan hasilnya"
  }
];

const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "99,000",
    period: "sekali bayar",
    description: "Cocok untuk bisnis baru",
    features: [
      "5 variasi logo",
      "3 palet warna",
      "Basic slogan generator",
      "Format PNG/JPG",
      "1x revisi"
    ],
    popular: false
  },
  {
    id: "pro",
    name: "Pro",
    price: "249,000",
    period: "sekali bayar",
    description: "Paling populer untuk UMKM",
    features: [
      "15 variasi logo",
      "10 palet warna",
      "Advanced slogan generator",
      "Semua format (PNG, JPG, SVG, PDF)",
      "Brand guideline lengkap",
      "Unlimited revisi",
      "Social media templates"
    ],
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "499,000",
    period: "sekali bayar",
    description: "Untuk bisnis yang berkembang",
    features: [
      "Unlimited variasi logo",
      "Unlimited palet warna",
      "Premium slogan generator",
      "Semua format + vector files",
      "Brand guideline profesional",
      "Unlimited revisi",
      "Full marketing kit",
      "1-on-1 konsultasi brand"
    ],
    popular: false
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Wijaya",
    business: "Toko Kue Sarah",
    rating: 5,
    comment: "Dalam 10 menit saya sudah punya logo yang cantik! Pelanggan jadi lebih percaya dengan brand saya."
  },
  {
    name: "Budi Santoso",
    business: "Bengkel Motor Budi",
    rating: 5,
    comment: "Tadinya saya pikir bikin logo itu ribet dan mahal. Ternyata mudah banget dan hasilnya profesional!"
  },
  {
    name: "Dewi Lestari",
    business: "Warung Nasi Dewi",
    rating: 5,
    comment: "Sekarang warung saya terlihat lebih modern. Omzet naik 30% setelah rebranding!"
  }
];

const Index = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const navigate = useNavigate();
  const testimonialRef = useRef<HTMLDivElement>(null);

  const scrollToTestimonial = () => {
    testimonialRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Rebranding UMKM dalam
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> 5 Menit</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Dapatkan logo profesional, palet warna, dan identitas brand lengkap untuk bisnis Anda dengan AI canggih + drag & drop editor yang mudah digunakan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                onClick={() => {
                  navigate("/generator");
                  toast.success("Menuju AI Brand Generator!");
                }}
              >
                Mulai Rebranding Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 text-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                onClick={() => {
                  navigate("/showcase");
                  toast.info("Lihat contoh hasil brand!");
                }}
              >
                Lihat Contoh Hasil
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mengapa Pilih Rebranding AI Kami?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Solusi rebranding tercepat dan terpercaya untuk UMKM Indonesia</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cara Kerja Rebranding AI</h2>
            <p className="text-lg text-gray-600">Hanya 3 langkah mudah untuk mendapatkan brand identity baru</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Input Informasi Bisnis</h3>
              <p className="text-gray-600">Masukkan nama bisnis, jenis usaha, dan preferensi style yang Anda inginkan</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Generates Design</h3>
              <p className="text-gray-600">AI kami akan menghasilkan puluhan opsi logo, warna, dan slogan dalam hitungan detik</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Customize & Download</h3>
              <p className="text-gray-600">Edit dengan drag & drop editor dan download brand kit lengkap Anda</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pilih Paket yang Sesuai</h2>
            <p className="text-lg text-gray-600">Harga terjangkau untuk semua jenis bisnis UMKM</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan) => (
              <Card
                key={plan.id}
                className={`relative ${plan.popular ? "border-2 border-blue-500 shadow-xl" : "border shadow-md"} hover:shadow-lg transition-all duration-300`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">Paling Populer</Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600 mb-2">Rp {plan.price}</div>
                  <p className="text-gray-600">{plan.period}</p>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-600 mr-3" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-800 hover:bg-gray-900"}`}
                    onClick={() => navigate(`/checkout?plan=${plan.id}`)}
                  >
                    Pilih Paket {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50" ref={testimonialRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Apa Kata Pelanggan Kami?</h2>
            <p className="text-lg text-gray-600">Ribuan UMKM sudah merasakan manfaatnya</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.business}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap Mengubah Bisnis Anda?</h2>
          <p className="text-xl mb-8 opacity-90">Bergabung dengan ribuan UMKM yang sudah meningkatkan brand mereka</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="px-8 py-3 text-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
              onClick={() => {
                navigate("/generator");
                toast.success("Menuju AI Brand Generator!");
              }}
            >
              Mulai Rebranding Sekarang
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              className="px-8 py-3 text-lg bg-white text-blue-700 border-2 border-blue-600 hover:bg-blue-50 hover:text-blue-900 font-semibold transition transition-all duration-200 transform hover:scale-105 active:scale-95"
              onClick={() => navigate("/hubungi-konsultan")}
            >
              Hubungi Konsultan
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">HendraAI</h3>
              <p className="text-gray-400">Platform AI Branding & Identitas Bisnis Modern untuk UMKM Indonesia bersama HendraAI</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/generator" className="hover:text-blue-400 transition">Logo Generator</a></li>
                <li><a href="/brand-identity" className="hover:text-blue-400 transition">Brand Identity</a></li>
                <li><a href="/slogan-generator" className="hover:text-blue-400 transition">Slogan Generator</a></li>
                <li><a href="/brand-guidelines" className="hover:text-blue-400 transition">Brand Guidelines</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Dukungan</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/faq" className="hover:text-blue-400 transition">FAQ</a></li>
                <li><a href="/tutorial" className="hover:text-blue-400 transition">Tutorial</a></li>
                <li><a href="mailto:support@hendraai.id" className="hover:text-blue-400 transition">Hubungi Kami</a></li>
                <li><a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">Live Chat</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@hendraai.id</li>
                <li>+62 812-3456-7890</li>
                <li>Jakarta, Indonesia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HendraAI. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Index;
