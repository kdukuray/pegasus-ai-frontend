"use client";
import clsx from "clsx";
import ChatMessage from "./ChatMessage";
import ChatTextInput from "./ChatTextInput";
import { useEffect, useState } from "react";

interface UrlParams{
    chat_thread_id: number
}

    export default function ChatThread(props: {messages: string[]}){
    const [textAreaValue, setTextAreaValue] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([]);

    // async function getChatThreadId(params: Promise<UrlParams>): Promise<number>{
    //     try{
    //         const dynamicParameters = await params;
    //         console.log(dynamicParameters)
    //         const chatThreadId = dynamicParameters.chat_thread_id
    //         return chatThreadId
    //     }
    //     catch(error){
    //         if (error instanceof Error){
    //             console.log(error.message)
    //         }
    //         throw new Error("Error occured")
    //     }


    // }
    
    // useEffect(()=>{
    //     console.log(getChatThreadId(params))
    //     // getChatThreadId(params)
    //     // .then((chatThreadId: number)=>{
    //     //     console.log(chatThreadId)
    //     // })
    //     // .catch((err)=>{
    //     //     console.log(err)
    //     // })
        
    // }, [])
     


    async function handleChatSubmit(){
        setMessages((prevMessages)=>{
            const updatedMessages = [...prevMessages, textAreaValue]
            return updatedMessages
        })
        const payload = new FormData();
        if (messages.length === 0){
            payload.append("chatThreadId", "1")
        }
        // Later this should be changed to get actual thread ID
        else{
            payload.append("chatThreadId", "1")

        }
        payload.append("messageContent", textAreaValue)

        const apiResponse = await fetch("http://127.0.0.1:8000/chatapi", {
            method: "post",
            body: payload
        })
        // To loop through readers in js, you have to access the reader of the response
        if (apiResponse.ok && apiResponse.body != null){
            const reader = apiResponse.body.getReader()
        // The reader's read() function returns a list of values which we unpack
        // the first element is a boolean whihc signifies if the reader has been exahusted
        // The second is the value actually coming bac as the stream
        // streams come in as bytes as therefore must be decded into strings as seen below
        const decoder = new TextDecoder()
        setMessages((prevMessages) => [...prevMessages, ""])
        while (true){
            const {done, value} = await reader.read()
            console.log(decoder.decode(value))
            console.log(done)
            if (done){
                break;
            }
            setMessages((prevMessages) => {
                let updatedMessages = [...prevMessages]
                updatedMessages[updatedMessages.length-1] += decoder.decode(value)
                return updatedMessages
            })
        } 
        }
    }




    useEffect(()=>{
        if (Array.isArray(props.messages)){
            // console.log("ss")
            // console.log(props.messages)
            // console.log(props.messages.map((messageData: any)=> messageData["content"]))
            // const just_strs = props.messages.map((messageData: any)=> messageData["content"])
            setMessages(props.messages)
        }
        else{
            console.log("sss")
            setMessages([])
        }
        
    }, [props.messages])
    return ( 
        <div className="flex relative flex-col min-h-dvh pl-60">
            {messages.map((messageData: any, index) => {
                return <ChatMessage 
                sender={clsx({"Assistant": messageData["role"] === "assistant"})}
                content={messageData["content"]}
                key={index}
                ></ChatMessage>
            })}
            <div className="h-40"></div>
            <ChatTextInput setTextAreaValue={setTextAreaValue} handleChatSubmit={handleChatSubmit}></ChatTextInput>
           
        </div>
        )
}

