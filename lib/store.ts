import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CodeCallback, UserType } from "./types";
import { acceptanceRateProp } from "@/components/ProblemTable";
import { NotificationType } from "@/components/NotificationTab";

type CodeSnippet = {
  language: string;
  code: string;
};

// Now each snippet key can have multiple language-specific codes
type SnippetsRecord = Record<string, Record<string, CodeSnippet>>;

type CodeStore = {
  snippets: SnippetsRecord;
  userCodeLanguage: string;
  addSnippet: (key: string, language: string, snippet: CodeSnippet) => void;
  updateSnippet: (key: string, language: string, snippet: CodeSnippet) => void;
  removeSnippet: (key: string, language?: string) => void;
  clearSnippets: () => void;
  setUserCodeLanguage: (language: string) => void
};


// Create Zustand store with persistence
const useCodeStore = create<CodeStore>()(
  persist(
    (set) => ({
      snippets: {},
      userCodeLanguage: 'java',
      setUserCodeLanguage: (language: string) => (set((state)=> ({
        userCodeLanguage: language
      }))),
      // Add snippet for a specific key and language
      addSnippet: (key, language, snippet) =>
        set((state) => ({
          snippets: {
            ...state.snippets,
            [key]: {
              ...state.snippets[key], // Keep existing languages under the same key
              [language]: snippet, // Add or overwrite this specific language
            },
          },
        })),

      // Replace a snippet fully for a specific key and language
      updateSnippet: (key, language, snippet) =>
        set((state) => {
          
          if (!state.snippets[key]?.[language]) return state; // Do nothing if key or language doesn't exist
          return {
            snippets: {
              ...state.snippets,
              [key]: {
                ...state.snippets[key],
                [language]: snippet, // Replace only this language snippet
              },
            },
          };
        }),

      // Remove a snippet by key and optional language
      removeSnippet: (key, language) =>
        set((state) => {
          if (!state.snippets[key]) return state; // Key doesn't exist

          const newSnippets = { ...state.snippets };

          if (language) {
            // Remove only the specific language version
            delete newSnippets[key][language];

            // If no languages remain under this key, delete the key
            if (Object.keys(newSnippets[key]).length === 0) {
              delete newSnippets[key];
            }
          } else {
            // Remove the entire snippet key
            delete newSnippets[key];
          }

          return { snippets: newSnippets };
        }),

      clearSnippets: () => set({ snippets: {} }),
    }),
    {
      name: "problem-code-snippets-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

type RunCallbackState = {
  runResponse: CodeCallback | null;
  responseLoading: boolean;
}
type RunCallbackAction = {
  updateRunResponse: (obj: CodeCallback | null)=> void;
  updateResponseLoading: (flag: boolean) => void;
}

const useRunCallbackStore = create<RunCallbackState & RunCallbackAction>()((set)=> ({
  runResponse: null,
  responseLoading: false,
  updateRunResponse: (obj: CodeCallback | null ) => set({runResponse: obj}),
  updateResponseLoading: (flag: boolean) => set({responseLoading: flag})
}))

type problemsStatusType = Set<string>;
type acceptanceRateMapType = Record<string, acceptanceRateProp>
type problemsDifficultyMap = Record<string, string>

type ProblemsDataState = {
  problemsStatus: problemsStatusType,
  acceptanceRateMap: acceptanceRateMapType,
  problemsDifficultyMap: problemsDifficultyMap
}
type ProblemsDataAction = {
  setProblemsStatus: (obj: Set<string>) => void,
  addAcceptanceRate: (key: string, value: acceptanceRateProp) => void,
  addProblemsDifficulty: (key: string, value: string) => void,
}

const useProblemsData = create<ProblemsDataState & ProblemsDataAction>()((set)=> ({
  problemsStatus: new Set<string>(),
  acceptanceRateMap: {},
  problemsDifficultyMap: {},
  setProblemsStatus: (obj: Set<string>) => set({problemsStatus: obj}),
  addAcceptanceRate: (key: string, value: acceptanceRateProp) => set(state=> ({
    acceptanceRateMap: {
      ...state.acceptanceRateMap,
      [key]: value
    }
  })),
  addProblemsDifficulty: (key: string, value: string) => set(state=>({
    problemsDifficultyMap: {
      ...state.problemsDifficultyMap,
      [key]: value
    }
  }))
}))

type monthlySubmissionsMapType = Record<string, number>

type CalendarState = {
  monthlySubmissionsMap: monthlySubmissionsMapType
}
type CalendarAction = {
  addMonthlySubmission: (key: string, value: number) => void
}

const useCalendar = create<CalendarState & CalendarAction>()((set)=> ({
  monthlySubmissionsMap: {},
  addMonthlySubmission: (key: string, value: number) => set((state)=> ({
    monthlySubmissionsMap: {
      ...state.monthlySubmissionsMap,
      [key]: value
    }
  }))

}))

export type DailyActivityType = {
  acceptedSubmissions: number,
  totalSubmissions: number,
  date: Date
} 
export type MonthlyActivitytype = {
  dailyActivity: DailyActivityType[]
}

type FriendProps = {
  name: string,
  image: string
}

export type FilterUserType = {
  id: string,
  name: string,
  image: string
}

export type FriendsMap = Record<string, FriendProps>;


interface FriendDataType {
  id: string;
  name: string;
  image: string;
  points: number;
  currentStreak: number;
  maxStreak: number;
}

interface UserDataType {
  id: string;
  name: string;
  image: string;
  points: number;
  currentStreak: number;
  maxStreak: number;
  friendsInitiated: { recipient: FriendDataType }[];
  friendsReceived: { requester: FriendDataType }[];
  dailyActivity: { date: string; totalSubmissions: number }[];
  monthlyActivity: { date: string; dailyActivity: { totalSubmissions: number }[] }[];
}

type UserState = {
  user: UserType | null,
  monthlyActivity: MonthlyActivitytype | null,
  friends: FriendsMap,
  allUsers: FilterUserType[] | null,
  friendRequests: FriendsMap,
  userData: UserDataType | null,
  notifications: NotificationType[] | null,
}
type UserAction = {
  setUser: (obj: UserType) => void,
  setMonthlyActivity: (obj: MonthlyActivitytype) => void,
  addFriends: (key: string, value: FriendProps) => void,
  setAllUsers: (obj: FilterUserType[]) => void,
  addFriendRequest: (key: string, value: FriendProps) => void,
  deleteFriendRequest: (key: string) => void,
  deleteFriend: (key: string) => void,
  setUserData: (obj: UserDataType) => void,
  setNotifications: (obj: NotificationType[]) => void,
  setUserImage: (imageURL: string) => void,
  setUserDataImage: (imageURL: string) => void,
}

const useUser = create<UserState & UserAction>()((set)=>({
  user: null,
  monthlyActivity: null,
  friends: {},
  allUsers: null,
  friendRequests: {},
  userData: null,
  notifications: null,
  setUser: (obj: UserType) => set(state => ({
    user: obj
  })),
  setUserImage: (imageURL: string) => set((state) => {
    if (!state.user) return {};
    return {
      user: {
        ...state.user,
        image: imageURL,
      },
    };
  }),
  setUserDataImage: (imageURL: string) => set((state) => {
    if(!state.userData) return {};
    return {
      userData: {
        ...state.userData,
        image: imageURL,
      }
    }
  }),
  setMonthlyActivity: (obj: MonthlyActivitytype) => set(state=> ({
    monthlyActivity: obj
  })),
  addFriends: (key: string, value: FriendProps) => set(state=> ({
    friends: {
      ...state.friends,
      [key]: value
    }
  })),
  setAllUsers: (obj: FilterUserType[]) => set(state=> ({
    allUsers: obj
  })),
  addFriendRequest: (key: string, value: FriendProps) => set(state=> ({
    friendRequests: {
      ...state.friendRequests,
      [key]: value
    }
  })),
  deleteFriendRequest: (key: string) => set((state) => {
    const updatedRequests = { ...state.friendRequests };
    delete updatedRequests[key];
    return { friendRequests: updatedRequests };
  }),
  deleteFriend: (key: string) => set((state) => {
    const updatedFriends = { ...state.friends };
    delete updatedFriends[key];
    return { friends: updatedFriends };
  }),
  setUserData: (obj: UserDataType) => set(state=> ({
    userData: obj
  })),
  setNotifications: (obj: NotificationType[]) => set(state=> ({
    notifications: obj
  }))
}))

export { useCodeStore, useRunCallbackStore, useProblemsData, useCalendar, useUser };