export interface Interaction {
  id: string;
  contactId: string;
  type: "call" | "email" | "meeting" | "note" | "task";
  content: string;
  occurredAt: Date;
  createdBy: string;
  createdAt: Date;
}

export interface CreateInteractionInput {
  contactId: string;
  type: Interaction["type"];
  content: string;
  occurredAt?: Date;
}
