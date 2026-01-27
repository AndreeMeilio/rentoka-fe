"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import CarCard from "./CarCard";
import CarDetail from "./CarDetail";

export default function CarsPage() {
  const [selectedCar, setSelectedCar] = useState<any>(null);

  const cars = [
    {
      id: 1,
      name: "Toyota Agya",
      merk: "Toyota",
      plat: "D 1231 BDG",
      year: "2017",
      status: "Status: disewa",
      price: "Rp 200.000",
      imageColor: "bg-blue-100",
    },
    {
      id: 2,
      name: "Toyota Sprinter",
      merk: "Toyota",
      plat: "B 8686 AE",
      year: "1986",
      status: "Status: tersedia",
      price: "Rp 150.000",
      imageColor: "bg-gray-100",
    },
    {
      id: 3,
      name: "Honda Civic",
      merk: "Honda",
      plat: "B 1234 CD",
      year: "2022",
      status: "Status: sedang disewakan",
      price: "Rp 220.000",
      imageColor: "bg-red-100",
    },
    {
      id: 4,
      name: "Suzuki Ertiga",
      merk: "Suzuki",
      plat: "F 5678 GH",
      year: "2019",
      status: "Status: sedang disewakan",
      price: "Rp 250.000",
      imageColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Add or Remove Your Cars
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Tambah atau kurangi ketersediaan mobilmu
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari mobil di sini..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black transition shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            name={car.name}
            status={car.status}
            price={car.price + "/hari"}
            imageColor={car.imageColor}
            onClick={() => setSelectedCar(car)}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4 pt-8">
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition shadow-lg shadow-blue-200">
          Add
        </button>
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition shadow-lg shadow-red-200">
          Remove
        </button>
      </div>

      {selectedCar && (
        <CarDetail car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </div>
  );
}
