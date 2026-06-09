import SetupForm from "../../components/UI/Game/Forms/SetupForm";
import { motion } from "framer-motion";

export default function GameSetupPage() {
  return (
    <section className="min-h-screen px-5 py-10 bg-orange-50 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
          Game Setup
        </h1>
        <p className="text-gray-700/60 mt-2 font-medium">
          Enter team names to begin the match
        </p>
      </motion.div>

      <SetupForm />
    </section>
  );
}
