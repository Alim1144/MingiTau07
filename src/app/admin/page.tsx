export default function AdminHome() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <a href="/admin/categories" className="rounded-xl border bg-white p-6 hover:shadow-sm">
        <div className="font-semibold mb-1">Категории</div>
        <div className="text-sm text-zinc-600">Управление разделами каталога</div>
      </a>
      <a href="/admin/products" className="rounded-xl border bg-white p-6 hover:shadow-sm">
        <div className="font-semibold mb-1">Товары</div>
        <div className="text-sm text-zinc-600">Добавление и редактирование позиций</div>
      </a>
    </div>
  );
}


