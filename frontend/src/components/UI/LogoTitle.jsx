import MainLogo from "../../assets/Logo.svg";

export default function LogoTitle({ classes }) {
  let titleClasses = `flex items-center gap-2.5 ${classes}`;
  return (
    <div className={titleClasses}>
      <img src={MainLogo} alt="Main letters war logo" />
      <h2 className="font-main font-bold text-xl">Letters War</h2>
    </div>
  );
}
