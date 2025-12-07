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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all animate-slideUp">
        {success ? (
          <div className="text-center py-10">
            <div className="text-7xl mb-4 animate-bounce">🎉</div>
            <div className="text-green-400 text-2xl font-bold">Отлично!</div>
            <div className="text-gray-300 mt-3 text-lg">Аккаунт успешно создан!</div>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Создать аккаунт
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder-gray-400 text-white"
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
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder-gray-400 text-white"
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
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder-gray-400 text-white"
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
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder-gray-400 text-white"
                />
              </div>

              {/* Дата рождения */}
              <div>
                <input
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-white"
                />
                {errors.birthDate && <div className="text-red-400 text-xs mt-1">{errors.birthDate}</div>}
              </div>

              {/* Пол */}
              <div>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-white"
                >
                  <option value="" disabled>Выберите пол</option>
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
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder-gray-400 text-white pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-blue-400 transition"
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
                  className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder-gray-400 text-white pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-blue-400 transition"
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
                  className="w-5 h-5 mt-1 text-blue-600 rounded focus:ring-blue-500"
                />
                <label className="text-sm text-gray-400 leading-relaxed">
                  Я согласен с{' '}
                  <a href="/privacy" className="text-blue-400 hover:underline font-medium">
                    политикой конфиденциальности
                  </a>{' '}
                  и даю согласие на обработку персональных данных.
                </label>
              </div>
              {errors.agreement && <div className="text-red-400 text-xs mt-1">{errors.agreement}</div>}

              {/* Кнопка */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                Создать аккаунт
              </button>
            </form>
          </>
        )}

        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          disabled={success}
          className="mt-6 w-full py-3 text-gray-400 hover:text-blue-400 text-sm font-medium transition disabled:opacity-60"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}