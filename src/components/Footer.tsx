import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-t from-black to-zinc-950">
      <Container className="py-4 flex items-center justify-between text-sm text-zinc-300">
        <div>© {new Date().getFullYear()} Минги-Тау</div>
        <div className="hidden sm:block">Прокат горнолыжной экипировки</div>
      </Container>
    </footer>
  );
}


