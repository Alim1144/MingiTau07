import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;
export const runtime = "nodejs";

export default async function CatalogPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Каталог</h1>
      {categories.length === 0 ? (
        <div className="text-zinc-400">Категории пока не добавлены.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {categories.map((c) => (
            <Link key={c.id} href={`/catalog/${c.slug}`} className="group rounded-xl border border-white/10 bg-zinc-900 p-4 hover:bg-zinc-800 transition shadow-sm">
              <div className="font-medium text-base sm:text-lg text-zinc-100 group-hover:underline">{c.name}</div>
              {c.description ? (
                <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{c.description}</p>
              ) : null}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


