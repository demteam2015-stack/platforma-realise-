// backend/db.js
const { Client } = require('pg');
require('dotenv').config();

// Render предоставляет переменную окружения DATABASE_URL, которая содержит все необходимое.
const connectionString = process.env.DATABASE_URL;

const client = new Client({
  connectionString: connectionString,
  // Используем более 'жесткую' конфигурацию SSL.
  // Это прямо указывает драйверу подключаться через SSL,
  // но отключает проверку сертификата, которая вызывает ошибку.
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = client;
