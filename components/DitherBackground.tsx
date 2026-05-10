export default function DitherBackground() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover z-0"
    >
      <source src="/dither.webm" type="video/webm" />
    </video>
  );
}