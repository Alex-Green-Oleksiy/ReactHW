import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
    useGetAppointmentsQuery,
    useGetPatientsQuery,
    useGetDoctorsQuery,
    useDeleteAppointmentMutation,
    useUpdateAppointmentMutation
} from "@/api";
import AppointmentForm from "@/components/AppointmentForm";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import AsyncStateHandler from "@/components/AsyncStateHandler";
import "@/pages/Appointments.css";

const Appointments = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        appointmentId: null,
        appointmentInfo: ""
    });

    const {
        data: appointments = [],
        isLoading,
        error
    } = useGetAppointmentsQuery();
    const { data: patients = [] } = useGetPatientsQuery();
    const { data: doctors = [] } = useGetDoctorsQuery();
    const [deleteAppointment] = useDeleteAppointmentMutation();
    const [updateAppointment] = useUpdateAppointmentMutation();

    // фільтрую записи по пошуку та статусу
    const filteredAppointments = useMemo(() => {
        let filtered = appointments;

        if (searchTerm.trim()) {
            filtered = filtered.filter((appointment) => {
                const patient = patients.find(
                    (p) => p.id === appointment.patientId
                );
                const doctor = doctors.find(
                    (d) => d.id === appointment.doctorId
                );

                return (
                    patient?.fullName
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    doctor?.fullName
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    appointment.reason
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
                );
            });
        }

        if (statusFilter) {
            filtered = filtered.filter(
                (appointment) => appointment.status === statusFilter
            );
        }

        return filtered;
    }, [appointments, patients, doctors, searchTerm, statusFilter]);

    const handleEdit = (appointment) => {
        setEditingAppointment(appointment);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteAppointment(id).unwrap();
        } catch (error) {
            console.error("Помилка при видаленні запису:", error);
        }
    };

    const openDeleteModal = (appointment) => {
        const patient = patients.find((p) => p.id === appointment.patientId);
        const doctor = doctors.find((d) => d.id === appointment.doctorId);
        const appointmentInfo = `${
            patient?.fullName || "Невідомий пацієнт"
        } - ${doctor?.fullName || "Невідомий лікар"}`;

        setDeleteModal({
            isOpen: true,
            appointmentId: appointment.id,
            appointmentInfo
        });
    };

    const closeDeleteModal = () => {
        setDeleteModal({
            isOpen: false,
            appointmentId: null,
            appointmentInfo: ""
        });
    };

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

    const handleFormClose = () => {
        setShowForm(false);
        setEditingAppointment(null);
    };

    return (
        <AsyncStateHandler
            isLoading={isLoading}
            error={error}
            loadingMessage="Завантаження записів..."
            errorMessage="Помилка завантаження записів"
        >
            <div className="appointments-page">
                <div className="page-header">
                    <h1>Записи</h1>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowForm(true)}
                    >
                        Додати запис
                    </button>
                </div>

                <div className="filters-section">
                    <div className="filter-group">
                        <label>Пошук:</label>
                        <input
                            type="text"
                            placeholder="Пошук за пацієнтом, лікарем або причиною..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="filter-input"
                        />
                    </div>

                    <div className="filter-group">
                        <label>Статус:</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="filter-input"
                        >
                            <option value="">Всі статуси</option>
                            <option value="scheduled">Заплановано</option>
                            <option value="completed">Завершено</option>
                            <option value="cancelled">Скасовано</option>
                        </select>
                    </div>

                    {(searchTerm || statusFilter) && (
                        <div className="filter-results">
                            Знайдено: {filteredAppointments.length} записів
                        </div>
                    )}
                </div>

                <div className="appointments-grid">
                    {filteredAppointments.length > 0 ? (
                        filteredAppointments.map((appointment) => {
                            const patient = patients.find(
                                (p) => p.id === appointment.patientId
                            );
                            const doctor = doctors.find(
                                (d) => d.id === appointment.doctorId
                            );

                            return (
                                <div
                                    key={appointment.id}
                                    className="appointment-card"
                                >
                                    <div className="appointment-info">
                                        <h3>
                                            <Link
                                                to={`/patients/${appointment.patientId}`}
                                            >
                                                {patient?.fullName ||
                                                    "Невідомий пацієнт"}
                                            </Link>
                                        </h3>
                                        <p>
                                            <strong>Лікар:</strong>{" "}
                                            {doctor?.fullName ||
                                                "Невідомий лікар"}
                                        </p>
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
                                        <Link
                                            to={`/appointments/${appointment.id}`}
                                            className="btn btn-info btn-small"
                                        >
                                            Деталі
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleEdit(appointment)
                                            }
                                            className="btn btn-warning btn-small"
                                        >
                                            Редагувати
                                        </button>
                                        <button
                                            onClick={() =>
                                                openDeleteModal(appointment)
                                            }
                                            className="btn btn-danger btn-small"
                                        >
                                            Видалити
                                        </button>
                                    </div>
                                    <div className="status-section">
                                        <label
                                            htmlFor={`status-${appointment.id}`}
                                            className="status-label"
                                        >
                                            Статус:
                                        </label>
                                        <select
                                            id={`status-${appointment.id}`}
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
                        })
                    ) : (
                        <div className="no-data">
                            {searchTerm || statusFilter
                                ? "Записів не знайдено"
                                : "Поки що немає записів"}
                        </div>
                    )}
                </div>

                {showForm && (
                    <AppointmentForm
                        appointment={editingAppointment}
                        patients={patients}
                        doctors={doctors}
                        onClose={handleFormClose}
                    />
                )}

                <DeleteConfirmModal
                    isOpen={deleteModal.isOpen}
                    onClose={closeDeleteModal}
                    onConfirm={() => handleDelete(deleteModal.appointmentId)}
                    title="Видалити запис"
                    message={`Ви впевнені, що хочете видалити запис "${deleteModal.appointmentInfo}"? Ця дія не може бути скасована.`}
                    confirmText="Видалити"
                    cancelText="Скасувати"
                />
            </div>
        </AsyncStateHandler>
    );
};

export default Appointments;
