import { User, X, Mail, Phone, CreditCard, MapPin } from "lucide-react";

interface Driver {
  id_customer: number;
  name: string;
  address: string;
  phone_number: string;
  id_card_number: string;
  email: string;
}

interface DetailDriverProps {
  driver: Driver | null;
  onClose: () => void;
}

export default function DetailDriver({ driver, onClose }: DetailDriverProps) {
  if (!driver) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <X size={24} className="text-gray-400 group-hover:text-black" />
          </button>

          <div className="flex flex-col md:flex-row gap-8 mb-10">
            <div className="w-32 h-32 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden shadow-inner">
              <User size={48} className="text-gray-200" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-black text-black uppercase leading-tight mb-2">
                {driver.name}
              </h2>
              <div className="flex items-center gap-2 text-green-600 font-black text-[10px] uppercase tracking-[0.2em]">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                Verified Customer
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <CreditCard size={12} /> Identity Number (KTP)
              </label>
              <p className="text-sm font-bold text-black">
                {driver.id_card_number || "Not Provided"}
              </p>
            </div>

            <div className="space-y-1">
              <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <Mail size={12} /> Email Address
              </label>
              <p className="text-sm font-bold text-black">
                {driver.email || "-"}
              </p>
            </div>

            <div className="space-y-1">
              <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <Phone size={12} /> Phone Number
              </label>
              <p className="text-sm font-bold text-black">
                {driver.phone_number || "Not Provided"}
              </p>
            </div>

            <div className="space-y-1">
              <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <MapPin size={12} /> Residential Address
              </label>
              <p className="text-sm font-bold text-black leading-tight">
                {driver.address || "-"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-4 flex justify-end border-t border-gray-100">
          <button
            onClick={onClose}
            className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
