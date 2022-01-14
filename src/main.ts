import "./styles/global.css";
import "./styles/app.css";

import type { ApplicationForm } from "./application/types";
import type { ApplicationErrors } from "./application/validation";
import type { ErrorMessage } from "./services/validation";

import { validateForm } from "./application/validation";

const errorSelector = ".validation-error";

const specialtySelect = document.getElementById("specialty");
const customSpecialty = document.getElementById("custom");
const applicationForm = document.getElementById("form");

function observeDependentFields() {
  const select = specialtySelect as HTMLSelectElement;
  const dependant = customSpecialty as HTMLElement;

  select.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    const showDependant = target.value === "other";

    dependant.hidden = !showDependant;
    if (showDependant) dependant.querySelector("input")?.focus?.();
  });
}

function createErrorElement(message: ErrorMessage): HTMLSpanElement {
  const error = document.createElement("span");
  error.className = "validation-error";
  error.textContent = message;
  return error;
}

type FieldError = {
  field: string;
  message: ErrorMessage;
};

function showErrorMessage({ field, message }: FieldError) {
  const input = applicationForm?.querySelector(`[name="${field}"]`);
  const scope = input?.closest("label");
  if (!scope) return;

  const error = createErrorElement(message);
  scope.appendChild(error);
}

function showErrors(errors: ApplicationErrors) {
  Object.entries(errors).forEach(([field, message]) => {
    showErrorMessage({ field, message });
  });
}

function clearErrors() {
  const errors = applicationForm?.querySelectorAll(errorSelector);
  errors?.forEach((node) => node.remove());
}

/**
 * Business logic is isolated and decoupled from the UI logic.
 * Here we control only how the UI (HTML-form) behaves,
 * if the UI requirements change we will need to update only this module.
 *
 * Since the UI logic depends on the validation rules and not otherwise,
 * the change of business requirements is reflected in the validation rules.
 */

function handleFormSubmit(e: SubmitEvent) {
  e.preventDefault();
  clearErrors();

  const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
  const { valid, errors } = validateForm(data as ApplicationForm);

  if (valid) setTimeout(() => alert("Application sent!"), 0);
  else showErrors(errors);
}

observeDependentFields();
applicationForm?.addEventListener("submit", handleFormSubmit);
