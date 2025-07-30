import { useState, useEffect } from "react";
import {
    useCreatePatientMutation,
    useUpdatePatientMutation,
    useCreateAppointmentMutation
} from "@/api";
import "@/components/PatientForm.css";

function PatientForm({ patient, doctors = [], onClose }) {
    const [createPatient, { isLoading: isCreating }] =
        useCreatePatientMutation();
    const [updatePatient, { isLoading: isUpdating }] =
        useUpdatePatientMutation();
    const [createAppointment] = useCreateAppointmentMutation();

    const [formData, setFormData] = useState({
        fullName: "",
        birthDate: "",
        gender: "male",
        phone: "",
        email: "",
        address: "",
        notes: ""
    });

    const [appointmentData, setAppointmentData] = useState({
        doctorId: "",
        date: "",
        reason: "",
        status: "scheduled"
    });

    const [createAppointmentAfterPatient, setCreateAppointmentAfterPatient] =
        useState(false);

    const isLoading = isCreating || isUpdating;

    useEffect(() => {
        if (patient) {
            // обробляю дату народження, бо вона може приходити в різних форматах
            let formattedBirthDate = "";
            if (patient.birthDate) {
                try {
                    const date = new Date(patient.birthDate);
                    if (!isNaN(date.getTime())) {
                        formattedBirthDate = date.toISOString().split("T")[0];
                    }
                } catch (error) {
                    console.error("Помилка обробки дати народження:", error);
                }
            }

            setFormData({
                fullName: patient.fullName || "",
                birthDate: formattedBirthDate,
                gender: patient.gender || "male",
                phone: patient.phone || "",
                email: patient.email || "",
                address: patient.address || "",
                notes: patient.notes || ""
            });
        }
    }, [patient]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAppointmentChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // перевіряю чи всі обов'язкові поля заповнені
            if (!formData.fullName || !formData.birthDate) {
                throw new Error("Будь ласка, заповніть всі обов'язкові поля");
            }

            // перевіряю поля для запису, якщо потрібно створити запис
            if (
                createAppointmentAfterPatient &&
                (!appointmentData.doctorId ||
                    !appointmentData.date ||
                    !appointmentData.reason)
            ) {
                throw new Error("Будь ласка, заповніть всі поля для запису");
            }

            let createdPatient = null;

            try {
                if (patient) {
                    await updatePatient({
                        id: patient.id,
                        ...formData
                    }).unwrap();
                } else {
                    createdPatient = await createPatient(formData).unwrap();

                    // створюю запис, якщо користувач вибрав цю опцію
                    if (createAppointmentAfterPatient && createdPatient) {
                        await createAppointment({
                            patientId: createdPatient.id,
                            doctorId: appointmentData.doctorId,
                            date: appointmentData.date,
                            reason: appointmentData.reason,
                            status: appointmentData.status
                        }).unwrap();
                    }
                }
                onClose();
            } catch (apiError) {
                console.error("Помилка при збереженні пацієнта:", apiError);
                const errorMessage =
                    apiError?.data?.error ||
                    apiError?.error ||
                    "Помилка при збереженні пацієнта";
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
                        {patient ? "Редагувати пацієнта" : "Додати пацієнта"}
                    </h2>
                    <button className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="patient-form">
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
                        <label htmlFor="birthDate">Дата народження *</label>
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="gender">Стать *</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="male">Чоловіча</option>
                            <option value="female">Жіноча</option>
                        </select>
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
                        <label htmlFor="address">Адреса</label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
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

                    {/* Секція для створення запису (тільки для нових пацієнтів) */}
                    {!patient && (
                        <>
                            <div className="form-divider">
                                <h3>Створити запис для пацієнта</h3>
                            </div>

                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={createAppointmentAfterPatient}
                                        onChange={(e) =>
                                            setCreateAppointmentAfterPatient(
                                                e.target.checked
                                            )
                                        }
                                    />
                                    Створити запис після додавання пацієнта
                                </label>
                            </div>

                            {createAppointmentAfterPatient && (
                                <div className="appointment-fields">
                                    <div className="form-group">
                                        <label htmlFor="doctorId">
                                            Лікар *
                                        </label>
                                        <select
                                            id="doctorId"
                                            name="doctorId"
                                            value={appointmentData.doctorId}
                                            onChange={handleAppointmentChange}
                                            required={
                                                createAppointmentAfterPatient
                                            }
                                        >
                                            <option value="">
                                                Оберіть лікаря
                                            </option>
                                            {doctors.map((doctor) => (
                                                <option
                                                    key={doctor.id}
                                                    value={doctor.id}
                                                >
                                                    {doctor.fullName} -{" "}
                                                    {doctor.specialty}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="appointmentDate">
                                            Дата та час запису *
                                        </label>
                                        <input
                                            type="datetime-local"
                                            id="appointmentDate"
                                            name="date"
                                            value={appointmentData.date}
                                            onChange={handleAppointmentChange}
                                            required={
                                                createAppointmentAfterPatient
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="reason">
                                            Причина запису *
                                        </label>
                                        <textarea
                                            id="reason"
                                            name="reason"
                                            value={appointmentData.reason}
                                            onChange={handleAppointmentChange}
                                            required={
                                                createAppointmentAfterPatient
                                            }
                                            rows="3"
                                            placeholder="Опишіть причину запису..."
                                        />
                                    </div>
                                </div>
                            )}
                        </>
                    )}

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
                                : patient
                                ? "Оновити"
                                : "Додати"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PatientForm;
