"use client";

interface CarCardProps {
  name: string;
  status: string;
  price: string;
  imageColor: string;
  image?: string;
  onClick: () => void;
}

export default function CarCard({
  name,
  status,
  price,
  imageColor,
  image,
  onClick,
}: CarCardProps) {
  const isAvailable = status?.toUpperCase().includes("AVAILABLE");

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition h-full">
      <div className="flex justify-between items-start">
        <div className="z-10">
          <div
            className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-3 ${
              isAvailable
                ? "bg-green-100 text-green-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {isAvailable ? "Available" : "Rented"}
          </div>

          <h3 className="text-xl font-extrabold text-black mb-4">{name}</h3>

          <div className="mt-8">
            <p className="text-xs text-gray-400 mb-1">Harga sewa:</p>
            <p className="text-lg font-bold text-black">
              {price.startsWith("Rp") ? price : `Rp ${price}`}
            </p>
          </div>
        </div>

        <div
          onClick={onClick}
          className={`absolute right-5 top-1/2 -translate-y-1/2 w-44 h-32 ${imageColor} rounded-xl flex items-center justify-center transform group-hover:scale-105 transition duration-300 cursor-pointer hover:ring-4 ring-white/50 overflow-hidden shadow-inner`}
        >
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400/30 font-bold italic text-center text-xs px-2">
              No Image Provided
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 h-4 w-full bg-gray-100 rounded-full"></div>
    </div>
  );
}
