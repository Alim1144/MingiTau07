import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, checkAdminPassword } from "@/lib/auth";

async function login(formData: FormData) {
  "use server";
  const password = String(formData.get("password") || "");
  if (checkAdminPassword(password)) {
    (await cookies()).set(ADMIN_COOKIE, "ok", { httpOnly: true, path: "/" });
    const next = String(formData.get("next") || "/admin");
    redirect(next);
  }
  return { error: "Неверный пароль" } as const;
}

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next = "/admin" } = await searchParams;
  const action = login;
  const state = null as unknown as { error?: string } | null;
  return (
    <div className="mx-auto max-w-sm px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-2xl font-semibold mb-6">Вход в админ-панель</h1>
      <form action={action} className="space-y-4 rounded-xl border border-white/10 bg-zinc-900 p-6">
        <input type="hidden" name="next" value={next} />
        <div className="space-y-2">
          <label className="text-sm" htmlFor="password">Пароль администратора</label>
          <input id="password" name="password" type="password" required className="w-full rounded-md border border-white/15 bg-black px-3 py-2" placeholder="Введите пароль" />
        </div>
        {state?.error ? <div className="text-sm text-red-500">{state.error}</div> : null}
        <button className="w-full rounded-md bg-[var(--accent)] text-white px-4 py-2.5 hover:brightness-110">Войти</button>
      </form>
    </div>
  );
}


