/**
 * Formspree integration for LimpioHogar
 * Replace FORM_ID_CONTACTO and FORM_ID_TRABAJA with real Formspree form IDs
 */

const FORM_ID_CONTACTO = 'xojpqzjl';
const FORM_ID_TRABAJA = 'xojpqzdd';

async function submitForm(formId, data) {
  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.ok;
}
