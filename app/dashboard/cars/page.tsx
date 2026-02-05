"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
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
  lat: string;
  lng: string;
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
  const router = useRouter();

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }

      const response = await fetch(
        "https://rentoka.olifemassage.com/api/provider/vehicle",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
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
        lat: item.vehicle_location_lat?.toString() || "0",
        lng: item.vehicle_location_long?.toString() || "0",
        imageColor: "bg-gray-100",
        image:
          item.image_path ||
          "https://rentoka.olifemassage.com/api/uploads/vehicle-1770178681.jpeg",
      }));

      setCars(mappedCars);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [router]);

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
            vehicle_location_lat: parseFloat(updatedCar.lat),
            vehicle_location_long: parseFloat(updatedCar.lng),
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
            Kelola armada persewaan mobil Anda
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Cari mobil..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-black transition shadow-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-black" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCars.map((car) => (
            <div key={car.id} className="relative group">
              <CarCard
                name={car.name}
                status={car.status}
                price={car.price}
                imageColor={car.imageColor}
                image={car.image}
                onClick={() => !isRemoveMode && setSelectedCar(car)}
              />
              {isRemoveMode && (
                <button
                  onClick={() => setCarToDelete(car)}
                  className="absolute -top-3 -right-3 bg-red-600 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-all z-20"
                >
                  <Minus size={20} strokeWidth={3} />
                </button>
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
          className="px-8 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
        <button
          onClick={() => setIsRemoveMode(!isRemoveMode)}
          className={`px-8 py-3 rounded-xl font-bold shadow-lg transition ${isRemoveMode ? "bg-black text-white" : "bg-red-600 text-white hover:bg-red-700"}`}
        >
          {isRemoveMode ? "Cancel" : "Remove"}
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
          onConfirm={fetchCars}
        />
      )}
    </div>
  );
}
