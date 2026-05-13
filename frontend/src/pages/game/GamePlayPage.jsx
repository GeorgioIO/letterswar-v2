import { useSelector } from "react-redux";

export default function GamePlayPage() {
  const teams = useSelector((state) => state.game.teams);
  const answerMode = useSelector((state) => state.game.answerMode);
  return (
    <section>
      <p>{teams.orange.name}</p>
      <p>{teams.green.name}</p>
      <p>{answerMode}</p>
    </section>
  );
}
