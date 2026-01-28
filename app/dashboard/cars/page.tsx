"use client";

import { useState } from "react";
import { Search, Minus } from "lucide-react";

import CarCard from "./CarCard";
import CarDetail from "./CarDetail";
import AddCar from "./ButtonAddCar";
import RemoveCar from "./ButtonRemoveCar";

export interface Car {
  id: number;
  name: string;
  merk: string;
  plat: string;
  year: string;
  status: string;
  price: string;
  imageColor: string;
  image?: string;
}

export default function CarsPage() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [isRemoveMode, setIsRemoveMode] = useState(false);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);

  const [cars, setCars] = useState<Car[]>([
    {
      id: 1,
      name: "Toyota Agya",
      merk: "Toyota",
      plat: "D 1231 BDG",
      year: "2017",
      status: "Status: disewa",
      price: "Rp 200.000",
      imageColor: "bg-blue-100",
      image: "",
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
      image: "",
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
      image: "",
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
      image: "",
    },
  ]);

  const handleAddCar = (
    newCarData: Omit<Car, "id" | "status" | "imageColor">,
  ) => {
    const newCar: Car = {
      id: Date.now(),
      status: "Status: Tersedia",
      imageColor: "bg-gray-100",
      ...newCarData,
    };
    setCars((prevCars) => [...prevCars, newCar]);
    setIsAddOpen(false);
  };

  const formatPrice = (price: string) => {
    return price.toString().startsWith("Rp") ? price : `Rp ${price}/hari`;
  };

  const handleUpdateCar = (updateCar: Car) => {
    setCars((prevCars) =>
      prevCars.map((car) => (car.id === updateCar.id ? updateCar : car)),
    );
  };

  const handleConfirmDelete = () => {
    if (carToDelete) {
      setCars((prevCars) => prevCars.filter((c) => c.id !== carToDelete.id));
      setCarToDelete(null);
    }
  };

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
          <div key={car.id} className="relative group">
            <CarCard
              name={car.name}
              status={car.status}
              price={formatPrice(car.price)}
              imageColor={car.imageColor}
              onClick={() => !isRemoveMode && setSelectedCar(car)}
            />

            {isRemoveMode && (
              <button
                onClick={() => setCarToDelete(car)}
                className="absolute -top-3 -right-3 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 hover:scale-110 transition-all animate-in zoom-in duration-200 z-10"
              >
                <Minus size={20} strokeWidth={3} />
              </button>
            )}

            {isRemoveMode && (
              <div className="absolute inset-0 bg-white/10 rounded-2xl pointer-events-none border-2 border-red-200 border-dashed animate-pulse"></div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 pt-8">
        <button
          onClick={() => {
            setIsAddOpen(true);
            setIsRemoveMode(false);
          }}
          className={`flex items-center gap-2 px-8 py-3 rounded-lg text-lg font-medium transition shadow-lg ${
            isRemoveMode
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200"
          }`}
        >
          Add
        </button>

        <button
          onClick={() => setIsRemoveMode(!isRemoveMode)}
          className={`flex items-center gap-2 px-8 py-3 rounded-lg text-lg font-medium transition shadow-lg ${
            isRemoveMode
              ? "bg-gray-800 text-white ring-2 ring-red-500 shadow-gray-400"
              : "bg-red-600 hover:bg-red-700 text-white shadow-red-200"
          }`}
        >
          {isRemoveMode ? "Cancel Remove" : "Remove"}
        </button>
      </div>

      {selectedCar && (
        <CarDetail
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onUpdate={handleUpdateCar}
        />
      )}

      {isAddOpen && (
        <AddCar onClose={() => setIsAddOpen(false)} onAddCar={handleAddCar} />
      )}

      {carToDelete && (
        <RemoveCar
          onClose={() => setCarToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
