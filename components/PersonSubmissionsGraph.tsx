'use client';

import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import { MonthlyActivitytype } from '@/lib/store';
import { UserType } from '@/lib/types';

interface ActivityData {
  date: string;
  totalSubmissions: number;
  acceptedSubmissions: number;
}

export default function PersonSubmissionsGraph({person}: {person: UserType | null}) {
  const [hoveredData, setHoveredData] = useState<ActivityData | null>(null);
  const [monthlyActivity, setMonthlyActivity] = useState<MonthlyActivitytype | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        if (person && !monthlyActivity) {
          const response = await fetch(`/api/activity/monthly/${person.id}`);
          const result = await response.json();
          if (result?.dailyActivity) {
            setMonthlyActivity(result);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [person]);

  const todayData = monthlyActivity?.dailyActivity ? monthlyActivity.dailyActivity[monthlyActivity.dailyActivity.length - 1] : null;
  const currentDate = new Date();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <div className="p-4 rounded-lg shadow-lg text-[#bdbfc2] bg-[#282828] w-full lg:w-1/2">
      {monthlyActivity?.dailyActivity ? (
        <>
          <div className="text-center mb-2">
            <p className="text-lg font-bold">
              {hoveredData
                ? `${dayjs(hoveredData.date).format('MMM DD')}, ${year}`
                : `${monthName} ${currentDate.getDate()}, ${year}`}
            </p>
            <p>Total Submissions: {hoveredData ? hoveredData.totalSubmissions : todayData?.totalSubmissions ?? 0}</p>
            <p>Accepted Submissions: {hoveredData ? hoveredData.acceptedSubmissions : todayData?.acceptedSubmissions ?? 0}</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={monthlyActivity.dailyActivity}
              onMouseMove={(e) => setHoveredData(e.activePayload?.[0]?.payload || null)}
              onMouseLeave={() => setHoveredData(null)}
            >
              <XAxis dataKey="date" tickFormatter={(tick) => dayjs(tick).format('MMM DD')} stroke="#ddd" />
              <YAxis stroke="#ddd" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="totalSubmissions" stroke="#8884d8" fill="#8884d8" opacity={0.6} />
              <Area type="monotone" dataKey="acceptedSubmissions" stroke="#82ca9d" fill="#82ca9d" opacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </>
      ) : (
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-[#303030] rounded w-1/3 mx-auto"></div>
          <div className="h-4 bg-[#303030] rounded w-1/2 mx-auto"></div>
          <div className="h-48 bg-[#303030] rounded"></div>
        </div>
      )}
    </div>
  );
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { payload: ActivityData }[] }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-2 rounded-lg text-white shadow-md">
        <p className="font-bold">{dayjs(payload[0].payload.date).format('MMM DD')}</p>
        <p>Total Submissions: {payload[0].payload.totalSubmissions}</p>
        <p>Accepted Submissions: {payload[0].payload.acceptedSubmissions}</p>
      </div>
    );
  }
}
