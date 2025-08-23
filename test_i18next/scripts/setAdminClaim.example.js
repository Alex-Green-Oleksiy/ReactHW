// Приклад: встановлення custom claim admin=true для користувача
// 1) Створіть сервісний ключ у Google Cloud (IAM & Admin -> Service Accounts),
//    завантажте JSON і збережіть як scripts/serviceAccountKey.json (НЕ комітьте!)
// 2) Перейменуйте цей файл на setAdminClaim.js і відредагуйте UID нижче
// 3) Встановіть залежності: npm i firebase-admin
// 4) Запуск: node scripts/setAdminClaim.js

const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json') // не додавайте цей файл у git

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })

const UID = '<ADMIN_UID_HERE>'

;(async () => {
  if (!UID || UID.includes('ADMIN_UID_HERE')) {
    throw new Error('Будь ласка, вкажіть реальний UID у змінній UID')
  }
  await admin.auth().setCustomUserClaims(UID, { admin: true })
  console.log('Custom claim admin=true встановлено для UID:', UID)
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
