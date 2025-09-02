import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { images: true, category: true },
  });

  if (!product) return notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="rounded-xl border border-white/10 bg-zinc-900 p-3 sm:p-4 shadow-sm">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black">
            {product.imageUrl ? (
              <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full grid place-items-center text-zinc-500 text-sm">Нет фото</div>
            )}
          </div>
          {product.images.length > 0 ? (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {product.images.map((img) => (
                <div key={img.id} className="relative aspect-square rounded-md overflow-hidden border border-white/10 bg-zinc-800">
                  <Image src={img.url} alt={img.alt ?? product.name} fill className="object-cover" />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">{product.name}</h1>
          <div className="text-sm text-zinc-400 mb-4">Категория: {product.category.name}</div>
          <div className="text-lg font-medium mb-6">Цена: от {String(product.dailyPrice)} ₽/день • Залог: {String(product.depositPrice)} ₽</div>
          {product.description ? (
            <p className="text-zinc-300 mb-6 whitespace-pre-line">{product.description}</p>
          ) : null}
          <div className="flex gap-3">
            <button className="rounded-md bg-white text-black px-4 py-2.5 hover:bg-zinc-200">Забронировать</button>
            <a href="/catalog" className="rounded-md border border-white/10 px-4 py-2.5 hover:bg-zinc-800">Вернуться в каталог</a>
          </div>
        </div>
      </div>
      {/* Sticky CTA on mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/80 backdrop-blur px-4 py-3 flex items-center justify-between gap-3" style={{paddingBottom: "max(env(safe-area-inset-bottom), 12px)"}}>
        <div className="text-sm text-zinc-300">от {String(product.dailyPrice)} ₽/день</div>
        <button className="rounded-md bg-white text-black px-4 py-2.5 font-medium">Забронировать</button>
      </div>
    </div>
  );
}


