"use client";
import { sidebarItems } from "@/features/sidebarItems";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col p-4 min-h-screen text-sidebar-foreground">
      <div className="flex flex-col items-center gap-2 mb-8">
  <Image src="/logo.svg" alt="Logo" width={256} height={128}  priority />
        
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {sidebarItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <li
                key={item.path}
                className={
                  pathname === item.path
                    ? "bg-primary text-primary-foreground rounded-lg px-3 py-2 font-medium flex items-center gap-2"
                    : "px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground flex items-center gap-2 transition-smooth"
                }
              >
                <Icon  />
                <Link href={item.path} className="block w-full">
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto flex items-center gap-2 pt-8">
        <div className="bg-sidebar-primary rounded-full w-8 h-8 flex items-center justify-center text-sidebar-primary-foreground font-bold">
          A
        </div>
        <div>
          <div className="font-semibold text-sm">Admin Yolo Bank</div>
          <div className="text-xs text-muted-foreground">admin@yolobank.com</div>
        </div>
      </div>
    </aside>
  );
}