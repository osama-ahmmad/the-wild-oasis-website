"use client";

import {
  differenceInDays,
  isBefore,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to }),
    )
  );
}

function normalizeRange(range) {
  if (!range?.from || !range?.to || isBefore(range.from, range.to)) {
    return range;
  }

  return { from: range.to, to: range.from };
}

function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const { regularPrice, discount } = cabin;
  const numNights =
    displayRange.from && displayRange.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings;
  const minimumNights = Math.max(1, minBookingLength);

  return (
    <div className="flex flex-col justify-between bg-primary-950">
      <div className="border-b border-primary-800 px-6 pb-2 pt-6 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
            <CalendarDaysIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="font-semibold text-primary-100">Choose your dates</p>
            <p className="text-sm text-primary-400">
              Select at least {minimumNights} night
              {minimumNights === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      </div>
      <DayPicker
        className="booking-calendar place-self-center px-4 pb-8 pt-8 sm:px-8"
        mode="range"
        min={minimumNights}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        onSelect={(nextRange) => setRange(normalizeRange(nextRange))}
        selected={displayRange}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex min-h-[88px] flex-wrap items-center justify-between gap-4 bg-accent-500 px-6 py-4 text-primary-800 sm:px-8">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-semibold">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-semibold">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="rounded-sm bg-accent-600 px-3 py-2 text-xl font-semibold">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-xs font-bold uppercase tracking-wider">
                  Total
                </span>{" "}
                <span className="text-xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent-600"
            onClick={resetRange}>
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
