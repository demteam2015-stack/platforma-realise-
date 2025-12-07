import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-foreground animate-fade-in">
          Платформа №1 для проведения турниров
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Организуйте и проводите соревнования любого масштаба — от регистрации участников до электронного судейства и публикации результатов.
        </p>
        <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button asChild size="lg">
            <Link href="/register">Начать бесплатно</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#features">Узнать больше</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
