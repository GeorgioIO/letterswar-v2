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
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../util/tanstack";

// Requests functions
import {
  getAllQuestionsRequest,
  deleteQuestionRequest,
  restoreQuestionRequest,
  createQuestionRequest,
  updateQuestionRequest,
  importQuestionsRequest,
} from "../../api/questions.api";
import RestoreModal from "../../components/UI/Modals/RestoreModal";
import QuestionImportModal from "../../components/UI/Modals/QuestionImportModal";
import { useToast } from "../../hooks/useToast";

const tableColumns = ["Letter", "Question", "Answer", "Created By", "Action"];

export default function QuestionPage() {
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

  const { data, isPending, isError, error, isPlaceholderData } = useQuery({
    queryKey: ["questions", { page, limit, letterSelected, showDeleted }],
    queryFn: ({ signal, queryKey }) =>
      getAllQuestionsRequest(
        signal,
        queryKey[1].page,
        queryKey[1].limit,
        queryKey[1].letterSelected,
        queryKey[1].showDeleted,
      ),
    placeholderData: keepPreviousData,
  });

  const { mutate: addQuestionMutation } = useMutation({
    mutationFn: createQuestionRequest,
    onSuccess: () => {
      addModal.close();
      showToast("Question is added", "success");
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });

  const { mutate: editQuestionMutation } = useMutation({
    mutationFn: updateQuestionRequest,
    onSuccess: () => {
      editModal.close();
      showToast("Question is updated successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });

  const { mutate: deleteQuestionMutation } = useMutation({
    mutationFn: (id) => deleteQuestionRequest(id),
    onSuccess: () => {
      deleteModal.close();
      showToast("Question is Deleted!", "success");

      if (data?.questions?.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      }

      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: () => {
      deleteModal.close();
      showToast("Failed to delete question", "fail");
    },
  });

  const { mutate: restoreQuestionMutation } = useMutation({
    mutationFn: (id) => restoreQuestionRequest(id),
    onSuccess: () => {
      restoreModal.close();
      showToast("Question is Restored!", "success");
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: () => {
      restoreModal.close();
      showToast("Failed to restore question", "fail");
    },
  });

  useEffect(() => {
    if (data?.totalPages) {
      setTotalPages(data.totalPages);
    }
  }, [data?.totalPages, setTotalPages]);

  // Modals
  const filterModal = useModal();
  const deleteModal = useModal();
  const addModal = useModal();
  const editModal = useModal();
  const restoreModal = useModal();
  const importModal = useModal();

  const { showToast } = useToast();

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
        openImport={importModal.open}
        onLimitChange={(val) => handleLimitChange(val)}
        onDeletedChange={toggleShowDeleted}
      />
      <CustomTable
        data={data?.questions}
        isLoading={isPending}
        isError={isError}
        error={error}
        isPlaceholderData={isPlaceholderData}
        columns={tableColumns}
        showDeleted={showDeleted}
        page={data?.page}
        totalPages={data?.totalPages}
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
        onSubmit={addQuestionMutation}
      />
      <EditQuestionModal
        question={editModal.data}
        isOpen={editModal.isOpen}
        handleClose={editModal.close}
        onSubmit={editQuestionMutation}
      />
      <RestoreModal
        isOpen={restoreModal.isOpen}
        handleClose={restoreModal.close}
        title="Restore Question"
        message="You're going to restore this question. Are you sure?"
        onSubmit={() => restoreQuestionMutation(restoreModal.data?.id)}
      />
      <DeleteModal
        isOpen={deleteModal.isOpen}
        handleClose={deleteModal.close}
        title="Delete Question"
        message="You're going to delete this question. Are you sure?"
        onSubmit={() => deleteQuestionMutation(deleteModal.data?.id)}
      />
      <FilterLetterModal
        isOpen={filterModal.isOpen}
        handleClose={filterModal.close}
        letterSelected={letterSelected}
        handleLetterChange={setLetterSelected}
        resetPage={resetPage}
      />
      <QuestionImportModal
        isOpen={importModal.isOpen}
        handleClose={importModal.close}
        handleRefresh={handleRefresh}
      />
    </section>
  );
}
