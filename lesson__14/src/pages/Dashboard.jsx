import {
    useGetPatientsQuery,
    useGetDoctorsQuery,
    useGetAppointmentsQuery,
    useUpdateAppointmentMutation
} from "@/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import "@/pages/Dashboard.css";

const Dashboard = () => {
    const { data: patients, isLoading: patientsLoading } =
        useGetPatientsQuery();
    const { data: doctors, isLoading: doctorsLoading } = useGetDoctorsQuery();
    const { data: appointments, isLoading: appointmentsLoading } =
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

    if (patientsLoading || doctorsLoading || appointmentsLoading) {
        return <LoadingSpinner message="Завантаження дашборду..." />;
    }

    const totalPatients = patients?.length || 0;
    const totalDoctors = doctors?.length || 0;
    const totalAppointments = appointments?.length || 0;

    // рахую активні записи (які не завершені і не скасовані)
    const activeAppointments =
        appointments?.filter(
            (appointment) =>
                appointment.status !== "completed" &&
                appointment.status !== "cancelled"
        ).length || 0;

    // рахую записи на сьогодні
    const today = new Date().toISOString().split("T")[0];
    const todayAppointments =
        appointments?.filter((appointment) =>
            appointment.date?.startsWith(today)
        ).length || 0;

    return (
        <div className="dashboard">
            <h1>Панель керування</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                        <h3>Пацієнти</h3>
                        <p className="stat-number">{totalPatients}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">👨‍⚕️</div>
                    <div className="stat-content">
                        <h3>Лікарі</h3>
                        <p className="stat-number">{totalDoctors}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">📅</div>
                    <div className="stat-content">
                        <h3>Всього записів</h3>
                        <p className="stat-number">{totalAppointments}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div className="stat-content">
                        <h3>Активні записи</h3>
                        <p className="stat-number">{activeAppointments}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">📋</div>
                    <div className="stat-content">
                        <h3>Записи сьогодні</h3>
                        <p className="stat-number">{todayAppointments}</p>
                    </div>
                </div>
            </div>

            <div className="recent-section">
                <h2>Останні записи</h2>
                {appointments && appointments.length > 0 ? (
                    <div className="recent-appointments">
                        {appointments.slice(0, 5).map((appointment) => {
                            const patient = patients?.find(
                                (p) => p.id === appointment.patientId
                            );
                            const doctor = doctors?.find(
                                (d) => d.id === appointment.doctorId
                            );

                            return (
                                <div
                                    key={appointment.id}
                                    className="appointment-card"
                                >
                                    <div className="appointment-info">
                                        <h4>
                                            {patient?.fullName ||
                                                "Невідомий пацієнт"}
                                        </h4>
                                        <p>
                                            Лікар:{" "}
                                            {doctor?.fullName ||
                                                "Невідомий лікар"}
                                        </p>
                                        <p>
                                            Дата:{" "}
                                            {new Date(
                                                appointment.date
                                            ).toLocaleDateString()}
                                        </p>
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
                                            <option value="active">
                                                Активний
                                            </option>
                                            <option value="completed">
                                                Завершено
                                            </option>
                                            <option value="cancelled">
                                                Скасовано
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="no-data">Поки що немає записів</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
