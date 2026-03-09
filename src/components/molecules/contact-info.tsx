import {
  contactPageContent,
  COMPANY_WHATSAPP,
} from "@/lib/constants/contact-page";

export function ContactInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-border">
      {/* Telefone */}
      <div>
        <p className="text-muted-foreground text-sm mb-4">
          {contactPageContent.phoneLabel}
        </p>
        <a
          href={`tel:+${COMPANY_WHATSAPP}`}
          className="inline-block border border-primary px-6 py-3 text-primary hover:bg-primary hover:text-black transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {contactPageContent.phoneNumber}
        </a>
      </div>

      {/* Escritório */}
      <div>
        <p className="text-muted-foreground text-sm mb-4">
          {contactPageContent.officeLabel}
        </p>
        <p className="text-white">{contactPageContent.officeAddress.street}</p>
        <p className="text-white">{contactPageContent.officeAddress.suite}</p>
        <p className="text-white">{contactPageContent.officeAddress.city}</p>
      </div>

      {/* Email e Horário */}
      <div>
        <p className="text-white">{contactPageContent.emailPrefix}</p>
        <p className="text-white">{contactPageContent.emailDomain}</p>
        <p className="text-white mt-4">{contactPageContent.businessHours}</p>
      </div>
    </div>
  );
}
