import { Car, X, Pencil, Check } from "lucide-react";
import { useState, useEffect } from "react";

export interface CarData {
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

interface CarDetailProps {
  car: CarData;
  onClose: () => void;

  onUpdate: (updatedCar: CarData) => void;
}

export default function CarDetail({ car, onClose, onUpdate }: CarDetailProps) {
  const [formData, setFormData] = useState<CarData>(car);

  const [editingField, setEditingField] = useState<keyof CarData | null>(null);

  useEffect(() => {
    setFormData(car);
  }, [car]);

  const handleChange = (field: keyof CarData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate(formData);
    setEditingField(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditingField(null);
      setFormData(car);
    }
  };

  const renderField = (
    label: string,
    fieldKey: keyof CarData,
    type: "text" | "number" = "text",
  ) => {
    const isEditing = editingField === fieldKey;

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
              value={formData[fieldKey] as string}
              onChange={(e) => handleChange(fieldKey, e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none text-sm font-bold text-gray-900 p-0"
            />
            <button onMouseDown={handleSave} className="ml-2 text-green-600">
              <Check size={16} />
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm font-bold text-gray-900 truncate">
              {formData[fieldKey]}
              {fieldKey === "price" &&
                !formData[fieldKey].toString().includes("/hari") && (
                  <span className="font-normal text-xs text-gray-500">
                    /hari
                  </span>
                )}
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
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative max-h-[90vh] md:h-auto overflow-y-auto">
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
              {renderField("Nama Mobil", "name")}
              {renderField("Merk", "merk")}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {renderField("Plat Polisi", "plat")}
              {renderField("Tahun Keluaran", "year", "number")}
            </div>

            <div className="bg-gray-100 p-3 rounded-xl group relative">
              <p className="text-[10px] font-bold text-gray-400 mb-2">
                Status Sewa
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${formData.status.toLowerCase().includes("tersedia") ? "bg-green-500" : "bg-blue-600"}`}
                ></div>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="bg-transparent text-sm font-bold text-gray-900 outline-none cursor-pointer appearance-none w-full"
                >
                  <option value="Status: tersedia">Tersedia</option>
                  <option value="Status: disewa">Disewa</option>
                  <option value="Status: sedang disewakan">
                    Sedang Disewakan
                  </option>
                </select>
                <Pencil
                  size={12}
                  className="text-gray-400 opacity-0 group-hover:opacity-100 transition"
                />
              </div>
            </div>

            <div
              className={`p-3 rounded-xl relative group transition ${editingField === "price" ? "bg-white ring-2 ring-blue-500 shadow-md" : "bg-gray-100 hover:bg-gray-200 cursor-pointer"}`}
              onClick={() =>
                editingField !== "price" && setEditingField("price")
              }
            >
              <p className="text-[10px] font-bold text-gray-400 mb-1">
                Harga Sewa
              </p>
              {editingField === "price" ? (
                <input
                  autoFocus
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none text-lg font-bold text-gray-900"
                />
              ) : (
                <p className="text-lg font-bold text-gray-900">
                  {formData.price}
                  {!formData.price.toString().includes("hari") && (
                    <span className="text-xs text-gray-400 font-normal">
                      /hari
                    </span>
                  )}
                </p>
              )}
              <Pencil
                size={14}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 opacity-0 group-hover:opacity-100 transition"
              />
            </div>
          </div>
        </div>

        <div
          className={`w-full md:w-1/2 ${car.imageColor || "bg-blue-50"} flex items-center justify-center p-12 relative`}
        >
          {car.image ? (
            <img
              src={car.image}
              alt={car.name}
              className="w-full object-contain drop-shadow-2xl"
            />
          ) : (
            <Car size={200} className="text-gray-900/10 drop-shadow-xl" />
          )}
        </div>
      </div>
    </div>
  );
}
