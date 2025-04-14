"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import clsx from "clsx";
import { UserType } from "@/lib/types";

interface DailyActivity {
  acceptedSubmissions: number;
  totalSubmissions: number;
  date: string;
}

interface MonthlyActivity {
  dailyActivity?: DailyActivity[];
}

const getColor = (accepted: number, total: number) => {
  if (total === 0) return "bg-[#393939]";
  const ratio = accepted / total;
  if (ratio === 1) return "bg-green-500";
  if (ratio >= 0.75) return "bg-green-400";
  if (ratio >= 0.5) return "bg-green-300";
  if (ratio >= 0.25) return "bg-green-200";
  return "bg-green-100";
};

const PersonYearlySubmissions = ({person}: {person: UserType | null}) => {
  const [data, setData] = useState<(MonthlyActivity | null)[]>(Array(12).fill(null));
  const [hoveredDay, setHoveredDay] = useState<{ day: number; monthIndex: number; activity?: DailyActivity } | null>(null);
  const currentYear = dayjs().year();
  const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format("MMM"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (person && person?.id) {
          const response = await fetch("/api/activity/yearly/" + person.id);
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [person]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">{currentYear} submissions in the past one year</h2>
        <div className="text-sm text-gray-400">Total active days: {person?.activeDays} &nbsp; Max streak: {person?.currentStreak !== undefined && person.maxStreak !== undefined ? (person.currentStreak > person.maxStreak ? person.currentStreak : person.maxStreak) : ''}</div>
      </div>
      <div className="flex items-center gap-2">
        {months.map((month, monthIndex) => {
          const daysInMonth = dayjs(`${currentYear}-${monthIndex + 1}-01`).daysInMonth();
          const monthData = data[monthIndex]?.dailyActivity || [];
          const activityMap = new Map(monthData.map((d) => [dayjs(d.date).date(), d]));

          return (
            <div key={month} className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">{month}</span>
              <div className="grid grid-cols-6 gap-1">
                {Array.from({ length: daysInMonth }, (_, day) => {
                  const activity = activityMap.get(day + 1);
                  return (
                    <div
                      key={day}
                      className={clsx(
                        "w-2.5 h-2.5 rounded-sm relative cursor-pointer",
                        activity ? getColor(activity.acceptedSubmissions, activity.totalSubmissions) : "bg-[#393939]"
                      )}
                      onMouseEnter={() => setHoveredDay({ day: day + 1, monthIndex, activity })}
                      onMouseLeave={() => setHoveredDay(null)}
                    >
                      {hoveredDay?.day === day + 1 && hoveredDay?.monthIndex === monthIndex && hoveredDay.activity && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md z-10 whitespace-nowrap">
                          Accepted: {hoveredDay.activity.acceptedSubmissions} / Total: {hoveredDay.activity.totalSubmissions}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonYearlySubmissions;
