"use client";

import { useState } from "react";
import { Info, Check, X, User } from "lucide-react";
import { TransactionDataType } from "./page";

interface PermintaanSewaProps {
  data: TransactionDataType;
  onDetailSewaClick: () => void;
}

export default function PermintaanSewa({
  data,
  onDetailSewaClick,
}: PermintaanSewaProps) {
  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleApproveClick = async () => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://rentoka.olifemassage.com/api/provider/transaction/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_transaction: data.id,
            status: "APPROVED",
          }),
        },
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setIsProcessed(true);
        setShowApprove(true);
        console.log("Transaction approved successfully:", result.message);
      } else {
        console.error("Failed to approve transaction:", result.message);
        alert("Gagal menyetujui transaksi. Silakan coba lagi.");
      }
    } catch (err) {
      console.error("Error approving transaction:", err);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectClick = async () => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://rentoka.olifemassage.com/api/provider/transaction/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_transaction: data.id,
            status: "REJECTED",
          }),
        },
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setIsProcessed(true);
        setShowReject(true);
        console.log("Transaction rejected successfully:", result.message);
      } else {
        console.error("Failed to reject transaction:", result.message);
        alert("Gagal menolak transaksi. Silakan coba lagi.");
      }
    } catch (err) {
      console.error("Error rejecting transaction:", err);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowApprove(false);
    setShowReject(false);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-start hover:border-blue-500 transition-all duration-200 group">
        <div
          className={`w-full md:w-48 h-32 ${data.imageColor} rounded-xl flex items-center justify-center shrink-0`}
        >
          <User size={48} className="text-white/50" />
        </div>

        <div className="flex-1 w-full">
          <h3 className="text-2xl font-bold text-black mb-4">{data.name}</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Tanggal</p>
              <p className="text-sm font-bold text-gray-900">{data.date}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Jenis Mobil</p>
              <p className="text-sm font-bold text-gray-900">{data.carName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Lama sewa</p>
              <p className="text-sm font-bold text-gray-900">{data.duration}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Status bayar</p>
              <p className="text-sm font-bold text-gray-900">{data.status}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-t border-gray-50 pt-4">
            <div className="flex items-center gap-2">
              <p className="text-xs text-gray-400">Total bayar:</p>
              <p className="text-sm font-bold text-black">{data.totalPrice}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onDetailSewaClick}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition shadow-sm"
              >
                <Info size={16} />
                Detail
              </button>

              {!isProcessed ? (
                <>
                  <button
                    onClick={handleApproveClick}
                    disabled={isLoading}
                    className={`flex items-center justify-center w-9 h-9 ${
                      isLoading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white rounded-full transition shadow-sm relative`}
                    title="Terima"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Check size={18} />
                    )}
                  </button>

                  <button
                    onClick={handleRejectClick}
                    disabled={isLoading}
                    className={`flex items-center justify-center w-9 h-9 ${
                      isLoading
                        ? "bg-red-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    } text-white rounded-full transition shadow-sm relative`}
                    title="Tolak"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <X size={18} />
                    )}
                  </button>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-50">
                    <Check size={20} className="text-gray-300" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <X size={20} className="text-white" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showApprove && <Approve onClose={handleModalClose} />}
      {showReject && <Reject onClose={handleModalClose} />}
    </>
  );
}

function Approve({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full border-4 border-black flex items-center justify-center mb-6">
          <Check size={32} strokeWidth={4} className="text-black" />
        </div>
        <h2 className="text-2xl font-bold text-black mb-3">
          Permohonan telah diterima
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 px-4">
          Permohonan penyewa telah kamu setujui. Jangan lupa untuk menghubungi
          penyewa segera untuk serah terima mobil.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl transition shadow-lg active:scale-95"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
}

function Reject({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full border-4 border-black flex items-center justify-center mb-6">
          <X size={32} strokeWidth={4} className="text-black" />
        </div>

        <h2 className="text-2xl font-bold text-black mb-3">
          Permohonan ditolak
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed mb-8 px-4">
          Kamu menolak permohonan sewa. Kami akan menginformasikan dan
          mengembalikan uang kepada penyewa.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl transition shadow-lg active:scale-95"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
}
