import { useCallback, useState } from "react";
import apiRoutes from "../api/apiRoutes";
import axios from "axios";

const useTeachersApi = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTeachers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(apiRoutes.getAllTeachers);
            setData(res.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Додати нового вчителя
    const addTeacher = useCallback(async (teacher) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(apiRoutes.addTeacher, teacher);
            return res.data;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // Оновити вчителя
    const updateTeacher = useCallback(async (id, teacher) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.put(apiRoutes.updateTeacher(id), teacher);
            return res.data;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // Отримати вчителя за id
    const getTeacherById = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(apiRoutes.getTeacherById(id));
            return res.data;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // Видалити вчителя
    const removeTeacher = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(apiRoutes.deleteTeacher(id));
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        data,
        loading,
        error,
        fetchTeachers,
        addTeacher,
        updateTeacher,
        getTeacherById,
        removeTeacher
    };
};

export default useTeachersApi;
