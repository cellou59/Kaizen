---
name: backend-communication
description: Frontend-backend communication patterns
scope: frontend
---

# Backend Communication

## API Definition

- No OpenAPI, Next.js Server Actions

## Services

- Supabase client (auth + database)

## Request Types

- Server Actions (form mutations)
- Supabase client queries (reads)

## Entities

- Located in `src/domains/*/types.ts`

## Data Flow

- Component -> Server Action -> Supabase -> Response

## Error Handling

- Server Actions return `{ error: string } | { data: T }`

## Validation

- Zod schemas at Server Action boundary

## Sequence

```mermaid
---
title: "Backend Communication Flow"
---
sequenceDiagram
    participant RC as "React Component"
    participant SA as "Server Action"
    participant ZV as "Zod Validation"
    participant SC as "Supabase Client"
    participant PG as "PostgreSQL"
    RC->>SA: invoke action
    SA->>ZV: validate input
    ZV-->>SA: validated data
    SA->>SC: query/mutate
    SC->>PG: SQL
    PG-->>SC: result
    SC-->>SA: response
    SA-->>RC: data or error
```
