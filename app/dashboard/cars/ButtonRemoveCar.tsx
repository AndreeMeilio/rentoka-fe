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
  const [isDeleting, setIsDeleting] = useState(false);

  const handleYesDelete = async () => {
    try {
      setIsDeleting(true);

      const token = localStorage.getItem("token");

      if (!token || token === "undefined" || token === "null") {
        alert(
          "Sesi Anda telah habis atau token tidak ditemukan. Silakan login kembali.",
        );
        setIsDeleting(false);
        return;
      }

      // 2. Request DELETE ke API
      const response = await fetch(
        `https://rentoka.olifemassage.com/api/provider/vehicle?id_vehicle=${id_vehicle}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      const result = await response.json();

      if (response.ok) {
        setShowSuccess(true);
      } else {
        console.error("Server Error:", result);
        alert(
          `Gagal menghapus: ${result.message || "Pastikan format token benar"}`,
        );
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Gagal terhubung ke server. Periksa koneksi internet Anda.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFinish = () => {
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative p-8 text-center overflow-hidden">
        {!showSuccess && (
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition disabled:opacity-50"
          >
            <X size={24} className="text-gray-500" />
          </button>
        )}

        {!showSuccess ? (
          <div className="animate-in slide-in-from-bottom-4 duration-300">
            <div className="w-20 h-20 mx-auto bg-white border-4 border-black rounded-full flex items-center justify-center mb-6">
              {isDeleting ? (
                <Loader2 size={40} className="text-black animate-spin" />
              ) : (
                <Info size={40} className="text-black" strokeWidth={2.5} />
              )}
            </div>

            <h3 className="text-2xl font-bold text-black mb-4">
              Apakah anda yakin?
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 px-4">
              Kendaraan yang dihapus tidak dapat dipulihkan kembali. Mohon
              teliti sebelum menghapus.
            </p>

            <button
              onClick={handleYesDelete}
              disabled={isDeleting}
              className={`w-full ${
                isDeleting ? "bg-gray-400" : "bg-black hover:bg-gray-800"
              } text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95`}
            >
              {isDeleting ? "Sedang Menghapus..." : "Ya, hapus kendaraan"}
            </button>
          </div>
        ) : (
          <div className="animate-in zoom-in duration-300">
            <div className="w-20 h-20 mx-auto bg-white border-4 border-black rounded-full flex items-center justify-center mb-6 text-green-600">
              <Check size={40} strokeWidth={3} />
            </div>

            <h3 className="text-2xl font-bold text-black mb-4 border-b-2 border-green-500 inline-block pb-1">
              Berhasil Dihapus
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed mb-8 px-4">
              Kendaraan berhasil dihapus secara permanen dari daftar rentoka
              apps Anda.
            </p>

            <button
              onClick={handleFinish}
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95"
            >
              Selesai & Kembali
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
