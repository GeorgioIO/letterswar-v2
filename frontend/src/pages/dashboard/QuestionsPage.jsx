// Components
import CustomTable from "../../components/UI/Dashboard/CustomTable/CustomTable";
import EditQuestionModal from "../../components/UI/Modals/EditQuestionModal";
import PageHeader from "../../components/UI/Dashboard/PageHeader";
import FilterLetterModal from "../../components/UI/Modals/FilterLetterModal";
import AddQuestionModal from "../../components/UI/Modals/AddQuestionModal";
import DeleteModal from "../../components/UI/Modals/DeleteModal";

// Hooks
import { useEffect, useState } from "react";
import { usePagination } from "../../hooks/usePagination";
import { useRefresh } from "../../hooks/useRefresh";
import { useModal } from "../../hooks/useModal";

// Requests functions
import {
  getAllQuestionsRequest,
  deleteQuestionRequest,
  restoreQuestionRequest,
} from "../../api/questions.api";
import RestoreModal from "../../components/UI/Modals/RestoreModal";

const tableColumns = ["Letter", "Question", "Answer", "Created By", "Action"];

export default function QuestionPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [letterSelected, setLetterSelected] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false);

  const { refreshKey, handleRefresh } = useRefresh();
  const {
    page,
    limit,
    totalPages,
    setPage,
    setTotalPages,
    handleLimitChange,
    resetPage,
  } = usePagination();

  // Get data
  useEffect(() => {
    async function getQuestions() {
      try {
        const response = await getAllQuestionsRequest(
          page,
          limit,
          letterSelected,
          showDeleted,
        );
        setData(response.questions);
        setTotalPages(response.totalPages);
      } catch (error) {
        setError(
          error.response?.data?.message || "Problem in fetching questions...",
        );
      } finally {
        setIsFetching(false);
      }
    }

    getQuestions();
  }, [page, limit, letterSelected, showDeleted, refreshKey]);

  // Modals
  const filterModal = useModal();
  const deleteModal = useModal();
  const addModal = useModal();
  const editModal = useModal();
  const restoreModal = useModal();

  // Functions
  function renderQuestionRow(row) {
    return (
      <>
        <div className="text-sm font-semibold text-orange-500">
          {row.letter}
        </div>
        <div className="text-sm text-gray-700 truncate pr-4">
          {row.question_text}
        </div>
        <div className="text-sm text-gray-700 truncate pr-4">{row.answer}</div>
        <div className="text-sm text-gray-500">{row.created_by}</div>
      </>
    );
  }

  function toggleShowDeleted() {
    setShowDeleted((prevState) => !prevState);
  }

  return (
    <section className="flex flex-col gap-5">
      <PageHeader
        sectionTitle="Questions"
        addText="Add New Question"
        limit={limit}
        openFiltering={filterModal.open}
        openAdd={addModal.open}
        onLimitChange={(val) => handleLimitChange(val)}
        onDeletedChange={toggleShowDeleted}
      />
      <CustomTable
        data={data}
        isFetching={isFetching}
        error={error}
        columns={tableColumns}
        showDeleted={showDeleted}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        noDataTitle="No Questions Available"
        noDataMessage="Questions will appear here."
        handleOpenDelete={(row) => deleteModal.open(row)}
        handleOpenRestore={(row) => restoreModal.open(row)}
        handleOpenEdit={(row) => editModal.open(row)}
        renderRow={renderQuestionRow}
      />
      <AddQuestionModal
        isOpen={addModal.isOpen}
        handleClose={addModal.close}
        handleRefresh={handleRefresh}
        successMessage="Question added successfully"
        failMessage="Fail to add question"
      />
      <EditQuestionModal
        question={editModal.data}
        isOpen={editModal.isOpen}
        handleClose={editModal.close}
        handleRefresh={handleRefresh}
        successMessage="Question updated successfully"
        failMessage="Question failed to update"
      />
      <RestoreModal
        isOpen={restoreModal.isOpen}
        handleClose={restoreModal.close}
        title="Restore Question"
        successMessage="Question restored successfully"
        failMessage="Problem restoring question"
        message="You're going to restore this question. Are you sure?"
        restoreRequest={() => restoreQuestionRequest(restoreModal.data?.id)}
        onSuccess={() => {
          handleRefresh();

          if (data.length === 1 && page > 1) {
            setPage((prev) => prev - 1);
          }
        }}
      />
      <DeleteModal
        isOpen={deleteModal.isOpen}
        handleClose={deleteModal.close}
        title="Delete Question"
        successMessage="Question deleted successfully"
        failMessage="Problem deleting question"
        message="You're going to delete this question. Are you sure?"
        deleteRequest={() => deleteQuestionRequest(deleteModal.data?.id)}
        onSuccess={() => {
          handleRefresh();

          if (data.length === 1 && page > 1) {
            setPage((prev) => prev - 1);
          }
        }}
      />
      <FilterLetterModal
        isOpen={filterModal.isOpen}
        handleClose={filterModal.close}
        letterSelected={letterSelected}
        handleLetterChange={setLetterSelected}
        resetPage={resetPage}
      />
    </section>
  );
}
