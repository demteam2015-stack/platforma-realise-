'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';
import Button from './ui/Button';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
};

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Отправляем запрос на новый эндпоинт
      const data = await fetchApi('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      login(data.user);
      onClose();

    } catch (err: any) {
      setError(err.message || 'Пользователь не найден или произошла ошибка.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 w-full max-w-md relative shadow-2xl shadow-blue-500/10">
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors">&times;</button>
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Вход</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <input 
            type="email" 
            name="email" 
            placeholder="Введите ваш Email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
          />

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
            {isLoading ? 'Вход...' : 'Войти'}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Нет аккаунта?{' '}
          <button onClick={onSwitchToRegister} className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
            Зарегистрироваться
          </button>
        </p>
      </div>
    </div>
  );
}
