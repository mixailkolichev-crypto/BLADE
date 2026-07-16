import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  alpha: number;
  maxAlpha: number;
  color: string;
  angle: number;
  spin: number;
}

export default function SmokeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse move for wind force
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize observer
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particles array
    const particles: Particle[] = [];
    const colors = [
      "rgba(188, 38, 245, ",  // Purple
      "rgba(66, 18, 122, ",   // Indigo
      "rgba(217, 167, 82, ",  // Gold
    ];

    // Create initial smoke particles
    const particleCount = Math.min(45, Math.floor((width * height) / 30000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true));
    }

    function createParticle(randomPos = false): Particle {
      const baseSize = Math.random() * 150 + 100;
      return {
        x: randomPos ? Math.random() * width : Math.random() * width,
        y: randomPos ? Math.random() * height : height + baseSize,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1, // Drifts up
        size: baseSize,
        baseSize: baseSize,
        alpha: 0,
        maxAlpha: Math.random() * 0.05 + 0.015, // Very subtle opacity
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.002,
      };
    }

    // Animation Loop
    const animate = () => {
      // Clear with very slight transparency to leave small trails
      ctx.fillStyle = "rgba(13, 7, 20, 0.12)";
      ctx.fillRect(0, 0, width, height);

      // Interpolate mouse coordinates
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      particles.forEach((p, index) => {
        // Apply a gentle force pushing away from the cursor
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 350) {
          const force = (350 - dist) / 350;
          p.vx += (dx / dist) * force * 0.08;
          p.vy += (dy / dist) * force * 0.08;
        }

        // Apply friction
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Move particle
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;

        // Fade in and out
        if (p.y < -p.size) {
          // Recycle particle at the bottom
          particles[index] = createParticle();
        } else if (p.y < height * 0.2) {
          // Fade out near top
          p.alpha -= 0.001;
          if (p.alpha < 0) p.alpha = 0;
        } else if (p.alpha < p.maxAlpha) {
          // Fade in at the start
          p.alpha += 0.001;
        }

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        // Draw blurred cloud
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        gradient.addColorStop(0, `${p.color}${p.alpha})`);
        gradient.addColorStop(0.5, `${p.color}${p.alpha * 0.4})`);
        gradient.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="smoke-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] opacity-70"
    />
  );
}
