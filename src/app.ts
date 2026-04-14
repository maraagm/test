import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
  generateId,
} from "./storage.js";
import { renderContactList, openModal, closeModal, showToast } from "./ui.js";
import { Contact } from "./types.js";

let searchQuery = "";

function refresh(): void {
  const contacts = getContacts().filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  renderContactList(contacts, handleEdit, handleDelete);
}

function handleEdit(id: string): void {
  const contact = getContacts().find((c) => c.id === id);
  if (contact) openModal("Editar contacto", contact);
}

function handleDelete(id: string): void {
  const contact = getContacts().find((c) => c.id === id);
  if (!contact) return;
  if (confirm(`¿Eliminar a "${contact.name}"?`)) {
    deleteContact(id);
    showToast("Contacto eliminado", "success");
    refresh();
  }
}

function handleFormSubmit(e: Event): void {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const id = (form.querySelector("#field-id") as HTMLInputElement).value;
  const name = (form.querySelector("#field-name") as HTMLInputElement).value.trim();
  const phone = (form.querySelector("#field-phone") as HTMLInputElement).value.trim();
  const email = (form.querySelector("#field-email") as HTMLInputElement).value.trim();
  const notes = (form.querySelector("#field-notes") as HTMLTextAreaElement).value.trim();

  if (!name) {
    showToast("El nombre es obligatorio", "error");
    return;
  }

  const contact: Contact = {
    id: id || generateId(),
    name,
    phone,
    email,
    notes,
    createdAt: id
      ? (getContacts().find((c) => c.id === id)?.createdAt ?? Date.now())
      : Date.now(),
  };

  if (id) {
    updateContact(contact);
    showToast("Contacto actualizado");
  } else {
    addContact(contact);
    showToast("Contacto añadido");
  }

  closeModal();
  refresh();
}

function init(): void {
  document.getElementById("btn-add")?.addEventListener("click", () => {
    openModal("Nuevo contacto");
  });

  document.getElementById("btn-cancel")?.addEventListener("click", closeModal);

  document.getElementById("contact-form")?.addEventListener("submit", handleFormSubmit);

  document.getElementById("search")?.addEventListener("input", (e) => {
    searchQuery = (e.target as HTMLInputElement).value;
    refresh();
  });

  document.getElementById("modal")?.addEventListener("click", (e) => {
    const modal = e.currentTarget as HTMLDialogElement;
    if (e.target === modal) closeModal();
  });

  refresh();
}

document.addEventListener("DOMContentLoaded", init);
