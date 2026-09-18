// Shared field builders for client-details.js and client-cases.js.
// Text/date/number/select inputs render disabled by default — Details
// and Metrics wrap them in .editable-panel and unlock via the Edit
// button (see editable-panel.js); case rows are always editable, so
// client-cases.js builds those inline instead of using these.

function fieldRow(label, inputHtml) {
  return `<label class="field-label">${label}${inputHtml}</label>`;
}
function textInput(field, value) {
  return `<input type="text" data-field="${field}" value="${value || ''}" disabled>`;
}
function dateInput(field, value) {
  return `<input type="date" data-field="${field}" value="${value || ''}" disabled>`;
}
function numberInput(field, value) {
  return `<input type="number" data-field="${field}" value="${value ?? ''}" disabled>`;
}
function selectInput(field, options, value) {
  const opts = options.map(o => `<option value="${o}"${o === value ? ' selected' : ''}>${o}</option>`).join('');
  return `<select data-field="${field}" disabled><option value=""></option>${opts}</select>`;
}
