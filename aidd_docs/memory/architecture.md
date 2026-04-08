---
name: architecture
description: Module architecture and structure
scope: all
---

# Architecture

## Language/Framework

```mermaid
---
title: Kai7en Tech Stack
---
flowchart TD
    NextJS["Next.js (App Router)"]
    TS["TypeScript"]
    Tailwind["Tailwind CSS"]
    Zustand["Zustand"]
    Zod["Zod"]
    ReactIcons["react-icons"]
    ServerActions["Server Actions"]
    APIRoutes["API Routes"]
    Supabase["Supabase"]
    Biome["Biome"]

    TS --> NextJS
    NextJS --> Tailwind
    NextJS --> Zustand
    NextJS --> Zod
    NextJS --> ReactIcons
    NextJS --> ServerActions
    NextJS --> APIRoutes
    ServerActions --> Supabase
    APIRoutes --> Supabase
    Zod --> ServerActions
    Zod --> APIRoutes
    Biome -.-> TS
```

### Naming Conventions

- Files: kebab-case for routes, PascalCase for components
- Components: PascalCase
- Functions: camelCase
- Variables: camelCase
- Constants: UPPER_CASE
- Types/Interfaces: PascalCase

## Services Communication

```mermaid
---
title: Kai7en C4 Context
---
C4Context
    Person(user, "User", "Daily fitness player")
    System(kai7en, "Kai7en", "Next.js web app with App Router")
    System_Ext(supabase, "Supabase", "Auth + PostgreSQL + RLS")

    Rel(user, kai7en, "Uses", "HTTPS")
    Rel(kai7en, supabase, "Auth + CRUD", "HTTPS")
```

### Supabase

```mermaid
---
title: Supabase Integration
---
flowchart LR
    ServerActions["Server Actions"]
    APIRoutes["API Routes"]
    SupaAuth["Supabase Auth"]
    SupaDB["Supabase PostgreSQL"]
    RLS["Row Level Security"]

    ServerActions --> SupaAuth
    ServerActions --> SupaDB
    APIRoutes --> SupaAuth
    APIRoutes --> SupaDB
    SupaDB --> RLS
    SupaAuth -- "JWT" --> RLS
```
