import ContactForm from '@/components/contact/ContactForm';
import ContactLocation from '@/components/contact/ContactLocation';
import QuickConnect from '@/components/contact/QuickConnect';
import { CONTACT_COPY } from '@/lib/seo/page-content';
import { COMPANY } from '@/lib/seo/company';
import { formatDisplayPhone, getTelUrl, getWhatsAppUrl } from '@/lib/contact';

/** Enquiry form, location and quick-connect actions; shared by /contact and the homepage. */
export default function ContactSection({ settings, services = [], id, headingAs: Heading = 'h2', className = '' }) {
  const phone = settings?.phone;
  const address = settings?.address || COMPANY.address;
  const serviceOptions = [...new Set(services.map((service) => service.title).filter(Boolean)), 'Other'];

  return (
    <section
      id={id}
      aria-labelledby="contact-title"
      className={`space-y-6 rounded-panel border border-white/80 bg-surface p-4 sm:p-6 lg:p-8 shadow-neu-sm ${className}`}
    >
      <Heading id="contact-title" className="sr-only">
        {CONTACT_COPY.h1}
      </Heading>
      <div className="surface-raised shadow-neu-sm rounded-panel grid gap-10 p-5 sm:p-7 lg:grid-cols-2 lg:gap-0">
        <div className="lg:border-r lg:border-line lg:pr-8 xl:pr-10">
          <ContactForm
            heading={CONTACT_COPY.formHeading}
            services={serviceOptions}
            privacyTitle={CONTACT_COPY.privacyTitle}
            privacyText={CONTACT_COPY.privacyText}
          />
        </div>
        <div className="lg:pl-8 xl:pl-10">
          <ContactLocation
            heading={CONTACT_COPY.locationHeading}
            companyName={CONTACT_COPY.displayName}
            address={address}
          />
        </div>
      </div>

      <QuickConnect
        heading={CONTACT_COPY.quickHeading}
        phone={phone ? { href: getTelUrl(phone), display: formatDisplayPhone(phone) } : null}
        whatsappUrl={phone ? getWhatsAppUrl(settings.whatsapp || phone, CONTACT_COPY.whatsappMessage) : null}
        email={settings?.email}
        emailSubject={CONTACT_COPY.emailSubject}
      />
    </section>
  );
}
