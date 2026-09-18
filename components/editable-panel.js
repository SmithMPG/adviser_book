// Editable panel: generic Edit/Save toggle for a block of fields (used by
// the Details and Metrics tabs). Fields render disabled; clicking Edit
// enables every input/select inside the panel and flips the button to
// Save. One delegated listener covers every panel, current and future.

function _injectEditablePanelCSS() {
  if (document.getElementById('editable-panel-styles')) return;
  const s = document.createElement('style');
  s.id = 'editable-panel-styles';
  s.textContent = `
    .editable-panel {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .editable-panel input,
    .editable-panel select {
      width: 100%;
      border: 1px solid transparent;
      background: transparent;
      padding: 4px 2px;
      font-size: 14px;
      font-family: inherit;
      color: var(--ink);
      border-radius: 4px;
      appearance: none;
    }
    .editable-panel input:disabled,
    .editable-panel select:disabled {
      color: var(--ink);
      opacity: 1;
      cursor: default;
    }
    .editable-panel.editing input,
    .editable-panel.editing select {
      border-color: rgba(0, 0, 0, 0.15);
      background: #fff;
      cursor: text;
    }

    .field-label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--ink-dim);
    }

    .panel-actions {
      display: flex;
      justify-content: flex-end;
    }

    .edit-toggle-btn {
      background: var(--gold);
      color: var(--navy);
      border: none;
      padding: 8px 18px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }
    .edit-toggle-btn:hover { opacity: 0.9; }
  `;
  document.head.appendChild(s);
}
_injectEditablePanelCSS();

function initEditablePanels(root) {
  root.addEventListener('click', e => {
    const btn = e.target.closest('.edit-toggle-btn');
    if (!btn) return;
    const panel = btn.closest('.editable-panel');
    if (!panel) return;
    const editing = panel.classList.toggle('editing');
    panel.querySelectorAll('input, select').forEach(el => { el.disabled = !editing; });
    btn.textContent = editing ? 'Save' : 'Edit';
  });
}
