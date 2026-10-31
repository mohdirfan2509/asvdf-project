export const BRAND_LOGO_SRC = '/asvdf-logo.png';
export const BRAND_LOGO_ALT = 'AS VDF Flooring Pvt. Ltd.';

export default function BrandLogo({ className = 'h-[52px] sm:h-14 w-auto object-contain rounded-lg bg-black' }) {
  return <img src={BRAND_LOGO_SRC} alt={BRAND_LOGO_ALT} className={className} />;
}
