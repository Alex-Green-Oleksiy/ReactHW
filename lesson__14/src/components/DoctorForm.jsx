import { useState, useEffect } from "react";
import {
    useCreateDoctorMutation,
    useUpdateDoctorMutation
} from "@/api";
import "@/components/DoctorForm.css";

function DoctorForm({ doctor, onClose }) {
    const [createDoctor, { isLoading: isCreating }] = useCreateDoctorMutation();
    const [updateDoctor, { isLoading: isUpdating }] = useUpdateDoctorMutation();

    const [formData, setFormData] = useState({
        fullName: "",
        specialty: "",
        phone: "",
        email: "",
        room: "",
        notes: ""
    });

    const isLoading = isCreating || isUpdating;

    useEffect(() => {
        if (doctor) {
            setFormData({
                fullName: doctor.fullName || "",
                specialty: doctor.specialty || "",
                phone: doctor.phone || "",
                email: doctor.email || "",
                room: doctor.room || "",
                notes: doctor.notes || ""
            });
        }
    }, [doctor]);

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
            // якщо є doctor - оновлюю, якщо немає - створюю нового
            if (doctor) {
                await updateDoctor({ id: doctor.id, ...formData }).unwrap();
            } else {
                await createDoctor(formData).unwrap();
            }
            onClose();
        } catch (error) {
            console.error("Помилка при збереженні лікаря:", error);
            alert("Помилка при збереженні лікаря");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>{doctor ? "Редагувати лікаря" : "Додати лікаря"}</h2>
                    <button className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="doctor-form">
                    <div className="form-group">
                        <label htmlFor="fullName">ПІБ *</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="specialty">Спеціалізація *</label>
                        <input
                            type="text"
                            id="specialty"
                            name="specialty"
                            value={formData.specialty}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Телефон *</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="room">Кабінет</label>
                        <input
                            type="text"
                            id="room"
                            name="room"
                            value={formData.room}
                            onChange={handleChange}
                        />
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
                                : doctor
                                ? "Оновити"
                                : "Додати"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DoctorForm;
