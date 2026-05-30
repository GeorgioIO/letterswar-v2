// Libraries / packages
import { NavLink } from "react-router-dom";
import { Plus, ShieldCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Hooks
import { useAuth } from "../../hooks/useAuth";

// Functions
import { getAllStatsRequest } from "../../api/stats.api";

// Components
import StatCards from "../../components/UI/Dashboard/StatsCards/StatCards";
import Loading from "../../components/UI/Loading";
import Error from "../../components/UI/Error";

export default function HomePage() {
  const { admin } = useAuth();

  const {
    data: stats,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: ({ signal }) => getAllStatsRequest(signal),
    staleTime: 10000,
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Error
        errorMessage={
          error?.response?.data?.message ||
          "Failed to load stats , please try again..."
        }
      />
    );
  }

  const cards = [
    { title: "Total Questions", value: stats.totalQuestions },
    { title: "Letters Below 10 QS", value: stats.lettersWithQuestionsU10 },
    {
      title: `Question Added in ${stats.monthLabel}`,
      value: stats.questionsAddedThisMonth,
    },
    { title: "Total Admins", value: stats.totalAdmins },
  ];

  return (
    <section className="h-full  grid grid-rows-[100px_150px_1fr] gap-5">
      <div className="relative bg-orange-500 p-5 pb-0 rounded-xl overflow-hidden h-22.5">
        <h1 className="relative z-10 text-white text-xl font-bold">
          Hello {admin?.username || "Admin"} 👋
        </h1>

        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 400 50"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 30 C60 10,120 50,200 30 C280 10,340 50,400 30 L400 50 L0 50 Z"
            fill="rgba(255,255,255,0.10)"
          />
          <path
            d="M0 38 C50 20,130 55,200 38 C270 20,350 55,400 38 L400 50 L0 50 Z"
            fill="rgba(255,255,255,0.12)"
          />
          <path
            d="M0 44 C80 32,160 54,240 44 C310 34,370 52,400 44 L400 50 L0 50 Z"
            fill="rgba(255,255,255,0.15)"
          />
        </svg>
      </div>

      <StatCards cards={cards} />

      <nav className="flex justify-center items-center gap-8">
        <NavLink
          to="/dashboard/questions"
          className="inline-flex items-center gap-2 px-5 h-10.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-xl transition-colors"
        >
          <Plus size={16} />
          Add Question
        </NavLink>

        {admin?.role === "superadmin" && (
          <NavLink
            to="/dashboard/admins"
            className="inline-flex items-center gap-2 px-5 h-10.5 border-[1.5px] border-orange-500 text-orange-500 hover:bg-orange-50 text-sm font-medium rounded-xl transition-colors"
          >
            <ShieldCheck size={16} />
            Manage Admins
          </NavLink>
        )}
      </nav>
    </section>
  );
}
