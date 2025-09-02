# MingiTau07

## Минги-Тау — аренда горнолыжной экипировки

Next.js 15 (App Router) + Prisma.

### Быстрый старт (локально)

```bash
cp .env.example .env # при необходимости обновите ADMIN_PASSWORD
npm install
npm run dev
```

Откройте `http://localhost:3000`.

- Главная: `http://localhost:3000/`
- Каталог: `http://localhost:3000/catalog`
- Товар: `http://localhost:3000/product/[slug]`
- Админ: `http://localhost:3000/admin` (пароль: переменная `ADMIN_PASSWORD`, по умолчанию `admin123`)

### GitHub

```bash
git init
git add .
git commit -m "feat: redesign + mobile-first + admin improvements"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### Vercel (рекомендовано)

1) Импортируйте репозиторий на Vercel
2) Установите переменные окружения:

- `ADMIN_PASSWORD` — пароль для `/admin`
- `NEXT_PUBLIC_SITE_URL` — ваш домен (например, `https://mingi-tau.example.com`)

3) Запустите деплой

### Примечания

- В админке есть поиск, пагинация и превью изображений для товаров.
- Для входа в админку используется cookie; middleware перенаправляет на `/admin/login`.
