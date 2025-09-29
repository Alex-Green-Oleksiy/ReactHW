// Firebase error handling utilities

/**
 * Check if error is related to cleanup or connection issues that can be safely ignored
 * @param {Error} error - Firebase error
 * @returns {boolean} - Should ignore this error
 */
export const shouldIgnoreFirebaseError = (error) => {
  const ignorableCodes = [
    'cancelled',      // Operation was cancelled
    'aborted',        // Operation was aborted
    'unavailable',    // Service temporarily unavailable
    'deadline-exceeded', // Request timeout
    'resource-exhausted', // Quota exceeded
  ];
  
  return ignorableCodes.includes(error?.code);
};

/**
 * Safe Firebase operation wrapper
 * @param {Function} operation - Firebase operation function
 * @param {string} operationName - Name of operation for logging
 * @returns {Promise} - Wrapped operation
 */
export const safeFirebaseOperation = async (operation, operationName = 'Firebase operation') => {
  try {
    return await operation();
  } catch (error) {
    if (shouldIgnoreFirebaseError(error)) {
      console.warn(`${operationName} was cancelled or aborted:`, error.message);
      return null;
    }
    console.error(`${operationName} failed:`, error);
    throw error;
  }
};

/**
 * Safe unsubscribe function
 * @param {Function} unsubscribeFn - Firebase unsubscribe function
 * @param {string} subscriptionName - Name of subscription for logging
 */
export const safeUnsubscribe = (unsubscribeFn, subscriptionName = 'subscription') => {
  try {
    unsubscribeFn();
  } catch (error) {
    console.warn(`Failed to unsubscribe from ${subscriptionName}:`, error.message);
  }
};

/**
 * Handle Firebase Auth errors
 * @param {Error} error - Firebase Auth error
 * @param {string} operation - Operation name
 */
export const handleAuthError = (error, operation = 'Auth operation') => {
  if (shouldIgnoreFirebaseError(error)) {
    console.warn(`${operation} was cancelled:`, error.message);
    return;
  }
  
  console.error(`${operation} failed:`, error);
  throw error;
};

/**
 * Handle Firestore errors
 * @param {Error} error - Firestore error
 * @param {string} operation - Operation name
 */
export const handleFirestoreError = (error, operation = 'Firestore operation') => {
  if (shouldIgnoreFirebaseError(error)) {
    console.warn(`${operation} was cancelled:`, error.message);
    return;
  }
  
  console.error(`${operation} failed:`, error);
  throw error;
};
