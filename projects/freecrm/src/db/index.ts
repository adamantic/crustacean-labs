// Simple in-memory store for Vercel demo
// TODO: Replace with Vercel Postgres or Neon

export interface Contact {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

// In-memory stores (will reset on cold start)
const contacts: Map<string, Contact> = new Map();
const users: Map<string, User> = new Map();

export function getContacts(userId: string): Contact[] {
  return Array.from(contacts.values()).filter(c => c.userId === userId);
}

export function getContact(id: string, userId: string): Contact | undefined {
  const contact = contacts.get(id);
  return contact?.userId === userId ? contact : undefined;
}

export function createContact(data: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Contact {
  const id = crypto.randomUUID();
  const contact: Contact = {
    ...data,
    id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  contacts.set(id, contact);
  return contact;
}

export function updateContact(id: string, userId: string, data: Partial<Contact>): Contact | null {
  const existing = contacts.get(id);
  if (!existing || existing.userId !== userId) return null;
  
  const updated: Contact = {
    ...existing,
    ...data,
    id,
    userId,
    updatedAt: new Date(),
  };
  contacts.set(id, updated);
  return updated;
}

export function deleteContact(id: string, userId: string): boolean {
  const existing = contacts.get(id);
  if (!existing || existing.userId !== userId) return false;
  contacts.delete(id);
  return true;
}

export function ensureUser(id: string, email: string, name?: string): User {
  let user = users.get(id);
  if (!user) {
    user = { id, email, name };
    users.set(id, user);
  }
  return user;
}

export function bulkCreateContacts(userId: string, contactsData: Array<Omit<Contact, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Contact[] {
  return contactsData.map(data => createContact({ ...data, userId }));
}
