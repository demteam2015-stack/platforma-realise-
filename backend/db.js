// db.js
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
// Явно указываем путь к .env файлу
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Путь к SSL-сертификату (должен быть в .cloud-certs/root.crt)
const caCertPath = path.join(__dirname, '.cloud-certs', 'root.crt');

let caCert;
try {
  caCert = fs.readFileSync(caCertPath, 'utf-8');
} catch (err) {
  console.error('❌ Не удалось прочитать SSL-сертификат.');
  console.error('Убедитесь, что файл существует:', caCertPath);
  console.error('Скачайте: curl -o .cloud-certs/root.crt https://timeweb.cloud/api-docs/en/cloud-databases/postgresql/root.crt');
  process.exit(1);
}

const client = new Client({
  user: process.env.POSTGRESQL_USER,
  host: process.env.POSTGRESQL_HOST,
  database: process.env.POSTGRESQL_DBNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  port: parseInt(process.env.POSTGRESQL_PORT),
  ssl: {
    // ВНИМАНИЕ: Временно отключена проверка SSL для разработки.
    // ЭТО НЕБЕЗОПАСНО для продакшена.
    rejectUnauthorized: false,
    ca: caCert,
  },
});

module.exports = client;
