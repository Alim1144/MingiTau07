import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(59,130,246,0.15)] via-transparent to-transparent" />
          </div>
          <Container className="py-10 sm:py-16">
            <div className="space-y-5 max-w-2xl">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-1">Аренда горнолыжной экипировки</h1>
              <p className="text-base sm:text-lg text-zinc-200">Лыжи, сноуборды, ботинки, шлемы и защита. Быстрое оформление и удобный самовывоз.</p>
              <div className="mt-4 grid grid-cols-1 sm:flex sm:flex-row gap-3">
                <Button><a href="#catalog">Смотреть каталог</a></Button>
                <Button variant="secondary"><a href="#how">Как арендовать</a></Button>
              </div>
            </div>
          </Container>
        </section>

        <section id="catalog" className="py-10 sm:py-14">
          <Container>
            <div className="flex items-start sm:items-end justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-semibold">Категории</h2>
              <Link href="/catalog" className="hidden sm:inline text-sm text-zinc-300 hover:text-white">Открыть весь каталог →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {[
                { title: "Лыжи", img: "/skis.svg", href: "/catalog/lyzhi" },
                { title: "Сноуборды", img: "/snowboard.svg", href: "/catalog/snoubordy" },
                { title: "Ботинки", img: "/boots.svg", href: "/catalog/botinki" },
                { title: "Шлемы и защита", img: "/helmet.svg", href: "/catalog/shlemy" },
              ].map((c) => (
                <Link key={c.title} href={c.href} className="group rounded-xl border border-white/10 bg-zinc-900 p-4 hover:bg-zinc-800 transition shadow-sm">
                  <div className="relative h-24 sm:h-28 mb-2 rounded-lg bg-zinc-800/50">
                    <Image src={c.img} alt={c.title} fill className="object-contain p-5" />
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-zinc-100 group-hover:underline">{c.title}</div>
                </Link>
              ))}
            </div>
            <div className="sm:hidden mt-4">
              <Link href="/catalog" className="text-sm text-zinc-300 hover:text-white">Открыть весь каталог →</Link>
            </div>
          </Container>
        </section>

        <section id="how" className="border-t border-b border-white/10 bg-zinc-950">
          <Container className="py-10 sm:py-14 grid md:grid-cols-3 gap-4 sm:gap-8">
            {[
              { t: "Выбор", d: "Выберите размер и даты аренды в каталоге." },
              { t: "Подтверждение", d: "Мы свяжемся для уточнения и подтверждения заказа." },
              { t: "Забор и возврат", d: "Заберите снаряжение в пункте выдачи и верните вовремя." },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-black p-4">
                <div className="text-xs text-zinc-400 mb-2">Шаг {i + 1}</div>
                <div className="font-semibold mb-1 text-zinc-100">{s.t}</div>
                <div className="text-zinc-400 text-sm">{s.d}</div>
              </div>
            ))}
          </Container>
        </section>

        <section id="contacts" className="py-10 sm:py-14">
          <Container>
            <div className="rounded-2xl border border-white/10 p-5 sm:p-8 grid md:grid-cols-2 gap-5 items-center bg-zinc-950">
              <div>
                <h3 className="text-xl font-semibold mb-2">Есть вопросы?</h3>
                <p className="text-zinc-400 mb-4">Позвоните нам или напишите в мессенджер. Поможем подобрать снаряжение и забронировать.</p>
                <div className="space-y-2 text-sm">
                  <div>Телефон: <a href="tel:+79990000000" className="hover:underline">+7 (999) 000-00-00</a></div>
                  <div>Telegram: <a href="https://t.me/username" className="hover:underline">@username</a></div>
                  <div>Адрес пункта выдачи: г. Нальчик, Минги-Тау</div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black p-6 text-sm text-zinc-300">
                График: ежедневно 09:00–21:00. Не забудьте паспорт для оформления аренды.
              </div>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}
