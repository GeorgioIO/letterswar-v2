import PageHeader from "../../components/UI/Dashboard/PageHeader";
import getAllLettersRequest from "../../api/letters.api";
import LettersGrid from "../../components/UI/Dashboard/LettersGrid/LettersGrid";
import { useQuery } from "@tanstack/react-query";

export default function LettersPage() {
  const {
    data: letters,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["letters"],
    queryFn: ({ signal }) => getAllLettersRequest(signal),
  });

  return (
    <section className="flex flex-col gap-5">
      <PageHeader sectionTitle="Letters" />
      <LettersGrid
        letters={letters}
        isLoading={isFetching}
        isError={isError}
        error={error}
      />
    </section>
  );
}
