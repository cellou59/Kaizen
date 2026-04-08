---
name: forms
description: Frontend form handling guidelines
scope: frontend
---

# Forms

## Auth Forms

- Login: email + password
- Signup: email + password

## Exercise Validation

- Single "Fait" (Done) button, honor-based
- No complex form state management

## Validation

- Zod schemas for auth forms

## State

- React local state (useState) for simple forms

## Flow

- Form submit -> Server Action -> Supabase -> Response
