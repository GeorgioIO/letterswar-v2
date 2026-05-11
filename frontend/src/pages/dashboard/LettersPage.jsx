import { useState, useEffect } from "react";
import PageHeader from "../../components/UI/Dashboard/PageHeader";
import getAllLettersRequest from "../../api/letters.api";
import LettersGrid from "../../components/UI/Dashboard/LettersGrid/LettersGrid";

export default function LettersPage() {
  const [letters, setLetters] = useState([]);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchLetters() {
      try {
        const letters = await getAllLettersRequest();
        setLetters(letters);
      } catch (error) {
        setError(error.response?.data?.message || "Problem fetching letters");
      } finally {
        setIsFetching(false);
      }
    }

    fetchLetters();
  }, []);

  return (
    <section className="flex flex-col gap-5">
      <PageHeader sectionTitle="Letters" />
      <LettersGrid letters={letters} />
    </section>
  );
}
