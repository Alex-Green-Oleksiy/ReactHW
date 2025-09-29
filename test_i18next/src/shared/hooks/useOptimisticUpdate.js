import { useState, useCallback } from 'react'

/**
 * Hook for optimistic updates
 * @param {Function} updateFunction - The actual update function that returns a promise
 * @param {Function} rollbackFunction - Function to rollback the optimistic update
 * @returns {Object} - { execute, loading, error }
 */
export function useOptimisticUpdate(updateFunction, rollbackFunction) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(async (...args) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await updateFunction(...args)
      setLoading(false)
      return result
    } catch (err) {
      setError(err)
      setLoading(false)
      
      // Rollback if rollback function is provided
      if (rollbackFunction) {
        try {
          await rollbackFunction(...args)
        } catch (rollbackErr) {
          console.error('Rollback failed:', rollbackErr)
        }
      }
      
      throw err
    }
  }, [updateFunction, rollbackFunction])

  return { execute, loading, error }
}

/**
 * Hook for optimistic state updates
 * @param {*} initialState - Initial state value
 * @param {Function} updateFunction - Function that performs the actual update
 * @returns {Object} - { state, setState, execute, loading, error }
 */
export function useOptimisticState(initialState, updateFunction) {
  const [state, setState] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(async (optimisticUpdate, ...args) => {
    // Apply optimistic update immediately
    setState(optimisticUpdate)
    setLoading(true)
    setError(null)

    try {
      const result = await updateFunction(...args)
      setLoading(false)
      return result
    } catch (err) {
      // Revert optimistic update on error
      setState(initialState)
      setError(err)
      setLoading(false)
      throw err
    }
  }, [updateFunction, initialState])

  return { state, setState, execute, loading, error }
}
