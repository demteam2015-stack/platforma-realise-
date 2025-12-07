import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";

export default function Header() {
  return (
    <header className="py-4 px-6 sm:px-8 md:px-12 bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Medal className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Demplatform</h1>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Возможности
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Тарифы
          </Link>
          <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Контакты
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline">Войти</Button>
          <Button>Регистрация</Button>
        </div>
      </div>
    </header>
  );
}
