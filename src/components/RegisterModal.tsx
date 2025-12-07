'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api'; // ← Импортируем нашу функцию
import Button from './ui/Button';

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
};

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const { login } = useAuth(); // Мы будем использовать login из контекста, чтобы обновить состояние

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: 'male',
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Отправляем реальный запрос на бэкенд
      const data = await fetchApi('/api/register', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      // Если регистрация успешна, "логиним" пользователя в фронтенде
      // и сохраняем его данные
      login(data.user); 
      onClose(); // Закрываем модальное окно

    } catch (err: any) {
      // Устанавливаем сообщение об ошибке, которое вернет наш API
      setError(err.message || 'Не удалось зарегистрироваться. Попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 w-full max-w-md relative shadow-2xl shadow-blue-500/10">
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors">&times;</button>
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Регистрация</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          <div className="flex gap-4">
            <input type="text" name="firstName" placeholder="Имя" required onChange={handleChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
            <input type="text" name="lastName" placeholder="Фамилия" required onChange={handleChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
          <input type="date" name="birthDate" placeholder="Дата рождения" required onChange={handleChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          <select name="gender" onChange={handleChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
            <option value="male">Мужчина</option>
            <option value="female">Женщина</option>
          </select>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
            {isLoading ? 'Создание аккаунта...' : 'Создать аккаунт'}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Уже есть аккаунт?{' '}
          <button onClick={onSwitchToLogin} className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
            Войти
          </button>
        </p>
      </div>
    </div>
  );
}
