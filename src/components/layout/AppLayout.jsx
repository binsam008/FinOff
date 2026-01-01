import Topbar from "./Topbar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <main className="flex-1 px-6 py-6 max-w-[1400px] mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
