import Navbar from "@/components/Navbar";
import PersonProfile from "@/components/PersonProfile";

const page = async({params}: any) => {
  const param = await params;
  const personId = param.slug[0]
  return (
    <div>
      <Navbar compName="Friends" />
      <PersonProfile personId={personId} />
    </div>
  )
}

export default page
