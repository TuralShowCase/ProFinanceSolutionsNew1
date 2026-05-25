import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData, getServiceBySlug } from "../servicesData";
import { ServicePage } from "../ServicePage";

const SITE_URL = "https://profinancesolutions.az";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const pageUrl = `${SITE_URL}/services/${service.slug}`;

  return {
    title: `${service.name} — Bakıda Maliyyə Xidməti`,
    description: service.heroDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${service.name} | ProFinance Solutions`,
      description: service.heroDescription,
      url: pageUrl,
      type: "website",
      siteName: "ProFinance Solutions",
      locale: "az_AZ",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${service.name} — ProFinance Solutions, Bakı`,
        },
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const pageUrl = `${SITE_URL}/services/${service.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: service.name,
    description: service.overview,
    url: pageUrl,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "City",    name: "Baku",       sameAs: "https://www.wikidata.org/wiki/Q9248" },
      { "@type": "Country", name: "Azerbaijan", sameAs: "https://www.wikidata.org/wiki/Q227" },
    ],
    serviceType: service.name,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: pageUrl,
      seller: { "@id": `${SITE_URL}/#organization` },
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: service.targets.join(", "),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} xidmət paketi`,
      itemListElement: service.features.map((f, i) => ({
        "@type": "Offer",
        position: i + 1,
        name: f.title,
        description: f.description,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Əsas səhifə", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Xidmətlər",   item: `${SITE_URL}/#services` },
      { "@type": "ListItem", position: 3, name: service.name,  item: pageUrl },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${pageUrl}#howto`,
    name: `${service.name} — İş Prosesi`,
    description: `ProFinance Solutions ilə ${service.name} xidmətindən necə istifadə etmək olar: addım-addım proses.`,
    provider: { "@id": `${SITE_URL}/#organization` },
    step: service.process.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${service.name} | ProFinance Solutions`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".service-tagline", ".service-overview"],
    },
  };

  const definedTermsSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${pageUrl}#glossary`,
    name: `${service.name} — Əsas terminlər`,
    inDefinedTermSet: `${pageUrl}#glossary`,
    hasDefinedTerm: [
      {
        "@type": "DefinedTerm",
        name: "MHBS",
        description: "Maliyyə Hesabatlarının Beynəlxalq Standartları (IFRS) — beynəlxalq mühasibat uçotu standartları",
        termCode: "IFRS",
        inDefinedTermSet: `${pageUrl}#glossary`,
      },
      {
        "@type": "DefinedTerm",
        name: "Vergi Məcəlləsi",
        description: "Azərbaycan Respublikasının Vergi Məcəlləsi — vergi öhdəliklərini tənzimləyən əsas qanunvericilik aktı",
        inDefinedTermSet: `${pageUrl}#glossary`,
      },
      {
        "@type": "DefinedTerm",
        name: "Mühasibat uçotu",
        description: "Şirkətin maliyyə əməliyyatlarının sistematik şəkildə qeydə alınması, təsnifləşdirilməsi və hesabatının hazırlanması prosesi",
        inDefinedTermSet: `${pageUrl}#glossary`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermsSchema) }}
      />
      <ServicePage service={service} allServices={servicesData} />
    </>
  );
}
