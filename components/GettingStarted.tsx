"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const features = [
  { title: "Interactive Playground", description: "Test your code in real-time with our interactive coding environment." },
  { title: "Compete with Friends", description: "Challenge your friends and climb the leaderboard together." },
  { title: "Daily Challenges", description: "Sharpen your skills with new problems every day." },
  { title: "Topic-Based Problems", description: "Focus on specific data structures and algorithms." },
  { title: "Submission History", description: "Track your progress and learn from past submissions." },
  { title: "Company-Specific Questions", description: "Practice questions asked by top tech companies." }
];

const faqs = [
  { question: "How does ranking work?", answer: "Ranking is based on the number of problems solved and submission accuracy." },
  { question: "What languages are supported?", answer: "We support multiple programming languages including Java and Cpp." },
  { question: "How can I see my progress?", answer: "You can monitor your progress on your profile page." }
];

const GettingStarted = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const translateX = useTransform(mouseX, [-window.innerWidth / 2, window.innerWidth / 2], [30, -30]);
  const translateY = useTransform(mouseY, [-window.innerHeight / 2, window.innerHeight / 2], [30, -30]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX - window.innerWidth / 2);
      mouseY.set(event.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative min-h-screen text-white flex flex-col items-center px-8 py-12 overflow-hidden">
      {/* Animated Background Grid */}
      <motion.div
        className="absolute inset-0 -z-10 bg-grid-dark opacity-60"
        style={{ x: translateX, y: translateY }}
      ></motion.div>

      {/* Hero Section */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Master Coding Challenges, Level Up Your Skills!
        </h1>
        <p className="text-xl text-gray-400 mb-6">
          Solve problems, compete with friends, and track your progress on the ultimate coding platform.
        </p>
        <Link href="/problems">
          <motion.button whileHover={{ scale: 1.1 }} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold">
            Get Started
          </motion.button>
        </Link>
      </motion.div>

      {/* Quick Start Guide */}
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl">
        {["Sign Up/Login", "Pick a Problem", "Write Code", "Submit & Track"].map((step, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(0, 153, 255, 0.6)" }}
            className="p-6 rounded-xl bg-[#222222] text-center shadow-lg transition-all"
          >
            <h3 className="text-2xl font-semibold">{step}</h3>
          </motion.div>
        ))}
      </div>

      {/* Features Section */}
      <div className="mt-16 w-full max-w-7xl text-center">
        <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
        <p className="text-gray-400 text-lg mb-8">
          Our platform provides a seamless experience for learning and competing.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.4)" }}
              className="p-6 rounded-xl bg-[#181818] text-center shadow-lg border border-gray-700 transition-all"
            >
              <h3 className="text-2xl font-semibold text-blue-400">{feature.title}</h3>
              <p className="text-gray-400 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 w-full max-w-7xl">
        <h2 className="text-4xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.3)" }}
              className="bg-[#222222] p-6 rounded-xl shadow-lg cursor-pointer border border-gray-700 transition-all"
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
            >
              <h3 className="text-2xl font-semibold flex justify-between">
                {faq.question}
                <span>{openFAQ === index ? "−" : "+"}</span>
              </h3>
              {openFAQ === index && <p className="text-gray-400 mt-2">{faq.answer}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;