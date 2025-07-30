import { useState, useEffect } from "react";
import {
    useCreateAppointmentMutation,
    useUpdateAppointmentMutation
} from "@/api";
import "@/components/AppointmentForm.css";

function AppointmentForm({ appointment, patients, doctors, onClose }) {
    const [createAppointment, { isLoading: isCreating }] =
        useCreateAppointmentMutation();
    const [updateAppointment, { isLoading: isUpdating }] =
        useUpdateAppointmentMutation();

    const [formData, setFormData] = useState({
        patientId: "",
        doctorId: "",
        date: "",
        reason: "",
        status: "scheduled",
        notes: ""
    });

    const isLoading = isCreating || isUpdating;

    useEffect(() => {
        if (appointment) {
            // тут я обробляю дату, бо вона може приходити в різних форматах
            let formattedDate = "";
            if (appointment.date) {
                try {
                    const date = new Date(appointment.date);
                    if (!isNaN(date.getTime())) {
                        formattedDate = date.toISOString().slice(0, 16);
                    }
                } catch (error) {
                    console.error("Помилка обробки дати:", error);
                }
            }

            setFormData({
                patientId: appointment.patientId || "",
                doctorId: appointment.doctorId || "",
                date: formattedDate,
                reason: appointment.reason || "",
                status: appointment.status || "scheduled",
                notes: appointment.notes || ""
            });
        }
    }, [appointment]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // перевіряю чи всі поля заповнені, якщо ні - кидаю помилку
            if (
                !formData.patientId ||
                !formData.doctorId ||
                !formData.date ||
                !formData.reason
            ) {
                throw new Error("Будь ласка, заповніть всі обов'язкові поля");
            }

            try {
                // якщо є appointment - оновлюю, якщо немає - створюю новий
                if (appointment) {
                    await updateAppointment({
                        id: appointment.id,
                        ...formData
                    }).unwrap();
                } else {
                    await createAppointment(formData).unwrap();
                }
                onClose();
            } catch (apiError) {
                console.error("Помилка при збереженні запису:", apiError);
                // беру повідомлення про помилку з різних можливих місць
                const errorMessage =
                    apiError?.data?.error ||
                    apiError?.error ||
                    "Помилка при збереженні запису";
                throw new Error(errorMessage);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>
                        {appointment ? "Редагувати запис" : "Створити запис"}
                    </h2>
                    <button className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                {!patients ||
                patients.length === 0 ||
                !doctors ||
                doctors.length === 0 ? (
                    <div className="form-error">
                        <p>
                            Помилка: Неможливо завантажити дані пацієнтів або
                            лікарів
                        </p>
                        <button onClick={onClose} className="btn btn-secondary">
                            Закрити
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="appointment-form">
                        <div className="form-group">
                            <label htmlFor="patientId">Пацієнт *</label>
                            <select
                                id="patientId"
                                name="patientId"
                                value={formData.patientId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Оберіть пацієнта</option>
                                {patients.map((patient) => (
                                    <option key={patient.id} value={patient.id}>
                                        {patient.fullName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="doctorId">Лікар *</label>
                            <select
                                id="doctorId"
                                name="doctorId"
                                value={formData.doctorId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Оберіть лікаря</option>
                                {doctors.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>
                                        {doctor.fullName} - {doctor.specialty}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="date">Дата та час *</label>
                            <input
                                type="datetime-local"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="reason">Причина *</label>
                            <textarea
                                id="reason"
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                required
                                rows="3"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="status">Статус</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="scheduled">Запланований</option>
                                <option value="active">Активний</option>
                                <option value="completed">Завершено</option>
                                <option value="cancelled">Скасовано</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="notes">Нотатки</label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows="3"
                            />
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn btn-secondary"
                                disabled={isLoading}
                            >
                                Скасувати
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isLoading}
                            >
                                {isLoading
                                    ? "Збереження..."
                                    : appointment
                                    ? "Оновити"
                                    : "Створити"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default AppointmentForm;
