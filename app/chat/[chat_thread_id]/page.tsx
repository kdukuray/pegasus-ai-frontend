"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import '../../globals.css';
import Image from "next/image";
import ChatThread from "@/app/ChatThread";
import ChatSidebar from "@/app/ChatSidebar";
import { useEffect, useState } from "react";


interface DynamicUrlParams{
  chat_thread_id: number
}

interface ChatThreadMessage{
  role: string,
  content: string
}
export default function ChatPage({params}: {params: Promise<DynamicUrlParams>}) {

  const [messages, setMessages] = useState<ChatThreadMessage[]>([]);

  async function getChatThreadId(params: Promise<DynamicUrlParams>){
    try{
      const dynamicUrlParams = await params
      const chatThreadId = dynamicUrlParams.chat_thread_id
      return chatThreadId
    }
    catch(error){
      if (error instanceof Error){
        console.log(error.message)
      }
      throw new Error("error")
    }
  }

  async function getChatMessages(chatThreadId: number){
    // console.log("Our function ran")
    const response = await fetch(`http://localhost:8000/chatapi/thread/messages/${chatThreadId}`, {
      method: "GET",
    })
    if (!response.ok){
      throw new Error("Server request error")
    }
    try{
      const responsePayload = await response.json()
      console.log(responsePayload.messages)
      console.log(typeof responsePayload.messages)
      setMessages(responsePayload.messages)
      // console.log(responsePayload) 
    }
    catch{
      console.log("Error")
    }
  }


  useEffect(()=>{
    getChatThreadId(params)
    .then((chatThreadId)=>{
      getChatMessages(chatThreadId)
    })

  }, [])

  return (
    <div className="">
      <SidebarProvider className="absolute">
        <SidebarTrigger className="ml-20"></SidebarTrigger>
        <ChatSidebar getChatMessages={getChatMessages}></ChatSidebar>
      </SidebarProvider>
      <ChatThread messages={messages}></ChatThread>
    </div>
  );
}
