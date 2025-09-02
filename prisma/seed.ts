import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const komplekty = await prisma.category.upsert({
    where: { slug: "komplekty" },
    update: {},
    create: { slug: "komplekty", name: "Комплекты" },
  });
  const sb = await prisma.category.upsert({
    where: { slug: "snoubordy" },
    update: {},
    create: { slug: "snoubordy", name: "Сноуборды" },
  });
  const sbBoots = await prisma.category.upsert({
    where: { slug: "botinki-dlya-snouborda" },
    update: {},
    create: { slug: "botinki-dlya-snouborda", name: "Ботинки для сноуборда" },
  });
  const ski = await prisma.category.upsert({
    where: { slug: "lyzhi" },
    update: {},
    create: { slug: "lyzhi", name: "Горные лыжи" },
  });
  const skiBoots = await prisma.category.upsert({
    where: { slug: "lyzhnye-botinki" },
    update: {},
    create: { slug: "lyzhnye-botinki", name: "Лыжные ботинки" },
  });
  const poles = await prisma.category.upsert({
    where: { slug: "lyzhnye-palki" },
    update: {},
    create: { slug: "lyzhnye-palki", name: "Лыжные палки" },
  });
  const clothes = await prisma.category.upsert({
    where: { slug: "odezhda" },
    update: {},
    create: { slug: "odezhda", name: "Одежда" },
  });
  const helmets = await prisma.category.upsert({
    where: { slug: "shlemy" },
    update: {},
    create: { slug: "shlemy", name: "Шлемы" },
  });
  const goggles = await prisma.category.upsert({
    where: { slug: "ochki" },
    update: {},
    create: { slug: "ochki", name: "Очки" },
  });
  const gloves = await prisma.category.upsert({
    where: { slug: "perchatki" },
    update: {},
    create: { slug: "perchatki", name: "Перчатки" },
  });

  // 1. Сноуборд+Ботинки - 1500
  await prisma.product.upsert({
    where: { slug: "komplekt-snoubord-botinki" },
    update: {},
    create: {
      slug: "komplekt-snoubord-botinki",
      name: "Сноуборд + ботинки",
      dailyPrice: 1500 as unknown as any,
      depositPrice: 0 as unknown as any,
      description: "Комплект на день (8:00–17:00)",
      available: true,
      categoryId: komplekty.id,
      imageUrl: "https://images.unsplash.com/photo-1546549039-49ec0c4f9a3b?q=80&w=1600&auto=format&fit=crop",
    },
  });

  // 2. Сноуборд - 1000
  await prisma.product.upsert({
    where: { slug: "snoubord-arenda" },
    update: {},
    create: {
      slug: "snoubord-arenda",
      name: "Сноуборд",
      dailyPrice: 1000 as unknown as any,
      depositPrice: 0 as unknown as any,
      description: "Прокат доски на день (8:00–17:00)",
      available: true,
      categoryId: sb.id,
      imageUrl: "https://images.unsplash.com/photo-1516542076529-1ea3854896e1?q=80&w=1600&auto=format&fit=crop",
    },
  });

  // 3. Ботинки для сноуборда - 500
  await prisma.product.upsert({
    where: { slug: "botinki-dlya-snouborda-arenda" },
    update: {},
    create: {
      slug: "botinki-dlya-snouborda-arenda",
      name: "Ботинки для сноуборда",
      dailyPrice: 500 as unknown as any,
      depositPrice: 0 as unknown as any,
      description: "Прокат ботинок на день (8:00–17:00)",
      available: true,
      categoryId: sbBoots.id,
      imageUrl: "https://images.unsplash.com/photo-1547641786-185a0b050b87?q=80&w=1600&auto=format&fit=crop",
    },
  });

  // 4. Горные лыжи - 1000
  await prisma.product.upsert({
    where: { slug: "gornye-lyzhi-arenda" },
    update: {},
    create: {
      slug: "gornye-lyzhi-arenda",
      name: "Горные лыжи",
      dailyPrice: 1000 as unknown as any,
      depositPrice: 0 as unknown as any,
      description: "Прокат лыж на день (8:00–17:00)",
      available: true,
      categoryId: ski.id,
      imageUrl: "https://images.unsplash.com/photo-1516569422535-cf9c7b2d3b25?q=80&w=1600&auto=format&fit=crop",
    },
  });

  // 5. Лыжные ботинки - 500
  await prisma.product.upsert({
    where: { slug: "lyzhnye-botinki-arenda" },
    update: {},
    create: {
      slug: "lyzhnye-botinki-arenda",
      name: "Лыжные ботинки",
      dailyPrice: 500 as unknown as any,
      depositPrice: 0 as unknown as any,
      description: "Прокат ботинок на день (8:00–17:00)",
      available: true,
      categoryId: skiBoots.id,
      imageUrl: "https://images.unsplash.com/photo-1603101555035-327c52f4fb15?q=80&w=1600&auto=format&fit=crop",
    },
  });

  // 6. Лыжные палки - 150
  await prisma.product.upsert({
    where: { slug: "lyzhnye-palki-arenda" },
    update: {},
    create: {
      slug: "lyzhnye-palki-arenda",
      name: "Лыжные палки",
      dailyPrice: 150 as unknown as any,
      depositPrice: 0 as unknown as any,
      description: "Прокат палок на день (8:00–17:00)",
      available: true,
      categoryId: poles.id,
      imageUrl: "https://images.unsplash.com/photo-1589611046243-4a1b661d6a20?q=80&w=1600&auto=format&fit=crop",
    },
  });

  // 7. Одежда (верх-низ) - 1000
  await prisma.product.upsert({
    where: { slug: "odezhda-komplekt-verh-niz" },
    update: {},
    create: {
      slug: "odezhda-komplekt-verh-niz",
      name: "Одежда (верх-низ)",
      dailyPrice: 1000 as unknown as any,
      depositPrice: 0 as unknown as any,
      description: "Куртка и штаны на день (8:00–17:00)",
      available: true,
      categoryId: clothes.id,
      imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop",
    },
  });

  // 8. Одежда по-отдельности - 500
  await prisma.product.upsert({
    where: { slug: "odezhda-otdelno" },
    update: {},
    create: {
      slug: "odezhda-otdelno",
      name: "Одежда (по-отдельности)",
      dailyPrice: 500 as unknown as any,
      depositPrice: 0 as unknown as any,
      description: "Куртка или штаны на выбор (8:00–17:00)",
      available: true,
      categoryId: clothes.id,
      imageUrl: "https://images.unsplash.com/photo-1516569881434-5b714a774f10?q=80&w=1600&auto=format&fit=crop",
    },
  });

  // 9. Шлем - 300
  await prisma.product.upsert({
    where: { slug: "shlem-arenda" },
    update: {},
    create: {
      slug: "shlem-arenda",
      name: "Шлем",
      dailyPrice: 300 as unknown as any,
      depositPrice: 0 as unknown as any,
      description: "Прокат шлема на день (8:00–17:00)",
      available: true,
      categoryId: helmets.id,
      imageUrl: "https://images.unsplash.com/photo-1602321056070-6a0eef8949cc?q=80&w=1600&auto=format&fit=crop",
    },
  });

  // 10. Очки - 200
  await prisma.product.upsert({
    where: { slug: "ochki-arenda" },
    update: {},
    create: {
      slug: "ochki-arenda",
      name: "Очки",
      dailyPrice: 200 as unknown as any,
      depositPrice: 0 as unknown as any,
      description: "Прокат очков на день (8:00–17:00)",
      available: true,
      categoryId: goggles.id,
      imageUrl: "https://images.unsplash.com/photo-1516446636564-c48e723868a0?q=80&w=1600&auto=format&fit=crop",
    },
  });

  // 11. Перчатки - 200
  await prisma.product.upsert({
    where: { slug: "perchatki-arenda" },
    update: {},
    create: {
      slug: "perchatki-arenda",
      name: "Перчатки",
      dailyPrice: 200 as unknown as any,
      depositPrice: 0 as unknown as any,
      description: "Прокат перчаток на день (8:00–17:00)",
      available: true,
      categoryId: gloves.id,
      imageUrl: "https://images.unsplash.com/photo-1549947535-92ee98b32d85?q=80&w=1600&auto=format&fit=crop",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
