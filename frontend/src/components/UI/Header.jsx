import LogoTitle from "./LogoTitle";

export default function Header({ className }) {
  const cssClasses = `w-full py-5 px-5 ${className}`;
  return (
    <header className={cssClasses}>
      <LogoTitle />
    </header>
  );
}
