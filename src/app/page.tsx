// src/app/page.tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans leading-relaxed">
      {/* Градиентный фон (декоративный) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/10 -z-10"></div>

      {/* Шапка */}
      <header className="relative z-10 px-6 py-5 text-center border-b border-gray-800 backdrop-blur-sm bg-black/40">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          DemPlatForm
        </h1>
        <p className="text-gray-400 mt-2 text-lg max-w-2xl mx-auto">
          Современная платформа для спортсменов, клубов и турниров
        </p>
      </header>

      {/* Основной контент */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Турниры',
              desc: 'Участвуй в соревнованиях по всей стране',
              icon: '🏆',
              color: 'from-blue-500/20 to-blue-900/30',
            },
            {
              title: 'Клубы',
              desc: 'Присоединяйся к лучшим командам',
              icon: '🥋',
              color: 'from-green-500/20 to-green-900/30',
            },
            {
              title: 'Аттестации',
              desc: 'Повысь свой уровень мастерства',
              icon: '📜',
              color: 'from-purple-500/20 to-purple-900/30',
            },
            {
              title: 'Сборы',
              desc: 'Проходи интенсивную подготовку',
              icon: '⛰️',
              color: 'from-amber-500/20 to-amber-900/30',
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl shadow-lg border border-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10`}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h2 className="text-xl font-bold text-white mb-2">{item.title}</h2>
              <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Кнопка: модальное окно (пока просто кнопка) */}
      <div className="text-center my-10 px-6">
        <button
          // Пока без onClick — логику добавим позже
          className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <span className="relative z-10">Войти или создать аккаунт</span>
          <span className="absolute inset-0 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition"></span>
        </button>
      </div>

      {/* Подвал */}
      <footer className="relative z-10 bg-black/70 text-gray-500 text-sm text-center py-6 border-t border-gray-900">
        <p>Разработчик: Демьяненко Алексей</p>
        <p className="mt-1">
          <a href="https://vk.com/..." className="text-blue-400 hover:text-blue-300 transition">
            VK
          </a>{' '}
          |{' '}
          <a href="/privacy" className="text-blue-400 hover:text-blue-300 transition">
            Политика конфиденциальности
          </a>
        </p>
      </footer>
    </div>
  );
}