import { useState, useMemo, useEffect } from "react";
import { useGetDoctorsQuery, useDeleteDoctorMutation } from "@/api";
import { PAGINATION } from "@/constants/ui";
import DoctorForm from "@/components/DoctorForm";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import AsyncStateHandler from "@/components/AsyncStateHandler";
import Pagination from "@/components/Pagination";
import "@/pages/Doctors.css";

const Doctors = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        doctorId: null,
        doctorName: ""
    });
    const itemsPerPage = PAGINATION.ITEMS_PER_PAGE;

    const { data: doctors = [], isLoading, error } = useGetDoctorsQuery();
    const [deleteDoctor] = useDeleteDoctorMutation();

    // фільтрую лікарів по пошуковому запиту
    const filteredDoctors = useMemo(() => {
        if (!searchTerm.trim()) return doctors;

        return doctors.filter(
            (doctor) =>
                doctor.fullName
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                doctor.specialty
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                doctor.email
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                doctor.phone?.includes(searchTerm)
        );
    }, [doctors, searchTerm]);

    // розрахунки для пагінації
    const totalItems = filteredDoctors.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage;
    const endItem = startItem + itemsPerPage;
    const currentDoctors = filteredDoctors.slice(startItem, endItem);

    // скидаю сторінку коли змінюється пошук
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleEdit = (doctor) => {
        setEditingDoctor(doctor);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoctor(id).unwrap();

            // перевіряю чи потрібно перейти на попередню сторінку після видалення
            const remainingItems = filteredDoctors.length - 1;
            const maxPage = Math.ceil(remainingItems / itemsPerPage);

            if (currentPage > maxPage && maxPage > 0) {
                setCurrentPage(maxPage);
            }
        } catch (error) {
            console.error("Помилка при видаленні лікаря:", error);
        }
    };

    const openDeleteModal = (doctor) => {
        setDeleteModal({
            isOpen: true,
            doctorId: doctor.id,
            doctorName: doctor.fullName
        });
    };

    const closeDeleteModal = () => {
        setDeleteModal({ isOpen: false, doctorId: null, doctorName: "" });
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingDoctor(null);
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
            loadingMessage="Завантаження лікарів..."
            errorMessage="Помилка завантаження лікарів"
        >
            <div className="doctors-page">
                <div className="page-header">
                    <h1>Лікарі</h1>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowForm(true)}
                    >
                        Додати лікаря
                    </button>
                </div>

                <div className="search-section">
                    <input
                        type="text"
                        placeholder="Пошук лікарів..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    {searchTerm && (
                        <div className="search-results">
                            Знайдено: {filteredDoctors.length} лікарів
                        </div>
                    )}
                </div>

                <div className="doctors-grid">
                    {currentDoctors.length > 0 ? (
                        currentDoctors.map((doctor) => (
                            <div key={doctor.id} className="doctor-card">
                                <div className="doctor-info">
                                    <h3>{doctor.fullName}</h3>
                                    <p>
                                        <strong>Спеціалізація:</strong>{" "}
                                        {doctor.specialty || "Не вказано"}
                                    </p>
                                    <p>
                                        <strong>Email:</strong>{" "}
                                        {doctor.email || "Не вказано"}
                                    </p>
                                    <p>
                                        <strong>Телефон:</strong>{" "}
                                        {doctor.phone || "Не вказано"}
                                    </p>
                                    <p>
                                        <strong>Кабінет:</strong>{" "}
                                        {doctor.room || "Не вказано"}
                                    </p>
                                    {doctor.notes && (
                                        <p>
                                            <strong>Нотатки:</strong>{" "}
                                            {doctor.notes}
                                        </p>
                                    )}
                                </div>
                                <div className="doctor-actions">
                                    <button
                                        onClick={() => handleEdit(doctor)}
                                        className="btn btn-warning btn-small"
                                    >
                                        Редагувати
                                    </button>
                                    <button
                                        onClick={() => openDeleteModal(doctor)}
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
                                ? "Лікарів не знайдено"
                                : "Поки що немає лікарів"}
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
                        itemType="лікарів"
                    />
                )}

                {showForm && (
                    <DoctorForm
                        doctor={editingDoctor}
                        onClose={handleFormClose}
                    />
                )}

                <DeleteConfirmModal
                    isOpen={deleteModal.isOpen}
                    onClose={closeDeleteModal}
                    onConfirm={() => handleDelete(deleteModal.doctorId)}
                    title="Видалити лікаря"
                    message={`Ви впевнені, що хочете видалити лікаря "${deleteModal.doctorName}"? Ця дія не може бути скасована.`}
                    confirmText="Видалити"
                    cancelText="Скасувати"
                />
            </div>
        </AsyncStateHandler>
    );
};

export default Doctors;
