import { useState, useRef, ReactNode, MouseEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number; // Maximum rotation in degrees
}

export default function TiltCard({ children, className = "", maxTilt = 10 }: TiltCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    // Skip tilt on mobile or touch devices
    if (window.innerWidth < 1024) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize coordinates around center (from -0.5 to 0.5)
    const normalizedX = (mouseX / width) - 0.5;
    const normalizedY = (mouseY / height) - 0.5;

    // Calculate rotation angles
    const rotateX = -normalizedY * maxTilt; // Up/down tilt
    const rotateY = normalizedX * maxTilt;  // Left/right tilt

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    if (window.innerWidth < 1024) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-300 ease-out ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="w-full h-full transition-transform duration-200 ease-out"
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02, 1.02, 1.02)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
