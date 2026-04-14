export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  createdAt: number;
}

export type ContactFormData = Omit<Contact, "id" | "createdAt">;
