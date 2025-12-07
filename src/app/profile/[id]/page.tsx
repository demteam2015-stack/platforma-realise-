import { mockProfile } from '@/lib/mock-profile';
import { getUserAchievements } from '@/lib/services/achievementService';

export default async function ProfilePage() {
  const age = new Date().getFullYear() - new Date(mockProfile.birthDate).getFullYear();
  const achievements = await getUserAchievements();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Шапка профиля */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
          <img
            src={mockProfile.avatar}
            alt="Аватар"
            className="w-20 h-20 rounded-full border-4 border-blue-500 object-cover"
          />
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-white">
              {mockProfile.lastName} {mockProfile.firstName} {mockProfile.middleName}
            </h1>
            <p className="text-gray-400">Возраст: {age} лет, {mockProfile.city}</p>
            <p className="text-blue-400 font-medium">Клуб: {mockProfile.club}</p>
          </div>
        </div>

        {/* Турниры */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Участие в турнирах</h2>
          <div className="space-y-3">
            {mockProfile.tournaments.map((t, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700"
              >
                <span className="text-white text-sm">{t.name}</span>
                <span className="text-gray-400 text-sm">{t.date}</span>
                <span className="text-yellow-400 font-bold text-sm">{t.result}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ачивки */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Ачивки</h2>
          <div className="flex flex-wrap gap-4">
            {achievements.map((a) => (
              <div
                key={a.slug}
                className={`p-4 rounded-xl border-2 text-center min-w-28 transition-all ${
                  a.earnedAt
                    ? 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 border-blue-500/30'
                    : 'bg-gray-800/30 border-gray-700 opacity-60'
                }`}
              >
                <div className="text-2xl mb-1">{a.icon}</div>
                <div className="font-bold text-white text-sm">{a.title}</div>
                {a.earnedAt ? (
                  <div className="text-green-400 text-xs">Получено</div>
                ) : (
                  <div className="text-gray-500 text-xs">Не получено</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}