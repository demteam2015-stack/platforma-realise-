export const mockProfile = {
  id: 1,
  firstName: 'Алексей',
  lastName: 'Иванов',
  middleName: 'Сергеевич',
  birthDate: '1995-03-15',
  city: 'Москва',
  club: 'Клуб "Олимп"',
  avatar: '/avatar.jpg',
  tournaments: [
    { name: 'Кубок Севера', date: '25.10.2024', result: '3 место' },
    { name: 'Сила Востока', date: '20.11.2024', result: 'Полуфинал' },
  ],
  achievements: [
    { id: 1, title: 'Новичок', desc: 'За регистрацию', icon: '🎯' },
    { id: 2, title: 'Дебютант', desc: 'Первый турнир', icon: '🏁' },
  ],
};