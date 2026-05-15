export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center gap-2 py-16">
      {[0, 150, 300].map((delay) => (
        <div
          key={delay}
          style={{ animationDelay: `${delay}ms` }}
          className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-bounce"
        />
      ))}
    </div>
  );
}
