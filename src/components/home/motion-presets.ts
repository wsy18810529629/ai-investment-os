/**
 * Shared Framer Motion presets keep the homepage feeling cohesive.
 * The motion language is intentionally restrained: quick fades, slight vertical movement, no bounce.
 */
export const fadeUp = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Section-level stagger creates the feeling of an organized daily brief arriving in sequence.
 * The delay is short enough to preserve efficiency for repeat daily users.
 */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.015,
    },
  },
};

/**
 * Standard easing mirrors the design system: precise, calm, and non-playful.
 */
export const calmTransition = {
  duration: 0.2,
  ease: [0.22, 1, 0.36, 1],
};
