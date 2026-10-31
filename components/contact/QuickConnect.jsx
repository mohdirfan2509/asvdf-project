import { ArrowRight, FileText, Mail, MessageCircle, Phone } from 'lucide-react';
import RequestQuoteLink from '@/components/contact/RequestQuoteLink';

const actionClass =
  'mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand after:absolute after:inset-0 focus-visible:outline-none';

function Card({ icon: Icon, title, text, children }) {
  return (
    <li className="group relative surface-raised shadow-neu-sm rounded-card flex h-full items-start gap-4 p-5 transition-shadow duration-200 hover:shadow-neu-md focus-within:ring-2 focus-within:ring-brand/40">
      <span className="icon-well h-14 w-14">
        <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
      </span>
      <div className="min-w-0">
        <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">{text}</p>
        {children}
      </div>
    </li>
  );
}

const Arrow = () => (
  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
);

export default function QuickConnect({ heading, phone, whatsappUrl, email, emailSubject }) {
  return (
    <section aria-labelledby="quick-connect-heading" className="surface-raised shadow-neu-sm rounded-panel p-5 sm:p-7">
      <h2 id="quick-connect-heading" className="text-center text-2xl sm:text-[1.65rem] font-bold tracking-tight text-ink">
        {heading}
      </h2>
      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {phone ? (
          <Card icon={Phone} title="Call Us" text="Speak directly with our experts.">
            <a href={phone.href} className={actionClass}>
              {phone.display}
              <Arrow />
            </a>
          </Card>
        ) : null}
        {whatsappUrl ? (
          <Card icon={MessageCircle} title="WhatsApp" text="Chat with us on WhatsApp.">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={actionClass}>
              Chat Now
              <Arrow />
              <span className="sr-only">(opens WhatsApp in a new tab)</span>
            </a>
          </Card>
        ) : null}
        {email ? (
          <Card icon={Mail} title="Email Us" text="Drop us an email anytime.">
            <a href={`mailto:${email}?subject=${encodeURIComponent(emailSubject)}`} className={actionClass}>
              Send Email
              <Arrow />
              <span className="sr-only">to {email}</span>
            </a>
          </Card>
        ) : null}
        <Card icon={FileText} title="Request Quote" text="Get a customized quote for your project.">
          <RequestQuoteLink className={actionClass}>
            Request Now
            <Arrow />
          </RequestQuoteLink>
        </Card>
      </ul>
    </section>
  );
}
