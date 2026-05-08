import { House, Puzzle, CaseUpper, UserStar, LogOut } from "lucide-react";
import LogoTitle from "../LogoTitle";
import CustomLink from "./CustomLink";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogOut() {
    logout();
    navigate("/login");
  }

  return (
    <section className="bg-slate-100 h-full py-4 flex flex-col ">
      <div className="flex flex-col gap-5">
        <LogoTitle classes="px-4" />
        <div className="w-full h-0.5 bg-orange-500"></div>
        <nav className="flex flex-col gap-3">
          <CustomLink toPath="/dashboard/" Icon={House} innerText="Home" end />
          <CustomLink
            toPath="/dashboard/questions"
            Icon={Puzzle}
            innerText="Questions"
          />
          <CustomLink
            toPath="/dashboard/letters"
            Icon={CaseUpper}
            innerText="Letters"
          />
          <CustomLink
            Icon={UserStar}
            toPath="/dashboard/admins"
            innerText="Admins"
          />
        </nav>
      </div>
      <div className="mt-auto px-4">
        <button
          className="cursor-pointer text-orange-500 font-bold flex items-center gap-2"
          onClick={handleLogOut}
        >
          <LogOut />
          Log out
        </button>
      </div>
    </section>
  );
}
