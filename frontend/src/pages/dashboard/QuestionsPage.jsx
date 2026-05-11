import CustomTable from "../../components/UI/Dashboard/CustomTable/CustomTable";
import PageHeader from "../../components/UI/Dashboard/PageHeader";
import { getAllQuestionsRequest } from "../../api/questions.api";
import { useEffect, useState } from "react";
import { usePagination } from "../../hooks/usePagination";
import FilterLetterModal from "../../components/UI/Modals/FilterLetterModal";
import AddQuestionModal from "../../components/UI/Modals/AddQuestionModal";
import { useRefresh } from "../../hooks/useRefresh";
import DeleteModal from "../../components/UI/Modals/DeleteModal";
import { deleteQuestionRequest } from "../../api/questions.api";
import EditQuestionModal from "../../components/UI/Modals/EditQuestionModal";
import { useModal } from "../../hooks/useModal";

export default function QuestionPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [letterSelected, setLetterSelected] = useState(null);

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

  // Modals
  const filterModal = useModal();
  const deleteModal = useModal();
  const addModal = useModal();
  const editModal = useModal();

  useEffect(() => {
    async function getQuestions() {
      setIsFetching(true);
      try {
        const response = await getAllQuestionsRequest(
          page,
          limit,
          letterSelected,
        );
        setData(response.questions);
        setTotalPages(response.totalPages);
      } catch (error) {
        setError(error.message || "Problem in fetching questions...");
      } finally {
        setIsFetching(false);
      }
    }

    getQuestions();
  }, [page, limit, letterSelected, refreshKey]);

  return (
    <section className="flex flex-col gap-5">
      <PageHeader
        sectionTitle="Questions"
        addText="Add New Question"
        limit={limit}
        openFiltering={filterModal.open}
        openAdd={addModal.open}
        onLimitChange={(val) => handleLimitChange(val)}
      />
      <CustomTable
        data={data}
        isFetching={isFetching}
        error={error}
        columns={["Letter", " Question", "Answer", "Created By", "Action"]}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        handleOpenDelete={(row) => deleteModal.open(row)}
        handleOpenEdit={(row) => editModal.open(row)}
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
