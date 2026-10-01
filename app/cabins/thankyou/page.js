import Link from "next/link";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Reservation confirmed",
};

export default function Page() {
  return (
    <div className="relative isolate overflow-hidden py-8 sm:py-14">
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-accent-500/10 blur-3xl" />

      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-accent-400/40 bg-accent-500/10 text-accent-400 shadow-2xl shadow-accent-950/30">
          <CheckCircleIcon className="h-11 w-11" aria-hidden="true" />
        </div>

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-accent-400">
          Reservation confirmed
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-primary-50 sm:text-6xl">
          Your escape is officially in the wild.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-primary-200 sm:text-xl">
          Thank you for booking with us! The mountains are already making room,
          the hot tub is warming up, and absolutely nobody will judge you for
          taking a nap before lunch.
        </p>

        <div className="mx-auto mt-10 grid max-w-2xl gap-px overflow-hidden border border-primary-800 bg-primary-800 text-left sm:grid-cols-2">
          <div className="bg-primary-900/80 p-6">
            <CalendarDaysIcon
              className="mb-4 h-7 w-7 text-accent-400"
              aria-hidden="true"
            />
            <h2 className="font-semibold text-primary-50">
              Your plans are safe
            </h2>
            <p className="mt-2 text-sm leading-6 text-primary-300">
              Find every booking, date, and detail in your reservations area.
            </p>
          </div>
          <div className="bg-primary-900/80 p-6">
            <HomeModernIcon
              className="mb-4 h-7 w-7 text-accent-400"
              aria-hidden="true"
            />
            <h2 className="font-semibold text-primary-50">
              Next stop: paradise
            </h2>
            <p className="mt-2 text-sm leading-6 text-primary-300">
              Pack something cozy. The Dolomites have excellent views and zero
              interest in your inbox.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/account/reservations"
            className="inline-flex w-full items-center justify-center gap-2 bg-accent-500 px-7 py-4 font-semibold text-primary-900 transition-colors hover:bg-accent-400 sm:w-auto">
            Manage my reservations
            <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link
            href="/cabins"
            className="inline-flex w-full items-center justify-center border border-primary-700 px-7 py-4 font-semibold text-primary-100 transition-colors hover:border-accent-400 hover:text-accent-300 sm:w-auto">
            Browse more cabins
          </Link>
        </div>
      </div>
    </div>
  );
}
