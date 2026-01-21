"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Car, CreditCard, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Drivers",
      href: "/dashboard/drivers",
      icon: Users,
    },
    {
      name: "Add or Remove Car",
      href: "/dashboard/cars",
      icon: Car,
    },
    {
      name: "Transaction",
      href: "/dashboard/transactions",
      icon: CreditCard,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F3F4F1] font-sans">
      <aside className="w-64 bg-[#1E2029] text-white flex flex-col fixed h-full z-10">
        <div className="p-8 pb-4">
          <h1 className="text-4xl font-extrabold tracking-tighter flex items-center justify-center text-white">
            RK
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-6">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mb-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full bg-[#2A2D3A] py-3 rounded-lg text-gray-300 hover:text-white hover:bg-[#323645] transition"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-10">{children}</main>
    </div>
  );
}
