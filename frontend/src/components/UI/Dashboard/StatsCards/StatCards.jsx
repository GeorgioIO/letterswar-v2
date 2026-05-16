import StatCard from "./StatCard";

export default function StatCards({ cards }) {
  return (
    <div className="w-full grid grid-cols-4 gap-5">
      {cards.map((card, index) => {
        return <StatCard key={index} title={card.title} value={card.value} />;
      })}
    </div>
  );
}
