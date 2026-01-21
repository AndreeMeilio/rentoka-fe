import { Info, AlertCircle, User } from "lucide-react";

export default function DriversPage() {
  const drivers = [
    {
      id: 1,
      name: "KAEDEHARA KAZUHA",
      address:
        "Jl. Onikabuto, Blok D8, Pelabuhan Ritou, Pulau Narukami, Inazuma, 21145",
      status: "Sedang menyewa",
      statusColor: "text-green-600",
    },
    {
      id: 2,
      name: "SHIKANOIN HEIZOU",
      address:
        "Jl. Tenryou, Tenryou Commission, Byakko Plain, Pulau Narukami, Inazuma, 52146",
      status: "Selesai menyewa",
      statusColor: "text-gray-600",
    },
    {
      id: 3,
      name: "UJANG SEPTIADI",
      address:
        "Jl. Imaginary Tree, Jarilo-VI, Backwater Pass, Descender, Teyvat, 66666",
      status: "Selesai menyewa",
      statusColor: "text-gray-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Data Drivers</h2>
        <p className="text-gray-500 text-sm mt-1">
          Daftar pengemudi yang terdaftar dalam sistem.
        </p>
      </div>

      <div className="space-y-4">
        {drivers.map((driver) => (
          <div
            key={driver.id}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="w-full md:w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
              <User size={64} className="text-gray-400" />
            </div>

            <div className="flex-1 w-full flex flex-col justify-between h-full md:h-48 py-1">
              <div>
                <h3 className="text-2xl font-bold text-black uppercase mb-2">
                  {driver.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  <span className="font-semibold text-gray-600">Alamat:</span>{" "}
                  {driver.address}
                </p>
                <p className="text-sm font-bold text-black">
                  Status:{" "}
                  <span className={driver.statusColor}>{driver.status}</span>
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-4 md:mt-0">
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition shadow-sm">
                  <Info size={16} />
                  Detail
                </button>
                <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition shadow-sm">
                  <AlertCircle size={16} />
                  Laporkan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
