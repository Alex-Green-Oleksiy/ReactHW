import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    useGetPatientByIdQuery,
    useGetAppointmentsQuery,
    useUpdateAppointmentMutation
} from "@/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import "@/pages/PatientDetails.css";

const PatientDetails = () => {
    const { id } = useParams();
    const {
        data: patient,
        isLoading: patientLoading,
        error: patientError
    } = useGetPatientByIdQuery(id);
    const { data: appointments = [], isLoading: appointmentsLoading } =
        useGetAppointmentsQuery();
    const [updateAppointment] = useUpdateAppointmentMutation();

    const handleStatusChange = async (appointment, newStatus) => {
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

    if (patientLoading || appointmentsLoading) {
        return <LoadingSpinner message="Завантаження деталей пацієнта..." />;
    }

    if (patientError || !patient) {
        return <div className="error">Пацієнта не знайдено</div>;
    }

    // Фільтруємо записи для цього пацієнта
    const patientAppointments = appointments.filter(
        (appointment) => appointment.patientId === id
    );

    // Розраховуємо вік
    const calculateAge = (birthDate) => {
        if (!birthDate) return null;
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birth.getDate())
        ) {
            age--;
        }
        return age;
    };

    const age = calculateAge(patient.birthDate);

    return (
        <div className="patient-details">
            <div className="page-header">
                <h1>Деталі пацієнта</h1>
                <Link to="/patients" className="btn btn-secondary">
                    Назад до списку
                </Link>
            </div>

            <div className="patient-info-section">
                <div className="patient-card">
                    <h2>{patient.fullName}</h2>
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
                        {age && (
                            <div className="detail-item">
                                <strong>Вік:</strong> {age} років
                            </div>
                        )}
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

            <div className="appointments-section">
                <h2>Записи пацієнта</h2>
                {patientAppointments.length > 0 ? (
                    <div className="appointments-list">
                        {patientAppointments.map((appointment) => (
                            <div
                                key={appointment.id}
                                className="appointment-item"
                            >
                                <div className="appointment-info">
                                    <h3>
                                        <Link
                                            to={`/appointments/${appointment.id}`}
                                        >
                                            Запис від{" "}
                                            {new Date(
                                                appointment.date
                                            ).toLocaleDateString()}
                                        </Link>
                                    </h3>
                                    <p>
                                        <strong>Дата:</strong>{" "}
                                        {new Date(
                                            appointment.date
                                        ).toLocaleString()}
                                    </p>
                                    <p>
                                        <strong>Причина:</strong>{" "}
                                        {appointment.reason || "Не вказано"}
                                    </p>
                                    {appointment.notes && (
                                        <p>
                                            <strong>Нотатки:</strong>{" "}
                                            {appointment.notes}
                                        </p>
                                    )}
                                </div>
                                <div className="appointment-actions">
                                    <select
                                        value={appointment.status}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                appointment,
                                                e.target.value
                                            )
                                        }
                                        className={`status-select status-${appointment.status}`}
                                    >
                                        <option value="scheduled">
                                            Заплановано
                                        </option>
                                        <option value="active">Активний</option>
                                        <option value="completed">
                                            Завершено
                                        </option>
                                        <option value="cancelled">
                                            Скасовано
                                        </option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-data">У пацієнта поки що немає записів</p>
                )}
            </div>
        </div>
    );
};

export default PatientDetails;
