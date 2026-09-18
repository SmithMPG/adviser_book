// Client details: the Details tab's 5-column form (Personal, Contact,
// Education & Employment, Work Role Split, Marriage). Read-only until
// "Edit" is clicked (see editable-panel.js).

function _injectClientDetailsCSS() {
  if (document.getElementById('client-details-styles')) return;
  const s = document.createElement('style');
  s.id = 'client-details-styles';
  s.textContent = `
    .details-cols {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 22px;
    }
    .metrics-panel .details-cols { grid-template-columns: 1fr; max-width: 220px; }

    .details-col-title {
      margin: 0 0 12px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--ink);
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      padding-bottom: 8px;
    }
    .details-col-hint {
      font-weight: 400;
      text-transform: none;
      letter-spacing: 0;
      color: var(--ink-dim);
      font-size: 10px;
    }

    .details-col .field-label { margin-bottom: 12px; }
    .details-col .field-label:last-child { margin-bottom: 0; }

    @media (max-width: 1000px) {
      .details-cols { grid-template-columns: repeat(2, 1fr); }
    }
  `;
  document.head.appendChild(s);
}
_injectClientDetailsCSS();

const GENDER_OPTIONS = ['M', 'F'];
const YES_NO_OPTIONS = ['Yes', 'No'];
const MARITAL_STATUS_OPTIONS = ['Married', 'Single', 'Divorced'];
const MARITAL_REGIME_OPTIONS = ['ANC', 'ANC with accrual', 'COP'];

function clientDetailsHTML(d) {
  d = d || {};
  return `
    <div class="editable-panel details-panel">
      <div class="details-cols">
        <div class="details-col">
          <h5 class="details-col-title">Personal Details</h5>
          ${fieldRow('Title', textInput('title', d.title))}
          ${fieldRow('Full Name', textInput('fullName', d.fullName))}
          ${fieldRow('Gender', selectInput('gender', GENDER_OPTIONS, d.gender))}
          ${fieldRow('Date of Birth', dateInput('dob', d.dob))}
          ${fieldRow('ID Number', textInput('idNumber', d.idNumber))}
          ${fieldRow('Maiden Name', textInput('maidenName', d.maidenName))}
          ${fieldRow('Smoker', selectInput('smoker', YES_NO_OPTIONS, d.smoker))}
          ${fieldRow('Cannabis Use', selectInput('cannabis', YES_NO_OPTIONS, d.cannabis))}
        </div>
        <div class="details-col">
          <h5 class="details-col-title">Contact Details</h5>
          ${fieldRow('Home Address', textInput('homeAddress', d.homeAddress))}
          ${fieldRow('Cell', textInput('cell', d.cell))}
          ${fieldRow('Email (personal)', textInput('personalEmail', d.personalEmail))}
        </div>
        <div class="details-col">
          <h5 class="details-col-title">Education &amp; Employment</h5>
          ${fieldRow('Highest Education Level', textInput('educationLevel', d.educationLevel))}
          ${fieldRow('Years Studied', numberInput('yearsStudied', d.yearsStudied))}
          ${fieldRow('Employer', textInput('employer', d.employer))}
          ${fieldRow('Occupation', textInput('occupation', d.occupation))}
        </div>
        <div class="details-col">
          <h5 class="details-col-title">Work Role Split <span class="details-col-hint">(must total 100%)</span></h5>
          ${fieldRow('Admin %', numberInput('roleAdmin', d.roleAdmin))}
          ${fieldRow('Supervisory %', numberInput('roleSupervisory', d.roleSupervisory))}
          ${fieldRow('Travel %', numberInput('roleTravel', d.roleTravel))}
          ${fieldRow('Manual %', numberInput('roleManual', d.roleManual))}
        </div>
        <div class="details-col">
          <h5 class="details-col-title">Marriage Details</h5>
          ${fieldRow('Marital Status', selectInput('maritalStatus', MARITAL_STATUS_OPTIONS, d.maritalStatus))}
          ${fieldRow('Marital Regime', selectInput('maritalRegime', MARITAL_REGIME_OPTIONS, d.maritalRegime))}
          ${fieldRow('Date of Marriage', dateInput('dateOfMarriage', d.dateOfMarriage))}
        </div>
      </div>
      <div class="panel-actions"><button class="edit-toggle-btn" type="button">Edit</button></div>
    </div>
  `;
}

function clientMetricsHTML(m) {
  m = m || {};
  return `
    <div class="editable-panel metrics-panel">
      <div class="details-cols">
        <div class="details-col">
          ${fieldRow('Meetings', numberInput('meetings', m.meetings))}
          ${fieldRow('FNAs', numberInput('fnas', m.fnas))}
          ${fieldRow('Quotes', numberInput('quotes', m.quotes))}
          ${fieldRow('Referrals', numberInput('referrals', m.referrals))}
        </div>
      </div>
      <div class="panel-actions"><button class="edit-toggle-btn" type="button">Edit</button></div>
    </div>
  `;
}
