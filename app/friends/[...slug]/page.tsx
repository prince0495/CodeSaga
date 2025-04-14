import Navbar from "@/components/Navbar";
import PersonProfile from "@/components/PersonProfile";

const page = async(context: { params: Promise<{ slug?: string[] }> }) => {
  const { slug } = await context.params;
  if (!slug || slug.length === 0) {
      return null;
  }
  const personId = slug[0]
  return (
    <div>
      <Navbar compName="Friends" />
      <PersonProfile personId={personId} />
    </div>
  )
}

export default page
