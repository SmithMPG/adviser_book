// Client card: one consistent card, used in every tab (Prospects, Action
// Required, Clients, Not Moved Forward). Collapsed row is just name +
// clickable email/WhatsApp with copy buttons — no status text, no action
// button, no chevron. Clicking the row uncollapses it into the same
// Metrics / Details / [Case ...] sub-tabs everywhere; a Case tab only
// appears for cards that actually have one.

function _injectClientCardCSS() {
  if (document.getElementById('client-card-styles')) return;
  const s = document.createElement('style');
  s.id = 'client-card-styles';
  s.textContent = `
    .card-wrapper {
      cursor: grab;
      transition: opacity 0.15s ease;
    }
    .card-wrapper.dragging { opacity: 0.4; }

    .list-row {
      background: #f2f2f0;
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: var(--radius);
      padding: 16px 20px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 24px;
      cursor: pointer;
      color: var(--ink-dim);
      transition: background 0.12s ease, border-color 0.12s ease, color 0.12s ease;
    }
    .list-row .name { min-width: 180px; font-size: 15px; }
    .list-row .name b { color: var(--ink); }
    .list-row .name span { color: var(--ink-dim); margin-left: 4px; }
    .list-row .spacer { flex: 1; }

    /* The row currently expanded — highlighted navy, matching the app's
       dark accent, while every other (collapsed) row stays plain/off-white. */
    .list-row.active {
      background: var(--navy);
      border-color: var(--navy);
      color: var(--text-dim);
    }
    .list-row.active .name b { color: var(--text); }
    .list-row.active .name span { color: var(--text-dim); }

    .row-detail {
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-top: none;
      border-radius: 0 0 var(--radius) var(--radius);
      margin: -10px 0 10px 0;
      padding: 18px 20px;
      display: none;
      font-size: 13px;
      color: var(--ink-dim);
    }
    .row-detail.open { display: block; }

    .contact-group {
      display: flex;
      align-items: center;
      gap: 7px;
      min-width: 230px;
    }
    .contact-text { font-size: 14px; }

    .contact-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      color: inherit;
      opacity: 0.8;
      flex-shrink: 0;
    }
    .contact-icon:hover { opacity: 1; background: rgba(0, 0, 0, 0.06); }
    .list-row.active .contact-icon:hover { background: rgba(255, 255, 255, 0.1); }
    .contact-icon-whatsapp { color: #25d366; }

    .copy-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: none;
      background: transparent;
      color: inherit;
      opacity: 0.5;
      cursor: pointer;
      flex-shrink: 0;
    }
    .copy-btn:hover { opacity: 0.9; background: rgba(0, 0, 0, 0.06); }
    .list-row.active .copy-btn:hover { background: rgba(255, 255, 255, 0.1); }
    .copy-btn.copied { color: var(--green); opacity: 1; }

    /* Nested tab bar inside an expanded card — same pill-on-grey look as the
       page's main tab bar (components/toolbar.css), kept as its own class
       rather than reusing .tab-bar/.tab so the two don't collide: the main
       tab switcher's click handler is delegated off the .tab-bar/.tab
       selectors globally, and this needs its own independent behavior. */
    .client-tab-bar {
      display: flex;
      background: #e2e3e2;
      padding: 5px 6px;
      border-radius: 8px;
      gap: 2px;
      margin-bottom: 14px;
    }
    .client-tab {
      flex: 1;
      background: transparent;
      border: none;
      padding: 8px 14px;
      font-family: inherit;
      font-size: 12px;
      font-weight: 500;
      color: #555c6a;
      cursor: pointer;
      white-space: nowrap;
      border-radius: 6px;
      transition: color 0.15s ease;
    }
    .client-tab:hover:not(.active) { color: #2a3040; }
    .client-tab.active {
      background: #ffffff;
      color: var(--navy);
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.14);
    }

    .client-tab-panel {
      display: none;
      flex-direction: column;
      gap: 8px;
      font-size: 13px;
      color: var(--ink-dim);
    }
    .client-tab-panel.active { display: flex; }
  `;
  document.head.appendChild(s);
}
_injectClientCardCSS();

const CARD_ICON_MAIL = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>';
const CARD_ICON_COPY = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
const CARD_ICON_WHATSAPP = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.9 11.86L4 20l4.28-1.12a7.9 7.9 0 0 0 3.77.96 7.95 7.95 0 0 0 7.94-7.94 7.9 7.9 0 0 0-2.39-5.58zM12.05 18.4a6.6 6.6 0 0 1-3.37-.92l-.24-.14-2.5.66.67-2.44-.16-.25a6.6 6.6 0 1 1 12.24-3.5 6.6 6.6 0 0 1-6.64 6.59zm3.62-4.94c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.2-.5.64-.62.77-.11.13-.23.14-.42.05-.2-.1-.83-.31-1.58-.98-.58-.52-.98-1.16-1.09-1.36-.11-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.11.13-.2.2-.32.07-.13.03-.25-.02-.35-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.33h-.38c-.13 0-.34.05-.52.25-.18.2-.68.66-.68 1.62s.7 1.88.79 2.01c.1.13 1.37 2.1 3.32 2.94.46.2.83.32 1.11.41.47.15.9.13 1.24.08.38-.06 1.17-.48 1.34-.94.16-.46.16-.86.11-.94-.05-.08-.18-.13-.38-.23z"/></svg>';

function _waNumber(phone) {
  return phone.replace(/[^\d]/g, '');
}

function clientCardHTML(data) {
  const tabs = [
    '<button class="client-tab active" data-tab="details">Details</button>',
    '<button class="client-tab" data-tab="cases-progress">Cases In Progress</button>',
    '<button class="client-tab" data-tab="cases-accepted">Accepted Cases</button>',
    '<button class="client-tab" data-tab="metrics">Metrics</button>',
  ].join('');

  const panels = [
    `<div class="client-tab-panel active" data-panel="details">${clientDetailsHTML(data.details)}</div>`,
    `<div class="client-tab-panel" data-panel="cases-progress">${clientCasesHTML(data.casesInProgress, 'Date Initiated')}</div>`,
    `<div class="client-tab-panel" data-panel="cases-accepted">${clientCasesHTML(data.acceptedCases, 'Date Accepted')}</div>`,
    `<div class="client-tab-panel" data-panel="metrics">${clientMetricsHTML(data.metrics)}</div>`,
  ].join('');

  return `
    <div class="card-wrapper" draggable="true">
      <div class="list-row" data-card-id="${data.id}">
        <div class="name"><b>${data.firstName}</b><span>${data.lastName}</span></div>
        <div class="contact-group">
          <a class="contact-icon" href="mailto:${data.email}" title="Email ${data.firstName}" onclick="event.stopPropagation()">${CARD_ICON_MAIL}</a>
          <span class="contact-text">${data.email}</span>
          <button class="copy-btn" type="button" data-copy="${data.email}" title="Copy email" onclick="event.stopPropagation()">${CARD_ICON_COPY}</button>
        </div>
        <div class="contact-group">
          <a class="contact-icon contact-icon-whatsapp" href="https://wa.me/${_waNumber(data.phone)}" target="_blank" rel="noopener" title="WhatsApp ${data.firstName}" onclick="event.stopPropagation()">${CARD_ICON_WHATSAPP}</a>
          <span class="contact-text">${data.phone}</span>
          <button class="copy-btn" type="button" data-copy="${data.phone}" title="Copy number" onclick="event.stopPropagation()">${CARD_ICON_COPY}</button>
        </div>
        <div class="spacer"></div>
      </div>
      <div class="row-detail" id="row-${data.id}">
        <div class="client-tabs">
          <div class="client-tab-bar">${tabs}</div>
          ${panels}
        </div>
      </div>
    </div>
  `;
}

function renderClientCards(containerId, cards) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = cards.map(clientCardHTML).join('');
}

function initClientCards(root) {
  root.addEventListener('click', e => {
    if (e.target.closest('.copy-btn')) {
      const btn = e.target.closest('.copy-btn');
      const value = btn.dataset.copy;
      navigator.clipboard?.writeText(value);
      btn.classList.add('copied');
      setTimeout(() => btn.classList.remove('copied'), 1000);
      return;
    }

    const row = e.target.closest('.list-row');
    if (!row) return;
    const detail = row.parentElement.querySelector('.row-detail');
    if (!detail) return;
    const isOpen = detail.classList.contains('open');
    document.querySelectorAll('.row-detail').forEach(r => {
      r.classList.remove('open');
      r.previousElementSibling?.classList.remove('active');
    });
    if (!isOpen) {
      detail.classList.add('open');
      row.classList.add('active');
    }
  });
}
