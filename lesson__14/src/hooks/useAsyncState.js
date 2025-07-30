import { useState, useCallback } from "react";

export const useAsyncState = () => {
    const [state, setState] = useState({
        isLoading: false,
        error: null,
        data: null
    });

    const execute = useCallback(async (asyncFunction) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        
        try {
            const result = await asyncFunction();
            setState({ isLoading: false, error: null, data: result });
            return result;
        } catch (error) {
            setState({ isLoading: false, error, data: null });
            throw error;
        }
    }, []);

    const reset = useCallback(() => {
        setState({ isLoading: false, error: null, data: null });
    }, []);

    return {
        ...state,
        execute,
        reset
    };
};

export const useLoadingState = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const executeWithLoading = useCallback(async (asyncFunction) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const result = await asyncFunction();
            setIsLoading(false);
            return result;
        } catch (err) {
            setIsLoading(false);
            setError(err);
            throw err;
        }
    }, []);

    return {
        isLoading,
        error,
        executeWithLoading
    };
}; 