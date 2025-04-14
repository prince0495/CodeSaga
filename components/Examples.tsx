import { Example } from "@prisma/client"
import Image from "next/image"

const Examples = ({examples} : {examples: Example[]}) => {
    
  return (
    <div className="flex flex-col gap-6">
        {examples.map((example, index) => (
            <div key={index} className="flex flex-col gap-4">
                <div className="text-xl font-bold">
                    Example {index+1} :
                </div>
                {example.imgSrc && (
                    <div>
                        <Image src={example.imgSrc} width={500} alt="Example Img" />
                    </div>
                )}
                <div className="flex flex-col gap-1">
                    <div className="flex gap-4 font-semibold">
                        <div className="text-xl">Input:</div>
                        <div className="text-[#a8a8a8] text-lg">
                            {example.input.map((input, index)=> (
                                <span key={index}>{input}{index !== example.input.length-1 ? ', ' : '' }</span>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-4 font-semibold">
                        <div className="text-xl">Output:</div>
                        <div className="text-[#a8a8a8] text-lg">
                            {example.output}
                        </div>
                    </div>
                    {example.explanation.length > 0 && 
                        (<div className="flex-col gap-4 font-semibold">
                            <div className="text-xl">Explanation:</div>
                            <div className="text-[#a8a8a8] text-lg">
                                {example.explanation.map((explanation, index)=> (
                                    <span key={index} >{explanation}</span>
                                ))}
                            </div>
                        </div>)
                    }
                </div>
            </div>
        ))}
    </div>
  )
}

export default Examples
