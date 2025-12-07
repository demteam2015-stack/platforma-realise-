'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import RegisterModal from '@/components/RegisterModal';
import LoginModal from '@/components/LoginModal';
import EventsCarousel from '@/components/EventsCarousel';
import StatsCounter from '@/components/StatsCounter';
import Button from '@/components/ui/Button';

export default function Home() {
  const { user, logout } = useAuth();
  const [activeModal, setActiveModal] = useState<'login' | 'register' | null>(null);

  const cities = [
    'Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург', 'Новосибирск', 
    'Сочи', 'Владивосток', 'Архангельск', 'Краснодар', 'Ростов-на-Дону', 
    'Уфа', 'Пермь', 'Воронеж', 'Челябинск', 'Иркутск'
  ];

  const handleOpenRegister = () => setActiveModal('register');
  const handleOpenLogin = () => setActiveModal('login');
  const handleCloseModal = () => setActiveModal(null);
  const handleSwitchToRegister = () => setActiveModal('register');
  const handleSwitchToLogin = () => setActiveModal('login');

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans antialiased">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/10 -z-10"></div>

      <header className="relative z-10 px-6 py-6 text-center border-b border-gray-800 backdrop-blur-xl bg-black/30 animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
          DemPlatForm
        </h1>
        <p className="text-gray-300 mt-3 text-lg max-w-3xl mx-auto leading-relaxed">
          Современная платформа для спортсменов, клубов и турниров
        </p>

        {user && (
          <div className="mt-4 text-blue-400 text-lg">
            Добро пожаловать, <span className="font-bold">{user.firstName}</span>!
          </div>
        )}
      </header>

      <div className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
        <EventsCarousel />
      </div>

      <main className="container mx-auto px-6 py-16 animate-slideUp" style={{ animationDelay: '0.3s' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'Турниры', desc: 'Регистрируйся и участвуй в соревнованиях по всей стране', icon: '🏆', color: 'from-blue-500/20 to-blue-900/30', hover: 'hover:from-blue-600/30 hover:to-blue-800/30' },
            { title: 'Клубы', desc: 'Присоединяйся к лучшим командам и тренируйся с сильнейшими', icon: '🥋', color: 'from-emerald-500/20 to-emerald-900/30', hover: 'hover:from-emerald-600/30 hover:to-emerald-800/30' },
            { title: 'Аттестации', desc: 'Проходи испытания и повышай свой спортивный разряд', icon: '📜', color: 'from-purple-500/20 to-purple-900/30', hover: 'hover:from-purple-600/30 hover:to-purple-800/30' },
            { title: 'Сборы', desc: 'Участвуй в интенсивных тренировочных лагерях', icon: '⛰️', color: 'from-amber-500/20 to-amber-900/30', hover: 'hover:from-amber-600/30 hover:to-amber-800/30' },
          ].map((item, i) => (
            <div key={i} className={`bg-gradient-to-br ${item.color} ${item.hover} p-8 rounded-3xl shadow-xl border border-gray-800/50 backdrop-blur-sm transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20`}>
              <div className="text-5xl mb-4 text-center">{item.icon}</div>
              <h2 className="text-2xl font-bold text-white mb-3 text-center">{item.title}</h2>
              <p className="text-gray-300 text-sm leading-relaxed text-center">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
      
      <StatsCounter stats={[{ value: 15, suffix: '+', label: 'Городов' }, { value: 350, suffix: '+', label: 'Участников' }, { value: 25, suffix: '+', label: 'Клубов' }, { value: 50, suffix: '+', label: 'Турниров проведено' }]} />

      <div className="px-6 py-12 text-center animate-slideUp" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-2xl font-bold text-white mb-4">Клубы по всей России</h2>
        <p className="text-gray-400 max-w-lg mx-auto text-sm mb-6">К нам уже присоединились клубы из {cities.length} городов России!</p>
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          {cities.map((city) => (<span key={city} className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-gray-300">{city}</span>))}
        </div>
      </div>

      <div className="px-6 py-12 animate-slideUp" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-2xl font-bold text-white text-center mb-6">Топ спортсмены и клубы</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { name: 'Алексей Иванов', city: 'Москва', achievement: 'Чемпион России 2023', type: 'athlete' as const, avatar: 'AI' },
            { name: 'Клуб "Сокол"', city: 'Казань', achievement: 'Победитель 5 турниров', type: 'club' as const, avatar: 'KS' },
            { name: 'Мария Петрова', city: 'Санкт-Петербург', achievement: 'Мастер спорта', type: 'athlete' as const, avatar: 'MP' },
            { name: 'Гвардия Востока', city: 'Владивосток', achievement: 'Лучший клуб ДВФО', type: 'club' as const, avatar: 'GV' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-900 border border-gray-700 rounded-2xl p-5 w-48 text-center hover:border-blue-600 transition group">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mb-3">{item.avatar}</div>
              <h3 className="text-white text-sm font-bold truncate">{item.name}</h3>
              <p className="text-gray-400 text-xs mb-2">{item.city}</p>
              <p className="text-gray-300 text-xs leading-tight">{item.achievement}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center py-10 px-6">
        {user ? (
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button variant="secondary" onClick={() => alert('Переход в личный кабинет')}>
              Личный кабинет
            </Button>
            <Button variant="ghost" onClick={logout}>
              Выйти
            </Button>
          </div>
        ) : (
          <Button variant="primary" onClick={handleOpenLogin}>
            Войти или создать аккаунт
          </Button>
        )}
      </div>

      <footer className="relative z-10 bg-black/80 text-gray-500 text-sm text-center py-8 border-t border-gray-900/50 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
        <p>Разработчик: Демьяненко Алексей</p>
        <p className="mt-1"><a href="https://vk.com/..." className="text-blue-400 hover:text-blue-300 transition duration-200">VK</a> • <a href="/privacy" className="text-blue-400 hover:text-blue-300 transition duration-200">Политика конфиденциальности</a></p>
      </footer>

      <RegisterModal 
        isOpen={activeModal === 'register'} 
        onClose={handleCloseModal} 
        onSwitchToLogin={handleSwitchToLogin}
      />
      <LoginModal 
        isOpen={activeModal === 'login'} 
        onClose={handleCloseModal} 
        onSwitchToRegister={handleSwitchToRegister}
      />
    </div>
  );
}
