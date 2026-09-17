"use client"

import Link from "next/link"
import { motion, type MotionProps } from "motion/react"
import type { CSSProperties, ReactNode } from "react"

import { cn } from "@/lib/utils"

const MotionLink = motion(Link)

const animationProps: MotionProps = {
  initial: { "--x": "100%" } as MotionProps["initial"],
  animate: { "--x": "-100%" } as MotionProps["animate"],
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
  },
}

export function ShinyLink({
  href,
  children,
  className,
  shineColor = "#c8b86a",
  onClick,
}: {
  href: string
  children: ReactNode
  className?: string
  shineColor?: string
  onClick?: () => void
}) {
  return (
    <MotionLink
      href={href}
      className={cn("relative", className)}
      style={{ "--shine": shineColor } as CSSProperties}
      onClick={onClick}
      {...animationProps}
    >
      <span
        className="relative z-10 block"
        style={{
          maskImage:
            "linear-gradient(-75deg, var(--shine) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), var(--shine) calc(var(--x) + 100%))",
          WebkitMaskImage:
            "linear-gradient(-75deg, var(--shine) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), var(--shine) calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 block rounded-[inherit] p-px"
        style={{
          mask:
            "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          WebkitMask:
            "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          backgroundImage:
            "linear-gradient(-75deg, transparent calc(var(--x) + 20%), var(--shine) calc(var(--x) + 25%), transparent calc(var(--x) + 100%))",
        }}
      />
    </MotionLink>
  )
}
