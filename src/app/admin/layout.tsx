import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Админ-панель</h1>
        <nav className="flex gap-3 text-sm">
          <Link href="/admin" className="hover:underline">Главная</Link>
          <Link href="/admin/products" className="hover:underline">Товары</Link>
        </nav>
      </header>
      {children}
    </div>
  );
}


