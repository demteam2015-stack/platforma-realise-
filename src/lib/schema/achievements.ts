export type Achievement = {
  id: number;
  slug: string; // например: "novice", "debutant"
  title: string;
  description: string;
  icon: string;
  earnedAt?: string; // дата получения (если уже получена)
};

export const achievementsList: Achievement[] = [
  {
    id: 1,
    slug: 'novice',
    title: 'Новичок',
    description: 'За успешную регистрацию',
    icon: '🎯',
  },
  {
    id: 2,
    slug: 'club-member',
    title: 'Член клуба',
    description: 'За вступление в свой первый клуб',
    icon: '🥋',
  },
  {
    id: 3,
    slug: 'debutant',
    title: 'Дебютант',
    description: 'За регистрацию на первый турнир',
    icon: '🏁',
  },
  {
    id: 4,
    slug: 'battle-hardened',
    title: 'Закалённый в боях',
    description: 'За участие в 5+ турнирах',
    icon: '🔥',
  },
  {
    id: 5,
    slug: 'champion',
    title: 'Чемпион',
    description: 'За победу в соревновании',
    icon: '🏆',
  },
];