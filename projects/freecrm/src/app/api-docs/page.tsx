import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📇</span>
            <span className="font-bold text-xl">FreeCRM</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/contacts" className="text-gray-600 hover:text-gray-900 dark:text-gray-400">
              Contacts
            </Link>
            <Link href="/api-docs" className="text-blue-600 font-medium">
              API Docs
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🤖 API Documentation</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Agent-native REST API for managing contacts. Built for AI assistants.
          </p>
        </div>

        {/* Base URL */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Base URL</CardTitle>
          </CardHeader>
          <CardContent>
            <code className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded block">
              https://freecrm.pages.dev/api
            </code>
            <p className="text-sm text-gray-500 mt-2">
              Or your self-hosted instance URL
            </p>
          </CardContent>
        </Card>

        {/* Endpoints */}
        <div className="space-y-6">
          {/* List Contacts */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500">GET</Badge>
                <CardTitle className="text-lg font-mono">/contacts</CardTitle>
              </div>
              <CardDescription>List all contacts with optional filtering</CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold mb-2">Query Parameters</h4>
              <ul className="text-sm space-y-1 mb-4">
                <li><code>search</code> - Filter by name, email, or company</li>
                <li><code>tags</code> - Filter by tags (comma-separated)</li>
                <li><code>limit</code> - Max results (default: 100)</li>
                <li><code>offset</code> - Pagination offset</li>
              </ul>
              <h4 className="font-semibold mb-2">Example</h4>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`curl "https://freecrm.pages.dev/api/contacts?search=john&limit=10"`}
              </pre>
            </CardContent>
          </Card>

          {/* Create Contact */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-500">POST</Badge>
                <CardTitle className="text-lg font-mono">/contacts</CardTitle>
              </div>
              <CardDescription>Create a new contact</CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold mb-2">Request Body</h4>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto mb-4">
{`{
  "name": "John Doe",        // required
  "email": "john@example.com", // required
  "phone": "+1234567890",    // optional
  "company": "Acme Inc",     // optional
  "tags": ["client", "vip"], // optional
  "customFields": {}         // optional
}`}
              </pre>
              <h4 className="font-semibold mb-2">Example</h4>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`curl -X POST "https://freecrm.pages.dev/api/contacts" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "John Doe", "email": "john@example.com"}'`}
              </pre>
            </CardContent>
          </Card>

          {/* Bulk Operations */}
          <Card className="border-2 border-purple-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-500">POST</Badge>
                <CardTitle className="text-lg font-mono">/contacts/bulk</CardTitle>
                <Badge variant="outline" className="ml-2">🤖 Agent Friendly</Badge>
              </div>
              <CardDescription>
                Bulk create/update contacts with automatic deduplication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold mb-2">Features</h4>
              <ul className="text-sm space-y-1 mb-4">
                <li>✅ Upsert behavior - updates existing contacts by email</li>
                <li>✅ Process up to 100 contacts per request</li>
                <li>✅ Returns detailed results (created/updated/failed)</li>
              </ul>
              <h4 className="font-semibold mb-2">Example</h4>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`curl -X POST "https://freecrm.pages.dev/api/contacts/bulk" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contacts": [
      {"name": "Alice", "email": "alice@example.com"},
      {"name": "Bob", "email": "bob@example.com", "tags": ["new"]}
    ]
  }'`}
              </pre>
              <h4 className="font-semibold mb-2 mt-4">Response</h4>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "summary": {
    "created": 2,
    "updated": 0,
    "failed": 0,
    "total": 2
  },
  "results": { ... }
}`}
              </pre>
            </CardContent>
          </Card>

          {/* Get Single Contact */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500">GET</Badge>
                <CardTitle className="text-lg font-mono">/contacts/:id</CardTitle>
              </div>
              <CardDescription>Get a single contact by ID</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`curl "https://freecrm.pages.dev/api/contacts/abc-123"`}
              </pre>
            </CardContent>
          </Card>

          {/* Update Contact */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-yellow-500">PATCH</Badge>
                <CardTitle className="text-lg font-mono">/contacts/:id</CardTitle>
              </div>
              <CardDescription>Update a contact</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`curl -X PATCH "https://freecrm.pages.dev/api/contacts/abc-123" \\
  -H "Content-Type: application/json" \\
  -d '{"company": "New Company"}'`}
              </pre>
            </CardContent>
          </Card>

          {/* Delete Contact */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-red-500">DELETE</Badge>
                <CardTitle className="text-lg font-mono">/contacts/:id</CardTitle>
              </div>
              <CardDescription>Delete a contact</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`curl -X DELETE "https://freecrm.pages.dev/api/contacts/abc-123"`}
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t text-center text-gray-500">
          <p>
            Built with 🦀 by{" "}
            <a 
              href="https://github.com/adamantic/crustacean-labs" 
              className="text-blue-600 hover:underline"
            >
              Crustacean Labs
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
