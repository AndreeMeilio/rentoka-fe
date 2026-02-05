"use client";

import { ChevronLeft, X, Info, Check, Loader2 } from "lucide-react";
import { useState } from "react";

interface AddCarProps {
  onClose: () => void;
  onAddCar: () => void;
}

export default function AddCar({ onClose, onAddCar }: AddCarProps) {
  const [formData, setFormData] = useState({
    name: "",
    merk: "",
    year: "",
    plat: "",
    price: "",
    lat: "",
    lng: "",
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const payload = {
        vehicle_name: formData.name,
        brand: formData.merk,
        year: parseInt(formData.year),
        police_number: formData.plat,
        rental_price: parseFloat(formData.price),
        vehicle_location_lat: parseFloat(formData.lat),
        vehicle_location_long: parseFloat(formData.lng),
        vehicle_status: "AVAILABLE",
        image_path:
          "https://rentoka.olifemassage.com/api/uploads/vehicle-1770178681.jpeg",
      };

      const res = await fetch(
        "https://rentoka.olifemassage.com/api/provider/vehicle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (res.ok) setStep(3);
      else alert("Gagal menyimpan.");
    } catch (err) {
      alert("Kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <ChevronLeft />
            </button>
            <h2 className="text-xl font-bold">Add Car</h2>
          </div>
          <X className="cursor-pointer text-gray-400" onClick={onClose} />
        </div>

        <div className="overflow-y-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
              Nama Kendaraan
            </label>
            <input
              name="name"
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
              Merk
            </label>
            <input
              name="merk"
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
              Tahun
            </label>
            <input
              name="year"
              type="number"
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
              Plat
            </label>
            <input
              name="plat"
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
              Harga / Hari
            </label>
            <input
              name="price"
              type="number"
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
              Latitude
            </label>
            <input
              name="lat"
              type="number"
              step="any"
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">
              Longitude
            </label>
            <input
              name="lng"
              type="number"
              step="any"
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div className="p-6 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 font-bold text-gray-400"
          >
            Batal
          </button>
          <button
            onClick={() => setStep(2)}
            className="bg-black text-white px-8 py-3 rounded-xl font-bold active:scale-95 transition"
          >
            Tambah
          </button>
        </div>
      </div>

      {step === 2 && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl">
            <div className="w-16 h-16 border-4 border-black rounded-full flex items-center justify-center mx-auto mb-4">
              {loading ? <Loader2 className="animate-spin" /> : <Info />}
            </div>
            <h3 className="text-xl font-bold mb-6">Simpan Data?</h3>
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-black text-white py-3 rounded-xl font-bold disabled:bg-gray-400"
            >
              {loading ? "Menyimpan..." : "Ya, Simpan"}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl">
            <Check size={50} className="mx-auto mb-4 text-green-500" />
            <h3 className="text-xl font-bold mb-6">Berhasil Ditambah</h3>
            <button
              onClick={() => {
                onAddCar();
                onClose();
              }}
              className="w-full bg-black text-white py-3 rounded-xl font-bold"
            >
              Lanjutkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
