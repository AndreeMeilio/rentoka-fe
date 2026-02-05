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
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/");
          return;
        }

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
          localStorage.removeItem("token");
          router.push("/");
          return;
        }

        if (response.ok) {
          setDrivers(result.data || result);
        } else {
          throw new Error(
            result.message || "Invalid token format or session expired.",
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
        <p className="text-xs font-black tracking-[0.2em] text-gray-400 uppercase">
          Initializing Data
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">Data Drivers</h2>
        <p className="text-gray-500 text-sm mt-1">
          DAFTAR PENGEMUDI DI RENTOKA APPS
        </p>
      </header>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600">
          <AlertCircle size={20} />
          <span className="text-sm font-bold uppercase tracking-tight">
            {error}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {drivers.length > 0
          ? drivers.map((driver: any, index: number) => (
              <div
                key={`${driver.id_customer}-${index}`}
                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-start transition-all hover:shadow-md hover:border-gray-200"
              >
                <div className="w-full md:w-32 h-32 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden shadow-inner">
                  <User size={40} className="text-gray-200" />
                </div>

                <div className="flex-1 w-full flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-black text-black uppercase tracking-tight mb-2">
                      {driver.name}
                    </h3>
                    <div className="space-y-1 mb-4">
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-1">
                        <span className="font-bold text-gray-900">Alamat:</span>{" "}
                        {driver.address || "Belum Mengisi Alamat"}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-green-600">
                          PENGEMUDI TERVERIFIKASI
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3 border-t border-gray-50">
                    <button
                      onClick={() => setSelectedDriver(driver)}
                      className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-2.5 rounded-xl text-[10px] font-black transition-all active:scale-95 shadow-lg"
                    >
                      <Info size={14} /> LIHAT PROFIL LENGKAP
                    </button>
                  </div>
                </div>
              </div>
            ))
          : !error && (
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
