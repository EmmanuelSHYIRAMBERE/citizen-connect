"use client";

import {
  motion as Motion,
  MotionProps,
  Variants,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import React from "react";

export const motion = {
  div: (props: MotionProps & React.HTMLAttributes<HTMLDivElement>) => (
    <Motion.div {...props} />
  ),
  h1: (props: MotionProps & React.HTMLAttributes<HTMLHeadingElement>) => (
    <Motion.h1 {...props} />
  ),
  h2: (props: MotionProps & React.HTMLAttributes<HTMLHeadingElement>) => (
    <Motion.h2 {...props} />
  ),
  h3: (props: MotionProps & React.HTMLAttributes<HTMLHeadingElement>) => (
    <Motion.h3 {...props} />
  ),
  h4: (props: MotionProps & React.HTMLAttributes<HTMLHeadingElement>) => (
    <Motion.h4 {...props} />
  ),
  h5: (props: MotionProps & React.HTMLAttributes<HTMLHeadingElement>) => (
    <Motion.h5 {...props} />
  ),
  h6: (props: MotionProps & React.HTMLAttributes<HTMLHeadingElement>) => (
    <Motion.h6 {...props} />
  ),
  p: (props: MotionProps & React.HTMLAttributes<HTMLParagraphElement>) => (
    <Motion.p {...props} />
  ),
  span: (props: MotionProps & React.HTMLAttributes<HTMLSpanElement>) => (
    <Motion.span {...props} />
  ),
  button: (props: MotionProps & React.HTMLAttributes<HTMLButtonElement>) => (
    <Motion.button {...props} />
  ),
  a: (props: MotionProps & React.HTMLAttributes<HTMLAnchorElement>) => (
    <Motion.a {...props} />
  ),
  ul: (props: MotionProps & React.HTMLAttributes<HTMLUListElement>) => (
    <Motion.ul {...props} />
  ),
  li: (props: MotionProps & React.HTMLAttributes<HTMLLIElement>) => (
    <Motion.li {...props} />
  ),
  img: (props: MotionProps & React.HTMLAttributes<HTMLImageElement>) => (
    <Motion.img {...props} />
  ),
  svg: (props: MotionProps & React.HTMLAttributes<SVGSVGElement>) => (
    <Motion.svg {...props} />
  ),
  path: (props: MotionProps & React.HTMLAttributes<SVGPathElement>) => (
    <Motion.path {...props} />
  ),
  circle: (props: MotionProps & React.HTMLAttributes<SVGCircleElement>) => (
    <Motion.circle {...props} />
  ),
  rect: (props: MotionProps & React.HTMLAttributes<SVGRectElement>) => (
    <Motion.rect {...props} />
  ),
  g: (props: MotionProps & React.HTMLAttributes<SVGGElement>) => (
    <Motion.g {...props} />
  ),
};

export { Motion, useAnimation, AnimatePresence };
export type { Variants };
