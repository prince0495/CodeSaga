import ProblemTable from "@/components/ProblemTable";
import { globalPrismaClient } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/constants";

export type FilteredProblems = {
  id: string,
  title: string,
  difficulty: string,
  frequency: number,
  problemURL: string,
}
async function getFilteredProblems(currentPage: number, problemsPerPage: number) {
  try {
    const prisma = globalPrismaClient;
    const skipProblems = (currentPage-1)*(problemsPerPage);
    const problems = await prisma.problem.findMany(
        {
            skip: skipProblems,
            take: problemsPerPage,
            select: {
                id: true,
                title: true,
                difficulty: true,
                frequency: true,
                problemURL: true,                
            }
        }
    )
    return problems
  } catch (error) {
    alert('Either no internet or proxy on your internet, try again with different network')
    console.log(error);
    
    return []
  }
}

const ProblemPage = async({page}: {page: string}) => {
  console.log("page = ",page);
  const problemsPerPage = ITEM_PER_PAGE;
  const currentPage = parseInt(page)
  const problems: FilteredProblems[] = await getFilteredProblems(currentPage, problemsPerPage)

  // const totalPages = Math.ceil(problems.length*3 / problemsPerPage);
  
  const totalPages = 2

  return (
    <div className="w-full mx-auto p-3">
      {problems.length === 0 ? (
        <div className="space-y-4 mt-10npm">
          {[...Array(problemsPerPage)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse px-16 space-x-4 flex items-center gap-4 pb-3"
            >
              <div className="w-1/6 h-6 bg-[#303030] rounded"></div>
              <div className="w-1/3 h-6 bg-[#303030] rounded"></div>
              <div className="w-1/6 h-6 bg-[#303030] rounded"></div>
              <div className="w-1/6 h-6 bg-[#303030] rounded"></div>
              <div className="w-1/6 h-6 bg-[#303030] rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <ProblemTable
          problems={problems}
          currentPage={currentPage}
          totalPages={totalPages}
          problemsPerPage={problemsPerPage}
        />
      )}
    </div>
  )
}
export default ProblemPage
