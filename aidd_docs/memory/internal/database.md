---
name: database
description: Database schema and management
scope: backend
---

# Database

- Provider: Supabase (PostgreSQL hosted)
- Migrations: Supabase CLI (`supabase migration`)
- Seeding: Supabase seed SQL files

## ER Diagram

```mermaid
---
title: "Kai7en Database Schema"
---
erDiagram
    User {
        uuid id PK
        string email
        timestamp created_at
    }
    Run {
        uuid id PK
        uuid user_id FK
        date date
        string status
        timestamp created_at
    }
    RunNode {
        uuid id PK
        uuid run_id FK
        int step
        string type
        uuid content_id
        string status
        boolean buff_applied
        boolean debuff_applied
    }
    Streak {
        uuid user_id PK
        int current_count
        date last_run_date
    }
    ActiveBuff {
        uuid id PK
        uuid user_id FK
        string buff_type
        string source
        boolean consumed
    }
    Exercise {
        uuid id PK
        string name
        string description
        int base_reps
        int base_duration
        float difficulty_multiplier
    }
    Buff {
        uuid id PK
        string name
        string effect_type
        float multiplier
    }
    Debuff {
        uuid id PK
        string name
        string effect_type
        float multiplier
    }
    RestEvent {
        uuid id PK
        string name
        string description
    }
    User ||--o{ Run : "has many"
    Run ||--o{ RunNode : "has many"
    User ||--|| Streak : "has one"
    User ||--o{ ActiveBuff : "has many"
```

## Run Status Values

- active, completed, failed

## RunNode Type Values

- event, challenge, repos

## Buff Effect Types

- reduce_difficulty, skip, swap_node

## Debuff Effect Types

- increase_reps, increase_duration, remove_rest, add_event

## ActiveBuff Source Values

- event, consolation
