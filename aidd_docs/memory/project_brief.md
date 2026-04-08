---
name: project-brief
description: Project vision and domain documentation
scope: all
---

# PROJECT_BRIEF.md

## Executive Summary

- **Project Name**: Kai7en
- **Vision**: Make daily exercise a fun habit through roguelike game mechanics
- **Mission**: Gamify bodyweight fitness with consistency-first philosophy — discipline over intensity

### Full Description

Web app where users complete a daily "run" of 7 steps on a randomly generated tree map. Each step is a bodyweight exercise, random event, or rest break. Progression rewards showing up every day (streaks), not athletic performance. Inspired by Slay the Spire.

## Context

### Core Domain

Gamified fitness habit-building through roguelike mechanics

### Ubiquitous Language

| Term             | Definition                                              | Synonymes   |
| ---------------- | ------------------------------------------------------- | ----------- |
| Run              | Daily session of 7 steps on the tree map                | Session     |
| Node             | A single step on the map                                | Step, Noeud |
| Tree Map         | Randomly generated map with linear paths and branches   | Map, Carte  |
| Challenge        | Exercise node, 5min max, boss is always a Challenge     | -           |
| Event            | Random node resolving to exercise, buff, or debuff      | -           |
| Repos            | Rest activity node (water, walk, meditate, breathe)     | Rest        |
| Streak           | Consecutive days with completed run                     | -           |
| Buff             | Positive modifier (reduce difficulty, skip, swap)       | -           |
| Debuff           | Negative modifier (increase reps/duration, remove rest) | -           |
| Boss             | Final challenge at 7th node                             | -           |
| Consolation Buff | Buff granted after a failed run or broken streak        | -           |

## Features & Use-cases

- **F1 Tree Map & Run**: 7-step tree map with linear/branching paths, 7th step = boss, 1 run/day, node types visible before choice
- **F2 Exercise System**: ~10 bodyweight exercises, no equipment, honor-based validation ("Done" button), 2h timer per node, no repeat in same run
- **F3 Buffs & Debuffs**: ~10 modifiers obtained from Event nodes, consolation buff after failure
- **F4 Streaks**: Complete 7 nodes = streak maintained, failure or no run = streak broken + consolation buff
- **F5 Auth**: Email+password authentication, data persistence (runs, streaks, progression)

## User Journey maps

### Alex (Sedentary office worker)

```mermaid
---
title: Alex Daily Run Journey
---
journey
    title Alex - Daily Fitness Run
    section Start
      Open app: 3: Alex
      See streak counter: 4: Alex
      Start daily run: 5: Alex
    section Navigate Map
      View tree map (7 steps): 4: Alex
      Choose path at branch: 5: Alex
      Complete exercise node: 3: Alex
      Receive event buff or debuff: 4: Alex
      Take rest break: 5: Alex
    section Complete
      Beat boss (7th node): 4: Alex
      See streak updated: 5: Alex
      Feel accomplished: 5: Alex
```

### Alex (Failed Run)

```mermaid
---
title: Alex Failed Run Journey
---
journey
    title Alex - Failed Run Recovery
    section Attempt
      Start daily run: 4: Alex
      Reach challenge node: 3: Alex
      Timer expires: 1: Alex
    section Recovery
      See streak broken: 1: Alex
      Receive consolation buff: 3: Alex
      Come back next day: 4: Alex
      Start run with buff active: 5: Alex
```
