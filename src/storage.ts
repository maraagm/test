import { Contact } from "./types.js";

const STORAGE_KEY = "agenda_contacts";

export function getContacts(): Contact[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as Contact[]) : [];
}

export function saveContacts(contacts: Contact[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

export function addContact(contact: Contact): void {
  const contacts = getContacts();
  contacts.push(contact);
  saveContacts(contacts);
}

export function updateContact(updated: Contact): void {
  const contacts = getContacts().map((c) => (c.id === updated.id ? updated : c));
  saveContacts(contacts);
}

export function deleteContact(id: string): void {
  const contacts = getContacts().filter((c) => c.id !== id);
  saveContacts(contacts);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
