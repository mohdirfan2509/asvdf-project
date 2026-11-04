export const BRAND_LOGO_SRC = '/asvdf-logo-sm.webp';
export const BRAND_LOGO_ALT = 'AS VDF Flooring Pvt. Ltd.';

export default function BrandLogo({ className = 'h-10 sm:h-11 lg:h-12 w-auto object-contain rounded-[10px] bg-black' }) {
  return <img src={BRAND_LOGO_SRC} alt={BRAND_LOGO_ALT} width={240} height={160} className={className} />;
}
