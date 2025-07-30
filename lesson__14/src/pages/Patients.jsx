import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    useGetPatientsQuery,
    useGetDoctorsQuery,
    useDeletePatientMutation
} from "@/api";
import { PAGINATION } from "@/constants/ui";
import PatientForm from "@/components/PatientForm";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import AsyncStateHandler from "@/components/AsyncStateHandler";
import Pagination from "@/components/Pagination";
import "@/pages/Patients.css";

const Patients = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingPatient, setEditingPatient] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        patientId: null,
        patientName: ""
    });
    const itemsPerPage = PAGINATION.ITEMS_PER_PAGE;

    const { data: patients = [], isLoading, error } = useGetPatientsQuery();
    const { data: doctors = [] } = useGetDoctorsQuery();
    const [deletePatient] = useDeletePatientMutation();

    // фільтрую пацієнтів по пошуковому запиту
    const filteredPatients = useMemo(() => {
        if (!searchTerm.trim()) return patients;

        return patients.filter(
            (patient) =>
                patient.fullName
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                patient.email
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                patient.phone?.includes(searchTerm)
        );
    }, [patients, searchTerm]);

    // розрахунки для пагінації
    const totalItems = filteredPatients.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage;
    const endItem = startItem + itemsPerPage;
    const currentPatients = filteredPatients.slice(startItem, endItem);

    // скидаю сторінку коли змінюється пошук
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleEdit = (patient) => {
        setEditingPatient(patient);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await deletePatient(id).unwrap();

            // перевіряю чи потрібно перейти на попередню сторінку після видалення
            const remainingItems = filteredPatients.length - 1;
            const maxPage = Math.ceil(remainingItems / itemsPerPage);

            if (currentPage > maxPage && maxPage > 0) {
                setCurrentPage(maxPage);
            }
        } catch (error) {
            console.error("Помилка при видаленні пацієнта:", error);
        }
    };

    const openDeleteModal = (patient) => {
        setDeleteModal({
            isOpen: true,
            patientId: patient.id,
            patientName: patient.fullName
        });
    };

    const closeDeleteModal = () => {
        setDeleteModal({ isOpen: false, patientId: null, patientName: "" });
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingPatient(null);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // прокручую нагору сторінки коли змінюю сторінку
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <AsyncStateHandler
            isLoading={isLoading}
            error={error}
            loadingMessage="Завантаження пацієнтів..."
            errorMessage="Помилка завантаження пацієнтів"
        >
            <div className="patients-page">
                <div className="page-header">
                    <h1>Пацієнти</h1>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowForm(true)}
                    >
                        Додати пацієнта
                    </button>
                </div>

                <div className="search-section">
                    <input
                        type="text"
                        placeholder="Пошук пацієнтів..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    {searchTerm && (
                        <div className="search-results">
                            Знайдено: {filteredPatients.length} пацієнтів
                        </div>
                    )}
                </div>

                <div className="patients-grid">
                    {currentPatients.length > 0 ? (
                        currentPatients.map((patient) => (
                            <div key={patient.id} className="patient-card">
                                <div className="patient-info">
                                    <h3>{patient.fullName}</h3>
                                    <p>
                                        <strong>Email:</strong>{" "}
                                        {patient.email || "Не вказано"}
                                    </p>
                                    <p>
                                        <strong>Телефон:</strong>{" "}
                                        {patient.phone || "Не вказано"}
                                    </p>
                                    <p>
                                        <strong>Дата народження:</strong>{" "}
                                        {patient.birthDate
                                            ? new Date(
                                                  patient.birthDate
                                              ).toLocaleDateString()
                                            : "Не вказано"}
                                    </p>
                                    <p>
                                        <strong>Стать:</strong>{" "}
                                        {patient.gender === "male"
                                            ? "Чоловіча"
                                            : patient.gender === "female"
                                            ? "Жіноча"
                                            : "Не вказано"}
                                    </p>
                                    {patient.address && (
                                        <p>
                                            <strong>Адреса:</strong>{" "}
                                            {patient.address}
                                        </p>
                                    )}
                                </div>
                                <div className="patient-actions">
                                    <Link
                                        to={`/patients/${patient.id}`}
                                        className="btn btn-info btn-small"
                                    >
                                        Деталі
                                    </Link>
                                    <button
                                        onClick={() => handleEdit(patient)}
                                        className="btn btn-warning btn-small"
                                    >
                                        Редагувати
                                    </button>
                                    <button
                                        onClick={() => openDeleteModal(patient)}
                                        className="btn btn-danger btn-small"
                                    >
                                        Видалити
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-data">
                            {searchTerm
                                ? "Пацієнтів не знайдено"
                                : "Поки що немає пацієнтів"}
                        </div>
                    )}
                </div>

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        startItem={startItem}
                        endItem={endItem}
                        itemType="пацієнтів"
                    />
                )}

                {showForm && (
                    <PatientForm
                        patient={editingPatient}
                        doctors={doctors}
                        onClose={handleFormClose}
                    />
                )}

                <DeleteConfirmModal
                    isOpen={deleteModal.isOpen}
                    onClose={closeDeleteModal}
                    onConfirm={() => handleDelete(deleteModal.patientId)}
                    title="Видалити пацієнта"
                    message={`Ви впевнені, що хочете видалити пацієнта "${deleteModal.patientName}"? Ця дія не може бути скасована.`}
                    confirmText="Видалити"
                    cancelText="Скасувати"
                />
            </div>
        </AsyncStateHandler>
    );
};

export default Patients;
