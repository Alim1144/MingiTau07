import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

async function getDefaultCategoryId(): Promise<number> {
  const existing = await prisma.category.findFirst({ orderBy: { id: "asc" } });
  if (existing) return existing.id;
  const created = await prisma.category.upsert({
    where: { slug: "assortiment" },
    update: {},
    create: { slug: "assortiment", name: "Ассортимент" },
  });
  return created.id;
}

async function createProduct(formData: FormData): Promise<void> {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim() || null;
  const dailyPrice = Number(formData.get("dailyPrice") || 0);
  const depositPrice = Number(formData.get("depositPrice") || 0);
  const imageFile = formData.get("imageFile");
  if (!name) return;
  const makeSlug = (v: string) => v.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "").replace(/-+/g, "-").replace(/^-|-$|_/g, "");
  const slug = makeSlug(name);
  let imageUrl: string | null = null;
  if (imageFile && imageFile instanceof Blob) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const type = imageFile.type || "image/jpeg";
    imageUrl = `data:${type};base64,${buffer.toString("base64")}`;
  }
  const categoryId = await getDefaultCategoryId();
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
  const description = String(formData.get("description") || "").trim() || null;
  const dailyPrice = Number(formData.get("dailyPrice") || 0);
  const depositPrice = Number(formData.get("depositPrice") || 0);
  const imageFile = formData.get("imageFile");
  const data: Partial<{ description: string | null; dailyPrice: number; depositPrice: number; imageUrl: string | null }> = {
    description,
    dailyPrice: Number.isFinite(dailyPrice) ? dailyPrice : 0,
    depositPrice: Number.isFinite(depositPrice) ? depositPrice : 0,
  };
  if (imageFile && imageFile instanceof Blob) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const type = imageFile.type || "image/jpeg";
    data.imageUrl = `data:${type};base64,${buffer.toString("base64")}`;
  }
  await prisma.product.update({ where: { id }, data });
  revalidatePath("/admin/products");
}

async function deleteProduct(formData: FormData): Promise<void> {
  "use server";
  const id = Number(formData.get("id") || 0);
  if (!id) return;
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
}

// Удалены функции управления галереей для минимализма интерфейса

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="space-y-6">
      <form action={createProduct} className="rounded-xl border border-white/10 bg-zinc-900 p-6 space-y-4">
        <div className="text-lg font-semibold">Новый товар</div>
        <div className="space-y-2">
          <label className="text-sm">Название</label>
          <input name="name" className="w-full rounded-md border border-white/15 bg-black px-3 py-2" placeholder="Название" required />
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
          <label className="text-sm">Фото товара (файл)</label>
          <input type="file" name="imageFile" accept="image/*" className="w-full rounded-md border border-white/15 bg-black px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Описание</label>
          <textarea name="description" className="w-full rounded-md border border-white/15 bg-black px-3 py-2" rows={3} />
        </div>
        <button className="rounded-md bg-[var(--accent)] text-white px-4 py-2.5 hover:brightness-110">Создать</button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="rounded-xl border border-white/10 bg-zinc-900 p-4 space-y-3">
            <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-black/60 border border-white/10">
              {p.imageUrl ? (
                <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full grid place-items-center text-xs text-zinc-500">Нет изображения</div>
              )}
            </div>
            <form action={updateProduct} className="space-y-3">
              <input type="hidden" name="id" value={p.id} />
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
                <label className="text-xs">Новое фото (файл)</label>
                <input type="file" name="imageFile" accept="image/*" className="w-full rounded-md border border-white/15 bg-black px-3 py-2 text-sm" />
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
      {products.length === 0 ? (
        <div className="py-6 text-sm text-zinc-400">Нет товаров</div>
      ) : null}
    </div>
  );
}


