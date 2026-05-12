import Loading from "../../Loading";
import Error from "../../Error";
import LetterCell from "./LetterCell";

export default function LettersGrid({ letters, isFetching, error }) {
  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <Error errorMessage={error} />;
  }

  return (
    <ul className="grid grid-cols-7 gap-3">
      {letters.map((letter) => (
        <LetterCell key={letter.id} letter={letter} />
      ))}
    </ul>
  );
}
