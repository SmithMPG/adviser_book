// Lifetime badges: compact AUM / Clients / Policies indicators that live
// in the toolbar (visible on every tab, not just Home). Each shows a
// rounded headline number; hover (or tap, for touch) reveals the exact
// figure and, for policies, the Risk/Investment breakdown.

function _injectLifetimeBadgesCSS() {
  if (document.getElementById('lifetime-badges-styles')) return;
  const s = document.createElement('style');
  s.id = 'lifetime-badges-styles';
  s.textContent = `
    .lb-badges {
      display: flex;
      align-items: baseline;
      gap: 18px;
      padding-left: 18px;
      margin-left: 4px;
      border-left: 1px solid var(--border);
      flex-shrink: 0;
    }

    .lb-badge {
      position: relative;
      display: flex;
      align-items: baseline;
      gap: 5px;
      font-size: 12px;
      color: var(--text-dim);
      cursor: default;
      white-space: nowrap;
    }
    .lb-badge-value {
      font-size: 14px;
      font-weight: 700;
      color: var(--gold-soft);
    }

    .lb-badge-tooltip {
      position: absolute;
      top: 130%;
      left: 50%;
      transform: translateX(-50%);
      background: var(--navy-lighter);
      border: 1px solid var(--border);
      color: var(--text);
      font-size: 12px;
      padding: 6px 10px;
      border-radius: 6px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.12s ease;
      z-index: 20;
    }
    .lb-badge-tooltip b { color: var(--gold-soft); font-weight: 700; }
    .lb-badge:hover .lb-badge-tooltip,
    .lb-badge.tapped .lb-badge-tooltip {
      opacity: 1;
      pointer-events: auto;
    }

    @media (max-width: 1100px) {
      .lb-badges { display: none; }
    }
  `;
  document.head.appendChild(s);
}
_injectLifetimeBadgesCSS();

class LifetimeBadges {
  constructor(container, config) {
    this.container = container;
    this.config = Object.assign({
      aumRounded: 'R48m',
      aumExact: 'R48 320 000',
      totalClients: 62,
      policiesInForce: 84,
      riskPolicies: 52,
      investmentPolicies: 32,
    }, config);
    this.render();
  }

  render() {
    const c = this.config;
    this.container.innerHTML = `
      <div class="lb-badges">
        <div class="lb-badge">
          <span class="lb-badge-label">AUM</span>
          <span class="lb-badge-value">${c.aumRounded}</span>
          <div class="lb-badge-tooltip">${c.aumExact}</div>
        </div>
        <div class="lb-badge">
          <span class="lb-badge-label">Clients</span>
          <span class="lb-badge-value">${c.totalClients}</span>
          <div class="lb-badge-tooltip">${c.totalClients} active clients</div>
        </div>
        <div class="lb-badge">
          <span class="lb-badge-label">Policies</span>
          <span class="lb-badge-value">${c.policiesInForce}</span>
          <div class="lb-badge-tooltip">Risk <b>${c.riskPolicies}</b> &middot; Investment <b>${c.investmentPolicies}</b></div>
        </div>
      </div>
    `;

    this.container.querySelectorAll('.lb-badge').forEach(badge => {
      badge.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = badge.classList.contains('tapped');
        this.container.querySelectorAll('.lb-badge').forEach(b => b.classList.remove('tapped'));
        if (!isOpen) badge.classList.add('tapped');
      });
    });
    document.addEventListener('click', () => {
      this.container.querySelectorAll('.lb-badge').forEach(b => b.classList.remove('tapped'));
    });
  }
}

function initLifetimeBadges(containerId, config) {
  const container = document.getElementById(containerId);
  if (!container) return null;
  return new LifetimeBadges(container, config);
}
