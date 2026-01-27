import { Car } from "lucide-react";

interface CarCardProps {
  name: string;
  status: string;
  price: string;
  imageColor: string;
  onClick: () => void;
}

export default function CarCard({
  name,
  status,
  price,
  imageColor,
  onClick,
}: CarCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div className="z-10">
          <p className="text-xs text-gray-500 mb-1 capitalize">
            {status.replace("Status: ", "")}
          </p>
          <h3 className="text-xl font-extrabold text-black mb-4">{name}</h3>
          <div className="mt-8">
            <p className="text-xs text-gray-400 mb-1">Harga sewa:</p>
            <p className="text-lg font-bold text-black">{price}</p>
          </div>
        </div>
        <div
          onClick={onClick}
          className={`absolute right-5 top-1/2 -translate-y-1/2 w-40 h-32 ${imageColor} rounded-xl flex items-center justify-center transform group-hover:scale-105 transition duration-300 cursor-pointer hover:ring-4 ring-white/50`}
        >
          <Car size={64} className="text-gray-400/50" />
        </div>
      </div>
      <div className="mt-6 h-4 w-full bg-gray-100 rounded-full"></div>
    </div>
  );
}
