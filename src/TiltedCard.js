// TiltedCard.jsx (Updated to be a wrapper)

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import "./TiltedCard.css";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

// 1. We now accept 'children' as a prop!
export default function TiltedCard({
  children, // This will be your .content-card div
  scaleOnHover = 1.05,
  rotateAmplitude = 14,
}) {
  const ref = useRef(null);

  const rotateX = useSpring(0, springValues);
  const rotateY = useSpring(0, springValues);
  const scale = useSpring(1, springValues);

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    // 2. We use a 'div' instead of 'figure' for more general use.
    <div
      ref={ref}
      className="tilted-card-figure"
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="tilted-card-inner"
        style={{
          rotateX,
          rotateY,
          scale,
        }}
      >
        {/* 3. CRITICAL CHANGE: We render the 'children' you passed in,
               instead of a specific <img> tag. */}
        {children}
      </motion.div>
    </div>
  );
}