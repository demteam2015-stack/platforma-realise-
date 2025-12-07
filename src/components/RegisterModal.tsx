'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({ email: '', firstName: '', lastName: '', birthDate: '', gender: '', password: '', confirmPassword: '', agreement: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUnderage, setIsUnderage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData(prev => ({ ...prev, [name]: checked !== undefined ? checked : value }));
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email обязателен';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Некорректный формат email';
    if (!formData.firstName) newErrors.firstName = 'Имя обязательно';
    if (!formData.lastName) newErrors.lastName = 'Фамилия обязательна';
    if (!formData.birthDate) {
        newErrors.birthDate = 'Дата рождения обязательна';
    } else {
        const birthDate = new Date(formData.birthDate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        if (age < 14) {
            setIsUnderage(true);
            return {};
        }
    }
    if (!formData.gender) newErrors.gender = 'Пожалуйста, укажите пол';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Пароль должен быть не менее 6 символов';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают';
    if (!formData.agreement) newErrors.agreement = 'Требуется согласие с политикой';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUnderage(false);
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (isUnderage) return;

    setIsLoading(true);
    setTimeout(() => {
      register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        birthDate: formData.birthDate,
        gender: formData.gender,
      });
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl" onClick={onClose}>
      <div className="w-full max-w-md mx-auto bg-gray-900/80 border border-gray-700 rounded-3xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="px-8 pt-8 pb-6 text-center border-b border-gray-800">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Создать аккаунт
          </h2>
        </div>

        <div className="px-8 py-6 max-h-[70vh] overflow-y-auto">
          {isUnderage ? (
             <div className="text-center py-2">
                <div className="text-6xl mb-4">🌱</div>
                <p className="text-gray-300 mb-6 leading-relaxed">Регистрация доступна с 14 лет.</p>
                <div className="space-y-3">
                    <Button fullWidth variant="secondary" onClick={() => setIsUnderage(false)}>Назад</Button>
                </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder-gray-400 text-white text-sm" />
                {errors.email && <div className="text-red-400 text-xs mt-1">{errors.email}</div>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input name="firstName" placeholder="Имя" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder-gray-400 text-white text-sm" />
                  {errors.firstName && <div className="text-red-400 text-xs mt-1">{errors.firstName}</div>}
                </div>
                <div>
                  <input name="lastName" placeholder="Фамилия" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder-gray-400 text-white text-sm" />
                  {errors.lastName && <div className="text-red-400 text-xs mt-1">{errors.lastName}</div>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-white text-sm" max={new Date().toISOString().split('T')[0]} />
                  {errors.birthDate && <div className="text-red-400 text-xs mt-1">{errors.birthDate}</div>}
                </div>
                <div>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-white text-sm">
                        <option value="" disabled>Выберите пол</option>
                        <option value="male">Мужской</option>
                        <option value="female">Женский</option>
                    </select>
                    {errors.gender && <div className="text-red-400 text-xs mt-1">{errors.gender}</div>}
                </div>
              </div>
              <div className="relative">
                <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Пароль" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder-gray-400 text-white text-sm pr-12" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-blue-400 text-sm transition">{showPassword ? '🙈' : '👁️'}</button>
              </div>
              {errors.password && <div className="text-red-400 text-xs mt-1">{errors.password}</div>}
              <div className="relative">
                <input name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="Повторите пароль" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder-gray-400 text-white text-sm pr-12" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-blue-400 text-sm transition">{showConfirmPassword ? '🙈' : '👁️'}</button>
              </div>
              {errors.confirmPassword && <div className="text-red-400 text-xs mt-1">{errors.confirmPassword}</div>}
              <div className="flex items-start space-x-3 pt-2">
                  <input name="agreement" type="checkbox" id="agreement" checked={formData.agreement} onChange={handleChange} className="w-4 h-4 mt-1 text-blue-600 rounded focus:ring-blue-500 bg-gray-800 border-gray-600" />
                  <label htmlFor="agreement" className="text-xs text-gray-400 leading-relaxed">Я согласен с <a href="/privacy" className="text-blue-400 hover:underline">политикой конфиденциальности</a></label>
              </div>
              {errors.agreement && <div className="text-red-400 text-xs mt-1">{errors.agreement}</div>}
              
              <div className="pt-2">
                <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading}>
                  Создать аккаунт
                </Button>
              </div>
            </form>
          )}
        </div>

        <div className="px-8 py-4 bg-gray-950/50 text-center border-t border-gray-800 rounded-b-3xl">
          <p className="text-sm text-gray-400">
            Уже есть аккаунт?{' '}
            <button onClick={onSwitchToLogin} className="font-medium text-blue-400 hover:text-blue-300">
              Войти
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
