"use client";

import { X, Info, Check, Loader2 } from "lucide-react";
import { useState } from "react";

interface RemoveCarProps {
  id_vehicle: number;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RemoveCar({
  id_vehicle,
  onClose,
  onConfirm,
}: RemoveCarProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://rentoka.olifemassage.com/api/provider/vehicle?id_vehicle=${id_vehicle}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.ok) setShowSuccess(true);
      else alert("Gagal menghapus.");
    } catch (error) {
      alert("Kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative p-8 text-center overflow-hidden">
        {!showSuccess ? (
          <div className="animate-in slide-in-from-bottom-4 duration-300">
            <div className="w-20 h-20 mx-auto border-4 border-black rounded-full flex items-center justify-center mb-6">
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Info size={40} />
              )}
            </div>
            <h3 className="text-2xl font-bold mb-4">Hapus Kendaraan?</h3>
            <p className="text-gray-500 text-sm mb-8 px-4">
              Data akan dihapus permanen dari sistem Rentoka.
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 font-bold text-gray-500"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-black text-white py-3 rounded-xl font-bold active:scale-95 shadow-lg"
              >
                Hapus
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in zoom-in duration-300">
            <Check size={60} className="mx-auto mb-6 text-green-500" />
            <h3 className="text-2xl font-bold mb-8">Dihapus</h3>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="w-full bg-black text-white py-3.5 rounded-xl font-bold"
            >
              Lanjutkan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
