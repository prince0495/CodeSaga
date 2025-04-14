"use client"
import { useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useUser } from "@/lib/store";
import Image from "next/image";

interface Friend {
  id: string;
  name: string;
  image: string;
  points: number;
  currentStreak: number;
  maxStreak: number;
}

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white shadow-lg rounded-lg p-4 ${className}`}>{children}</div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="border-b pb-2 mb-2">{children}</div>
);

const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`text-lg font-bold ${className}`}>{children}</h2>
);

const Avatar = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  // <img src={src} alt={alt} className={`rounded-full ${className}`} />
  <Image
    src={src}
    alt={alt}
    className={`rounded-full ${className}`}
    width={100}
    height={100}
  />
);

const RankingsPage = () => {
  const session = useSession()
  const userData = useUser(state=>state.userData)
  const setUserData = useUser(state=>state.setUserData)

  useEffect(() => {
    async function getData() {
      console.log('yes, session has user with userid');
      if(session.data?.user) {
          if(!userData) {
              // @ts-expect-error:Not able to tell ts compiler that i provided it at runtime while signin otherwise user cannot reach here
              const res = await axios.get(`/api/rankings/${session.data.user.id}`)
              console.log(res.data);
              if(res.data?.id) {
                  setUserData(res.data)
              }
          }
      }
    }
    getData()
  }, [session, userData, setUserData]);


  if (!userData) return (
    <div className="w-full h-full flex items-center justify-center">
        <video className="mt-[30vh]" autoPlay loop muted playsInline>
          <source src="/rankingsloading.webm" type="video/webm" />
      </video>
    </div>

  );

  const friends: Friend[] = [
    ...userData.friendsInitiated.map((f) => f.recipient),
    ...userData.friendsReceived.map((f) => f.requester),
  ];

  return (
    <div className="p-6 space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[userData, ...friends].map((friend) => (
          <Card key={friend.id} className="transition transform hover:scale-105 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center text-[#282828]">{friend.name}</CardTitle>
            </CardHeader>
            <div className="flex items-center gap-4 p-4">
              <Avatar src={friend.image} alt={friend.name} className="w-16 h-16" />
              <div>
                <p className="text-sm text-gray-600">Points: <span className="font-medium">{friend.points}</span></p>
                <p className="text-sm text-gray-600">Current Streak: <span className="font-medium">{friend.currentStreak}</span></p>
                <p className="text-sm text-gray-600">Max Streak: <span className="font-medium">{friend.maxStreak}</span></p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Daily Activity Chart */}
      <h2 className="text-2xl font-semibold text-center">Daily Activity (Last 7 Days)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={userData.dailyActivity.map((d) => ({ date: d.date, submissions: d.totalSubmissions }))}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="submissions" fill="#4f46e5" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {/* Monthly Activity Line Chart */}
      <h2 className="text-2xl font-semibold text-center">Monthly Activity Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={userData.monthlyActivity.map((m) => ({ date: m.date, submissions: m.dailyActivity.reduce((sum, d) => sum + d.totalSubmissions, 0) }))}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="submissions" stroke="#22c55e" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RankingsPage;