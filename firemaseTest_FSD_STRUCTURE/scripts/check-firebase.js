import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'

// Перевірка наявності змінних середовища
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
]

console.log('🔍 Перевірка змінних середовища...')
const missingVars = []

for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    missingVars.push(envVar)
    console.log(`❌ ${envVar}: відсутня`)
  } else {
    console.log(`✅ ${envVar}: налаштована`)
  }
}

if (missingVars.length > 0) {
  console.error('\n❌ Помилка: Відсутні необхідні змінні середовища!')
  console.error('Створіть файл .env з наступними змінними:')
  missingVars.forEach(varName => {
    console.error(`  ${varName}=your_value_here`)
  })
  process.exit(1)
}

console.log('\n✅ Всі змінні середовища налаштовані!')

// Конфігурація Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

console.log('\n🔥 Ініціалізація Firebase...')

try {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  
  console.log('✅ Firebase успішно ініціалізований!')
  console.log(`📊 Project ID: ${firebaseConfig.projectId}`)
  
  // Тестування підключення до Firestore
  console.log('\n🔍 Тестування підключення до Firestore...')
  
  const testCollection = collection(db, 'test')
  await getDocs(testCollection)
  
  console.log('✅ Підключення до Firestore працює!')
  console.log('\n🎉 Всі перевірки пройшли успішно!')
  
} catch (error) {
  console.error('\n❌ Помилка підключення до Firebase:')
  console.error(error.message)
  
  if (error.code === 'auth/invalid-api-key') {
    console.error('\n💡 Перевірте правильність API ключа в змінних середовища')
  } else if (error.code === 'permission-denied') {
    console.error('\n💡 Перевірте правила безпеки в Firestore')
  }
  
  process.exit(1)
} 