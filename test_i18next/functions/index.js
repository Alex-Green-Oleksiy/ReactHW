const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

exports.adminDeleteProduct = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Auth required')
  }

  const uid = context.auth.uid
  const id = String(data?.id || '')
  if (!id) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing product id')
  }

  // Check admin rights: via Firestore user doc role or via custom claim
  let isAdmin = false
  try {
    const userSnap = await admin.firestore().doc(`users/${uid}`).get()
    const role = userSnap.exists ? userSnap.get('role') : 'user'
    isAdmin = role === 'admin'
  } catch (e) {
    console.warn('Failed to read user role from Firestore', e?.code || e?.message || e)
  }

  // If you prefer custom claims, uncomment and use this instead:
  // const isAdmin = context.auth.token?.admin === true

  if (!isAdmin) {
    throw new functions.https.HttpsError('permission-denied', 'Admin only')
  }

  // Delete Firestore document
  await admin.firestore().doc(`products/${id}`).delete()

  // Try to delete Storage object by convention path: products/<id>.jpg
  const bucket = admin.storage().bucket()
  const filePath = `products/${id}.jpg`
  try {
    await bucket.file(filePath).delete()
  } catch (e) {
    // Ignore if file not found or cannot be deleted; just log
    console.warn('delete image ignored:', e?.code || e?.message || e)
  }

  return { ok: true }
})
