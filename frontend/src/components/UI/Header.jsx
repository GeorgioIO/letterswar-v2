import MainLogo from "../../assets/Logo.svg";

export default function Header() {
  return (
    <header className=" w-full py-2.5">
      <div id="title" className="flex items-center gap-2.5">
        <img src={MainLogo} alt="Main letters war logo" />
        <h2 className="font-main font-bold text-xl">Letters War</h2>
      </div>
    </header>
  );
}
