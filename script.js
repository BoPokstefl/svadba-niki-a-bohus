// ---- RSVP form -> Google Form (auto-fills a linked Google Sheet) ----
const RSVP_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdJ-7PGpOM8EBVRm_5Urb7GAQ_LUkdnp8tCOzj9JRv72aayfQ/formResponse';
const RSVP_ENTRY = {
  name1: 'entry.1334363852',
  name2: 'entry.700450160',
  name3: 'entry.628855901',
  name4: 'entry.1495315660',
  attend: 'entry.1082805061',
  allergy: 'entry.1916195061',
};

const rsvpForm = document.getElementById('rsvp-form');
const rsvpThanks = document.getElementById('rsvp-thanks');

if (rsvpForm) {
  rsvpForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(rsvpForm);
    const params = new URLSearchParams();
    Object.keys(RSVP_ENTRY).forEach(function (key) {
      const value = formData.get(key);
      if (value) params.append(RSVP_ENTRY[key], value);
    });

    const submitBtn = rsvpForm.querySelector('.rsvp-btn');
    submitBtn.disabled = true;

    fetch(RSVP_ACTION_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: params,
    }).finally(function () {
      rsvpForm.hidden = true;
      rsvpThanks.hidden = false;
    });
  });
}
