// src/components/utils/validation.js
export function validateStep(step, values) {
  // returns { ok: boolean, errors: {field: msg}}
  const errors = {};
  if (step === "Concept") {
    if (!values.businessName || values.businessName.trim().length < 2) {
      errors.businessName = "Please enter a valid business name.";
    }
    if (!values.oneLiner || values.oneLiner.trim().length < 6) {
      errors.oneLiner = "Short description must be at least 6 characters.";
    }
  }

  if (step === "Name") {
    // example: ensure no special chars
    if (values.businessName && /[^a-zA-Z0-9\s\-\&\.]/.test(values.businessName)) {
      errors.businessName = "Remove unusual symbols from the name.";
    }
  }

  // add more step-specific rules as needed
  return { ok: Object.keys(errors).length === 0, errors };
}
