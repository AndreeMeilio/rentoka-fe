import { X, Info, Check } from "lucide-react";
import { useState } from "react";

interface RemoveCarProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function RemoveCar({
  onClose,
  onConfirm,
}: RemoveCarProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleYesDelete = () => {
    setShowSuccess(true);
  };

  const handleFinish = () => {
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative p-8 text-center overflow-hidden">
        {!showSuccess && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition"
          >
            <X size={24} className="text-gray-500" />
          </button>
        )}

        {!showSuccess ? (
          <div className="animate-in slide-in-from-bottom-4 duration-300">
            <div className="w-20 h-20 mx-auto bg-white border-4 border-black rounded-full flex items-center justify-center mb-6">
              <Info size={40} className="text-black" strokeWidth={2.5} />
            </div>

            <h3 className="text-2xl font-bold text-black mb-4">
              Apakah anda yakin?
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 px-4">
              Kami mohon kepada para penyedia untuk lebih teliti dalam memilih
              kendaraan yang akan dihapus
            </p>

            <button
              onClick={handleYesDelete}
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95"
            >
              Ya, hapus kendaraan
            </button>
          </div>
        ) : (
          <div className="animate-in zoom-in duration-300">
            <div className="w-20 h-20 mx-auto bg-white border-4 border-black rounded-full flex items-center justify-center mb-6">
              <Check size={40} className="text-black" strokeWidth={3} />
            </div>

            <h3 className="text-2xl font-bold text-black mb-4 border-b-2 border-blue-500 inline-block pb-1">
              Kendaraan telah dihapus
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed mb-8 px-4">
              Kendaraan yang kamu pilih berhasil dihapus. Ayo tinjau kendaraanmu
              yang lainnya.
            </p>

            <button
              onClick={handleFinish}
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95"
            >
              Lanjutkan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
