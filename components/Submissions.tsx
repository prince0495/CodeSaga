"use client";

import { useEffect, useState, useCallback } from "react";
import ProblemNavbar from "./ProblemNavbar";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useCodeStore } from "@/lib/store";
import dayjs from "dayjs";
import { CodeCallback } from "@/lib/types";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-700 ${className}`} />
);

const Alert = ({ children, variant }: { children: React.ReactNode; variant?: "destructive" | "default" }) => (
  <div className={`p-4 rounded-lg ${variant === "destructive" ? "bg-red-600" : "bg-gray-700"}`}>
    {children}
  </div>
);

type SubmissionType = {
  code: string,
  status: string,
  submittedAt: string,
  language: string
}

const Submissions = ({ problemURL }: { problemURL: string }) => {
  const { data: session } = useSession();
  const currentLanguage = useCodeStore((state) => state.userCodeLanguage);
  const [submissions, setSubmissions] = useState<SubmissionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    if (!session?.user) return;
    setLoading(true);
    setError(null);

    try {
      // @ts-ignore
      const res = await axios.get(`/api/submissions/${session.user.id}/${currentLanguage}/${problemURL}`);
      setSubmissions(res.data || []);
      console.log(res.data);
      
    } catch (err) {
      setError("Failed to load submissions. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [session?.user, currentLanguage]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  return (
    <div className="bg-[#262626] overflow-auto min-h-[83vh] rounded-lg relative">
      <ProblemNavbar problemURL={problemURL} />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Your Submissions</h2>

        {loading ? (
          <Skeleton className="w-full h-20 rounded-lg" />
        ) : error ? (
          <Alert variant="destructive">
            <p className="text-white">{error}</p>
          </Alert>
        ) : submissions.length === 0 ? (
          <p className="text-gray-400">No submissions found.</p>
        ) : (
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-gray-800 text-gray-400">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Submitted At</th>
                  <th className="p-3">Language</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-700 cursor-pointer hover:bg-gray-800"
                    onClick={() => setSelectedSubmission(submission.code)}
                  >
                    <td className="p-3">{index+1}</td>
                    <td className={`p-3 font-medium ${submission.status.includes("Accepted") ? "text-green-500" : "text-red-500"}`}>
                      {submission.status.includes('Compilation Error') ? 'Compilation Error' : submission.status.includes('Runtime Error') ? 'Runtime Error': submission.status}
                    </td>
                    <td className="p-3">{dayjs(submission.submittedAt).format("MMM D, YYYY")}</td>
                    <td className="p-3">{submission.language}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Code Modal */}
      {/* {selectedSubmission && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedSubmission(null)}
        >
          <div
            className="bg-gray-900 p-6 rounded-lg w-full max-w-3xl relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-2 right-2 text-white text-lg" onClick={() => setSelectedSubmission(null)}>
              ✕
            </button>
            <h3 className="text-lg font-semibold text-white mb-4">Submission Code</h3>
            <pre className="bg-gray-800 p-4 rounded-lg text-gray-300 overflow-auto max-h-[70vh] whitespace-pre-wrap break-words">
              <code>{selectedSubmission}</code>
            </pre>
          </div>
        </div>
      )} */}
      {selectedSubmission && (
  <div
    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
    onClick={() => setSelectedSubmission(null)}
  >
    <div
      className="bg-gray-900 p-6 rounded-lg w-full max-w-3xl relative shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="absolute top-2 right-2 text-white text-lg"
        onClick={() => setSelectedSubmission(null)}
      >
        ✕
      </button>
      <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold text-white mb-4">Submission Code</h3>
      <div>

      <button
          className="mb-4 mr-3 text-white text-sm bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
          onClick={() => {
            navigator.clipboard.writeText(selectedSubmission);
          }}
        >
          📋 Copy
        </button>
            </div>
      </div>

      <div className="relative">
        <pre className="bg-gray-800 p-4 rounded-lg text-gray-300 overflow-auto max-h-[70vh] whitespace-pre-wrap break-words">
          <code>{selectedSubmission}</code>
        </pre>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Submissions;
