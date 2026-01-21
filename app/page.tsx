import Link from "next/link";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl border border-gray-200">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-1">
            <span className="text-4xl font-extrabold tracking-tighter text-black">
              RK
            </span>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-widest uppercase leading-none text-black">
                Rentoka
              </span>
              <div className="bg-black text-white text-[10px] text-center leading-none py-0.5 px-1 mt-0.5">
                レントカー
              </div>
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-500 mt-2">
            Admin Dashboard Penyedia
          </p>
        </div>

        <h2 className="text-3xl font-bold text-black mb-6">Sign In</h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="unknown@gmail.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-900 placeholder-gray-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="**********"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-900 placeholder-gray-400 transition"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm font-bold text-gray-900"
            >
              Remember me
            </label>
          </div>

          <Link
            href="/dashboard"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-black hover:bg-gray-800 transition transform active:scale-95"
          >
            Sign In
          </Link>

          <div className="text-left">
            <Link
              href="#"
              className="text-xs font-bold text-black hover:underline"
            >
              Forgot Password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
