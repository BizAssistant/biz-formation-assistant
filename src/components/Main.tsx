import React, { useState, useEffect } from "react";
import { validateStep } from "./utils/validation";
import useAutosave from "./hooks/useAutosave";
import { track } from "./utils/analytics";

type Step =
  | "Concept"
  | "Structure"
  | "Name"
  | "Registration"
  | "Financing"
  | "Accounting"
  | "Marketing"
  | "Domain";

const STEPS: Step[] = [
  "Concept",
  "Structure",
  "Name",
  "Registration",
  "Financing",
  "Accounting",
  "Marketing",
  "Domain",
];

const AUTOSAVE_KEY = "bizform:v1";

// ----------------------
// Types
// ----------------------
interface BizFormState {
  businessName: string;
  oneLiner: string;
  structure: string;
  registrationState: string;
  fundingNeed: string;
  accountingStack: string;
  marketingPlan: string;
  domainIdea: string;
}

// ----------------------
// Component
// ----------------------
export default function Landing() {
  const [idx, setIdx] = useState<number>(0);

  const [values, setValues] = useState<BizFormState>({
    businessName: "",
    oneLiner: "",
    structure: "LLC",
    registrationState: "",
    fundingNeed: "",
    accountingStack: "",
    marketingPlan: "",
    domainIdea: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const autosave = useAutosave(AUTOSAVE_KEY, values);

  // ----------------------
  // Load saved draft
  // ----------------------
  useEffect(() => {
    const saved = autosave.load();
    if (saved) {
      setValues((v) => ({ ...v, ...saved }));
      track("draft_loaded");
    }
    track("landing_open", { step: STEPS[idx] });
  }, []);

  // ----------------------
  // Track step change
  // ----------------------
  useEffect(() => {
    track("step_view", { step: STEPS[idx], index: idx });
  }, [idx]);

  const currentStep = STEPS[idx];

  function setField<K extends keyof BizFormState>(key: K, value: BizFormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  // ----------------------
  // Step Locking Logic
  // ----------------------
  function attemptJump(targetIndex: number) {
    // Allow backwards always
    if (targetIndex <= idx) {
      setIdx(targetIndex);
      return;
    }

    // Prevent skipping ahead
    for (let i = 0; i < targetIndex; i++) {
      const s = STEPS[i];
      const v = validateStep(s, values);
      if (!v.ok) {
        setErrors(v.errors);
        setIdx(i);
        track("blocked_jump", { targetIndex, failedStep: s });
        return;
      }
    }

    setIdx(targetIndex);
  }

  // ----------------------
  // Prev / Next
  // ----------------------
  function prev() {
    if (idx > 0) {
      setIdx(idx - 1);
    }
  }

  function next() {
    const v = validateStep(currentStep, values);
    if (!v.ok) {
      setErrors(v.errors);
      track("validation_failed", { step: currentStep });
      return;
    }
    setErrors({});

    if (idx < STEPS.length - 1) {
      setIdx(idx + 1);
    } else {
      finishFlow();
    }
  }

  // ----------------------
  // Finish
  // ----------------------
  function finishFlow() {
    track("flow_finished", { values });

    // TODO: Hook up backend here
    alert("Business formation intake complete!");
    autosave.clear();
  }

  // ----------------------
  // JSX for each step
  // ----------------------
  function renderStep() {
    switch (currentStep) {
      case "Concept":
        return (
          <>
            <label className="field">
              <div className="label">Business name</div>
              <input
                className="input"
                value={values.businessName}
                onChange={(e) => setField("businessName", e.target.value)}
                placeholder="Acme Consulting LLC"
              />
              {errors.businessName && <div className="field-error">{errors.businessName}</div>}
            </label>

            <label className="field">
              <div className="label">One-liner</div>
              <input
                className="input"
                value={values.oneLiner}
                onChange={(e) => setField("oneLiner", e.target.value)}
                placeholder="Short description of your idea"
              />
              {errors.oneLiner && <div className="field-error">{errors.oneLiner}</div>}
            </label>
          </>
        );

      case "Structure":
        return (
          <label className="field">
            <div className="label">Choose structure</div>
            <select
              className="input"
              value={values.structure}
              onChange={(e) => setField("structure", e.target.value)}
            >
              <option>LLC</option>
              <option>S-Corp</option>
              <option>C-Corp</option>
              <option>Sole Proprietor</option>
            </select>
          </label>
        );

      case "Name":
        return (
          <label className="field">
            <div className="label">Domain / brand name idea</div>
            <input
              className="input"
              value={values.domainIdea}
              onChange={(e) => setField("domainIdea", e.target.value)}
              placeholder="e.g., acmecoffee.com"
            />
            {errors.domainIdea && <div className="field-error">{errors.domainIdea}</div>}
          </label>
        );

      case "Registration":
        return (
          <label className="field">
            <div className="label">Which state will you register in?</div>
            <input
              className="input"
              value={values.registrationState}
              onChange={(e) => setField("registrationState", e.target.value)}
              placeholder="Georgia"
            />
            {errors.registrationState && <div className="field-error">{errors.registrationState}</div>}
          </label>
        );

      case "Financing":
        return (
          <label className="field">
            <div className="label">Funding need (optional)</div>
            <input
              className="input"
              value={values.fundingNeed}
              onChange={(e) => setField("fundingNeed", e.target.value)}
              placeholder="How much capital will you start with?"
            />
          </label>
        );

      case "Accounting":
        return (
          <label className="field">
            <div className="label">Preferred accounting stack</div>
            <input
              className="input"
              value={values.accountingStack}
              onChange={(e) => setField("accountingStack", e.target.value)}
              placeholder="QuickBooks, Xero, Wave, etc."
            />
          </label>
        );

      case "Marketing":
        return (
          <label className="field">
            <div className="label">Marketing plan summary</div>
            <input
              className="input"
              value={values.marketingPlan}
              onChange={(e) => setField("marketingPlan", e.target.value)}
              placeholder="How will customers find you?"
            />
          </label>
        );

      case "Domain":
        return (
          <label className="field">
            <div className="label">Domain idea / availability</div>
            <input
              className="input"
              value={values.domainIdea}
              onChange={(e) => setField("domainIdea", e.target.value)}
              placeholder="Check a domain"
            />
          </label>
        );

      default:
        return null;
    }
  }

  return (
    <div className="page-bg">
      {/* ---------------------- Header ---------------------- */}
      <header className="top-bar">
        <div className="logo">
          <div className="mark" />
          <span className="brand">BizForm</span>
        </div>
      </header>

      {/* ---------------------- Step Pills ---------------------- */}
      <div className="step-scroll">
        {STEPS.map((s, i) => (
          <button
            key={s}
            className={`step-pill ${i === idx ? "active" : ""}`}
            onClick={() => attemptJump(i)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* ---------------------- Main Content ---------------------- */}
      <main className="content-wrap">
        <section className="glass-card">
          <h1 className="step-title">{currentStep}</h1>
          <p className="step-desc">Provide the required details below.</p>

          <div className="form-area">{renderStep()}</div>
        </section>
      </main>

      {/* ---------------------- Navigation ---------------------- */}
      <nav className="nav-buttons">
        <button className={`btn ${idx === 0 ? "disabled" : ""}`} onClick={prev}>
          ◀ Previous
        </button>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div className="progress">
            <div
              className="progress-bar"
              style={{ width: `${((idx + 1) / STEPS.length) * 100}%` }}
            />
          </div>

          <button className="btn primary" onClick={next}>
            {idx === STEPS.length - 1 ? "Finish" : "Next ▶"}
          </button>
        </div>
      </nav>
    </div>
  );
}
