import "./Loader.css";

export default function Loader({ size = 18 }) {
  return (
    <span
      className="Loader"
      style={{ width: size, height: size }}
      aria-label="Loading"
    />
  );
}