"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Info, User, Loader2, AlertCircle } from "lucide-react";
import DetailDriver from "./DetailDriver";

export default function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const token = localStorage.getItem("rentoka_token");
        const response = await fetch(
          "https://rentoka.olifemassage.com/api/provider/customer",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          },
        );

        const result = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("rentoka_token");
          router.push("/");
          return;
        }

        if (response.ok) {
          setDrivers(result.data || result);
        } else {
          throw new Error(
            result.message || "Session expired. Please login again.",
          );
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrivers();
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin h-10 w-10 text-black" />
        <p className="text-xs font-black tracking-[0.2em] text-gray-400">
          INITIALIZING DATA
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">Data Drivers</h2>
        <p className="text-gray-500 text-sm mt-1">
          Daftar Pengemudi Rentoka Apps
        </p>
      </header>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600">
          <AlertCircle size={20} />
          <span className="text-sm font-bold">{error}</span>
        </div>
      )}

      <div className="space-y-4">
        {drivers.length > 0 ? (
          drivers.map((driver: any, index: number) => (
            <div
              key={`${driver.id_customer}-${index}`}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-start transition-all hover:shadow-md hover:border-gray-200"
            >
              <div className="w-full md:w-44 h-44 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden">
                <User size={56} className="text-gray-200" />
              </div>

              <div className="flex-1 w-full flex flex-col justify-between min-h-[176px]">
                <div>
                  <h3 className="text-2xl font-black text-black uppercase tracking-tight mb-2 leading-none">
                    {driver.name}
                  </h3>
                  <div className="space-y-1 mb-4">
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                      <span className="font-bold text-gray-900">Alamat:</span>{" "}
                      {driver.address}
                    </p>
                    <p className="text-xs font-bold uppercase tracking-wider">
                      Status: <span className="text-green-600">ACTIVE</span>
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-50">
                  <button
                    onClick={() => setSelectedDriver(driver)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg text-xs font-black transition-all active:scale-95 shadow-lg shadow-blue-100"
                  >
                    <Info size={14} /> LIHAT DETAIL
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <User size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
              No Records Found
            </p>
          </div>
        )}
      </div>

      {selectedDriver && (
        <DetailDriver
          driver={selectedDriver}
          onClose={() => setSelectedDriver(null)}
        />
      )}
    </div>
  );
}
