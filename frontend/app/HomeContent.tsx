"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faSnowflake,
  faDoorOpen,
  faWater,
  faBath,
  faMugSaucer,
  faPaw,
  faPhone,
  faEnvelope,
  faLocationDot,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { getTranslations } from "@/i18n";
import { readSetupData, SetupData } from "@/lib/setupStorage";

type RoomTypeDetail = {
  id: string;
  name: string;
  description: string;
  standardOccupancy: string;
  maxOccupancy: string;
  bedCount: string;
  surfaceSqm: string;
  amenities: string[];
};

const CANCELLATION_LABELS_IT: Record<string, string> = {
  flexible: "Flessibile",
  moderate: "Moderata",
  strict: "Rigida",
};

const AMENITY_META: Record<string, { icon: IconDefinition; label: string }> = {
  wifi: { icon: faWifi, label: "Wifi" },
  ac: { icon: faSnowflake, label: "Aria condizionata" },
  balcony: { icon: faDoorOpen, label: "Balcone" },
  seaView: { icon: faWater, label: "Vista mare" },
  privateBathroom: { icon: faBath, label: "Bagno privato" },
};

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function picsum(seed: string, width: number, height: number): string {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

export default function HomeContent() {
  const router = useRouter();
  const [data] = useState<SetupData | null>(() => readSetupData());
  const t = getTranslations().home;

  useEffect(() => {
    if (!data) router.replace("/setup");
  }, [data, router]);

  if (!data) return null;

  const property = data.property ?? {};
  const rooms = (data.rooms ?? {}) as { types?: RoomTypeDetail[] };
  const rates = data.rates ?? {};
  const policy = data.policy ?? {};
  const appearance = data.appearance ?? {};

  const hotelName = asString(property.commercialName) || "La tua struttura";
  const heroTitle = asString(appearance.heroTitle) || hotelName;
  const heroSubtitle = asString(appearance.heroSubtitle) || asString(property.shortDescription);
  const longDescription = asString(property.longDescription);
  const phone = asString(property.phone);
  const publicEmail = asString(property.publicEmail);
  const street = asString(property.street) || asString(property.propertyAddress);
  const city = asString(property.city);
  const province = asString(property.province);
  const country = asString(property.country);
  const latitude = asString(property.latitude);
  const longitude = asString(property.longitude);
  const primaryColor = asString(appearance.primaryColor) || "#2563eb";
  const facebook = asString(appearance.facebook);
  const instagram = asString(appearance.instagram);
  const twitter = asString(appearance.twitter);

  const fullAddress = [street, [city, province].filter(Boolean).join(" "), country].filter(Boolean).join(", ");
  const mapQuery =
    latitude && longitude ? `${latitude},${longitude}` : encodeURIComponent(fullAddress || hotelName);
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  const roomTypes = rooms.types ?? [];

  function rate(typeId: string, field: string): string {
    return asString(rates[`rate-${field}-${typeId}`]);
  }

  function isRateChecked(typeId: string, field: string): boolean {
    return rates[`rate-${field}-${typeId}`] === true;
  }

  const checkInFrom = asString(policy.checkInFrom);
  const checkOutBy = asString(policy.checkOutBy);
  const cancellationPolicy = asString(policy.cancellationPolicy);
  const depositRequired = policy.depositRequired === true;
  const petsAllowed = policy.petsAllowed === true;
  const smokingAllowed = policy.smokingAllowed === true;

  const anyBreakfastIncluded = roomTypes.some((type) => isRateChecked(type.id, "breakfast"));
  const dedupedAmenities = Array.from(new Set(roomTypes.flatMap((type) => type.amenities)));

  const highlights = [
    ...dedupedAmenities.filter((key) => AMENITY_META[key]).map((key) => AMENITY_META[key]),
    ...(anyBreakfastIncluded ? [{ icon: faMugSaucer, label: t.rooms.breakfastIncluded }] : []),
    ...(petsAllowed ? [{ icon: faPaw, label: t.policy.petsAllowed }] : []),
  ];

  const bookHref = publicEmail
    ? `mailto:${publicEmail}?subject=${encodeURIComponent(`Richiesta disponibilità — ${hotelName}`)}`
    : phone
      ? `tel:${phone}`
      : "#contatti";

  return (
    <div className="flex min-h-screen flex-col bg-[#fdfbf7] text-gray-900">
      <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/90 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-bold tracking-tight">{hotelName}</span>
          <nav className="hidden gap-8 text-sm font-medium text-gray-600 md:flex">
            <a href="#camere" className="hover:text-gray-900">{t.nav.rooms}</a>
            <a href="#struttura" className="hover:text-gray-900">{t.nav.about}</a>
            <a href="#dove-siamo" className="hover:text-gray-900">{t.nav.location}</a>
            <a href="#contatti" className="hover:text-gray-900">{t.nav.contact}</a>
          </nav>
          <a
            href={bookHref}
            style={{ backgroundColor: primaryColor }}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
          >
            {t.nav.bookCta}
          </a>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative flex min-h-[560px] items-end overflow-hidden">
          <Image
            src={picsum("hotello-hero", 1600, 900)}
            alt={hotelName}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

          <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-16 pt-40">
            <h1 className="text-[40px] font-bold leading-tight tracking-tight text-white sm:text-[56px]">
              {heroTitle}
            </h1>
            {heroSubtitle && (
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90">{heroSubtitle}</p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={bookHref}
                style={{ backgroundColor: primaryColor }}
                className="rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
              >
                {t.hero.ctaPrimary}
              </a>
              <a
                href="#camere"
                className="rounded-lg border border-white/70 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </section>

        {highlights.length > 0 && (
          <section className="border-b border-gray-100 bg-white px-6 py-8">
            <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-10 gap-y-4">
              {highlights.map((item, index) => (
                <div key={`${item.label}-${index}`} className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
                  </span>
                  {item.label}
                </div>
              ))}
            </div>
          </section>
        )}

        {longDescription && (
          <section id="struttura" className="border-b border-gray-100 px-6 py-20">
            <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div className="overflow-hidden rounded-2xl shadow-md">
                <Image
                  src={picsum("hotello-about", 900, 700)}
                  alt={t.about.title}
                  width={900}
                  height={700}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{t.about.title}</h2>
                <span className="mt-3 block h-1 w-16 rounded-full" style={{ backgroundColor: primaryColor }} />
                <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-gray-600">
                  {longDescription}
                </p>
              </div>
            </div>
          </section>
        )}

        <section id="camere" className="border-b border-gray-100 bg-white px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-bold tracking-tight">{t.rooms.title}</h2>
            <span
              className="mx-auto mt-3 block h-1 w-16 rounded-full"
              style={{ backgroundColor: primaryColor }}
            />

            {roomTypes.length === 0 ? (
              <p className="mt-8 text-center text-gray-500">{t.rooms.empty}</p>
            ) : (
              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {roomTypes.map((type, index) => {
                  const basePrice = rate(type.id, "base");
                  const currency = rate(type.id, "currency") || "EUR";
                  const extraGuestPrice = rate(type.id, "extra");
                  const minStay = rate(type.id, "minstay");
                  const breakfastIncluded = isRateChecked(type.id, "breakfast");

                  return (
                    <article
                      key={type.id}
                      className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="relative h-48 w-full">
                        <Image
                          src={picsum(`hotello-room-${index}`, 700, 500)}
                          alt={type.name || t.rooms.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col gap-3 p-6">
                        <h3 className="text-lg font-semibold">{type.name || t.rooms.title}</h3>
                        {type.description && (
                          <p className="text-sm leading-relaxed text-gray-600">{type.description}</p>
                        )}

                        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                          {type.maxOccupancy && <li>{type.maxOccupancy} ospiti max</li>}
                          {type.bedCount && <li>{type.bedCount} letti</li>}
                          {type.surfaceSqm && <li>{type.surfaceSqm} mq</li>}
                        </ul>

                        {type.amenities.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {type.amenities.map((amenity) => {
                              const meta = AMENITY_META[amenity];
                              return (
                                <span
                                  key={amenity}
                                  className="flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                                >
                                  {meta && <FontAwesomeIcon icon={meta.icon} className="h-3 w-3" />}
                                  {meta?.label ?? amenity}
                                </span>
                              );
                            })}
                          </div>
                        )}

                        {basePrice && (
                          <p className="mt-auto pt-2 text-xl font-bold" style={{ color: primaryColor }}>
                            {basePrice} {currency}
                            <span className="text-sm font-normal text-gray-500"> {t.rooms.perNight}</span>
                          </p>
                        )}

                        <div className="flex flex-col gap-0.5 text-xs text-gray-500">
                          {extraGuestPrice && (
                            <span>
                              +{extraGuestPrice} {currency} {t.rooms.extraGuestPrice}
                            </span>
                          )}
                          {minStay && (
                            <span>
                              {t.rooms.minStayPrefix}: {minStay} {t.rooms.nights}
                            </span>
                          )}
                          {breakfastIncluded && <span>{t.rooms.breakfastIncluded}</span>}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section id="dove-siamo" className="border-b border-gray-100 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold tracking-tight">{t.location.title}</h2>
            <span className="mt-3 block h-1 w-16 rounded-full" style={{ backgroundColor: primaryColor }} />

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                <iframe
                  src={mapSrc}
                  title={hotelName}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-80 w-full border-0"
                />
              </div>

              <div className="flex flex-col gap-6">
                {fullAddress && (
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <FontAwesomeIcon icon={faLocationDot} className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">{t.contact.address}</h3>
                      <p className="mt-1 text-base text-gray-900">{fullAddress}</p>
                    </div>
                  </div>
                )}

                {(checkInFrom || checkOutBy || cancellationPolicy) && (
                  <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">{t.policy.title}</h3>
                    <dl className="mt-3 flex flex-col gap-2 text-sm text-gray-600">
                      {checkInFrom && (
                        <div className="flex justify-between gap-4">
                          <dt>{t.policy.checkIn}</dt>
                          <dd>{checkInFrom}</dd>
                        </div>
                      )}
                      {checkOutBy && (
                        <div className="flex justify-between gap-4">
                          <dt>{t.policy.checkOut}</dt>
                          <dd>{checkOutBy}</dd>
                        </div>
                      )}
                      {cancellationPolicy && (
                        <div className="flex justify-between gap-4">
                          <dt>{t.policy.cancellation}</dt>
                          <dd>{CANCELLATION_LABELS_IT[cancellationPolicy] ?? cancellationPolicy}</dd>
                        </div>
                      )}
                      {depositRequired && (
                        <div className="flex justify-between gap-4">
                          <dt>{t.policy.depositRequired}</dt>
                          <dd>Sì</dd>
                        </div>
                      )}
                      <div className="flex justify-between gap-4">
                        <dt>{t.policy.petsAllowed}</dt>
                        <dd>{petsAllowed ? "Sì" : "No"}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt>{t.policy.smokingAllowed}</dt>
                        <dd>{smokingAllowed ? "Sì" : "No"}</dd>
                      </div>
                    </dl>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="contatti" className="px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight">{t.contact.title}</h2>
            <span className="mt-3 block h-1 w-16 rounded-full" style={{ backgroundColor: primaryColor }} />
            <div className="mt-6 flex flex-col gap-3 text-base text-gray-700">
              {phone && (
                <a href={`tel:${phone}`} className="flex items-center gap-3 hover:underline">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <FontAwesomeIcon icon={faPhone} className="h-3.5 w-3.5" />
                  </span>
                  {phone}
                </a>
              )}
              {publicEmail && (
                <a href={`mailto:${publicEmail}`} className="flex items-center gap-3 hover:underline">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
                  </span>
                  {publicEmail}
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 bg-white px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-gray-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {hotelName} — {t.footer.rights}
          </p>
          {(facebook || instagram || twitter) && (
            <div className="flex gap-4">
              {facebook && <a href={facebook} className="hover:text-gray-900">Facebook</a>}
              {instagram && <a href={instagram} className="hover:text-gray-900">Instagram</a>}
              {twitter && <a href={twitter} className="hover:text-gray-900">Twitter / X</a>}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
