import { Contact } from "./types.js";

export function renderContactList(
  contacts: Contact[],
  onEdit: (id: string) => void,
  onDelete: (id: string) => void
): void {
  const list = document.getElementById("contact-list") as HTMLElement;
  const empty = document.getElementById("empty-state") as HTMLElement;

  list.replaceChildren();

  if (contacts.length === 0) {
    empty.hidden = false;
    return;
  }

  empty.hidden = true;
  contacts
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((c) => {
      const article = buildContactCard(c);
      article.querySelector<HTMLButtonElement>("[data-edit]")
        ?.addEventListener("click", () => onEdit(c.id));
      article.querySelector<HTMLButtonElement>("[data-delete]")
        ?.addEventListener("click", () => onDelete(c.id));
      list.appendChild(article);
    });
}

function buildContactCard(c: Contact): HTMLElement {
  const initials = c.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  const article = document.createElement("article");
  article.className = "card";

  const avatar = document.createElement("div");
  avatar.className = "card-avatar";
  avatar.textContent = initials;

  const info = document.createElement("div");
  info.className = "card-info";

  const nameEl = document.createElement("h2");
  nameEl.className = "card-name";
  nameEl.textContent = c.name;
  info.appendChild(nameEl);

  if (c.phone) {
    const p = document.createElement("p");
    p.className = "card-detail";
    p.textContent = `📞 ${c.phone}`;
    info.appendChild(p);
  }
  if (c.email) {
    const p = document.createElement("p");
    p.className = "card-detail";
    p.textContent = `✉️ ${c.email}`;
    info.appendChild(p);
  }
  if (c.notes) {
    const p = document.createElement("p");
    p.className = "card-notes";
    p.textContent = c.notes;
    info.appendChild(p);
  }

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-icon btn-edit";
  editBtn.textContent = "✏️";
  editBtn.title = "Editar";
  editBtn.dataset["edit"] = c.id;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-icon btn-delete";
  deleteBtn.textContent = "🗑️";
  deleteBtn.title = "Eliminar";
  deleteBtn.dataset["delete"] = c.id;

  actions.append(editBtn, deleteBtn);
  article.append(avatar, info, actions);
  return article;
}

export function openModal(title: string, contact?: Contact): void {
  const modal = document.getElementById("modal") as HTMLDialogElement;
  const modalTitle = document.getElementById("modal-title") as HTMLElement;
  const form = document.getElementById("contact-form") as HTMLFormElement;

  modalTitle.textContent = title;
  form.reset();

  if (contact) {
    (document.getElementById("field-id") as HTMLInputElement).value = contact.id;
    (document.getElementById("field-name") as HTMLInputElement).value = contact.name;
    (document.getElementById("field-phone") as HTMLInputElement).value = contact.phone;
    (document.getElementById("field-email") as HTMLInputElement).value = contact.email;
    (document.getElementById("field-notes") as HTMLTextAreaElement).value = contact.notes;
  } else {
    (document.getElementById("field-id") as HTMLInputElement).value = "";
  }

  modal.showModal();
}

export function closeModal(): void {
  const modal = document.getElementById("modal") as HTMLDialogElement;
  modal.close();
}

export function showToast(message: string, type: "success" | "error" = "success"): void {
  const toast = document.getElementById("toast") as HTMLElement;
  toast.textContent = message;
  toast.className = `toast toast--${type} toast--visible`;
  setTimeout(() => {
    toast.className = "toast";
  }, 2800);
}
