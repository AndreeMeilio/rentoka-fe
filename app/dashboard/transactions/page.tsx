"use client";

import { useState } from "react";
import PermintaanSewa from "./PermintaanSewa";
import DetailSewa from "./DetailSewa";
import { useEffect } from "react";

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
}

export default function TransactionsPage() {
  const [selectedPermintaanSewa, setSelectedPermintaanSewa] =
    useState<TransactionDataType | null>(null);

  const [transactions, setTransactions] = useState<TransactionDataType[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://rentoka.olifemassage.com/api/provider/transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const json = await res.json();

        const data = json.data ?? [];

        const mappedData: TransactionDataType[] = data.map((item: any) => ({
          id: item.id,
          name: item.customer_name,
          date: item.date,
          carName: item.car_name,
          duration: `${item.duration} hari`,
          status: item.status,
          totalPrice: item.total_price,
          imageColor:
            item.status === "Pending" ? "bg-blue-400" : "bg-orange-400",
          ktp: item.ktp,
          phone: item.phone,
          email: item.email,
          address: item.address,
        }));

        setTransactions(mappedData);
      } catch (error) {
        console.error("Gagal ambil transaksi:", error);
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

      <div className="space-y-4">
        {transactions.map((trx) => (
          <PermintaanSewa
            key={trx.id}
            data={trx}
            onDetailSewaClick={() => setSelectedPermintaanSewa(trx)}
          />
        ))}
      </div>

      {selectedPermintaanSewa && (
        <DetailSewa
          transaction={selectedPermintaanSewa}
          onClose={() => setSelectedPermintaanSewa(null)}
        />
      )}
    </div>
  );
}
