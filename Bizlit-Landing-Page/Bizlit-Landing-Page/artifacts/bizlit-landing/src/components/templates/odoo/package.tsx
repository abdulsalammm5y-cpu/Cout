import type { ReactNode } from "react";
import {
  BadgeCheck,
  Boxes,
  CalendarDays,
  Check,
  Gavel,
  PackageCheck,
  Paperclip,
  ReceiptText,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICE_PHOTOS } from "@/data/service-photos";
import { Container, Mark, odBtn } from "./bits";

/*
 * The done-for-you package: the one offer where the owner hands over the keys
 * and does nothing else. Six phases run from the walkthrough to the payout,
 * each with a small framed photograph, then the statement that closes the job —
 * every item, every hammer price, one fee and the net that reaches the owner.
 *
 * This is a superset of `StepsBand`: that band explains the ordinary clearance
 * run, this one prices the job where we also pack, move, auction and settle.
 */

type Phase = {
  when: string;
  title: string;
  copy: string;
  icon: ReactNode;
  photo?: keyof typeof SERVICE_PHOTOS;
};

const PHASES: Phase[] = [
  {
    when: "Day 1 · one hour",
    title: "Walkthrough and fixed plan",
    copy: "We walk the space, photograph every room and agree what stays, what sells and what needs a licensed hand. The scope and the fee are written down before anything is touched.",
    icon: <CalendarDays size={16} />,
    photo: "property",
  },
  {
    when: "Days 1–2",
    title: "Pack and inventory",
    copy: "The crew packs, labels and photographs every item into the inventory. Nothing leaves the property without a line and a picture attached to it.",
    icon: <PackageCheck size={16} />,
    photo: "crew",
  },
  {
    when: "Days 2–4",
    title: "Clear and move",
    copy: "Furniture, boxes, scrap and rubbish are carried out, the rooms are swept, and everything sellable is moved to our sorting floor.",
    icon: <Truck size={16} />,
    photo: "clustered",
  },
  {
    when: "Days 4–7",
    title: "Sort, test and lot",
    copy: "We clean, test and group the sellable pieces into auction lots, then set each reserve against real sold prices rather than guesswork.",
    icon: <Boxes size={16} />,
    photo: "estate",
  },
  {
    when: "Week 2",
    title: "Auction and collection",
    copy: "Your lots are listed across major marketplaces and large online auction platforms, so the room is bigger than a single sale. Follow every lot live from your phone while we run the auction, record each hammer price and collect from every buyer. Anything unsold is re-offered or moved to scrap.",
    icon: <Gavel size={16} />,
    photo: "auction",
  },
  {
    when: "48h after the final lot",
    title: "Audit, receipts and payout",
    copy: "The full statement lands with you: every item, what it sold for, the one fee we took and the net on its way to your account. Every sale carries its receipt.",
    icon: <ReceiptText size={16} />,
  },
];

/** A photograph in the same small, printed-frame treatment on every phase. */
function PhotoFrame({ phase }: { phase: Phase }) {
  if (!phase.photo) return <MiniStatement />;

  const photo = SERVICE_PHOTOS[phase.photo];

  return (
    <figure className="m-0 w-full max-w-[17.5rem] overflow-hidden rounded-[0.75rem] border border-[var(--od-border)] bg-[var(--od-surface)] p-[0.4rem] shadow-[0_1px_2px_rgba(23,16,43,0.05),0_1rem_2rem_-1.4rem_rgba(45,20,90,0.35)] md:max-w-[18rem]">
      <div className="od-photo aspect-[16/10] overflow-hidden rounded-[0.5rem]">
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          decoding="async"
        />
      </div>
    </figure>
  );
}

/**
 * The last frame is the deliverable itself: a thumbnail of the statement the
 * owner receives, so the timeline ends on the payout rather than another room.
 */
function MiniStatement() {
  const rows = [
    ["Sideboard", "$420"],
    ["Tool chest", "$610"],
    ["Dining set", "$260"],
    ["Box lots", "$570"],
  ];

  return (
    <div className="w-full max-w-[17.5rem] rounded-[0.75rem] border border-[var(--od-border)] bg-[var(--od-surface)] p-[0.4rem] shadow-[0_1px_2px_rgba(23,16,43,0.05),0_1rem_2rem_-1.4rem_rgba(45,20,90,0.35)] md:max-w-[18rem]">
      <div className="rounded-[0.5rem] border border-[var(--od-border)] bg-[var(--od-band-soft)] p-[0.7rem]">
        <div className="flex items-center justify-between gap-2 border-b border-dashed border-[var(--od-border)] pb-[0.4rem]">
          <span className="text-[0.5rem] font-bold tracking-[0.12em] text-[var(--od-muted)] uppercase">
            Settlement
          </span>
          <span className="inline-flex items-center gap-[0.2rem] rounded-[0.25rem] bg-[#e7f6ec] px-[0.3rem] py-[0.1rem] text-[0.45rem] font-bold tracking-wide text-[#18794e] uppercase">
            <BadgeCheck size={7} aria-hidden /> Paid
          </span>
        </div>

        <div className="mt-[0.45rem] space-y-[0.25rem] text-[0.5rem] text-[var(--od-body)]">
          {rows.map(([item, price]) => (
            <div key={item} className="flex items-baseline justify-between gap-2">
              <span>{item}</span>
              <span className="font-semibold tabular-nums text-[var(--od-ink)]">{price}</span>
            </div>
          ))}
        </div>

        <div className="mt-[0.4rem] border-t border-dashed border-[var(--od-border)] pt-[0.4rem] text-[0.5rem]">
          <div className="flex items-baseline justify-between text-[var(--od-muted)]">
            <span>Our fee (15%)</span>
            <span className="tabular-nums">−$279</span>
          </div>
          <div className="mt-[0.2rem] flex items-baseline justify-between font-bold text-[var(--od-violet)]">
            <span>Paid to you</span>
            <span className="tabular-nums">$1,581</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettlementCard() {
  return (
    <div className="overflow-hidden rounded-[0.75rem] border border-[var(--od-border)] bg-[var(--od-surface)] shadow-[0_1px_2px_rgba(23,16,43,0.05),0_1.75rem_3.5rem_-2rem_rgba(45,20,90,0.28)]">
      <div className="flex flex-wrap items-start justify-between gap-[0.75rem] border-b border-[var(--od-border)] px-[1.25rem] py-[1rem]">
        <div className="flex items-start gap-[0.6rem]">
          <span
            aria-hidden
            className="mt-[0.1rem] flex h-[2rem] w-[2rem] shrink-0 items-center justify-center rounded-[0.6rem] bg-[var(--od-tone-violet-bg)] text-[var(--od-tone-violet-fg)]"
          >
            <ReceiptText size={16} />
          </span>
          <span>
            <span className="block text-[0.9375rem] font-semibold text-[var(--od-ink)]">
              Settlement statement
            </span>
            <span className="block text-[0.75rem] text-[var(--od-muted)]">
              ST-1042 · Estate clearance
            </span>
          </span>
        </div>

        <span className="inline-flex items-center gap-[0.25rem] rounded-full bg-[#e7f6ec] px-[0.55rem] py-[0.2rem] text-[0.625rem] font-bold tracking-[0.08em] text-[#18794e] uppercase">
          <BadgeCheck size={12} aria-hidden /> Paid
        </span>
      </div>

      <div className="px-[1.25rem] py-[1rem]">
        <table className="w-full border-collapse text-[0.8125rem]">
          <caption className="sr-only">Sample settlement statement</caption>
          <thead>
            <tr className="text-[0.625rem] tracking-[0.12em] text-[var(--od-muted)] uppercase">
              <th scope="col" className="pb-[0.4rem] text-left font-semibold">
                Item
              </th>
              <th scope="col" className="pb-[0.4rem] text-right font-semibold">
                Auction
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Oak sideboard", "$420.00"],
              ["Snap-on tool chest", "$610.00"],
              ["Dining set, 6 chairs", "$260.00"],
              ["Box lots (12)", "$570.00"],
            ].map(([item, price]) => (
              <tr key={item} className="border-t border-[var(--od-border)]">
                <td className="py-[0.45rem] text-left text-[var(--od-body)]">{item}</td>
                <td className="py-[0.45rem] text-right font-medium tabular-nums text-[var(--od-ink)]">
                  {price}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-[var(--od-border)]">
              <td className="pt-[0.6rem] text-left font-semibold text-[var(--od-ink)]">
                Auction total
              </td>
              <td className="pt-[0.6rem] text-right font-semibold tabular-nums text-[var(--od-ink)]">
                $1,860.00
              </td>
            </tr>
            <tr>
              <td className="pt-[0.35rem] text-left text-[var(--od-muted)]">
                Our fee (15%)
              </td>
              <td className="pt-[0.35rem] text-right tabular-nums text-[var(--od-muted)]">
                −$279.00
              </td>
            </tr>
            <tr>
              <td className="pt-[0.55rem] text-left font-bold text-[var(--od-violet)]">
                Paid to you
              </td>
              <td className="pt-[0.55rem] text-right text-[1rem] font-bold tabular-nums text-[var(--od-violet)]">
                $1,581.00
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-[0.5rem] border-t border-[var(--od-border)] bg-[var(--od-band-soft)] px-[1.25rem] py-[0.75rem] text-[0.75rem] text-[var(--od-muted)]">
        <span className="inline-flex items-center gap-[0.35rem]">
          <Paperclip size={13} aria-hidden /> 48 items packed · 14 sale receipts attached
        </span>
        <span>Paid 2 days after the final lot</span>
      </div>
    </div>
  );
}

export default function PackageBand() {
  return (
    <section id="package" className="py-[3rem] lg:py-[5rem]">
      <Container>
        <div className="relative overflow-hidden rounded-[1.25rem] border border-[rgba(109,40,217,0.18)] bg-[var(--od-band-soft)] p-[1.5rem] shadow-[0_2rem_4rem_-2.5rem_rgba(76,29,149,0.35)] md:p-[2.5rem] lg:p-[3rem]">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-[9rem] -right-[7rem] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(109,40,217,0.16),transparent_70%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-[10rem] -left-[8rem] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12),transparent_70%)]"
          />

          <div className="relative grid gap-[2rem] lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-[3rem]">
            <div className="min-w-0">
              <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-[var(--od-violet)] uppercase">
                The full-service package · we handle all of it
              </p>

              <h2 className="od-d2 mt-[0.75rem]">
                Hand us the keys.
                <br />
                <Mark>We do the rest.</Mark>
              </h2>

              <p className="mt-[1.25rem] max-w-[38rem] text-[1.0625rem] leading-relaxed text-[var(--od-body)]">
                Some jobs need a crew. This one needs nothing from you. We pack, inventory,
                clear, move, lot and auction everything sellable, then send the statement,
                the receipts and your share. You never lift a box, list a lot, meet a buyer
                or chase a payment.
              </p>

              <ul className="mt-[1.5rem] grid grid-cols-2 gap-x-[0.75rem] gap-y-[0.5rem]">
                {[
                  "No upfront cost",
                  "One fee, at the end",
                  "Follow the auction live",
                  "Paid after the auction",
                ].map(
                  (point) => (
                    <li
                      key={point}
                      className="flex items-start gap-[0.4rem] text-[0.75rem] font-semibold text-[var(--od-ink)]"
                    >
                      <Check
                        size={13}
                        strokeWidth={3}
                        aria-hidden
                        className="mt-[0.15rem] shrink-0 text-[var(--od-violet)]"
                      />
                      {point}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="min-w-0 rounded-[0.9rem] border border-[var(--od-border)] bg-[var(--od-surface)] p-[1.5rem] shadow-[0_1px_2px_rgba(23,16,43,0.05),0_1.5rem_3rem_-2rem_rgba(45,20,90,0.25)]">
              <p className="text-[0.625rem] font-bold tracking-[0.14em] text-[var(--od-muted)] uppercase">
                The whole job, one number
              </p>

              <p className="mt-[0.5rem] flex flex-wrap items-baseline gap-x-[0.5rem]">
                <span className="text-[3rem] leading-none font-bold tracking-tight text-[var(--od-ink)]">
                  15%
                </span>
                <span className="text-[0.875rem] font-semibold text-[var(--od-body)]">
                  typical success fee
                </span>
              </p>

              <p className="mt-[0.75rem] text-[0.875rem] leading-relaxed text-[var(--od-body)]">
                Charged once, on the auction total, only after the sale. Packing, hauling,
                storage, listing and the auction are all covered by it — you keep the other
                85% of what the sale brings.
              </p>

              <ul className="mt-[1rem] space-y-[0.45rem]">
                {[
                  "Packing & photographed inventory",
                  "Clearance, hauling & disposal",
                  "Auction listing, live tracking & collection",
                  "Audit, receipts & payout",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-[0.45rem] text-[0.8125rem] text-[var(--od-body)]"
                  >
                    <Check
                      size={14}
                      aria-hidden
                      className="mt-[0.15rem] shrink-0 text-[var(--od-violet)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <a href="#contact" className={odBtn + " mt-[1.25rem] w-full !whitespace-normal"}>
                Book a full-package walkthrough
              </a>

              <p className="mt-[0.6rem] text-center text-[0.6875rem] leading-relaxed text-[var(--od-muted)]">
                Fee confirmed in writing before we start. The statement below is a sample.
              </p>
            </div>
          </div>

          {/* ------------------------------------------------------- timeline */}
          <div className="relative mt-[2.5rem] border-t border-[var(--od-border)] pt-[2rem] lg:mt-[3rem] lg:pt-[2.5rem]">
            <div className="flex flex-wrap items-end justify-between gap-[0.5rem]">
              <h3 className="od-h4">Six phases, start to settled.</h3>
              <p className="text-[0.8125rem] font-medium text-[var(--od-muted)]">
                Typically 2–3 weeks · one point of contact throughout
              </p>
            </div>

            <ol className="relative mt-[1.5rem] space-y-[2rem] md:mt-[1rem] md:space-y-0">
              <span
                aria-hidden
                className="absolute top-[1rem] bottom-[1rem] left-[1.05rem] w-[2px] rounded-full bg-[linear-gradient(180deg,rgba(109,40,217,0.5),rgba(147,51,234,0.12))] md:left-1/2 md:-translate-x-1/2"
              />

              {PHASES.map((phase, index) => {
                const flip = index % 2 === 1;

                return (
                  <li
                    key={phase.title}
                    className="relative pl-[3rem] md:grid md:grid-cols-2 md:gap-x-[4rem] md:py-[1.25rem] md:pl-0"
                  >
                    <span
                      aria-hidden
                      className="absolute top-[0.1rem] left-[1.05rem] z-[1] flex h-[2.1rem] w-[2.1rem] -translate-x-1/2 items-center justify-center rounded-full border-2 border-[var(--od-violet)] bg-[var(--od-surface)] text-[var(--od-violet)] shadow-[0_0_0_4px_var(--od-band-soft)] md:top-[1.35rem] md:left-1/2"
                    >
                      {phase.icon}
                    </span>

                    <div
                      className={cn(
                        "md:col-start-1 md:row-start-1 md:pr-[4rem] md:text-right",
                        flip && "md:col-start-2 md:pl-[4rem] md:pr-0 md:text-left",
                      )}
                    >
                      <p
                        className={cn(
                          "flex flex-wrap items-center gap-x-[0.45rem] text-[0.6875rem] font-bold tracking-[0.1em] uppercase",
                          flip ? "md:justify-start" : "md:justify-end",
                        )}
                      >
                        <span className="text-[var(--od-violet)]">
                          Phase {String(index + 1).padStart(2, "0")}
                        </span>
                        <span aria-hidden className="text-[var(--od-muted)]">
                          ·
                        </span>
                        <span className="text-[var(--od-muted)]">{phase.when}</span>
                      </p>

                      <h4 className="mt-[0.35rem] text-[1.0625rem] leading-tight font-semibold text-[var(--od-ink)]">
                        {phase.title}
                      </h4>

                      <p className="mt-[0.4rem] text-[0.875rem] leading-relaxed text-[var(--od-body)]">
                        {phase.copy}
                      </p>
                    </div>

                    <div
                      className={cn(
                        "mt-[0.9rem] md:col-start-2 md:row-start-1 md:mt-0 md:pl-[4rem]",
                        flip && "md:col-start-1 md:ml-auto md:pl-0 md:pr-[4rem]",
                      )}
                    >
                      <PhotoFrame phase={phase} />
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* ---------------------------------------------------- the audit */}
          <div className="relative mt-[2.5rem] grid gap-[1.5rem] rounded-[0.9rem] border border-[var(--od-border)] bg-[var(--od-surface)] p-[1.5rem] lg:mt-[3rem] lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-[2.5rem] lg:p-[2rem]">
            <div>
              <p className="text-[0.6875rem] font-bold tracking-[0.14em] text-[var(--od-violet)] uppercase">
                The audit &amp; payout
              </p>

              <h3 className="od-h4 mt-[0.5rem]">
                Every item. Every price.
                <br className="hidden sm:block" /> Every receipt.
              </h3>

              <p className="mt-[0.75rem] text-[0.9375rem] leading-relaxed text-[var(--od-body)]">
                When the last lot closes, the paperwork is already done. One statement
                reconciles the whole job: what was packed, what sold, what it fetched, the
                fee we took and the money on its way to you. Every lot carries its sale
                receipt.
              </p>

              <ul className="mt-[1rem] space-y-[0.45rem]">
                {[
                  "An inventory line and photo for every item packed",
                  "The hammer price and receipt for every lot sold",
                  "A live view of every lot while the auction runs",
                  "Our fee calculated in the open, once",
                  "Your net payout and the date it lands",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-[0.5rem] text-[0.875rem] text-[var(--od-body)]"
                  >
                    <Check
                      size={15}
                      strokeWidth={2.5}
                      aria-hidden
                      className="mt-[0.15rem] shrink-0 text-[var(--od-violet)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-[1.25rem] flex flex-wrap items-center gap-x-[1rem] gap-y-[0.5rem]">
                <a href="#contact" className={odBtn}>
                  Request the full package
                </a>
                <span className="text-[0.75rem] text-[var(--od-muted)]">
                  One form. One walkthrough. Then it is ours to run.
                </span>
              </div>
            </div>

            <div>
              <SettlementCard />
              <p className="mt-[0.6rem] text-center text-[0.6875rem] leading-relaxed text-[var(--od-muted)]">
                Sample statement. A real one runs to every item packed and every lot sold.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
