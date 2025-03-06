import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";

export default function ChatTextInput({setTextAreaValue, handleChatSubmit, textAreaValue}: 
    {setTextAreaValue: any, handleChatSubmit: any, textAreaValue: any}){

    return (
        <div className="bg-white left-64 right-0 min-h-24 bottom-0 pb-10 fixed">
            <div className="flex flex-col items-
            center justify-center
            h-24 w-4/5 border-slate-200 border-2 bg-slate-50 m-auto rounded-2xl">

            <Textarea  onChange={(e)=>setTextAreaValue(e.target.value)} contentEditable="true" value={textAreaValue}
            className="min-h-22 bottom-10 bg-slate-50 border-none rounded-2xl text-2xl border-2 border-green-800" 
            placeholder="How can I help you?">
            </Textarea>

            <div className="flex flex-row w-full h-8 justify-between line-">
                <button onClick={(event) => handleChatSubmit(event)}>
                    <Image src={"/dummy_img.png"}
                    className="w-8 h-8 rounded-full ml-2 mr-2"
                    alt="submit-chat-btn"
                    width={10}
                    height={10}
                    />
                </button>
                <button onClick={(event) => handleChatSubmit(event)}>
                    <Image src={"/dummy_img.png"}
                    className="w-8 h-8 rounded-full ml-2 mr-2"
                    alt="submit-chat-btn"
                    width={10}
                    height={10}
                    />
                </button>
            </div>
        </div>

        </div>
        
        
    )
}