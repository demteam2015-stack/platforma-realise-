import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Calendar, Shield, Monitor, Trophy, Globe } from "lucide-react";

const features = [
  {
    icon: <Users className="w-8 h-8 mb-4 text-primary" />,
    title: "Электронная регистрация",
    description: "Удобная регистрация участников с любого устройства из любой точки мира.",
  },
  {
    icon: <Calendar className="w-8 h-8 mb-4 text-primary" />,
    title: "Управление турнирами",
    description: "Создание турнирных сеток, жеребьевка, распределение поединков по площадкам.",
  },
  {
    icon: <Monitor className="w-8 h-8 mb-4 text-primary" />,
    title: "Электронное судейство",
    description: "Вывод поединков на мониторы, электронные табло и автоматическое обновление списков.",
  },
  {
    icon: <Trophy className="w-8 h-8 mb-4 text-primary" />,
    title: "Автоматические результаты",
    description: "Мгновенная публикация результатов, подсчет командного зачета и ведение рейтинга.",
  },
  {
    icon: <Shield className="w-8 h-8 mb-4 text-primary" />,
    title: "База данных",
    description: "Хранение данных о спортсменах, клубах, тренерах, разрядах и медицинских допусках.",
  },
  {
    icon: <Globe className="w-8 h-8 mb-4 text-primary" />,
    title: "Мультиязычность",
    description: "Автоматический перевод данных для удобства участников из разных стран.",
  },
];

export default function FeatureSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Все, что нужно для соревнований</h2>
          <p className="text-lg text-muted-foreground mb-12">
            Мы собрали все необходимые инструменты в одном сервисе, чтобы сделать организацию турниров простой и эффективной.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 border-border/50 hover:border-primary/50 hover:bg-card transition-all transform hover:-translate-y-2">
              <CardHeader className="p-8">
                {feature.icon}
                <CardTitle className="text-xl font-semibold mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
