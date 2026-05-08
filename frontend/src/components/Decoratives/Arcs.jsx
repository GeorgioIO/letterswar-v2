export default function Arcs({ width, height, translateX, translateY }) {
  return (
    <div
      className="absolute rounded-full border border-white/40 pointer-events-none"
      style={{
        width: width,
        height: height,
        top: "50%",
        left: "50%",
        transform: `translate(${translateX}%, ${translateY}%)`,
      }}
    />
  );
}
