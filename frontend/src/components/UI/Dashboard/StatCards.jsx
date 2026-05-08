import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { getAllStatsRequest } from "../../../api/stats.api.js";

export default function StatCards() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getStats() {
      try {
        const data = await getAllStatsRequest();
        setStats(data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    }

    getStats();
  }, []);

  if (loading) {
    return <p>Still Loading</p>;
  }

  if (error) {
    return <p>Failed to load stats...</p>;
  }

  const cards = [
    { title: "Total Questions", value: stats.totalQuestions },
    { title: "Letters Below 10 QS", value: stats.lettersWithQuestionsU10 },
    { title: "Total Admins", value: stats.totalAdmins },
    { title: stats.monthLabel, value: stats.questionsAddedThisMonth },
  ];

  console.log(cards);
  return (
    <div className="w-full grid grid-cols-4 gap-5">
      {cards.map((card, index) => {
        return <StatCard key={index} title={card.title} value={card.value} />;
      })}
    </div>
  );
}
