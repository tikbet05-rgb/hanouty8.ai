# RIBH AI — Store MVP

## Database setup

Execute `supabase/migrations/202611250001_store_mvp.sql` in Supabase SQL editor. This migration enables RLS for products, orders, and expenses and restricts each authenticated owner to their own records.

## API routes

- `GET /api/store/products`
- `POST /api/store/products`
- `GET /api/store/orders`
- `POST /api/store/orders`

All requests require `Authorization: Bearer <Supabase access token>`.

The API verifies the token before querying and also relies on PostgreSQL RLS. The service-role key must never be sent to the browser.

## Financial integrity

- Client requests cannot set order totals or payment verification fields.
- New orders begin as `pending` with zero totals.
- Revenue and paid status require a server-side payment-provider webhook with valid signature verification.
- No external marketplace or Shopify connection is active by default.

## Configuration

Set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Keep `SUPABASE_SERVICE_ROLE_KEY` server-only and add it only for verified webhooks or administrative operations after implementing them.
