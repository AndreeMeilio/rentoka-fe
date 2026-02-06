"use client";

import { useState, useEffect } from "react";
import PermintaanSewa from "./PermintaanSewa";
import DetailSewa from "./DetailSewa";

export interface TransactionDataType {
  id: number;
  name: string;
  date: string;
  carName: string;
  duration: string;
  status: string;
  totalPrice: string;
  imageColor: string;
  ktp: string;
  phone: string;
  email: string;
  address: string;
  // Additional fields from API
  brand: string;
  policeNumber: string;
  rentalPrice: number;
  paymentStatus: string;
  transactionStatus: string;
  vehicleStatus: string;
}

export default function TransactionsPage() {
  const [selectedPermintaanSewa, setSelectedPermintaanSewa] =
    useState<TransactionDataType | null>(null);
  const [transactions, setTransactions] = useState<TransactionDataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://rentoka.olifemassage.com/api/provider/transaction",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const json = await res.json();
        console.log("transaction response:", json);

        const data = json.data ?? [];

        const mappedData: TransactionDataType[] = data.map((item: any) => {
          // Format tanggal dari YYYY-MM-DD ke DD/MM/YYYY
          const formatDate = (dateStr: string) => {
            if (!dateStr) return "-";
            const [year, month, day] = dateStr.split("-");
            return `${day}/${month}/${year}`;
          };

          // Format harga ke Rupiah
          const formatCurrency = (amount: number) => {
            return new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(amount);
          };

          // Tentukan status pembayaran dalam bahasa Indonesia
          const getPaymentStatusText = (status: string) => {
            switch (status) {
              case "SUCCESS":
                return "Lunas";
              case "PENDING":
                return "Menunggu";
              case "FAILED":
                return "Gagal";
              default:
                return status;
            }
          };

          // Tentukan warna berdasarkan transaction_status
          const getImageColor = (status: string) => {
            switch (status) {
              case "REQUESTED":
                return "bg-blue-400";
              case "APPROVED":
                return "bg-green-400";
              case "ONGOING":
                return "bg-purple-400";
              case "COMPLETED":
                return "bg-gray-400";
              case "CANCELLED":
                return "bg-red-400";
              default:
                return "bg-orange-400";
            }
          };

          return {
            id: item.id_transaction,
            name: item.customer_name || "-",
            date: formatDate(item.transaction_date),
            carName: `${item.brand} ${item.vehicle_name}` || "-",
            duration: `${item.rental_period || 0} hari`,
            status: getPaymentStatusText(item.payment_status),
            totalPrice: formatCurrency(item.total_price || 0),
            imageColor: getImageColor(item.transaction_status),
            ktp: item.ktp || "-",
            phone: item.phone || "-",
            email: item.email || "-",
            address: item.address || "-",
            // Additional fields
            brand: item.brand || "-",
            policeNumber: item.police_number || "-",
            rentalPrice: item.rental_price || 0,
            paymentStatus: item.payment_status,
            transactionStatus: item.transaction_status,
            vehicleStatus: item.vehicle_status,
          };
        });

        setTransactions(mappedData);
      } catch (error) {
        console.error("Gagal ambil transaksi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Permintaan Sewa</h2>
        <p className="text-gray-500 text-sm mt-1">
          Tinjau Permintaan sewa mobilmu, Mohon untuk teliti ya
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.length > 0 ? (
            transactions.map((trx) => (
              <PermintaanSewa
                key={trx.id}
                data={trx}
                onDetailSewaClick={() => setSelectedPermintaanSewa(trx)}
              />
            ))
          ) : (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
              <p className="text-gray-500">Belum ada permintaan sewa</p>
            </div>
          )}
        </div>
      )}

      {selectedPermintaanSewa && (
        <DetailSewa
          transaction={selectedPermintaanSewa}
          onClose={() => setSelectedPermintaanSewa(null)}
        />
      )}
    </div>
  );
}
