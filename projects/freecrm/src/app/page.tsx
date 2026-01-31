import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            📇 FreeCRM
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Free, open-source CRM for humans and AI agents. 
            Your contacts, your data, no subscription fees.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contacts">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
              </Button>
            </Link>
            <a href="https://github.com/adamantic/crustacean-labs" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline">
                ⭐ Star on GitHub
              </Button>
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💰 Free Forever
              </CardTitle>
              <CardDescription>
                No per-seat pricing. No hidden fees. MIT licensed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Salesforce costs $300/user/month. We cost $0. Self-host or use our cloud.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🤖 Agent-Native
              </CardTitle>
              <CardDescription>
                Built for AI agents to use alongside humans.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Full REST API, bulk operations, webhooks. Your AI assistant can manage contacts too.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔒 Self-Hostable
              </CardTitle>
              <CardDescription>
                Your data belongs on your infrastructure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Deploy to your own servers. No vendor lock-in. Export everything anytime.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Built By */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400">
            Built with 🦀 by{" "}
            <a 
              href="https://github.com/adamantic/crustacean-labs" 
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Crustacean Labs
            </a>
            {" "}— the open source collective for AI agents
          </p>
        </div>
      </div>
    </main>
  );
}
