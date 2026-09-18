// Checkout popover: the "quick add" for today's checkout, opened by
// clicking today's cell in the month bar. Same 5 fields as the client
// funnel's stages (Prospects Contacted, Meetings, FNAs, Quotes, Cases
// Submitted) — Submit locks in today's checkout, Cancel discards.

function _injectCheckoutPopoverCSS() {
  if (document.getElementById('checkout-popover-styles')) return;
  const s = document.createElement('style');
  s.id = 'checkout-popover-styles';
  s.textContent = `
    .checkout-popover {
      position: fixed;
      z-index: 200;
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
      padding: 16px;
      width: 220px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .checkout-popover-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--ink-dim);
    }

    .checkout-popover-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .checkout-popover-field label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--ink-dim);
    }
    .checkout-popover-field input {
      border: 1px solid rgba(0, 0, 0, 0.12);
      border-radius: 6px;
      padding: 6px 8px;
      font-size: 14px;
      font-family: inherit;
      color: var(--ink);
    }

    .checkout-popover-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 4px;
    }
    .checkout-popover-cancel {
      background: transparent;
      border: 1px solid rgba(0, 0, 0, 0.15);
      color: var(--ink-dim);
      padding: 7px 14px;
      border-radius: 6px;
      font-size: 13px;
      cursor: pointer;
    }
    .checkout-popover-cancel:hover { color: var(--ink); }
    .checkout-popover-submit {
      background: var(--gold);
      color: var(--navy);
      border: none;
      padding: 7px 14px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }
    .checkout-popover-submit:hover { opacity: 0.9; }
  `;
  document.head.appendChild(s);
}
_injectCheckoutPopoverCSS();

function _closeCheckoutPopover() {
  document.getElementById('checkout-popover')?.remove();
  document.removeEventListener('click', _outsideCheckoutPopoverClick, true);
}

function _outsideCheckoutPopoverClick(e) {
  const popover = document.getElementById('checkout-popover');
  if (popover && !popover.contains(e.target)) _closeCheckoutPopover();
}

function openCheckoutPopover(anchorEl, date) {
  _closeCheckoutPopover();

  const isToday = isSameDay(date, new Date());
  const title = isToday ? "Today's Checkout" : `Checkout — ${formatDayMonth(date)}`;

  const popover = document.createElement('div');
  popover.className = 'checkout-popover';
  popover.id = 'checkout-popover';
  popover.innerHTML = `
    <div class="checkout-popover-title">${title}</div>
    <div class="checkout-popover-field">
      <label>Prospects Contacted</label>
      <input type="number" min="0" data-field="prospects">
    </div>
    <div class="checkout-popover-field">
      <label>Meetings</label>
      <input type="number" min="0" data-field="meetings">
    </div>
    <div class="checkout-popover-field">
      <label>FNAs</label>
      <input type="number" min="0" data-field="fnas">
    </div>
    <div class="checkout-popover-field">
      <label>Quotes</label>
      <input type="number" min="0" data-field="quotes">
    </div>
    <div class="checkout-popover-field">
      <label>Cases Submitted</label>
      <input type="number" min="0" data-field="cases">
    </div>
    <div class="checkout-popover-actions">
      <button type="button" class="checkout-popover-cancel">Cancel</button>
      <button type="button" class="checkout-popover-submit">Submit</button>
    </div>
  `;
  document.body.appendChild(popover);

  const rect = anchorEl.getBoundingClientRect();
  const popRect = popover.getBoundingClientRect();
  let left = rect.left + rect.width / 2 - popRect.width / 2;
  left = Math.max(12, Math.min(left, window.innerWidth - popRect.width - 12));
  popover.style.left = `${left}px`;
  popover.style.top = `${rect.bottom + 10}px`;

  popover.querySelector('.checkout-popover-cancel').addEventListener('click', _closeCheckoutPopover);
  popover.querySelector('.checkout-popover-submit').addEventListener('click', () => {
    markDateCheckedOut(date);
    _closeCheckoutPopover();
  });

  // Deferred so the click that opened the popover doesn't immediately close it.
  setTimeout(() => document.addEventListener('click', _outsideCheckoutPopoverClick, true), 0);
}
