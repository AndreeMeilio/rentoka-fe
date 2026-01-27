import { User, X } from "lucide-react";

interface Driver {
  id: number;
  name: string;
  address: string;
  status: string;
  statusColor: string;
  ktp: string;
  phone: string;
  email: string;
}

interface DetailDriverProps {
  driver: Driver;
  onClose: () => void;
}

export default function DetailDriver({ driver, onClose }: DetailDriverProps) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={24} className="text-gray-500" />
          </button>

          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
              <User size={48} className="text-gray-300" />
            </div>
            <div className="pt-2 pr-8">
              <h2 className="text-3xl font-extrabold text-black uppercase mb-2">
                {driver.name}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                <span className="font-bold text-black">Alamat:</span>{" "}
                {driver.address}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-black mb-4 pb-2 border-b border-gray-200">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                  Nama Lengkap
                </p>
                <p className="text-sm font-bold text-black capitalize">
                  {driver.name.toLowerCase()}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                  No. KTP
                </p>
                <p className="text-sm font-bold text-black">{driver.ktp}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                  Alamat Email
                </p>
                <p className="text-sm font-bold text-black">{driver.email}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                  No. Handphone
                </p>
                <p className="text-sm font-bold text-black">{driver.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
