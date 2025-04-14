export interface ServerToClientEvents { 
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    welcome: (arg: any) => void;
    workerCallback: (obj: CodeCallback) => void;
    codeResponse: (obj: CodeCallback) => void;
  }
  
export  interface ClientToServerEvents {
    hello: () => void;
    codeRequestQueue: (req: codeRequest) => void;
    welcome: (arg: any) => void;
    workerCallback: (obj: CodeCallback) => void;
    codeResponse: (obj: CodeCallback) => void;
  }
  
export  interface InterServerEvents {
    ping: () => void;
  }
  
export  interface SocketData {
    name: string;
    age: number;
  }

export  type codeRequest = {
    language: string;
    code: string;
    socketId: string;
    problemTitle: string;
    runnerType: string;
    submissionTime: Date;
    userId: string;
    problemURL: string;
    difficulty: string;
    topics: string[] | undefined;
  }

export type CodeCallback = {status: string, language: string, code: string, socketId: string,  problemTitle: string, runnerType: string, submissionTime: Date, userId: string, problemURL: string, difficulty: string, topics: string[] | undefined}

export type UserType = {
  id: string,
  name: string,
  email: string,
  acceptedEasy: number,
  acceptedMedium: number,
  acceptedHard: number,
  totalEasy: number,
  totalMedium: number,
  totalHard: number,
  totalSubmissions: number,
  acceptedSubmissions: number,
  duplicateAcceptedEasy: number,
  duplicateAcceptedMedium: number,
  duplicateAcceptedHard: number,
  duplicateTotalEasy: number,
  duplicateTotalMedium: number,
  duplicateTotalHard: number,
  duplicateTotalSubmissions: number,
  duplicateAcceptedSubmissions : number,
  points: number,
  currentStreak: number,
  maxStreak: number,
  activeDays: number,
  image: string,
  bio?: string,
  location?: string,
  skills: string[],
  socialHandles?: string[],
  personalProjects?: string[]
  portfolioLink?: string,
  Role?: string,
  education?: string,
  createdAt: Date
}
