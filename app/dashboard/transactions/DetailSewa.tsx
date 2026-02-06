import { useEffect, useState } from "react";
import { User, X } from "lucide-react";

interface TransactionData {
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

interface DetailSewaProps {
  transactionId: number;
  onClose: () => void;
}

export default function DetailSewa({ transactionId, onClose }: DetailSewaProps) {
  const [transaction, setTransaction] = useState<TransactionData | null>(null);

  useEffect(() => {
    fetch(`https://rentoka.olifemassage.com/api/provider/transactions/${transactionId}`)
      .then(res => res.json())
      .then(data => setTransaction(data))
      .catch(err => console.error(err));
  }, [transactionId]);

  if (!transaction) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
        >
          <X size={24} className="text-gray-500" />
        </button>

        <div className="p-8 max-h-[90vh] overflow-y-auto">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-black border-b border-gray-200 pb-3 mb-6">
              Personal Information
            </h3>

            <div className="flex flex-col md:flex-row gap-6">
              <div
                className={`w-32 h-32 ${transaction.imageColor} rounded-xl flex items-center justify-center shrink-0`}
              >
                <User size={48} className="text-white/50" />
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Nama Lengkap</p>
                  <p className="text-sm font-bold text-gray-900">{transaction.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">No. KTP</p>
                  <p className="text-sm font-bold text-gray-900">{transaction.ktp}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">No. Handphone</p>
                  <p className="text-sm font-bold text-gray-900">{transaction.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Alamat Email</p>
                  <p className="text-sm font-bold text-gray-900">{transaction.email}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-gray-400 mb-1">Alamat</p>
                  <p className="text-sm font-bold text-gray-900 leading-relaxed">{transaction.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-black border-b border-gray-200 pb-3 mb-6">
              Transaction Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-gray-400 mb-1">Tanggal Sewa</p>
                <p className="text-sm font-bold text-gray-900">{transaction.date}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Mobil Disewa</p>
                <p className="text-sm font-bold text-gray-900">{transaction.carName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Durasi</p>
                <p className="text-sm font-bold text-gray-900">{transaction.duration}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Total Biaya</p>
                <p className="text-lg font-bold text-blue-600">{transaction.totalPrice}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Status Pembayaran</p>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                    transaction.status === "Lunas"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {transaction.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
