// Monthly stats: this cycle's commission, wills leads, and referrals —
// the monthly-cadence counterpart to the client funnel and PCR meter it
// sits alongside in the hero bar.

class MonthlyStats {
  constructor(container, config) {
    this.container = container;
    this.config = Object.assign({
      commissionMonthly: 'R1.2m',
      willsLeadsMonthly: 2,
      referralsMonthly: 3,
    }, config);
    this.render();
  }

  render() {
    const c = this.config;
    this.container.innerHTML = `
      <div class="stat-list">
        <div class="stat-cell">Expected Commission This Month: <b>${c.commissionMonthly}</b></div>
        <div class="stat-cell">Wills Leads Submitted MTD: <b>${c.willsLeadsMonthly}</b></div>
        <div class="stat-cell">Referrals This Month: <b>${c.referralsMonthly}</b></div>
      </div>
    `;
  }
}

function initMonthlyStats(containerId, config) {
  const container = document.getElementById(containerId);
  if (!container) return null;
  return new MonthlyStats(container, config);
}
