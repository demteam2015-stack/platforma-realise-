'use client';

import { useState } from 'react';
import RegisterModal from '@/components/RegisterModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans antialiased">
      {/* Градиентный фон (декоративный) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/10 -z-10"></div>

      {/* Шапка */}
      <header className="relative z-10 px-6 py-6 text-center border-b border-gray-800 backdrop-blur-xl bg-black/30">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
          DemPlatForm
        </h1>
        <p className="text-gray-300 mt-3 text-lg max-w-3xl mx-auto leading-relaxed">
          Современная платформа для спортсменов, клубов и турниров по единоборствам
        </p>
      </header>

      {/* Основной контент */}
      <main className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'Турниры',
              desc: 'Регистрируйся и участвуй в соревнованиях по всей стране',
              icon: '🏆',
              color: 'from-blue-500/20 to-blue-900/30',
              hover: 'hover:from-blue-600/30 hover:to-blue-800/30',
            },
            {
              title: 'Клубы',
              desc: 'Присоединяйся к лучшим командам и тренируйся с сильнейшими',
              icon: '🥋',
              color: 'from-emerald-500/20 to-emerald-900/30',
              hover: 'hover:from-emerald-600/30 hover:to-emerald-800/30',
            },
            {
              title: 'Аттестации',
              desc: 'Проходи испытания и повышай свой спортивный разряд',
              icon: '📜',
              color: 'from-purple-500/20 to-purple-900/30',
              hover: 'hover:from-purple-600/30 hover:to-purple-800/30',
            },
            {
              title: 'Сборы',
              desc: 'Участвуй в интенсивных тренировочных лагерях',
              icon: '⛰️',
              color: 'from-amber-500/20 to-amber-900/30',
              hover: 'hover:from-amber-600/30 hover:to-amber-800/30',
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${item.color} ${item.hover} p-8 rounded-3xl shadow-xl border border-gray-800/50 backdrop-blur-sm transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20`}
            >
              <div className="text-5xl mb-4 text-center">{item.icon}</div>
              <h2 className="text-2xl font-bold text-white mb-3 text-center">{item.title}</h2>
              <p className="text-gray-300 text-sm leading-relaxed text-center">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Кнопка */}
      <div className="text-center py-10 px-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-full transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
        >
          <span className="relative z-10">Войти или создать аккаунт</span>
          <span className="absolute inset-0 bg-white/10 rounded-full blur-md opacity-0 group-hover:opacity-80 transition duration-300"></span>
        </button>
      </div>

      {/* Подвал */}
      <footer className="relative z-10 bg-black/80 text-gray-500 text-sm text-center py-8 border-t border-gray-900/50">
        <p>Разработчик: Демьяненко Алексей</p>
        <p className="mt-1">
          <a href="https://vk.com/..." className="text-blue-400 hover:text-blue-300 transition duration-200">
            VK
          </a>{' '}
          •{' '}
          <a href="/privacy" className="text-blue-400 hover:text-blue-300 transition duration-200">
            Политика конфиденциальности
          </a>
        </p>
      </footer>

      {/* Модальное окно */}
      <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}