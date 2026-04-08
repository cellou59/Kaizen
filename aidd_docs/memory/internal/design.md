---
name: design
description: Design system and UI guidelines
scope: frontend
---

# Design

## Design System

- Name: "Sumi-e" (The Breath of Intent)
- Direction: Japanese Ma (negative space) + Sumi-e (ink-wash) — "Focused Serenity"

## Palette (Earth & Leaf)

- Primary (sage): `#55633d`
- Secondary (warm stone): `#635f53`
- Background: `#faf9f5`

## Typography

- Titles: Noto Serif
- Body: Manrope

## Icons

- react-icons (tree-shakeable imports)

## Node States

- Active: primary bg, ring-4, pulse
- Available: primary 30%, ring-2, glow
- Pending: surface-container-high, reduced opacity
- Completed: primary-container, checkmark
- Skipped: surface-container-high, opacity 20%
- Failed: error-container

## Node Icons

- Challenge: rotated 45deg, 4px border, secondary-container bg
- Types: Challenge, Event, Rest, Boss

## Edges

- SVG paths
- Unchosen: dashed outline-variant
- Chosen: solid primary 2.5px

## Components

- TreeMap: vertical 7 steps + edges + legend
- MapNode: button with visual state
- StepEdges: SVG connections
- MapLegend: card, rounded-32px, 2x2 grid

## Layout

- Mobile-first, responsive
