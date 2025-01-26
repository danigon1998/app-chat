'use client';

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useChat } from "@/hooks/use-chat";
import { useConversations } from "@/hooks/use-conversations";
import ChatWindow from "@/components/chat/chat-window";
import ChatHeader from "@/components/ui/header";


export default function ChatPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const { messages, handleSendMessage, currentConversation, isLoading, error } = useChat(id);
    const {conversations, isLoadingConv} = useConversations();

    useEffect(() => {
      if (!isLoadingConv) {
          const conversationExist = conversations.findIndex((conv) => conv.id === id);
          if (conversationExist === -1) {
              router.push('/');
          }
      }
    }, [isLoading, conversations, id, router]);

    return (
        <ChatWindow messages={messages} onSendMessage={handleSendMessage} isLoading={isLoading} error={error} currentConversation = {currentConversation}/> 
    );
}


