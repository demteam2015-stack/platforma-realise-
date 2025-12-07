import Link from "next/link";
import { Medal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 px-6 sm:px-8 md:px-12 border-t border-border">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
        <div className="flex items-center gap-2">
          <Medal className="h-6 w-6 text-primary" />
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Demplatform. Все права защищены.</p>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Политика конфиденциальности
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Условия использования
          </Link>
        </nav>
      </div>
    </footer>
  );
}
