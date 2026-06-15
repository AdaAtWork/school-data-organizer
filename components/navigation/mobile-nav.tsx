"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mobile nav shows only the 5 most important items — the rest are reachable via Profile
const mobileNavItems = [
  { label: "Dashboard", href: "/dashboard",  icon: LayoutDashboard },
  { label: "Children",  href: "/children",   icon: Users },
  { label: "Homework",  href: "/homework",   icon: BookOpen },
  { label: "Events",    href: "/events",     icon: Calendar },
  { label: "Profile",   href: "/profile",    icon: UserCircle },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-white flex">
      {mobileNavItems.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex flex-col items-center justify-center flex-1 py-3 gap-1 text-xs transition-colors",
            pathname === href
              ? "text-gray-900 font-medium"
              : "text-gray-500 hover:text-gray-900"
          )}
        >
          <Icon className="h-5 w-5" />
          {label}
        </Link>
      ))}
    </nav>
  );
}