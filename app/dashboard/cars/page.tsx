"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Minus, Loader2 } from "lucide-react";
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
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://rentoka.olifemassage.com/api/provider/vehicle",
      );
      const result = await response.json();

      const mappedCars = result.data.map((item: any) => ({
        id: item.id_vehicle,
        name: item.vehicle_name || "Unknown",
        merk: item.brand || "-",
        plat: item.police_number || "-",
        year: item.year?.toString() || "-",
        status: item.vehicle_status || "AVAILABLE",
        price: item.rental_price?.toString() || "0",
        imageColor: "bg-gray-100",
        image:
          item.image_path ||
          "https://rentoka.olifemassage.com/api/uploads/vehicle-1770178681.jpeg",
      }));

      setCars(mappedCars);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleUpdateCar = async (updatedCar: Car) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://rentoka.olifemassage.com/api/provider/vehicle/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_vehicle: updatedCar.id,
            vehicle_name: updatedCar.name,
            brand: updatedCar.merk,
            police_number: updatedCar.plat,
            year: parseInt(updatedCar.year),
            rental_price: parseFloat(updatedCar.price),
            vehicle_status: updatedCar.status.toUpperCase(),
          }),
        },
      );

      if (response.ok) {
        fetchCars();
        setSelectedCar(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleConfirmDelete = () => {
    if (carToDelete) {
      setCars((prev) => prev.filter((c) => c.id !== carToDelete.id));
      setCarToDelete(null);
    }
  };

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Add or Remove Your Cars
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Kelola sewa rentoka mobil Anda
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari mobil..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black transition shadow-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCars.map((car) => (
            <div key={car.id} className="relative group">
              <CarCard
                name={car.name}
                status={car.status}
                price={
                  car.price.startsWith("Rp")
                    ? car.price
                    : `Rp ${new Intl.NumberFormat("id-ID").format(parseInt(car.price))}`
                }
                imageColor={car.imageColor}
                image={car.image}
                onClick={() => !isRemoveMode && setSelectedCar(car)}
              />
              {isRemoveMode && (
                <>
                  <button
                    onClick={() => setCarToDelete(car)}
                    className="absolute -top-3 -right-3 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 hover:scale-110 transition-all z-20"
                  >
                    <Minus size={20} strokeWidth={3} />
                  </button>
                  <div className="absolute inset-0 bg-white/10 rounded-2xl pointer-events-none border-2 border-red-200 border-dashed animate-pulse"></div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center gap-4 pt-8">
        <button
          onClick={() => {
            setIsAddOpen(true);
            setIsRemoveMode(false);
          }}
          className={`px-8 py-3 rounded-lg text-lg font-medium transition shadow-lg ${isRemoveMode ? "bg-gray-300 text-gray-500" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
        >
          Add
        </button>
        <button
          onClick={() => setIsRemoveMode(!isRemoveMode)}
          className={`px-8 py-3 rounded-lg text-lg font-medium transition shadow-lg ${isRemoveMode ? "bg-gray-800 text-white ring-2 ring-red-500" : "bg-red-600 hover:bg-red-700 text-white"}`}
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
        <AddCar onClose={() => setIsAddOpen(false)} onAddCar={fetchCars} />
      )}

      {carToDelete && (
        <RemoveCar
          id_vehicle={carToDelete.id}
          onClose={() => setCarToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
