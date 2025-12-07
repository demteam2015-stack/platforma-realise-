'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Импортируем стили
import 'swiper/css';
import 'swiper/css/navigation';

// Данные (позже — из БД)
const events = [
  { icon: '🏆', title: 'Кубок Севера', date: '25 октября 2024', location: 'г. Архангельск' },
  { icon: '⛰️', title: 'Сборы "Высота"', date: '5 ноября 2024', location: 'г. Сочи' },
  { icon: '📜', title: 'Аттестация "Путь Мастера"', date: '15 ноября 2024', location: 'г. Москва' },
  { icon: '🥋', title: 'Открытый турнир "Сила Востока"', date: '20 ноября 2024', location: 'г. Хабаровск' },
  { icon: '🏅', title: 'Юниорский кубок', date: '30 ноября 2024', location: 'г. Екатеринбург' },
];

export default function EventsCarousel() {
  return (
    <div className="px-6 py-6">
      <h2 className="text-xl font-bold text-white mb-4 text-center">Ближайшие события</h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={12}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
        }}
        className="max-w-7xl mx-auto"
      >
        {events.map((event, i) => (
          <SwiperSlide key={i}>
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 text-center hover:border-blue-600 transition group h-full">
              <div className="text-2xl mb-1">{event.icon}</div>
              <div className="font-bold text-white text-sm mb-1 line-clamp-1">{event.title}</div>
              <div className="text-gray-400 text-xs mb-1">{event.date}</div>
              <div className="text-gray-500 text-xs line-clamp-1">{event.location}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}