// generate-secret.js

const crypto = require('crypto');

// إنشاء مفتاح سري عشوائي بطول 32 بايت (256 بت)
const secretKey = crypto.randomBytes(32).toString('hex');

console.log(secretKey);
