import CustomTable from "../../components/UI/Dashboard/CustomTable/CustomTable";
import PageHeader from "../../components/UI/Dashboard/PageHeader";
import { getAllQuestionsRequest } from "../../api/questions.api";
import { useEffect, useState } from "react";
import { usePagination } from "../../hooks/usePagination";
import FilterLetterModal from "../../components/UI/Dashboard/FilterLetterModal";

export default function QuestionPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [letterSelected, setLetterSelected] = useState(null);

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
  }, [page, limit, letterSelected]);

  return (
    <section className="flex flex-col gap-5">
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
      />
    </section>
  );
}
