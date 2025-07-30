import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    useGetAppointmentByIdQuery,
    useGetPatientsQuery,
    useGetDoctorsQuery,
    useUpdateAppointmentMutation
} from "@/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import "@/pages/AppointmentDetails.css";

const AppointmentDetails = () => {
    const { id } = useParams();
    const {
        data: appointment,
        isLoading: appointmentLoading,
        error: appointmentError
    } = useGetAppointmentByIdQuery(id);
    const { data: patients = [] } = useGetPatientsQuery();
    const { data: doctors = [] } = useGetDoctorsQuery();
    const [updateAppointment] = useUpdateAppointmentMutation();

    const handleStatusChange = async (newStatus) => {
        try {
            await updateAppointment({
                id: appointment.id,
                patientId: appointment.patientId,
                doctorId: appointment.doctorId,
                date: appointment.date,
                reason: appointment.reason,
                status: newStatus,
                notes: appointment.notes
            }).unwrap();
        } catch (error) {
            console.error("Помилка при зміні статусу:", error);
            alert("Помилка при зміні статусу запису");
        }
    };

    if (appointmentLoading) {
        return <LoadingSpinner message="Завантаження деталей запису..." />;
    }

    if (appointmentError || !appointment) {
        return <div className="error">Запис не знайдено</div>;
    }

    const patient = patients.find((p) => p.id === appointment.patientId);
    const doctor = doctors.find((d) => d.id === appointment.doctorId);

    return (
        <div className="appointment-details">
            <div className="page-header">
                <h1>Деталі запису</h1>
                <Link to="/appointments" className="btn btn-secondary">
                    Назад до списку
                </Link>
            </div>

            <div className="appointment-info-section">
                <div className="appointment-card">
                    <div className="appointment-header">
                        <h2>Запис #{appointment.id}</h2>
                        <div className="status-change-section">
                            <label
                                htmlFor="status-select"
                                className="status-label"
                            >
                                Статус:
                            </label>
                            <select
                                id="status-select"
                                value={appointment.status}
                                onChange={(e) =>
                                    handleStatusChange(e.target.value)
                                }
                                className={`status-select status-${appointment.status}`}
                            >
                                <option value="scheduled">Заплановано</option>
                                <option value="active">Активний</option>
                                <option value="completed">Завершено</option>
                                <option value="cancelled">Скасовано</option>
                            </select>
                        </div>
                    </div>

                    <div className="appointment-details-grid">
                        <div className="detail-item">
                            <strong>Пацієнт:</strong>
                            <Link to={`/patients/${appointment.patientId}`}>
                                {patient?.fullName || "Невідомий пацієнт"}
                            </Link>
                        </div>

                        <div className="detail-item">
                            <strong>Лікар:</strong>
                            {doctor?.fullName || "Невідомий лікар"}
                        </div>

                        <div className="detail-item">
                            <strong>Дата та час:</strong>
                            {new Date(appointment.date).toLocaleString()}
                        </div>

                        <div className="detail-item">
                            <strong>Причина:</strong>
                            {appointment.reason || "Не вказано"}
                        </div>

                        {appointment.notes && (
                            <div className="detail-item">
                                <strong>Нотатки:</strong>
                                {appointment.notes}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {patient && (
                <div className="patient-info-section">
                    <h3>Інформація про пацієнта</h3>
                    <div className="patient-card">
                        <h4>{patient.fullName}</h4>
                        <div className="patient-details-grid">
                            <div className="detail-item">
                                <strong>Email:</strong>{" "}
                                {patient.email || "Не вказано"}
                            </div>
                            <div className="detail-item">
                                <strong>Телефон:</strong>{" "}
                                {patient.phone || "Не вказано"}
                            </div>
                            <div className="detail-item">
                                <strong>Дата народження:</strong>{" "}
                                {patient.birthDate
                                    ? new Date(
                                          patient.birthDate
                                      ).toLocaleDateString()
                                    : "Не вказано"}
                            </div>
                            <div className="detail-item">
                                <strong>Стать:</strong>{" "}
                                {patient.gender === "male"
                                    ? "Чоловіча"
                                    : patient.gender === "female"
                                    ? "Жіноча"
                                    : "Не вказано"}
                            </div>
                            {patient.address && (
                                <div className="detail-item">
                                    <strong>Адреса:</strong> {patient.address}
                                </div>
                            )}
                            {patient.notes && (
                                <div className="detail-item">
                                    <strong>Нотатки:</strong> {patient.notes}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {doctor && (
                <div className="doctor-info-section">
                    <h3>Інформація про лікаря</h3>
                    <div className="doctor-card">
                        <h4>{doctor.fullName}</h4>
                        <div className="doctor-details-grid">
                            <div className="detail-item">
                                <strong>Спеціалізація:</strong>{" "}
                                {doctor.specialty || "Не вказано"}
                            </div>
                            <div className="detail-item">
                                <strong>Email:</strong>{" "}
                                {doctor.email || "Не вказано"}
                            </div>
                            <div className="detail-item">
                                <strong>Телефон:</strong>{" "}
                                {doctor.phone || "Не вказано"}
                            </div>
                            <div className="detail-item">
                                <strong>Кабінет:</strong>{" "}
                                {doctor.room || "Не вказано"}
                            </div>
                            {doctor.notes && (
                                <div className="detail-item">
                                    <strong>Нотатки:</strong> {doctor.notes}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentDetails;
