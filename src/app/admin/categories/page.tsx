import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function createCategory(formData: FormData): Promise<void> {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim() || null;
  if (!name || !slug) {
    return;
  }
  await prisma.category.create({ data: { name, slug, description } });
  revalidatePath("/admin/categories");
}

export default async function AdminCategories() {
  const categories = await prisma.category.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <form action={createCategory} className="rounded-xl border border-white/10 bg-zinc-900 p-6 space-y-4">
        <div className="text-lg font-semibold">Новая категория</div>
        <div className="space-y-2">
          <label className="text-sm">Название</label>
          <input name="name" className="w-full rounded-md border border-white/15 bg-black px-3 py-2" placeholder="Лыжи" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Слаг</label>
          <input name="slug" className="w-full rounded-md border border-white/15 bg-black px-3 py-2" placeholder="lyzhi" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Описание</label>
          <textarea name="description" className="w-full rounded-md border border-white/15 bg-black px-3 py-2" rows={3} />
        </div>
        <button className="rounded-md bg-[var(--accent)] text-white px-4 py-2.5 hover:brightness-110">Создать</button>
      </form>

      <div className="lg:col-span-2 rounded-xl border border-white/10 bg-zinc-900 p-6">
        <div className="text-lg font-semibold mb-4">Категории</div>
        <div className="divide-y divide-white/10">
          {categories.map((c) => (
            <div key={c.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-xs text-zinc-400">/{c.slug}</div>
              </div>
              <Link href={`/catalog/${c.slug}`} className="text-sm hover:underline">Открыть</Link>
            </div>
          ))}
          {categories.length === 0 ? (
            <div className="py-6 text-sm text-zinc-400">Нет категорий</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}


