import { BadgeCheck, Star } from "lucide-react";
import { MOSAIC_PHOTOS } from "@/data/mosaic-photos";
import { Container, Doodle } from "./bits";

/*
 * Social proof in odoo.com's two shapes.
 *
 * The users band is a wall of 80px tiles with a white pill floating over the
 * middle of it: an h6 in display-2, the word "happy" lifted above the line
 * beside a circular doodled arrow, and the rest of the sentence at fs-4.
 *
 * The testimonial band opens with Odoo's grey looped arrow (150px, turned
 * 350deg, pulled up 3rem and in from the right 4rem), then the quote icon and
 * a 0.75rem grey card in two columns.
 *
 * The tiles are the things that come out of the deals — a unit, a property, an
 * estate lot, a scrap run — drawn as real photographs of the appliances,
 * furniture, tools and vehicles that fill them, cropped square so a mixed set
 * reads as one wall.
 */

const MOSAIC_TINTS = [
  "var(--od-tile-1)",
  "var(--od-tile-2)",
  "var(--od-tile-3)",
  "var(--od-tile-4)",
  "var(--od-tile-5)",
  "var(--od-tile-6)",
  "var(--od-tile-7)",
  "var(--od-tile-8)",
];

/** The wall cycles the photographs in file order. */
const PHOTOS = Object.values(MOSAIC_PHOTOS);

const TILE_SHAPES = ["rounded-full", "rounded-[38%]", "rounded-[0.5rem]"];

/** 80px tiles, four to seven per row, centred under the white pill. */
function Mosaic() {
  const cells = Array.from({ length: 35 }, (_, i) => i);

  return (
    <div className="od-mosaic flex flex-wrap justify-between" aria-hidden>
      {cells.map((i) => {
        const photo = PHOTOS[i % PHOTOS.length];
        return (
          <div
            key={i}
            className={`flex h-20 w-20 items-center justify-center overflow-hidden md:m-[0.75rem] m-[0.25rem] ${TILE_SHAPES[i % TILE_SHAPES.length]}`}
            style={{ backgroundColor: MOSAIC_TINTS[i % MOSAIC_TINTS.length] }}
          >
            <img
              src={photo.src}
              alt=""
              width={480}
              height={480}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}

/**
 * The breather Odoo puts between the features band and the users wall: nothing
 * but `arrow_doodle_4` at 120px, turned 340deg and pulled up 3rem.
 */
export function ArrowBand() {
  return (
    <section className="hidden md:block">
      <Container>
        <Doodle
          src="/img/odoo/arrow_doodle_4.svg"
          width={120}
          className="-mt-[3rem] mb-[1.5rem] rotate-[340deg]"
        />
      </Container>
    </section>
  );
}

export function UsersBand() {
  return (
    <section>
      <Container className="relative min-h-[20rem]">
        {/* the white pill, centred over the wall at z-1 */}
        <div className="absolute inset-0 z-[1] flex items-center justify-center">
          <div className="rounded-[50rem] bg-[var(--od-surface)] px-[4rem] py-[4rem] text-center lg:px-[8rem]">
            <h6 className="od-d2 relative mb-[0.5rem]">
              Join owners{" "}
              <span className="od-sup hidden md:inline">
                <Doodle
                  src="/img/odoo/arrow_circular_down_left.svg"
                  width={37}
                  height={40}
                  className="me-[0.5rem] -ms-[0.5rem] mt-[1.5rem] inline-block"
                />
                happy
              </span>{" "}
              to hand it over
            </h6>
            <span className="text-[1.5rem]">
              units, houses and estates handled with Stuffout
            </span>
          </div>
        </div>

        <Mosaic />
      </Container>
    </section>
  );
}

/**
 * Four and a half gold stars, drawn rather than typed: four full stars and a
 * fifth clipped at 50%, with the half clearly readable behind the rating.
 */
function Stars({ rating = 4.5 }: { rating?: number }) {
  return (
    <span
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className="inline-flex items-center gap-[0.15rem]"
    >
      {[0, 1, 2, 3, 4].map((index) => {
        const fill = Math.max(0, Math.min(1, rating - index));

        return (
          <span key={index} className="relative inline-block h-[1.1rem] w-[1.1rem]">
            <Star
              size={18}
              strokeWidth={1.5}
              aria-hidden
              className="absolute inset-0 text-[rgba(251,177,48,0.45)]"
            />
            {fill > 0 && (
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star
                  size={18}
                  strokeWidth={1.5}
                  fill="currentColor"
                  className="text-[var(--od-gold)]"
                />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

export function TestimonialBand() {
  return (
    <section className="pb-[2rem] lg:pb-[3rem]">
      <Container>
        <Doodle
          src="/img/odoo/grey_arrow_loop_02.svg"
          width={150}
          className="ms-auto me-[4rem] -mt-[3rem] mb-[2rem] hidden rotate-[350deg] md:block"
        />

        <div className="relative mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[1rem] border border-[var(--od-border)] bg-[var(--od-surface)] p-[1.5rem] shadow-[0_1px_2px_rgba(23,16,43,0.05),0_2rem_4rem_-2.5rem_rgba(45,20,90,0.3)] md:p-[2.5rem] lg:p-[3rem]">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-[7rem] -right-[5rem] h-[16rem] w-[16rem] rounded-full bg-[radial-gradient(circle,rgba(251,177,48,0.16),transparent_70%)]"
            />
            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-[0.75rem]">
                <div className="flex items-center gap-[0.6rem]">
                  <Stars rating={4.5} />
                  <span className="text-[0.875rem] font-bold text-[var(--od-ink)]">4.5</span>
                  <span className="text-[0.75rem] text-[var(--od-muted)]">out of 5</span>
                </div>

                <span className="inline-flex items-center gap-[0.35rem] rounded-full bg-[var(--od-tone-violet-bg)] px-[0.75rem] py-[0.3rem] text-[0.625rem] font-bold tracking-[0.1em] text-[var(--od-tone-violet-fg)] uppercase">
                  <BadgeCheck size={13} aria-hidden /> Verified customer
                </span>
              </div>

              <blockquote className="mt-[1.5rem]">
                <p className="text-[1.25rem] leading-[1.45] font-semibold text-[var(--od-ink)] md:text-[1.625rem]">
                  “I had a mother's house and a closing date, and no idea what to do with
                  everything inside. They cleared it for free, sold what was worth selling,
                  and sent me most of the proceeds.”
                </p>
              </blockquote>

              <div className="mt-[1.5rem] flex flex-wrap items-center justify-between gap-[1rem] border-t border-[var(--od-border)] pt-[1.25rem]">
                <div className="flex items-center gap-[0.75rem]">
                  <span
                    aria-hidden
                    className="flex h-[2.75rem] w-[2.75rem] shrink-0 items-center justify-center rounded-full bg-[var(--od-violet-solid)] text-[0.875rem] font-bold tracking-wide text-white"
                  >
                    DA
                  </span>
                  <span>
                    <span className="block text-[0.9375rem] font-bold text-[var(--od-ink)]">
                      Dana Alvarez
                    </span>
                    <span className="block text-[0.8125rem] text-[var(--od-muted)]">
                      Probate executor
                    </span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-[0.6rem]">
                  <span className="rounded-full border border-[var(--od-border)] bg-[var(--od-band-soft)] px-[0.7rem] py-[0.3rem] text-[0.6875rem] font-semibold text-[var(--od-body)]">
                    Estate clearance
                  </span>
                  <span className="text-[0.625rem] font-bold tracking-[0.12em] text-[var(--od-muted)] uppercase">
                    Alvarez Estate
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
