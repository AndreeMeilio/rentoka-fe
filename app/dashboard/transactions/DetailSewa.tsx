"use client";

import { useEffect, useState } from "react";
import {
  User,
  X,
  MapPin,
  Calendar,
  Car,
  CreditCard,
  Wallet,
} from "lucide-react";
import { TransactionDataType } from "./page";

interface DetailTransactionData {
  id_transaction: number;
  transaction_date: string;
  total_price: number;
  transaction_status: string;
  rental_period: number;
  return_date: string;
  customer: {
    id_customer: number;
    name: string;
    address: string;
    phone_number: string;
    id_card: string;
    email: string;
  };
  provider: {
    id_provider: number;
    name: string;
    position: string;
    phone_number: string;
    address: string;
  };
  vehicle: {
    id_vehicle: number;
    vehicle_name: string;
    brand: string;
    year: number;
    police_number: string;
    rental_price: number;
    image_path: string | null;
  };
  payment: {
    id_payment: number;
    payment_date: string;
    payment_method: string;
    payment_total: number;
    payment_status: string;
  };
}

interface DetailSewaProps {
  transaction: TransactionDataType;
  onClose: () => void;
}

export default function DetailSewa({ transaction, onClose }: DetailSewaProps) {
  const [detailData, setDetailData] = useState<DetailTransactionData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionDetail = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const res = await fetch(
          `https://rentoka.olifemassage.com/api/provider/transaction?id_transaction=${transaction.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const json = await res.json();
        console.log("transaction detail response:", json);

        if (json.success && json.data) {
          setDetailData(json.data);
        }
      } catch (err) {
        console.error("Error fetching transaction detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetail();
  }, [transaction.id]);

  // Format tanggal
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    const [year, month, day] = dateStr.split("-");
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return `${parseInt(day)} ${monthNames[parseInt(month) - 1]} ${year}`;
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get payment status text and color
  const getPaymentStatus = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return { text: "Lunas", color: "bg-green-100 text-green-700" };
      case "PENDING":
        return { text: "Menunggu", color: "bg-yellow-100 text-yellow-700" };
      case "FAILED":
        return { text: "Gagal", color: "bg-red-100 text-red-700" };
      default:
        return { text: status, color: "bg-gray-100 text-gray-700" };
    }
  };

  // Get transaction status text and color
  const getTransactionStatus = (status: string) => {
    switch (status) {
      case "REQUESTED":
        return { text: "Diminta", color: "bg-blue-100 text-blue-700" };
      case "APPROVED":
        return { text: "Disetujui", color: "bg-green-100 text-green-700" };
      case "ONGOING":
        return { text: "Berlangsung", color: "bg-purple-100 text-purple-700" };
      case "COMPLETED":
        return { text: "Selesai", color: "bg-gray-100 text-gray-700" };
      case "CANCELLED":
        return { text: "Dibatalkan", color: "bg-red-100 text-red-700" };
      default:
        return { text: status, color: "bg-gray-100 text-gray-700" };
    }
  };

  // Get payment method text
  const getPaymentMethod = (method: string) => {
    switch (method) {
      case "CASH":
        return "Tunai";
      case "TRANSFER":
        return "Transfer Bank";
      case "E_WALLET":
        return "E-Wallet";
      default:
        return method;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition z-10"
        >
          <X size={24} className="text-gray-500" />
        </button>

        <div className="p-8 max-h-[90vh] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : detailData ? (
            <>
              {/* Personal Information - Customer */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-black border-b border-gray-200 pb-3 mb-6 flex items-center gap-2">
                  <User size={20} />
                  Informasi Penyewa
                </h3>

                <div className="flex flex-col md:flex-row gap-6">
                  <div
                    className={`w-32 h-32 ${transaction.imageColor} rounded-xl flex items-center justify-center shrink-0`}
                  >
                    <User size={48} className="text-white/50" />
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <div>
                      <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                        <User size={12} />
                        Nama Lengkap
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {detailData.customer.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                        <CreditCard size={12} />
                        No. KTP
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {detailData.customer.id_card}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        No. Handphone
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {detailData.customer.phone_number}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Alamat Email</p>
                      <p className="text-sm font-bold text-gray-900 break-all">
                        {detailData.customer.email}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                        <MapPin size={12} />
                        Alamat
                      </p>
                      <p className="text-sm font-bold text-gray-900 leading-relaxed">
                        {detailData.customer.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-black border-b border-gray-200 pb-3 mb-6 flex items-center gap-2">
                  <Car size={20} />
                  Informasi Kendaraan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Nama Mobil</p>
                    <p className="text-sm font-bold text-gray-900">
                      {detailData.vehicle.brand}{" "}
                      {detailData.vehicle.vehicle_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Plat Nomor</p>
                    <p className="text-sm font-bold text-gray-900">
                      {detailData.vehicle.police_number}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Tahun Kendaraan
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {detailData.vehicle.year}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Harga Sewa/Hari
                    </p>
                    <p className="text-sm font-bold text-blue-600">
                      {formatCurrency(detailData.vehicle.rental_price)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Transaction Information */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-black border-b border-gray-200 pb-3 mb-6 flex items-center gap-2">
                  <Calendar size={20} />
                  Informasi Transaksi
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Tanggal Sewa</p>
                    <p className="text-sm font-bold text-gray-900">
                      {formatDate(detailData.transaction_date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Tanggal Pengembalian
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {formatDate(detailData.return_date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Durasi Sewa</p>
                    <p className="text-sm font-bold text-gray-900">
                      {detailData.rental_period} hari
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Status Transaksi
                    </p>
                    <span
                      className={`inline-block px-3 py-1.5 rounded-lg text-sm font-bold ${
                        getTransactionStatus(detailData.transaction_status)
                          .color
                      }`}
                    >
                      {getTransactionStatus(detailData.transaction_status).text}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Total Biaya</p>
                    <p className="text-lg font-bold text-blue-600">
                      {formatCurrency(detailData.total_price)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-black border-b border-gray-200 pb-3 mb-6 flex items-center gap-2">
                  <Wallet size={20} />
                  Informasi Pembayaran
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Tanggal Pembayaran
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {formatDate(detailData.payment.payment_date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Metode Pembayaran
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {getPaymentMethod(detailData.payment.payment_method)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Total Pembayaran
                    </p>
                    <p className="text-lg font-bold text-blue-600">
                      {formatCurrency(detailData.payment.payment_total)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Status Pembayaran
                    </p>
                    <span
                      className={`inline-block px-3 py-1.5 rounded-lg text-sm font-bold ${
                        getPaymentStatus(detailData.payment.payment_status)
                          .color
                      }`}
                    >
                      {getPaymentStatus(detailData.payment.payment_status).text}
                    </span>
                  </div>
                </div>
              </div>

              {/* Provider Information (Optional) */}
              <div className="mb-8 bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                  <User size={18} />
                  Informasi Penyedia
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Nama</p>
                    <p className="text-sm font-bold text-gray-900">
                      {detailData.provider.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Posisi</p>
                    <p className="text-sm font-bold text-gray-900">
                      {detailData.provider.position}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">No. Handphone</p>
                    <p className="text-sm font-bold text-gray-900">
                      {detailData.provider.phone_number}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Alamat</p>
                    <p className="text-sm font-bold text-gray-900">
                      {detailData.provider.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-lg active:scale-95"
                >
                  Tutup
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Data transaksi tidak ditemukan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
