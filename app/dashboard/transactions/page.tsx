"use client";

import { useState } from "react";
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
}

export default function TransactionsPage() {
  const [selectedPermintaanSewa, setSelectedPermintaanSewa] =
    useState<TransactionDataType | null>(null);

  const transactions: TransactionDataType[] = [
    {
      id: 1,
      name: "Kaedehara Kazuha",
      date: "07-01-2026",
      carName: "Toyota Agya",
      duration: "3 hari",
      status: "Lunas",
      totalPrice: "Rp 600.000",
      imageColor: "bg-orange-400",
      ktp: "002118844719911",
      phone: "0824-7891-1212",
      email: "kaedehara@gmail.com",
      address:
        "Jl. Onikabuto, Blok D8, Pelabuhan Ritou, Pulau Narukami, Inazuma, 21145",
    },
    {
      id: 2,
      name: "Ujang Septiadi",
      date: "06-01-2026",
      carName: "Honda Civic",
      duration: "1 hari",
      status: "Pending",
      totalPrice: "Rp 220.000",
      imageColor: "bg-blue-400",
      ktp: "112233445566778",
      phone: "0819-9988-7766",
      email: "ujang.septiadi@starrail.com",
      address:
        "Jl. Imaginary Tree, Jarilo-VI, Backwater Pass, Descender, Teyvat, 66666",
    },
  ];

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
