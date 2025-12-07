
const getApiUrl = () => {
  // Эта переменная будет доступна и в браузере, и на сервере (в Next.js)
  // В Vercel мы установим ее в 'https://platforma-realise.onrender.com'
  // А при локальной разработке она будет пустой, и мы будем использовать относительный путь
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
};

export const API_URL = getApiUrl();

// Централизованная функция для выполнения запросов
// Мы можем улучшить ее в будущем, добавив обработку токенов и т.д.
export const fetchApi = async (path: string, options: RequestInit = {}) => {
  const url = `${API_URL}${path}`;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Произошла ошибка');
  }

  return response.json();
};
