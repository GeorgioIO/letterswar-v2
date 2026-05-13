export default function Footer({ className = "" }) {
  return (
    <footer
      className={`flex justify-center items-center gap-1 w-full py-5 text-sm text-gray-400 border-t border-orange-100 ${className}`}
    >
      Developed by
      <a
        href="#"
        className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
      >
        Georgio Jabbour
      </a>
    </footer>
  );
}
