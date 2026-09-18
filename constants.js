// Close-off dates define what constitutes a "month" in Cadence.
// A production month runs from the day after the previous close-off date
// up to and including its own close-off date (see month_periods in SPEC.md).
// `weeks` is the length of that production month (4 or 5 weeks).
const CLOSE_OFF_DATES = [
  { month: 'December',  year: 2025, closeOffDate: '2026-01-09', weeks: 5 },
  { month: 'January',   year: 2026, closeOffDate: '2026-02-06', weeks: 4 },
  { month: 'February',  year: 2026, closeOffDate: '2026-03-06', weeks: 4 },
  { month: 'March',     year: 2026, closeOffDate: '2026-04-10', weeks: 5 },
  { month: 'April',     year: 2026, closeOffDate: '2026-05-08', weeks: 4 },
  { month: 'May',       year: 2026, closeOffDate: '2026-06-05', weeks: 4 },
  { month: 'June',      year: 2026, closeOffDate: '2026-07-03', weeks: 4 },
  { month: 'July',      year: 2026, closeOffDate: '2026-08-07', weeks: 5 },
  { month: 'August',    year: 2026, closeOffDate: '2026-09-04', weeks: 4 },
  { month: 'September', year: 2026, closeOffDate: '2026-10-02', weeks: 4 },
  { month: 'October',   year: 2026, closeOffDate: '2026-11-06', weeks: 5 },
  { month: 'November',  year: 2026, closeOffDate: '2026-12-04', weeks: 4 },
  { month: 'December',  year: 2026, closeOffDate: '2027-01-08', weeks: 5 },
  { month: 'January',   year: 2027, closeOffDate: '2027-02-05', weeks: 4 },
];
