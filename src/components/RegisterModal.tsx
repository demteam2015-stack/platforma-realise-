'use client';

import { useState } from 'react';

export default function RegisterModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    gender: 'male',
    password: '',
    confirmPassword: '',
    agreement: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({ ...prev, [name]: checked !== undefined ? checked : value }));
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email обязателен';
    if (!formData.firstName) newErrors.firstName = 'Имя обязательно';
    if (!formData.lastName) newErrors.lastName = 'Фамилия обязательна';
    if (!formData.birthDate) newErrors.birthDate = 'Дата рождения обязательна';
    if (!formData.password) newErrors.password = 'Пароль обязателен';
    if (formData.password.length < 6) newErrors.password = 'Пароль должен быть не менее 6 символов';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    if (!formData.agreement) newErrors.agreement = 'Требуется согласие с политикой';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Имитация отправки
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setFormData({
          email: '',
          firstName: '',
          lastName: '',
          middleName: '',
          birthDate: '',
          gender: 'male',
          password: '',
          confirmPassword: '',
          agreement: false,
        });
      }, 2000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all animate-fadeIn">
        {success ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <div className="text-green-400 text-lg font-bold">Успех!</div>
            <div className="text-gray-300 mt-2">Аккаунт создан. Добро пожаловать!</div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">Создать аккаунт</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              />
              {errors.email && <div className="text-red-400 text-xs">{errors.email}</div>}

              {/* Имя */}
              <input
                name="firstName"
                placeholder="Имя"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              />
              {errors.firstName && <div className="text-red-400 text-xs">{errors.firstName}</div>}

              {/* Фамилия */}
              <input
                name="lastName"
                placeholder="Фамилия"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              />
              {errors.lastName && <div className="text-red-400 text-xs">{errors.lastName}</div>}

              {/* Отчество */}
              <input
                name="middleName"
                placeholder="Отчество (необязательно)"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              />

              {/* Дата рождения */}
              <input
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              />
              {errors.birthDate && <div className="text-red-400 text-xs">{errors.birthDate}</div>}

              {/* Пол */}
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
              </select>

              {/* Пароль с глазиком */}
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Пароль"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-400"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <div className="text-red-400 text-xs">{errors.password}</div>}

              {/* Повтор пароля */}
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Повторите пароль"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-400"
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.confirmPassword && <div className="text-red-400 text-xs">{errors.confirmPassword}</div>}

              {/* Согласие */}
              <div className="flex items-center">
                <input
                  name="agreement"
                  type="checkbox"
                  checked={formData.agreement}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-sm text-gray-400">
                  Я согласен с{' '}
                  <a href="/privacy" className="text-blue-400 hover:underline">
                    политикой конфиденциальности
                  </a>
                </label>
              </div>
              {errors.agreement && <div className="text-red-400 text-xs">{errors.agreement}</div>}

              {/* Кнопка */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-lg transition"
              >
                {isSubmitting ? 'Создание...' : 'Создать аккаунт'}
              </button>
            </form>
          </>
        )}

        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 text-gray-400 hover:text-blue-400 text-sm transition"
          disabled={isSubmitting || success}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}