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

export default function QuestionPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [letterSelected, setLetterSelected] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

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

  function handleCloseFiltering() {
    setIsFiltering(false);
  }

  function handleOpenFiltering() {
    setIsFiltering(true);
  }

  function handleOpenAddQuestion() {
    setIsAdding(true);
  }

  function handelCloseAddQuestion() {
    setIsAdding(false);
  }

  function handleOpenDelete(question) {
    setIsDeleting(true);
    setSelectedQuestion(question);
  }

  function handleCloseDelete() {
    setIsDeleting(false);
    setSelectedQuestion(null);
  }

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
      <DeleteModal
        isOpen={isDeleting}
        handleClose={handleCloseDelete}
        title="Delete Question"
        successMessage="Question deleted successfully"
        failMessage="Problem deleting question"
        message="You're going to delete this question. Are you sure?"
        deleteRequest={() => deleteQuestionRequest(selectedQuestion.id)}
        onSuccess={() => {
          handleRefresh();

          if (data.length === 1 && page > 1) {
            setPage((prev) => prev - 1);
          }
        }}
      />
      <AddQuestionModal
        isOpen={isAdding}
        handleClose={handelCloseAddQuestion}
        handleRefresh={handleRefresh}
      />
      <FilterLetterModal
        isOpen={isFiltering}
        handleClose={handleCloseFiltering}
        letterSelected={letterSelected}
        handleLetterChange={setLetterSelected}
        resetPage={resetPage}
      />
      <PageHeader
        sectionTitle="Questions"
        addText="Add New Question"
        limit={limit}
        openFiltering={handleOpenFiltering}
        openAdd={handleOpenAddQuestion}
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
        handleOpenDelete={handleOpenDelete}
      />
    </section>
  );
}
