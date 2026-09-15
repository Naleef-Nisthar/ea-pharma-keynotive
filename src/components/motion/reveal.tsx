"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps } from "react";
import { fadeUpFor, staggerContainer } from "@/lib/motion";

type RevealProps = ComponentProps<typeof motion.div> & {
  /** Fraction of the element that must be visible before it animates in. */
  amount?: number;
};

/**
 * Scroll-in reveal for a single element. Animates once, respects
 * prefers-reduced-motion by rendering in its final state.
 */
export function Reveal({ amount = 0.3, children, ...props }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      data-reveal
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={fadeUpFor(reduced)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type RevealGroupProps = ComponentProps<typeof motion.div> & {
  stagger?: number;
  delay?: number;
  amount?: number;
};

/**
 * Parent for a list of `<Reveal>` (or any `variants={fadeUp}`) children -
 * staggers them instead of firing every child's own viewport observer.
 */
export function RevealGroup({
  stagger = 0.06,
  delay = 0,
  amount = 0.2,
  children,
  ...props
}: RevealGroupProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      data-reveal
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={staggerContainer(
        reduced ? 0 : stagger,
        reduced ? 0 : delay,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
