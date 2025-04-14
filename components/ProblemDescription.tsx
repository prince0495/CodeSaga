import Image from "next/image"

const ProblemDescription = ({description, imgSrc}: {description: string[], imgSrc: string | null}) => {
  return (
    <div className="flex flex-col gap-5">
        <div className='text-lg flex flex-col gap-4'>
            {description.map((description, index) => (
                <div key={index}> {description }</div>
            ))}
        </div>
        {imgSrc && 
          <div>
            <Image src={imgSrc} alt="Img" width={400} />
          </div>
        }
    </div>
  )
}

export default ProblemDescription
