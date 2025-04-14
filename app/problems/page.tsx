import CalendarGrid from "@/components/CalendarGrid"
import CompanyTags from "@/components/CompanyTags";
import Navbar from "@/components/Navbar"
import ProblemPage from "@/components/ProblemsPage";
import ProgressCircle from "@/components/ProgressCircle";

// const page = async({searchParams}: { searchParams: { [key: string]: string | undefined } }) => {
  const page = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {
  const query = await searchParams;
  const page = query?.page ?? '1';
  return (
    <div className="flex-col">
        <Navbar compName="problems" />
        <div className="w-full flex flex-col cmd-8:flex-row">
          {/* Left */}
          <div className="w-full lg:w-9/12">
            <ProblemPage page={page} />
          </div>
          {/* Right */}
          <div className="w-full  lg:w-3/12 flex flex-col justify-start items-center p-3 gap-5">
            <CalendarGrid/>
            <ProgressCircle/>
            <CompanyTags/>
            {/* <TestingAddProblem/> */}
          </div>
        </div>
    </div>
  )
}

export default page