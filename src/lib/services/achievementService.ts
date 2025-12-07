import { achievementsList, Achievement } from '@/lib/schema/achievements';

// Мок: предположим, пользователь уже получил 2 ачивки
const userAchievements: string[] = ['novice', 'debutant'];

export async function getUserAchievements(): Promise<Achievement[]> {
  // Здесь будет запрос к API или БД
  // Пока — возвращаем мок
  return achievementsList
    .map((ach) => ({
      ...ach,
      earnedAt: userAchievements.includes(ach.slug) ? '2024-10-20T10:00:00Z' : undefined,
    }))
    .sort((a, b) => {
      if (a.earnedAt && !b.earnedAt) return -1;
      if (!a.earnedAt && b.earnedAt) return 1;
      return 0;
    });
}

export async function checkAndGrantAchievement(slug: string): Promise<boolean> {
  // Здесь логика проверки: заслужил ли пользователь ачивку?
  // Пока — просто добавим в "полученные"
  if (!userAchievements.includes(slug)) {
    userAchievements.push(slug);
    console.log(`🎉 Ачивка получена: ${slug}`);
    return true;
  }
  return false;
}