"use client";

import { differenceInDays } from "date-fns";
import { ChevronDownIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { createBooking } from "../_lib/actions";
import { useReservation } from "./ReservationContext";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="border-l border-primary-800">
      <div className="flex items-center justify-between border-b border-primary-700 bg-primary-800 px-6 py-4 text-primary-300 sm:px-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-400">
            Booking as
          </p>
          <p className="mt-1 font-semibold text-primary-100">{user.name}</p>
        </div>

        <div className="flex items-center gap-3">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-10 w-10 rounded-full border-2 border-accent-400/50 object-cover"
            src={user.image}
            alt={user.name}
          />
        </div>
      </div>

      <form
        // action={createBookingWithData}
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="flex flex-col gap-6 bg-primary-900 px-6 py-8 text-lg sm:px-10 sm:py-10">
        <div className="space-y-2">
          <label
            htmlFor="numGuests"
            className="text-sm font-semibold text-primary-100">
            How many guests?
          </label>
          <div className="relative">
            <select
              name="numGuests"
              id="numGuests"
              className="w-full appearance-none rounded-sm border border-primary-700 bg-primary-800 px-4 py-3 pr-12 text-primary-100 shadow-sm transition-colors focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400/30"
              required>
              <option value="" key="">
                Select number of guests...
              </option>
              {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
            <ChevronDownIcon
              className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-300"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="observations"
            className="text-sm font-semibold text-primary-100">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="min-h-32 w-full resize-y rounded-sm border border-primary-700 bg-primary-800 px-4 py-3 text-primary-100 shadow-sm transition-colors placeholder:text-primary-500 focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400/30"
            placeholder="Pets, allergies, special requirements..."
          />
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-primary-800 pt-5 sm:flex-row sm:items-center">
          {!(startDate && endDate) ? (
            <p className="text-sm text-primary-400">
              Select your dates to unlock booking
            </p>
          ) : (
            <div className="flex w-full items-center justify-between gap-4 sm:w-auto">
              <p className="flex items-center gap-2 text-xs text-primary-400">
                <ShieldCheckIcon
                  className="h-5 w-5 text-accent-400"
                  aria-hidden="true"
                />
                Pay on arrival
              </p>
              <SubmitButton pendingLabel="Reserving...">
                Reserve now
              </SubmitButton>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
