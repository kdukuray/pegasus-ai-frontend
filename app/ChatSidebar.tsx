"use client";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ChatSidebar(){
    const dummy_data = [
        "AI Agent Defintion ...",
        "What is AI Distillation ...",
    ]
    const [activeThreadIndex, setActiveThreadIndex] = useState<Number>();
    useEffect(()=>{
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
                            {dummy_data.map((sideBarThread, index) =>{
                                return (
                                    <SidebarMenuItem key={index}>
                                    <SidebarMenuButton className={clsx("h-10", {"bg-sidebar-accent text-sidebar-accent-foreground": (index === activeThreadIndex)})}>{sideBarThread}</SidebarMenuButton>
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