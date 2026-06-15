"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  FileCheck,
  Paperclip,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard",       href: "/dashboard",       icon: LayoutDashboard },
  { label: "Children",        href: "/children",        icon: Users },
  { label: "Homework",        href: "/homework",        icon: BookOpen },
  { label: "Events",          href: "/events",          icon: Calendar },
  { label: "Permission Slips",href: "/permission-slips",icon: FileCheck },
  { label: "Attachments",     href: "/attachments",     icon: Paperclip },
  { label: "Profile",         href: "/profile",         icon: UserCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-60 min-h-screen border-r bg-white px-3 py-6 gap-1">
      <div className="px-3 mb-6">
        <h1 className="font-semibold text-sm text-gray-900 leading-tight">
          School Communication<br />Organizer
        </h1>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              pathname === href
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}