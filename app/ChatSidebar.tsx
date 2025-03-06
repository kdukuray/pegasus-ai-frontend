"use client";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface SidebarChatThread{
    id: number,
    name: string
}

export default function ChatSidebar({getChatMessages}: {getChatMessages: any}){
    const router = useRouter()
    const dummy_data = [
        "AI Agent Defintion ...",
        "What is AI Distillation ...",
    ]

    function naigateToThread(chat_thread_id: number){
        getChatMessages(chat_thread_id)
        // router.push(`http://localhost:3000/chat/${chat_thread_id}`)
        
        

    }

    const [chatThreads, setChatThreads] = useState<SidebarChatThread[]>([]);

    async function getSidebarChatThreads(){
        const resp = await fetch("http://localhost:8000/chatapi/threads")
        if (resp.ok){
            const payload = await resp.json()
            const chat_threads = payload.threads
            
            setChatThreads(chat_threads)
        }

    }
    const [activeThreadIndex, setActiveThreadIndex] = useState<Number>();
    useEffect(()=>{
        getSidebarChatThreads()
        // get the chat threads from the server
        setActiveThreadIndex(0)
    }, [])
    

    return(
        <Sidebar>
            <SidebarTrigger></SidebarTrigger>
            <SidebarHeader>
                <div className="flex flex-row justify-center items-center">
                    <Image src="/dummy_img.png"
                    className="w-8 h-8 rounded-full ml-2 mr-2"
                    alt="dummy-img"
                    width={10}
                    height={10}
                    />
                    <p className="ml-2 mr-2">AIGENCY GPT</p>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="h-10">New Chat</SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarGroupLabel>Recent Chat</SidebarGroupLabel>
                        <SidebarMenu>
                            {chatThreads.map((chatThread, index) =>{
                                return (
                                    <SidebarMenuItem key={index}>
                                    <SidebarMenuButton className={clsx("h-10", {"bg-sidebar-accent text-sidebar-accent-foreground": (index === activeThreadIndex)})}
                                    onClick={()=>naigateToThread(chatThread.id)}
                                    >{chatThread.name}</SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter>This is a footer</SidebarFooter>
        </Sidebar>
    )
}