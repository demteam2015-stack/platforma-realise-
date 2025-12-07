// db.js
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const isProduction = process.env.NODE_ENV === 'production';

// Путь к SSL-сертификату
const caCertPath = path.join(__dirname, '.cloud-certs', 'root.crt');
let caCert;

try {
  caCert = fs.readFileSync(caCertPath, 'utf-8');
} catch (err) {
  // В продакшене сертификат обязателен
  if (isProduction) {
    console.error('❌ КРИТИЧЕСКАЯ ОШИБКА: Не удалось прочитать SSL-сертификат в продакшен-окружении.');
    process.exit(1);
  }
}

// Настройки SSL
const sslConfig = {
  ca: caCert,
  // В продакшене используем безопасный режим, для разработки - временное решение
  rejectUnauthorized: isProduction, 
};


const client = new Client({
  user: process.env.POSTGRESQL_USER,
  host: process.env.POSTGRESQL_HOST,
  database: process.env.POSTGRESQL_DBNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  port: parseInt(process.env.POSTGRESQL_PORT),
  ssl: isProduction ? sslConfig : { rejectUnauthorized: false },
});

module.exports = client;
