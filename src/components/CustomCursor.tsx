import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Use refs for positions to avoid re-renders on mousemove
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device supports touch
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || window.innerWidth < 1024) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      
      // Update dot position immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      
      if (!isVisible) setIsVisible(true);
    };

    // Animation loop for smooth inertia ring
    let animationFrameId: number;
    const updateRingPosition = () => {
      const ease = 0.12; // Inertia factor (lower = smoother/slower)
      
      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;
      
      ringPos.current.x += dx * ease;
      ringPos.current.y += dy * ease;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      
      animationFrameId = requestAnimationFrame(updateRingPosition);
    };
    
    animationFrameId = requestAnimationFrame(updateRingPosition);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') || 
        target.classList.contains('interactive-hover') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA';
        
      setIsHovered(!!isInteractive);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isVisible]);

  // Disable custom cursor on touch/mobile
  const [isTouch, setIsTouch] = useState(true);
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice || window.innerWidth < 1024);
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Central Solid Dot */}
      <div
        ref={dotRef}
        id="cursor-dot"
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-brand-purple pointer-events-none z-[100] transition-opacity duration-300 ease-out shadow-[0_0_8px_#bc26f5]"
        style={{ 
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Outer Glow Ring with Lag/Inertia */}
      <div
        ref={ringRef}
        id="cursor-ring"
        className="fixed top-0 left-0 rounded-full border border-brand-purple/50 pointer-events-none z-[99] transition-[opacity,width,height,background-color,border-color] duration-300 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          width: isHovered ? "50px" : "24px",
          height: isHovered ? "50px" : "24px",
          backgroundColor: isHovered ? "rgba(188, 38, 245, 0.15)" : "rgba(188, 38, 245, 0.02)",
          borderColor: isHovered ? "#bc26f5" : "rgba(188, 38, 245, 0.4)",
          boxShadow: isHovered ? "0 0 15px rgba(188, 38, 245, 0.35)" : "none",
        }}
      />
    </>
  );
}
