import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const ski = await prisma.category.upsert({
    where: { slug: "lyzhi" },
    update: {},
    create: {
      slug: "lyzhi",
      name: "Лыжи",
      description: "Карвинговые, универсальные и для новичков",
    },
  });

  const sb = await prisma.category.upsert({
    where: { slug: "snoubordy" },
    update: {},
    create: {
      slug: "snoubordy",
      name: "Сноуборды",
      description: "Доски для парка и трассы",
    },
  });

  await prisma.product.upsert({
    where: { slug: "rossignol-x7" },
    update: {},
    create: {
      slug: "rossignol-x7",
      name: "Rossignol X7 (карвинг)",
      dailyPrice: 1200 as unknown as any,
      depositPrice: 5000 as unknown as any,
      description: "Отличные лыжи для подготовленных трасс. Ростовка 150-170.",
      available: true,
      categoryId: ski.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: "burton-rental" },
    update: {},
    create: {
      slug: "burton-rental",
      name: "Burton Rental (универсал)",
      dailyPrice: 1400 as unknown as any,
      depositPrice: 5000 as unknown as any,
      description: "Универсальная доска для прогресса. Размеры 145-160.",
      available: true,
      categoryId: sb.id,
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
