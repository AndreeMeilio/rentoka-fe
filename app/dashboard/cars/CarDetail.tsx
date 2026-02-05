"use client";

import { X, Pencil, Check, Loader2, Car as CarIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Car } from "./page";

interface CarDetailProps {
  car: Car;
  onClose: () => void;
  onUpdate: (updatedCar: Car) => void;
}

export default function CarDetail({ car, onClose, onUpdate }: CarDetailProps) {
  const [formData, setFormData] = useState<Car>(car);
  const [editingField, setEditingField] = useState<keyof Car | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsFetching(true);
        const res = await fetch(
          `https://rentoka.olifemassage.com/api/provider/vehicle?id_vehicle=${car.id}`,
        );
        const result = await res.json();
        if (result.data) {
          const detail = Array.isArray(result.data)
            ? result.data[0]
            : result.data;
          setFormData({
            id: detail.id_vehicle,
            name: detail.vehicle_name || "",
            merk: detail.brand || "",
            plat: detail.police_number || "",
            year: detail.year?.toString() || "",
            status: detail.vehicle_status || "AVAILABLE",
            price: detail.rental_price?.toString() || "0",
            lat: detail.vehicle_location_lat?.toString() || "0",
            lng: detail.vehicle_location_long?.toString() || "0",
            imageColor: car.imageColor,
            image:
              detail.image_path ||
              "https://rentoka.olifemassage.com/api/uploads/vehicle-1770178681.jpeg",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchDetail();
  }, [car.id, car.imageColor]);

  const handleSave = () => {
    onUpdate(formData);
    setEditingField(null);
  };

  const renderField = (label: string, fieldKey: keyof Car, type = "text") => {
    const isEditing = editingField === fieldKey;
    const value = formData[fieldKey]?.toString() || "";

    return (
      <div
        className={`p-3 rounded-xl relative group transition ${isEditing ? "bg-white ring-2 ring-blue-500 shadow-md" : "bg-gray-100 hover:bg-gray-200 cursor-pointer"}`}
        onClick={() => !isEditing && setEditingField(fieldKey)}
      >
        <p className="text-[10px] font-bold text-gray-400 mb-1">{label}</p>
        {isEditing ? (
          <div className="flex items-center">
            <input
              autoFocus
              type={type}
              step="any"
              value={value}
              onChange={(e) =>
                setFormData({ ...formData, [fieldKey]: e.target.value })
              }
              onBlur={handleSave}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              className="w-full bg-transparent border-none outline-none text-sm font-bold text-gray-900 p-0"
            />
            <button onMouseDown={handleSave} className="ml-2 text-green-600">
              <Check size={16} />
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm font-bold text-gray-900 truncate">
              {fieldKey === "price"
                ? `Rp ${new Intl.NumberFormat("id-ID").format(parseInt(value || "0"))}`
                : value}
            </p>
            <Pencil
              size={12}
              className="absolute right-3 bottom-3 text-gray-400 opacity-0 group-hover:opacity-100 transition"
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-gray-100 rounded-full transition"
        >
          <X size={24} />
        </button>

        <div className="w-full md:w-1/2 p-8 border-r border-gray-100">
          <h2 className="text-2xl font-bold mb-8 border-b pb-4">
            Vehicle Detail
          </h2>
          {isFetching ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {renderField("Nama", "name")}
                {renderField("Merk", "merk")}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {renderField("Plat", "plat")}
                {renderField("Tahun", "year", "number")}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {renderField("Latitude", "lat", "number")}
                {renderField("Longitude", "lng", "number")}
              </div>
              <div className="bg-gray-100 p-3 rounded-xl">
                <p className="text-[10px] font-bold text-gray-400 mb-2">
                  Status
                </p>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="bg-transparent text-sm font-bold text-gray-900 outline-none w-full"
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="RENTED">Rented</option>
                </select>
              </div>
              {renderField("Harga Sewa", "price", "number")}
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-12 bg-gray-50">
          {formData.image ? (
            <img
              src={formData.image}
              alt={formData.name}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          ) : (
            <CarIcon size={150} className="text-gray-200" />
          )}
        </div>
      </div>
    </div>
  );
}
