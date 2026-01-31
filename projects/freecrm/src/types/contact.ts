export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  tags: string[];
  customFields: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
}

export interface CreateContactInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  tags?: string[];
  customFields?: Record<string, string>;
}

export type UpdateContactInput = Partial<CreateContactInput>;
