import { Info } from "lucide-react";

export default function DashboardPage() {
  const carStatus = [
    {
      name: "Toyota Agya",
      status: "Disewakan",
      driver: "Aprilla Nurindah Z",
      color: "blue",
    },
    {
      name: "Toyota Sprinter",
      status: "Tersedia",
      driver: "-",
      color: "green",
    },
    {
      name: "Honda Civic",
      status: "Tersedia",
      driver: "-",
      color: "green",
    },
    {
      name: "Suzuki Ertiga",
      status: "Tersedia",
      driver: "-",
      color: "green",
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Statistik hari ini</h2>
        <p className="text-gray-500 text-sm mt-1">Selasa, 20 Januari 2026</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-500 font-bold text-lg leading-tight">
                Total
                <br />
                Pendapatan
              </h3>
              <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded">
                Bulan ini
              </span>
            </div>
            <p className="text-3xl font-extrabold text-black mb-2">
              Rp 3.230.500
            </p>
            <p className="text-xs text-gray-400">
              Luar biasa! Tingkatkan terus performa layananmu ya.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-gray-500 font-bold text-lg leading-tight">
                Total
                <br />
                Sewa Mobil
              </h3>
              <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded">
                Bulan ini
              </span>
            </div>

            <div className="flex items-end justify-center gap-8 h-40 border-b border-l border-gray-200 pb-2 pl-2 mx-2">
              <div className="w-12 bg-blue-600 rounded-t-sm relative h-[75%]">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-600">
                  15
                </span>
              </div>
              <div className="w-12 bg-red-500 rounded-t-sm relative h-[25%]">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-red-500">
                  5
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-xs text-gray-700 font-bold border-b border-gray-100 pb-2">
                <span>Total Pesanan</span>
                <span>20</span>
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <span>Total Sewa</span>
                </div>
                <span>15</span>
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>Total Dibatalkan</span>
                </div>
                <span>5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-black mb-6">
            Live Car Status
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="border-b border-gray-100">
                <tr>
                  <th className="py-4 px-6 text-sm font-bold text-gray-600">
                    Car Name
                  </th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-600">
                    Status
                  </th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-600">
                    Driver
                  </th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-600 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {carStatus.map((car, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-6 text-gray-800 font-medium">
                      {car.name}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${car.color === "blue" ? "bg-blue-600" : "bg-green-500"}`}
                        ></div>
                        <span className="text-sm text-gray-600 font-medium">
                          {car.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {car.driver}
                    </td>
                    <td className="py-4 px-6 text-right">
                      {car.color === "blue" && (
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] px-3 py-1.5 rounded-md font-bold transition inline-flex items-center gap-1 shadow-sm">
                          <Info size={12} /> Detail
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-8"></div>
          </div>
        </div>
      </div>
    </>
  );
}
