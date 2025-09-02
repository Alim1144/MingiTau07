import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

async function createProduct(formData: FormData): Promise<void> {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim() || null;
  const dailyPrice = Number(formData.get("dailyPrice") || 0);
  const depositPrice = Number(formData.get("depositPrice") || 0);
  const imageUrl = String(formData.get("imageUrl") || "").trim() || null;
  const categoryId = Number(formData.get("categoryId") || 0);
  if (!name || !slug || !categoryId) {
    return;
  }
  await prisma.product.create({
    data: {
      name,
      slug,
      description,
      dailyPrice: Number.isFinite(dailyPrice) ? dailyPrice : 0,
      depositPrice: Number.isFinite(depositPrice) ? depositPrice : 0,
      imageUrl,
      categoryId,
    },
  });
  revalidatePath("/admin/products");
}

async function updateProduct(formData: FormData): Promise<void> {
  "use server";
  const id = Number(formData.get("id") || 0);
  if (!id) return;
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim() || null;
  const dailyPrice = Number(formData.get("dailyPrice") || 0);
  const depositPrice = Number(formData.get("depositPrice") || 0);
  const imageUrl = String(formData.get("imageUrl") || "").trim() || null;
  const categoryId = Number(formData.get("categoryId") || 0);
  await prisma.product.update({
    where: { id },
    data: {
      name,
      slug,
      description,
      dailyPrice: Number.isFinite(dailyPrice) ? dailyPrice : 0,
      depositPrice: Number.isFinite(depositPrice) ? depositPrice : 0,
      imageUrl,
      categoryId: categoryId || undefined,
    },
  });
  revalidatePath("/admin/products");
}

async function deleteProduct(formData: FormData): Promise<void> {
  "use server";
  const id = Number(formData.get("id") || 0);
  if (!id) return;
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
}

async function addProductImage(formData: FormData): Promise<void> {
  "use server";
  const productId = Number(formData.get("productId") || 0);
  const url = String(formData.get("url") || "").trim();
  const alt = String(formData.get("alt") || "").trim() || null;
  if (!productId || !url) return;
  await prisma.productImage.create({
    data: { productId, url, alt },
  });
  revalidatePath("/admin/products");
}

async function deleteProductImage(formData: FormData): Promise<void> {
  "use server";
  const imageId = Number(formData.get("imageId") || 0);
  if (!imageId) return;
  await prisma.productImage.delete({ where: { id: imageId } });
  revalidatePath("/admin/products");
}

export default async function AdminProducts({ searchParams }: { searchParams?: Promise<{ q?: string; page?: string }> }) {
  const { q = "", page = "1" } = (searchParams ? await searchParams : {}) ?? {};
  const pageSize = 12;
  const pageNum = Math.max(1, Number(page) || 1);

  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { slug: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      }
    : {};

  const [total, products, categories] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      include: { category: true, images: true },
      orderBy: { createdAt: "desc" },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Создание */}
      <form action={createProduct} className="rounded-xl border border-white/10 bg-zinc-900 p-6 space-y-4">
        <div className="text-lg font-semibold">Новый товар</div>
        <div className="space-y-2">
          <label className="text-sm">Название</label>
          <input name="name" className="w-full rounded-md border border-white/15 bg-black px-3 py-2" placeholder="Rossignol" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Слаг</label>
          <input name="slug" className="w-full rounded-md border border-white/15 bg-black px-3 py-2" placeholder="rossignol-x7" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Категория</label>
          <select name="categoryId" className="w-full rounded-md border border-white/15 bg-black px-3 py-2" required>
            <option value="">Выберите категорию</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-sm">Цена/день (₽)</label>
            <input name="dailyPrice" type="number" min="0" className="w-full rounded-md border border-white/15 bg-black px-3 py-2" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Залог (₽)</label>
            <input name="depositPrice" type="number" min="0" className="w-full rounded-md border border-white/15 bg-black px-3 py-2" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm">Изображение (URL)</label>
          <input name="imageUrl" className="w-full rounded-md border border-white/15 bg-black px-3 py-2" placeholder="https://..." />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Описание</label>
          <textarea name="description" className="w-full rounded-md border border-white/15 bg-black px-3 py-2" rows={3} />
        </div>
        <button className="rounded-md bg-[var(--accent)] text-white px-4 py-2.5 hover:brightness-110">Создать</button>
      </form>

      {/* Список: поиск, пагинация и редактирование */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div className="text-lg font-semibold">Товары</div>
          <form className="flex items-center gap-2" method="get">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Поиск по названию, слагу, описанию"
              className="w-64 rounded-md border border-white/15 bg-black px-3 py-2 text-sm"
            />
            <button className="rounded-md bg-[var(--accent)] text-white px-3 py-2 text-sm hover:brightness-110">Найти</button>
          </form>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <div key={p.id} className="rounded-xl border border-white/10 bg-zinc-900 p-4 space-y-3">
              <div className="relative aspect-square rounded-md overflow-hidden bg-black/60 border border-white/10">
                {p.imageUrl ? (
                  <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full grid place-items-center text-xs text-zinc-500">Нет изображения</div>
                )}
              </div>
              {p.images && p.images.length > 0 ? (
                <div className="grid grid-cols-5 gap-2">
                  {p.images.map((img) => (
                    <div key={img.id} className="relative aspect-square rounded-md overflow-hidden border border-white/10 bg-zinc-800">
                      <Image src={img.url} alt={img.alt ?? p.name} fill className="object-cover" />
                      <form action={deleteProductImage} className="absolute top-1 right-1">
                        <input type="hidden" name="imageId" value={img.id} />
                        <button className="rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-red-300 border border-red-500/40 hover:bg-red-500/20">×</button>
                      </form>
                    </div>
                  ))}
                </div>
              ) : null}
              <form action={addProductImage} className="grid grid-cols-5 gap-2 items-end">
                <input type="hidden" name="productId" value={p.id} />
                <div className="col-span-3 space-y-1">
                  <label className="text-xs">URL изображения</label>
                  <input name="url" placeholder="https://..." className="w-full rounded-md border border-white/15 bg-black px-2 py-1.5 text-xs" />
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="text-xs">Alt</label>
                  <input name="alt" placeholder="Описание" className="w-full rounded-md border border-white/15 bg-black px-2 py-1.5 text-xs" />
                </div>
                <button className="col-span-5 rounded-md border border-white/15 px-2 py-1.5 text-xs hover:bg-white/10">Добавить в галерею</button>
              </form>
              <form action={updateProduct} className="space-y-3">
                <input type="hidden" name="id" value={p.id} />
                <div className="space-y-1">
                  <label className="text-xs">Название</label>
                  <input name="name" defaultValue={p.name} className="w-full rounded-md border border-white/15 bg-black px-3 py-2 text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs">Слаг</label>
                  <input name="slug" defaultValue={p.slug} className="w-full rounded-md border border-white/15 bg-black px-3 py-2 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs">Цена/день</label>
                    <input name="dailyPrice" type="number" min="0" defaultValue={Number(p.dailyPrice)} className="w-full rounded-md border border-white/15 bg-black px-3 py-2 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs">Залог</label>
                    <input name="depositPrice" type="number" min="0" defaultValue={Number(p.depositPrice)} className="w-full rounded-md border border-white/15 bg-black px-3 py-2 text-sm" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs">Изображение (URL)</label>
                  <input name="imageUrl" defaultValue={p.imageUrl ?? ""} className="w-full rounded-md border border-white/15 bg-black px-3 py-2 text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs">Категория</label>
                  <select name="categoryId" defaultValue={p.category?.id} className="w-full rounded-md border border-white/15 bg-black px-3 py-2 text-sm">
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs">Описание</label>
                  <textarea name="description" defaultValue={p.description ?? ""} rows={3} className="w-full rounded-md border border-white/15 bg-black px-3 py-2 text-sm" />
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex-1 rounded-md bg-[var(--accent)] text-white px-3 py-2 text-sm hover:brightness-110">Сохранить</button>
                </div>
              </form>
              <form action={deleteProduct}>
                <input type="hidden" name="id" value={p.id} />
                <button className="w-full rounded-md border border-red-500/30 text-red-400 px-3 py-2 text-sm hover:bg-red-500/10">Удалить</button>
              </form>
              <Link href={`/product/${p.slug}`} className="block text-xs text-zinc-400 hover:text-zinc-200">Открыть на сайте →</Link>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <div>
            Страница {pageNum} из {totalPages} • Показано {products.length} из {total}
          </div>
          <div className="flex items-center gap-2">
            <Link
              className={`rounded-md border border-white/15 px-3 py-1.5 hover:bg-white/10 ${pageNum <= 1 ? "pointer-events-none opacity-50" : ""}`}
              href={`?q=${encodeURIComponent(q)}&page=${pageNum - 1}`}
            >
              Назад
            </Link>
            <Link
              className={`rounded-md border border-white/15 px-3 py-1.5 hover:bg-white/10 ${pageNum >= totalPages ? "pointer-events-none opacity-50" : ""}`}
              href={`?q=${encodeURIComponent(q)}&page=${pageNum + 1}`}
            >
              Вперёд
            </Link>
          </div>
        </div>
        {products.length === 0 ? (
          <div className="py-6 text-sm text-zinc-400">Нет товаров</div>
        ) : null}
      </div>
    </div>
  );
}


