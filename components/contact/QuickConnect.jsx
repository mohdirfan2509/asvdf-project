import { ArrowRight, FileText, Mail, Phone } from 'lucide-react';
import RequestQuoteLink from '@/components/contact/RequestQuoteLink';
import { WhatsAppIcon } from '@/components/ui/SocialIcons';

const actionClass =
  'mt-3 fit:mt-1.5 max-sm:mt-0 inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand after:absolute after:inset-0 focus-visible:outline-none';

function Card({ icon: Icon, title, text, children }) {
  return (
    <li className="group relative surface-raised shadow-neu-sm rounded-card flex h-full items-start max-sm:items-center gap-4 fit:gap-3 max-sm:gap-2 p-5 fit:px-3.5 fit:py-3 max-sm:px-2 max-sm:py-2.5 transition-shadow duration-200 hover:shadow-neu-md focus-within:ring-2 focus-within:ring-brand/40">
      <span className="icon-well h-14 w-14 fit:h-11 fit:w-11 max-sm:h-8 max-sm:w-8">
        <Icon className="h-6 w-6 fit:h-5 fit:w-5 max-sm:h-4 max-sm:w-4" strokeWidth={1.6} aria-hidden />
      </span>
      <div className="min-w-0 max-sm:flex max-sm:flex-1 max-sm:items-center max-sm:justify-between max-sm:gap-1">
        <h3 className="min-w-0 text-[15px] max-sm:text-[12.5px] font-semibold leading-snug text-ink">{title}</h3>
        <p className="mt-1 fit:mt-0.5 text-[13px] fit:text-xs leading-relaxed fit:leading-snug text-ink-muted max-sm:hidden">{text}</p>
        {children}
      </div>
    </li>
  );
}

const Arrow = () => (
  <ArrowRight className="h-4 w-4 max-sm:h-3.5 max-sm:w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
);

/** Phone, WhatsApp, email and quote cards; on the one-screen homepage the heading sits beside them. */
export default function QuickConnect({ heading, phone, whatsappUrl, email, emailSubject }) {
  return (
    <section
      aria-labelledby="quick-connect-heading"
      className="surface-raised shadow-neu-sm rounded-panel p-5 sm:p-7 max-sm:p-2.5 fit:flex fit:items-center fit:gap-6 fit:px-6 fit:py-3.5"
    >
      <h2
        id="quick-connect-heading"
        className="text-center text-2xl sm:text-[1.65rem] max-sm:text-lg fit:w-36 fit:shrink-0 fit:text-left fit:text-xl fit:leading-tight font-bold tracking-tight text-ink"
      >
        {heading}
      </h2>
      <ul className="mt-6 fit:mt-0 max-sm:mt-2.5 grid grid-cols-1 sm:grid-cols-2 max-sm:grid-cols-2 xl:grid-cols-4 fit:flex-1 fit:grid-cols-4 gap-4 fit:gap-3 max-sm:gap-2">
        {phone ? (
          <Card icon={Phone} title="Call Us" text="Speak directly with our experts.">
            <a href={phone.href} className={actionClass}>
              <span className="max-sm:sr-only">{phone.display}</span>
              <Arrow />
            </a>
          </Card>
        ) : null}
        {whatsappUrl ? (
          <Card icon={WhatsAppIcon} title="WhatsApp" text="Chat with us on WhatsApp.">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={actionClass}>
              <span className="max-sm:sr-only">Chat Now</span>
              <Arrow />
              <span className="sr-only">(opens WhatsApp in a new tab)</span>
            </a>
          </Card>
        ) : null}
        {email ? (
          <Card icon={Mail} title="Email Us" text="Drop us an email anytime.">
            <a href={`mailto:${email}?subject=${encodeURIComponent(emailSubject)}`} className={actionClass}>
              <span className="max-sm:sr-only">Send Email</span>
              <Arrow />
              <span className="sr-only">to {email}</span>
            </a>
          </Card>
        ) : null}
        <Card icon={FileText} title="Request Quote" text="Get a customized quote for your project.">
          <RequestQuoteLink className={actionClass}>
            <span className="max-sm:sr-only">Request Now</span>
            <Arrow />
          </RequestQuoteLink>
        </Card>
      </ul>
    </section>
  );
}
