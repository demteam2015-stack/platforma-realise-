// src/components/RegisterModal.tsx
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
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData(prev => ({
      ...prev,
      [name]: checked !== undefined ? checked : value
    }));
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
    if (!formData.gender) newErrors.gender = 'Пол обязателен';
    if (!formData.password) newErrors.password = 'Пароль обязателен';
    if (formData.password.length < 6) newErrors.password = 'Пароль должен быть не менее 6 символов';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    if (!formData.agreement) newErrors.agreement = 'Требуется согласие';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md mx-auto bg-gray-900/80 border border-gray-700 rounded-3xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Заголовок */}
        <div className="px-8 pt-8 pb-6 text-center border-b border-gray-800">
          {!success ? (
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Создать аккаунт
            </h2>
          ) : (
            <div className="flex flex-col items-center">
              <div className="text-6xl mb-3 animate-bounce">🎉</div>
              <div className="text-green-400 font-bold text-lg">Отлично!</div>
              <div className="text-gray-300 text-sm mt-1">Аккаунт создан</div>
            </div>
          )}
        </div>

        {/* Контент */}
        <div className="px-8 py-6 max-h-[70vh] overflow-y-auto">
          {success ? (
            <div className="text-center py-4 text-gray-300 text-sm leading-relaxed">
              Добро пожаловать в DemPlatForm!  
              <br />
              Вы можете войти в свой аккаунт.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder-gray-400 text-white text-sm"
                />
                {errors.email && <div className="text-red-400 text-xs mt-1">{errors.email}</div>}
              </div>

              {/* Имя */}
              <div>
                <input
                  name="firstName"
                  placeholder="Имя"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder-gray-400 text-white text-sm"
                />
                {errors.firstName && <div className="text-red-400 text-xs mt-1">{errors.firstName}</div>}
              </div>

              {/* Фамилия */}
              <div>
                <input
                  name="lastName"
                  placeholder="Фамилия"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder-gray-400 text-white text-sm"
                />
                {errors.lastName && <div className="text-red-400 text-xs mt-1">{errors.lastName}</div>}
              </div>

              {/* Отчество */}
              <div>
                <input
                  name="middleName"
                  placeholder="Отчество (необязательно)"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder-gray-400 text-white text-sm"
                />
              </div>

              {/* Дата рождения */}
              <div>
                <input
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-white text-sm"
                />
                {errors.birthDate && <div className="text-red-400 text-xs mt-1">{errors.birthDate}</div>}
              </div>

              {/* Пол */}
              <div>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-white text-sm"
                >
                  <option value="" disabled>Пол</option>
                  <option value="male">Мужской</option>
                  <option value="female">Женский</option>
                </select>
                {errors.gender && <div className="text-red-400 text-xs mt-1">{errors.gender}</div>}
              </div>

              {/* Пароль */}
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Пароль"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder-gray-400 text-white text-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-blue-400 text-sm transition"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <div className="text-red-400 text-xs mt-1">{errors.password}</div>}

              {/* Повтор пароля */}
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Повторите пароль"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder-gray-400 text-white text-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-blue-400 text-sm transition"
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.confirmPassword && <div className="text-red-400 text-xs mt-1">{errors.confirmPassword}</div>}

              {/* Согласие */}
              <div className="flex items-start space-x-3 mt-2">
                <input
                  name="agreement"
                  type="checkbox"
                  checked={formData.agreement}
                  onChange={handleChange}
                  className="w-4 h-4 mt-1 text-blue-600 rounded focus:ring-blue-500"
                />
                <label className="text-xs text-gray-400 leading-relaxed">
                  Я согласен с{' '}
                  <a href="/privacy" className="text-blue-400 hover:underline">
                    политикой конфиденциальности
                  </a>
                </label>
              </div>
              {errors.agreement && <div className="text-red-400 text-xs mt-1">{errors.agreement}</div>}

              {/* Кнопка */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Создать аккаунт
              </button>
            </form>
          )}
        </div>

        {/* Подвал */}
        <div className="px-8 py-4 bg-gray-950/50 text-center border-t border-gray-800">
          <button
            onClick={onClose}
            disabled={success}
            className="text-gray-400 text-sm hover:text-blue-400 transition disabled:opacity-60"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}