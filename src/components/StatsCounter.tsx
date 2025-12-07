// src/components/StatsCounter.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export default function StatsCounter({ stats }: { stats: Stat[] }) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Анимация только один раз
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="py-16 px-6 text-center"
    >
      <h2 className="text-3xl font-bold text-white mb-12">Наш масштаб</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-blue-600 transition group"
          >
            <div className="text-4xl font-bold text-blue-400 mb-2">
              {isInView ? (
                <AnimatedNumber to={stat.value} duration={2000} />
              ) : (
                '0'
              )}
              <span className="text-blue-300">{stat.suffix}</span>
            </div>
            <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Вспомогательный компонент: плавное увеличение числа
function AnimatedNumber({ to, duration }: { to: number; duration: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / to));
    const timer = setInterval(() => {
      start += 1;
      setValue(start);
      if (start === to) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [to, duration]);

  return <span>{value}</span>;
}