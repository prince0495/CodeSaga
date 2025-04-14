const CompanyTags = () => {
  return (
    <div className="w-full p-3 bg-[#1c1c1c] shadow-lg rounded-2xl grid grid-cols-2 gap-2 text-[#eaeaea] ">
        <div className="p-3 bg-[#303030] rounded-xl flex items-center justify-between cursor-pointer">
            <div>Amazon</div>
            <div className="bg-[#ffa500] w-2/5 text-center rounded-xl">23</div>
        </div>
        <div className="p-3 bg-[#303030] rounded-xl flex items-center justify-between cursor-pointer">
            <div>LinkedIn</div>
            <div className="bg-[#ffa500] w-2/5 text-center rounded-xl">13</div>
        </div>
        <div className="p-3 bg-[#303030] rounded-xl flex items-center justify-between cursor-pointer">
            <div>Facebook</div>
            <div className="bg-[#ffa500] w-2/5 text-center rounded-xl">19</div>
        </div>
    </div>
  )
}

export default CompanyTags
