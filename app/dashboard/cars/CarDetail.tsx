import { Car, X, Pencil } from "lucide-react";

interface CarData {
  id: number;
  name: string;
  merk: string;
  plat: string;
  year: string;
  status: string;
  price: string;
  imageColor: string;
}

interface CarDetailProps {
  car: CarData;
  onClose: () => void;
}

export default function CarDetail({ car, onClose }: CarDetailProps) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-gray-100 rounded-full transition"
        >
          <X size={24} className="text-gray-600" />
        </button>

        <div className="w-full md:w-1/2 p-8 border-r border-gray-100">
          <h2 className="text-3xl font-light text-gray-400 mb-8 border-b border-gray-100 pb-4">
            Car Detail
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-3 rounded-xl relative group cursor-pointer hover:bg-gray-200 transition">
                <p className="text-[10px] font-bold text-gray-400 mb-1">
                  Nama mobil
                </p>
                <p className="text-sm font-bold text-gray-900">{car.name}</p>
                <Pencil
                  size={12}
                  className="absolute right-3 bottom-3 text-gray-400 opacity-0 group-hover:opacity-100 transition"
                />
              </div>
              <div className="bg-gray-100 p-3 rounded-xl relative group cursor-pointer hover:bg-gray-200 transition">
                <p className="text-[10px] font-bold text-gray-400 mb-1">Merk</p>
                <p className="text-sm font-bold text-gray-900">{car.merk}</p>
                <Pencil
                  size={12}
                  className="absolute right-3 bottom-3 text-gray-400 opacity-0 group-hover:opacity-100 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-3 rounded-xl relative group cursor-pointer hover:bg-gray-200 transition">
                <p className="text-[10px] font-bold text-gray-400 mb-1">
                  Plat polisi
                </p>
                <p className="text-sm font-bold text-gray-900">{car.plat}</p>
                <Pencil
                  size={12}
                  className="absolute right-3 bottom-3 text-gray-400 opacity-0 group-hover:opacity-100 transition"
                />
              </div>
              <div className="bg-gray-100 p-3 rounded-xl relative group cursor-pointer hover:bg-gray-200 transition">
                <p className="text-[10px] font-bold text-gray-400 mb-1">
                  Tahun keluaran
                </p>
                <p className="text-sm font-bold text-gray-900">{car.year}</p>
                <Pencil
                  size={12}
                  className="absolute right-3 bottom-3 text-gray-400 opacity-0 group-hover:opacity-100 transition"
                />
              </div>
            </div>

            <div className="bg-gray-100 p-3 rounded-xl">
              <p className="text-[10px] font-bold text-gray-400 mb-2">
                Status sewa
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                <p className="text-sm font-bold text-gray-900 capitalize">
                  {car.status.replace("Status: ", "")}
                </p>
              </div>
            </div>

            <div className="bg-gray-100 p-3 rounded-xl relative group cursor-pointer hover:bg-gray-200 transition">
              <p className="text-[10px] font-bold text-gray-400 mb-1">
                Harga sewa
              </p>
              <p className="text-lg font-bold text-gray-900">
                {car.price}{" "}
                <span className="text-xs text-gray-400 font-normal">/hari</span>
              </p>
              <Pencil
                size={14}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 opacity-0 group-hover:opacity-100 transition"
              />
            </div>
          </div>
        </div>

        <div
          className={`w-full md:w-1/2 ${car.imageColor} flex items-center justify-center p-12`}
        >
          <Car size={200} className="text-gray-900/10 drop-shadow-xl" />
        </div>
      </div>
    </div>
  );
}
