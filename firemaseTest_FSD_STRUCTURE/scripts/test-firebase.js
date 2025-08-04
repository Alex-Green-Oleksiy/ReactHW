import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'

// Конфігурація Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDQCXyC61pj_BpTuHDVCwBFVQiUOYxGGv8",
  authDomain: "hw-15-804f0.firebaseapp.com",
  projectId: "hw-15-804f0",
  storageBucket: "hw-15-804f0.firebasestorage.app",
  messagingSenderId: "3709709812",
  appId: "1:3709709812:web:75c2384da16c3a79eedda1"
}

console.log('🔥 Ініціалізація Firebase...')

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
    console.error('\n💡 Перевірте правильність API ключа')
  } else if (error.code === 'permission-denied') {
    console.error('\n💡 Перевірте правила безпеки в Firestore')
  }
  
  process.exit(1)
} 