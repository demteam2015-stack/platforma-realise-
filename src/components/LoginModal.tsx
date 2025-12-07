'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void;
}

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const [formData, setFormData] = useState({ email: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.email) {
      setError('Email обязателен');
      return;
    }

    const savedUser = localStorage.getItem('demplatform_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        if (user.email === formData.email) {
          login(user);
          onClose();
        } else {
          setError('Пользователь с таким email не найден');
        }
      } catch (e) {
        setError('Ошибка чтения данных пользователя.');
      }
    } else {
      setError('Пользователь не найден. Сначала зарегистрируйтесь.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl" onClick={onClose}>
      <div 
        className="w-full max-w-sm mx-auto bg-gray-900/80 border border-gray-700 rounded-3xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Войти
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white text-sm"
            />
            {error && <div className="text-red-400 text-xs mt-1 text-center">{error}</div>}

            <div className="pt-2">
              <Button type="submit" variant="primary" fullWidth>
                Войти
              </Button>
            </div>
          </form>
        </div>

        <div className="px-8 py-4 bg-gray-950/50 text-center border-t border-gray-800 rounded-b-3xl">
          <p className="text-sm text-gray-400">
            Нет аккаунта?{' '}
            <button onClick={onSwitchToRegister} className="font-medium text-blue-400 hover:text-blue-300">
              Зарегистрироваться
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
