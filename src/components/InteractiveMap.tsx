'use client';

import { useState } from 'react';

// Данные о клубах в городах
const clubs = [
  { id: 'moscow', name: 'Клуб "Олимп"', city: 'Москва', count: 12, x: 65, y: 45 },
  { id: 'spb', name: 'Академия Севера', city: 'Санкт-Петербург', count: 8, x: 58, y: 38 },
  { id: 'ekat', name: 'Уральская Сила', city: 'Екатеринбург', count: 6, x: 45, y: 50 },
  { id: 'novosib', name: 'Сибиряк', city: 'Новосибирск', count: 5, x: 35, y: 55 },
  { id: 'kazan', name: 'Клуб "Сокол"', city: 'Казань', count: 7, x: 58, y: 50 },
  { id: 'sochi', name: 'Черноморец', city: 'Сочи', count: 4, x: 68, y: 60 },
  { id: 'habarovsk', name: 'Сокол-Восток', city: 'Хабаровск', count: 3, x: 5, y: 40 },
];

export default function InteractiveMap() {
  const [hoveredClub, setHoveredClub] = useState<typeof clubs[0] | null>(null);

  return (
    <div className="px-6 py-10 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Клубы по России</h2>
      <p className="text-gray-400 max-w-lg mx-auto text-sm mb-6">
        К нам уже присоединились клубы из 15 городов России!
      </p>

      <div className="relative max-w-3xl mx-auto">
        {/* Фон — стилизованный контур России */}
        <svg
          viewBox="0 0 100 60"
          className="w-full h-auto border border-gray-700 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800"
          style={{ filter: 'drop-shadow(0 0 8px rgba(30, 64, 175, 0.2))' }}
        >
          {/* Простой контур России (упрощённый) */}
          <path
            d="M10,15 L20,10 L30,12 L40,8 L50,10 L60,5 L70,8 L80,12 L85,20 L80,30 L75,40 L70,45 L65,50 L55,55 L45,52 L35,50 L25,48 L15,45 L10,40 L5,30 Z"
            fill="none"
            stroke="#4B5563"
            strokeWidth="0.5"
            opacity="0.3"
          />

          {/* Точки-маркеры */}
          {clubs.map((club, i) => (
            <g key={club.id} className="transition">
              <circle
                cx={club.x}
                cy={club.y}
                r="1.2"
                className="fill-green-400 animate-pulse"
                style={{ animationDelay: `${(i * 150) + 100}ms` }}
              />
              <circle
                cx={club.x}
                cy={club.y}
                r="2.5"
                className="fill-transparent stroke-green-500/30"
                strokeWidth="0.3"
              />
              <circle
                cx={club.x}
                cy={club.y}
                r="4"
                className="fill-transparent stroke-green-500/20"
                strokeWidth="0.2"
                opacity="0.6"
              />
              {/* Видимая точка */}
              <circle
                cx={club.x}
                cy={club.y}
                r="1.5"
                className="fill-white cursor-pointer hover:fill-blue-400 hover:scale-125 transition duration-300 transform-gpu"
                style={{ transformOrigin: 'center' }}
                onMouseEnter={() => setHoveredClub(club)}
                onMouseLeave={() => setHoveredClub(null)}
              />
            </g>
          ))}
        </svg>

        {/* Подсказка */}
        {hoveredClub && (
          <div
            className="absolute bg-gray-900 border border-gray-600 rounded-lg p-3 shadow-2xl z-20 text-xs text-white pointer-events-none"
            style={{
              left: `${hoveredClub.x + 2}%`,
              top: `${hoveredClub.y - 8}%`,
              transform: 'translateX(-50%)',
              minWidth: '120px',
            }}
          >
            <div className="font-bold">{hoveredClub.name}</div>
            <div className="text-gray-300">{hoveredClub.city}</div>
            <div className="text-blue-400 mt-1">🏆 {hoveredClub.count} участников</div>
          </div>
        )}
      </div>
    </div>
  );
}