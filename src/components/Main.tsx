// src/components/Landing.jsx
import React, { useState, useEffect } from "react";
import useAutosave from "./hooks/useAutosave";
import { validateStep } from "./utils/validation";
import { track } from "./utils/analytics";

const STEPS = [
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

export default function Main() {
  const [idx, setIdx] = useState(0);

  // form state (can be expanded per step)
  const [values, setValues] = useState({
    businessName: "",
    oneLiner: "",
    structure: "LLC",
    // add other fields as needed...
  });

  const [errors, setErrors] = useState({});
  const autosave = useAutosave(AUTOSAVE_KEY, values);

  // load saved state on mount
  useEffect(() => {
    const saved = autosave.load();
    if (saved) {
      setValues((v) => ({ ...v, ...saved }));
      track("loaded_saved_draft");
    }
    // track page visit
    track("landing_open", { step: STEPS[idx] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // track step change
    track("step_view", { step: STEPS[idx], index: idx });
  }, [idx]);

  function setField(k, val) {
    setValues((s) => ({ ...s, [k]: val }));
  }

  function prev() {
    setIdx((i) => Math.max(0, i - 1));
    track("clicked_prev", { from: idx });
  }

  function next() {
    const step = STEPS[idx];
    const validation = validateStep(step, values);
    if (!validation.ok) {
      setErrors(validation.errors);
      track("validation_failed", { step, errors: Object.keys(validation.errors) });
      // focus first error in DOM could be added here
      return;
    }
    setErrors({});
    if (idx < STEPS.length - 1) {
      setIdx((i) => i + 1);
    } else {
      // finish flow: e.g., submit to server
      handleFinish();
    }
    track("clicked_next", { from: idx });
  }

  function go(i) {
    setIdx(i);
  }

  function handleFinish() {
    track("flow_finish", { values });
    // placeholder for submit:
    fetch('${WORKER_URL}/api/onboard', { method: 'POST', body: JSON.stringify(values) })
       .then(()=> autosave.clear());
    alert("Thanks — finishing flow. (hook up server submit here)");
    autosave.clear();
  }

  return (
    <div className="page-bg">
      <header className="top-bar">
        <div className="logo">
          <div className="mark" aria-hidden />
          <span className="brand">BizForm</span>
        </div>
      </header>

      <div className="step-scroll" role="tablist" aria-label="Steps">
        {STEPS.map((s, i) => (
          <button
            key={s}
            className={`step-pill ${i === idx ? "active" : ""}`}
            onClick={() => go(i)}
            aria-selected={i === idx}
            role="tab"
          >
            {s}
          </button>
        ))}
      </div>

      <main className="content-wrap">
        <section className="glass-card" aria-live="polite">
          <h1 className="step-title">{STEPS[idx]}</h1>
          <p className="step-desc">
            {idx === 0
              ? "Let's define your business idea — keep it concise."
              : `Step: ${STEPS[idx]}. Provide the requested details.`}
          </p>

          <div className="form-area">
            {STEPS[idx] === "Concept" && (
              <>
                <label className="field">
                  <div className="label">Business name</div>
                  <input
                    className="input"
                    value={values.businessName}
                    onChange={(e) => setField("businessName", e.target.value)}
                    placeholder="Acme Consulting LLC"
                    aria-invalid={!!errors.businessName}
                  />
                  {errors.businessName && <div className="field-error">{errors.businessName}</div>}
                </label>

                <label className="field">
                  <div className="label">One-line business idea</div>
                  <input
                    className="input"
                    value={values.oneLiner}
                    onChange={(e) => setField("oneLiner", e.target.value)}
                    placeholder="E.g., small-batch coffee roaster"
                    aria-invalid={!!errors.oneLiner}
                  />
                  {errors.oneLiner && <div className="field-error">{errors.oneLiner}</div>}
                </label>
              </>
            )}

            {STEPS[idx] === "Structure" && (
              <label className="field">
                <div className="label">Business structure</div>
                <select
                  className="input"
                  value={values.structure}
                  onChange={(e) => setField("structure", e.target.value)}
                >
                  <option>LLC</option>
                  <option>S-Corp</option>
                  <option>C-Corp</option>
                  <option>Sole Proprietorship</option>
                </select>
              </label>
            )}

            {/* Add more step blocks here */}
          </div>
        </section>
      </main>

      <nav className="nav-buttons" aria-label="Wizard navigation">
        <button className={`btn ${idx === 0 ? "disabled" : ""}`} onClick={prev}>
          ◀ Previous
        </button>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div className="progress" aria-hidden>
            <div
              className="progress-bar"
              style={{ width: `${((idx + 1) / STEPS.length) * 100}%` }}
            />
          </div>
          <button className="btn primary" onClick={next}>
            {idx === STEPS.length - 1 ? "Finish" : "Next Step ▶"}
          </button>
        </div>
      </nav>
    </div>
  );
}

