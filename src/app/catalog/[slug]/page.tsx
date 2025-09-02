import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props {
  params: { slug: string };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = params;
  const category = await prisma.category.findUnique({
    where: { slug },
    include: { products: true },
  });

  if (!category) return notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">{category.name}</h1>
      {category.description ? (
        <p className="text-zinc-600 mb-6">{category.description}</p>
      ) : null}
      {category.products.length === 0 ? (
        <div className="text-zinc-600">Товары в этой категории пока не добавлены.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.products.map((p) => (
            <Link key={p.id} href={`/product/${p.slug}`} className="group rounded-xl border bg-white p-4 hover:shadow-sm">
              <div className="relative h-40 mb-3 rounded-lg border bg-zinc-50 overflow-hidden">
                {p.imageUrl ? (
                  <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full grid place-items-center text-zinc-400 text-sm">Нет фото</div>
                )}
              </div>
              <div className="font-medium group-hover:underline">{p.name}</div>
              <div className="text-sm text-zinc-600 mt-1">от {String(p.dailyPrice)} ₽/день</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


