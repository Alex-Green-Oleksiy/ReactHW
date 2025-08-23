import { app } from '@/shared/firebase/firebase'
import { getFunctions, httpsCallable } from 'firebase/functions'

export const functions = getFunctions(app)
export const adminDeleteProduct = httpsCallable(functions, 'adminDeleteProduct')
