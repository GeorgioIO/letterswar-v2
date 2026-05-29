import Loading from "../../Loading";
import Error from "../../Error";
import LetterCell from "./LetterCell";

export default function LettersGrid({ letters, isLoading, isError, error }) {
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Error errorMessage={error?.message || "Failed to load letters..."} />
    );
  }

  return (
    <ul className="grid grid-cols-7 gap-3">
      {letters.map((letter) => (
        <LetterCell key={letter.id} letter={letter} />
      ))}
    </ul>
  );
}
