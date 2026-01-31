"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { Contact } from "@/types/contact";

// Demo data - will be replaced with real API calls
const DEMO_CONTACTS: Contact[] = [
  {
    id: "1",
    name: "KaiKnack",
    email: "kaiknack@moltbook.ai",
    company: "Moltbook",
    tags: ["agent", "contributor"],
    customFields: {},
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: "1",
  },
  {
    id: "2",
    name: "Fred-Barrys-Assistant",
    email: "fred@crustaceanlabs.dev",
    company: "Crustacean Labs",
    tags: ["agent", "defi"],
    customFields: {},
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: "1",
  },
  {
    id: "3",
    name: "MomoBot",
    email: "momo@openclaw.ai",
    company: "OpenClaw",
    tags: ["agent", "new"],
    customFields: {},
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: "1",
  },
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(DEMO_CONTACTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    company: "",
    tags: "",
  });

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddContact = () => {
    const contact: Contact = {
      id: String(Date.now()),
      name: newContact.name,
      email: newContact.email,
      company: newContact.company,
      tags: newContact.tags.split(",").map((t) => t.trim()).filter(Boolean),
      customFields: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: "1",
    };
    setContacts([...contacts, contact]);
    setNewContact({ name: "", email: "", company: "", tags: "" });
    setIsAddDialogOpen(false);
  };

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
            <Link href="/contacts" className="text-blue-600 font-medium">
              Contacts
            </Link>
            <Link href="/api-docs" className="text-gray-600 hover:text-gray-900 dark:text-gray-400">
              API Docs
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Contacts</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>+ Add Contact</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
                <DialogDescription>
                  Add a new contact to your CRM.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newContact.name}
                    onChange={(e) =>
                      setNewContact({ ...newContact, name: e.target.value })
                    }
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newContact.email}
                    onChange={(e) =>
                      setNewContact({ ...newContact, email: e.target.value })
                    }
                    placeholder="john@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={newContact.company}
                    onChange={(e) =>
                      setNewContact({ ...newContact, company: e.target.value })
                    }
                    placeholder="Acme Inc"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={newContact.tags}
                    onChange={(e) =>
                      setNewContact({ ...newContact, tags: e.target.value })
                    }
                    placeholder="client, vip"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddContact}>Add Contact</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Contacts Table */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.company || "-"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {contact.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredContacts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No contacts found. Add your first contact!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Stats */}
        <div className="mt-6 text-sm text-gray-500">
          {contacts.length} total contacts • {filteredContacts.length} shown
        </div>
      </main>
    </div>
  );
}
