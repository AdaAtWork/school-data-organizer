import { Sidebar } from "@/components/navigation/sidebar";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { logout } from "@/modules/auth/actions";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar logoutAction={logout} />

      <div className="flex flex-col flex-1 pb-16 md:pb-0">
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}