export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Админ-панель</h1>
        <nav className="flex gap-3 text-sm">
          <a href="/admin" className="hover:underline">Главная</a>
          <a href="/admin/categories" className="hover:underline">Категории</a>
          <a href="/admin/products" className="hover:underline">Товары</a>
        </nav>
      </header>
      {children}
    </div>
  );
}


