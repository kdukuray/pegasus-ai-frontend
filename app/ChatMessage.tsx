import Image from "next/image";
import clsx from "clsx";

export default function ChatMessage({sender, content}: {sender: string, content: string}){

    return (
        <div className={clsx("h-auto min-h-16 flex flex-row items-center pt-2",
            {"bg-slate-100": sender ==="Assistant"}
        )}>
            <div className="flex flex-row w-4/5 pl-2 pr- pt-2 pb-2 mr-auto ml-auto">
                <Image src="/dummy_img.png"
                alt="dummy image" 
                className="h-8 w-8 rounded-sm mr-2"
                width={20} 
                height={20}/>
                
                <p>{content}</p>
            </div>


        </div>
    )
}