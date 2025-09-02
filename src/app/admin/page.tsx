export default function AdminHome() {
  return (
    <div className="max-w-lg">
      <a href="/admin/products" className="block rounded-xl border border-white/10 bg-zinc-900 p-6 hover:bg-zinc-800">
        <div className="font-semibold mb-1">Товары</div>
        <div className="text-sm text-zinc-400">Загрузка фото, цена и описание</div>
      </a>
    </div>
  );
}


