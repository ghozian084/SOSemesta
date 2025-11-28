import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import ResultDisplay from "./components/ResultDisplay";
import { analyzePoster } from "./services/geminiService";
import { PosterMetadata } from "./types";
import { ImagePlus } from "lucide-react";

const App: React.FC = () => {
  const [metadata, setMetadata] = useState<PosterMetadata | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = async (base64: string, mimeType: string) => {
    setIsLoading(true);
    setError(null);
    setImagePreview(base64);
    setMetadata(null);

    try {
      const result = await analyzePoster(base64, mimeType);
      setMetadata(result);
    } catch (err) {
      console.error(err);
      setError("Maaf, terjadi kesalahan saat menganalisis gambar. Pastikan API Key valid atau coba gambar lain.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetApp = () => {
    setMetadata(null);
    setImagePreview(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={resetApp}>
            <img 
              src="https://so-semesta.vercel.app/icon.png" 
              alt="SOS Logo" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <h1 className="text-xl font-bold tracking-tight text-slate-900">SOS Poster Meta Data Extractor</h1>
          </div>
          {metadata && (
             <button 
                onClick={resetApp}
                className="text-sm font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-2 transition-colors"
             >
                <ImagePlus className="w-4 h-4" />
                Upload Baru
             </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Intro / Upload Section */}
        {!metadata && (
          <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
             <div className="text-center max-w-2xl">
                <h2 className="text-3xl font-bold text-slate-900 mb-4 sm:text-4xl">
                  Ekstrak Info Lomba Secara Instan
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Upload poster kompetisi, webinar, atau event Anda. AI kami akan otomatis mendeteksi detail penting dan membuatkan pesan broadcast siap kirim.
                </p>
             </div>

             <FileUpload onImageSelected={handleImageSelected} isLoading={isLoading} />
             
             {error && (
                <div className="w-full max-w-xl p-4 bg-red-50 border border-red-200 rounded-lg text-center text-red-700">
                    <p className="font-medium">Error</p>
                    <p className="text-sm mt-1">{error}</p>
                </div>
             )}

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-12">
               {[
                 { title: "Analisis Cepat", desc: "Mendapatkan detail lomba dalam hitungan detik." },
                 { title: "Broadcast Otomatis", desc: "Dibuatkan caption siap share ke WhatsApp." },
                 { title: "Kalender Otomatis", desc: "Tambahkan tanggal penting langsung ke Google Calendar." }
               ].map((feature, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center">
                    <div className="font-semibold text-slate-800 mb-2">{feature.title}</div>
                    <div className="text-slate-500 text-sm">{feature.desc}</div>
                  </div>
               ))}
            </div>
          </div>
        )}

        {/* Results Section */}
        {metadata && imagePreview && (
          <ResultDisplay metadata={metadata} imagePreview={imagePreview} />
        )}
      </main>
    </div>
  );
};

export default App;