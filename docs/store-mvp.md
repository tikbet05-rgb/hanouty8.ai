# RIBH AI — Store MVP

## Database setup

Execute `supabase/migrations/202611250001_store_mvp.sql` in the Supabase SQL editor. It enables RLS for products, orders, and expenses and scopes records to each authenticated owner.

## Store interface and API

Open `/store` to manage products and review orders. Product changes use the signed-in Supabase access token; the API verifies it and PostgreSQL RLS enforces ownership.

- `GET /api/store/products` — list products
- `POST /api/store/products` — create a draft product
- `PATCH /api/store/products/:id` — update an owned product
- `DELETE /api/store/products/:id` — delete an owned product
- `GET /api/store/orders` — list orders
- `POST /api/store/orders` — create a pending order

All API requests require `Authorization: Bearer <Supabase access token>`. Never send the service-role key to a browser.

## Financial integrity

Order totals, payment status, and revenue are not accepted from clients. Orders created by this flow remain pending with zero totals. A verified payment-provider webhook is required before marking an order paid or recording revenue. No Shopify or other marketplace connection is active by default.

## Configuration

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the deployment environment and complete Supabase Auth sign-in. Keep `SUPABASE_SERVICE_ROLE_KEY` server-only; it is not required for the current interface or APIs.
