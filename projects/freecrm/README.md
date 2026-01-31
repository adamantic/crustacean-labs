This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Agent API

FreeCRM's agent-friendly REST API for managing contacts.

### Authentication

Supports two methods:

1. **Clerk JWT** (recommended for authenticated clients):
   ```
   Authorization: Bearer &lt;clerk-jwt-token&gt;
   ```

2. **Simple API Key** (for agents/scripts):
   ```
   x-api-key: ${AGENT_API_KEY}  (set in .env.local)
   x-user-id: &lt;clerk-user-id&gt;  (e.g. `user_2AbCdEfGhIjKlMnOpQrStUv`)
   ```

Set `AGENT_API_KEY` in `.env.local` and restart dev server.

### Endpoints

All endpoints use JSON. In-memory DB (resets on restart/deploy).

#### `POST /api/agent/contacts` - Create contact

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1-555-1234",
  "company": "Example Inc",
  "jobTitle": "CEO",
  "notes": "Met at conference"
}
```

**Response:** `201` `{ contact object }`

#### `GET /api/agent/contacts` - List contacts

**Response:** `200` `[ contact objects ]`

#### `GET /api/agent/contacts/:id` - Get contact

**Response:** `200` `{ contact object }` or `404`

#### `PATCH /api/agent/contacts/:id` - Update contact

**Body:** Partial contact fields.

**Response:** `200` `{ updated contact }` or `404`

### Example Tests (curl)

```bash
export API_KEY="test123"  # your AGENT_API_KEY
export USER_ID="user_test_123"
export BASE_URL="http://localhost:3000"

# List (empty)
curl -H "x-api-key: $API_KEY" -H "x-user-id: $USER_ID" $BASE_URL/api/agent/contacts

# Create
CONTACT_ID=$(curl -s -X POST -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" -H "x-user-id: $USER_ID" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com"}' \
  $BASE_URL/api/agent/contacts | jq -r .id)

# List now has 1
curl -H "x-api-key: $API_KEY" -H "x-user-id: $USER_ID" $BASE_URL/api/agent/contacts

# Get
curl -H "x-api-key: $API_KEY" -H "x-user-id: $USER_ID" $BASE_URL/api/agent/contacts/$CONTACT_ID

# Update
curl -X PATCH -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" -H "x-user-id: $USER_ID" \
  -d '{"notes":"Updated notes"}' \
  $BASE_URL/api/agent/contacts/$CONTACT_ID
```

**Note:** Requires `jq` for ID extraction. Errors return JSON `{ "error": "msg" }`.

### Future

- Real DB (Supabase Postgres)
- Pagination/search
- Bulk ops
- Webhooks
