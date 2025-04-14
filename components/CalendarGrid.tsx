"use client";

import { useCalendar } from "@/lib/store";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";


function getDaysInCurrentMonth() {
  const date = new Date();
  // Get the current month and year
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  
  // Set the date to the first day of the next month
  const nextMonth = new Date(currentYear, currentMonth + 1, 0);
  
  // The `getDate()` method returns the day of the month, which in this case is the number of days in the current month
  return nextMonth.getDate();
}

const CalendarGrid = () => {
  
  const days = getDaysInCurrentMonth()
  const session = useSession();
  const monthlySubmissionsMap = useCalendar((state) => state.monthlySubmissionsMap);
  const addMonthlySubmission = useCalendar((state) => state.addMonthlySubmission);

  const date = new Date();
  const monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    async function getMonthlyActivity() {
      if (session && session.data && session.data.user) {
        try {
          // @ts-expect-error
          const res = await axios.get(`/api/monthlyActivity/${session.data.user.id}`);
          if (res.data && res.data.dailyActivity) {
            for (const activity of res.data.dailyActivity) {
              const dateStr = new Date(activity.date).toISOString().split("T")[0];
              addMonthlySubmission(dateStr, activity.acceptedSubmissions);
            }
          }
        } catch (error) {
          console.error("Failed to fetch monthly activity:", error);
        }
      }
    }
    getMonthlyActivity();
  }, [session]);

  return (
    <div className="flex-col justify-center items-center w-full p-3 bg-[#1c1c1c] shadow-lg rounded-2xl max-w-lg">
      <div className="text-center text-3xl">{monthMap[date.getMonth()]}, {date.getFullYear()}</div>
      <div className="grid grid-cols-7 gap-3 p-3 rounded-2xl">
        {Array.from({ length: days }, (_, index) => {
          const day = index+1;
          const fullDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), day)).toISOString().split("T")[0];
          const isSubmitted = monthlySubmissionsMap[fullDate];

          return (
            <div
              key={index}
              className={`w-7 h-7 flex cursor-pointer items-center justify-center rounded-lg text-white text-lg font-bold transition-all duration-300 ${
                isSubmitted ? "bg-[#1E90FF] hover:bg-[#0096FF]" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;