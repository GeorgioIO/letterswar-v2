import { Trophy, Handshake } from "lucide-react";

export default function ResultBadge({ isTie, winner }) {
  let badgeClassess = `w-16 h-16 rounded-3xl flex items-center justify-center`;

  if (isTie) {
    badgeClassess += " bg-gray-100";
  } else if (winner === "orange") {
    badgeClassess += " bg-orange-100";
  } else {
    badgeClassess += " bg-green-100";
  }

  return (
    <div className={badgeClassess}>
      {isTie ? (
        <Handshake size={30} className="text-gray-400" />
      ) : (
        <Trophy
          size={30}
          className={`${winner === "orange" ? "text-orange-500" : "text-green-500"}`}
        />
      )}
    </div>
  );
}
