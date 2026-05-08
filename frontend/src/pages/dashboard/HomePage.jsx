import { useAuth } from "../../hooks/useAuth";

export default function HomePage() {
  const AuthContext = useAuth();

  return (
    <section className="h-full  grid grid-rows-[100px_1fr]">
      <div className="bg-orange-500 p-3.5 rounded-xl">
        <h1 className="text-white text-xl font-bold">
          Hello {AuthContext.admin.username} 👋
        </h1>
      </div>
    </section>
  );
}
