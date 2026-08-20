export const DEFAULT_PHONE = '8074337407';
export const DEFAULT_PHONE_E164 = '+918074337407';
export const DEFAULT_WHATSAPP = '918074337407';

export function normalizePhone(phone = DEFAULT_PHONE) {
  const digits = String(phone).replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length >= 12) return digits;
  if (digits.length === 10) return `91${digits}`;
  return DEFAULT_WHATSAPP;
}

export function getWhatsAppUrl(phone, message = 'Hi ASVDF Flooring, I would like to know more about your VDF flooring services.') {
  const n = normalizePhone(phone);
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`;
}

export function getTelUrl(phone) {
  const n = normalizePhone(phone);
  return `tel:+${n}`;
}

export function formatDisplayPhone(phone = DEFAULT_PHONE) {
  const digits = String(phone).replace(/\D/g, '').slice(-10);
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}
