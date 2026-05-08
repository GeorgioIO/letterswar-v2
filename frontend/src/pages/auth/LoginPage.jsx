import Header from "../../components/UI/Header";
import Arcs from "../../components/Decoratives/Arcs";
import LoginForm from "../../components/Login/LoginForm";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <>
      <main
        id="login-page"
        className="relative min-h-screen overflow-hidden flex flex-col px-3 py-5 md:px-6 lg:px-10"
        style={{
          background:
            "linear-gradient(160deg, #c9e8f5 0%, #ddf0f9 40%, #b8d9ee 100%)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <Arcs width={620} height={620} translateX={-50} translateY={-30} />
        <Arcs width={480} height={480} translateX={-50} translateY={-20} />
        <Arcs width={340} height={340} translateX={-50} translateY={-10} />

        <Header />

        <section className="flex flex-col flex-1 items-center justify-center z-10 bg-w">
          <div
            className="w-full max-w-sm rounded-2xl px-7 py-7"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow: "0 8px 40px rgba(100,160,210,0.18)",
            }}
          >
            <div className="mx-auto mb-4 w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-sm border border-black/8">
              <LogIn size={18} color="#222" />
            </div>

            <h2 className="text-center text-[17px] font-semibold text-gray-900 mb-1">
              Sign in with email
            </h2>
            <p className="text-center text-[12px] text-gray-400 mb-5">
              Letters War Admin Dashboard
            </p>

            <LoginForm />
          </div>
        </section>
      </main>
    </>
  );
}
