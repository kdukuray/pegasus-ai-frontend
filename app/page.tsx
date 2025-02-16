
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import './globals.css';
import Image from "next/image";
import ChatThread from "./ChatThread";
import ChatSidebar from "./ChatSidebar";

export default function Home() {
  return (
    <div className="">
      <SidebarProvider className="absolute">
        <SidebarTrigger className="ml-20"></SidebarTrigger>
        <ChatSidebar></ChatSidebar>
      </SidebarProvider>
      <ChatThread></ChatThread>
    </div>
  );
}
