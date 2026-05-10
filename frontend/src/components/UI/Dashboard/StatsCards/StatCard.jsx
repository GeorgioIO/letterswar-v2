export default function StatCard({ title, value }) {
  return (
    <div className="bg-white border-2 border-orange-500 rounded-xl cursor-pointer px-6 py-5 flex flex-col gap-2 hover:bg-orange-50 transition-colors">
      <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
        {title}
      </p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
