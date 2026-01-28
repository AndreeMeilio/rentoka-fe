import { ChevronLeft, Plus, X, UploadCloud, Info, Check } from "lucide-react";
import { useState, useRef, DragEvent } from "react";

interface CarData {
  name: string;
  merk: string;
  plat: string;
  year: string;
  price: string;
  image?: string;
}

interface AddCarProps {
  onClose: () => void;
  onAddCar: (car: CarData) => void;
}

const INPUT_FIELDS = [
  {
    name: "name",
    label: "Nama Kendaraan",
    placeholder: "Contoh: Toyota Avanza",
    type: "text",
  },
  { name: "merk", label: "Merk", placeholder: "Contoh: Toyota", type: "text" },
  {
    name: "year",
    label: "Tahun Keluaran",
    placeholder: "Contoh: 2023",
    type: "number",
  },
  {
    name: "plat",
    label: "Nomor Polisi",
    placeholder: "Contoh: B 1234 CD",
    type: "text",
  },
  {
    name: "price",
    label: "Harga Sewa (per hari)",
    placeholder: "Contoh: 200000",
    type: "number",
  },
];

export default function AddCar({ onClose, onAddCar }: AddCarProps) {
  const [formData, setFormData] = useState<CarData>({
    name: "",
    merk: "",
    year: "",
    plat: "",
    price: "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<CarData>>({});

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CarData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    } else {
      alert("Mohon upload file gambar yang valid!");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleInitialSubmit = () => {
    const newErrors: Partial<CarData> = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof CarData]) {
        newErrors[key as keyof CarData] = "Field ini wajib diisi";
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    setShowSuccess(true);
  };

  const handleFinish = () => {
    onAddCar({
      ...formData,
      image: previewImage || undefined,
    });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200">
        <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl relative flex flex-col max-h-[90vh]">
          <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between bg-white rounded-t-3xl z-10">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <ChevronLeft size={28} className="text-gray-700" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900">Add New Car</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="overflow-y-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {INPUT_FIELDS.map((field) => (
                    <div
                      key={field.name}
                      className={field.name === "name" ? "md:col-span-2" : ""}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {field.label} <span className="text-red-500">*</span>
                      </label>
                      <input
                        name={field.name}
                        type={field.type}
                        value={formData[field.name as keyof CarData]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={`w-full bg-gray-50 border ${
                          errors[field.name as keyof CarData]
                            ? "border-red-500 focus:ring-red-200"
                            : "border-gray-200 focus:ring-black"
                        } rounded-xl px-4 py-3.5 text-sm transition-all outline-none focus:ring-2 focus:bg-white`}
                      />
                      {errors[field.name as keyof CarData] && (
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {errors[field.name as keyof CarData]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Foto Kendaraan
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
                <div
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={() => !previewImage && fileInputRef.current?.click()}
                  className={`group relative h-80 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : previewImage
                        ? "border-gray-200"
                        : "border-gray-300 hover:border-black hover:bg-gray-50"
                  }`}
                >
                  {previewImage ? (
                    <>
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={removeImage}
                          className="bg-white/20 backdrop-blur-md border border-white/50 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-500 hover:border-red-500 transition-colors flex items-center gap-2"
                        >
                          <X size={16} /> Hapus Foto
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        {isDragging ? (
                          <UploadCloud size={32} className="text-blue-500" />
                        ) : (
                          <Plus
                            size={32}
                            className="text-gray-400 group-hover:text-black transition-colors"
                          />
                        )}
                      </div>
                      <p className="text-sm font-bold text-gray-900">
                        {isDragging
                          ? "Lepaskan gambar..."
                          : "Klik untuk upload"}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        atau drag & drop gambar kesini
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-3xl">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleInitialSubmit}
              className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-xl text-sm transition-all shadow-lg shadow-gray-200 hover:shadow-xl active:scale-95 flex items-center gap-2"
            >
              Tambahkan Kendaraan
            </button>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowConfirmation(false)}
          ></div>
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col items-center text-center p-8 border-t-4 border-blue-500">
            <button
              onClick={() => setShowConfirmation(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
            >
              <X size={24} />
            </button>
            <div className="w-20 h-20 rounded-full bg-white border-4 border-black flex items-center justify-center mb-6">
              <Info size={40} className="text-black" strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-bold text-black mb-3">
              Apakah sudah benar?
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 px-2">
              Kami mohon kepada para penyedia untuk lebih teliti dalam mengisi
              data kendaraan yang akan disewakan.
            </p>
            <button
              onClick={handleConfirm}
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95"
            >
              Ya, data sudah diisi dengan benar
            </button>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col items-center text-center p-8">
            <div className="w-20 h-20 rounded-full bg-white border-4 border-black flex items-center justify-center mb-6 animate-in zoom-in duration-300">
              <Check size={40} className="text-black" strokeWidth={3} />
            </div>

            <h3 className="text-2xl font-bold text-black mb-3">
              Kendaraan telah ditambahkan
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed mb-8 px-4">
              Kendaraan berhasil ditambahkan! Tinjau kendaraan sewamu sekarang
              juga.
            </p>

            <button
              onClick={handleFinish}
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95"
            >
              Lanjutkan
            </button>
          </div>
        </div>
      )}
    </>
  );
}
