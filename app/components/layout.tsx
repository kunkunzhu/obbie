/** @format */
import NavHeader from "./header/NavHeader";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen">
      <NavHeader />
      {children}
    </div>
  );
}
