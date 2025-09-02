import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;
export const runtime = "nodejs";

export default async function CatalogPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Ассортимент</h1>
      {products.length === 0 ? (
        <div className="text-zinc-400">Товары пока не добавлены.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((p) => (
            <Link key={p.id} href={`/product/${p.slug}`} className="group rounded-xl border border-white/10 bg-zinc-900 hover:bg-zinc-800 transition shadow-sm">
              <div className="relative aspect-[4/3] rounded-t-xl overflow-hidden bg-black">
                {p.imageUrl ? (
                  <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full grid place-items-center text-zinc-500 text-sm">Нет фото</div>
                )}
              </div>
              <div className="p-3">
                <div className="font-medium text-base sm:text-lg text-zinc-100 group-hover:underline">{p.name}</div>
                <div className="text-xs sm:text-sm text-zinc-400 mt-1">от {String(p.dailyPrice)} ₽/день</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


