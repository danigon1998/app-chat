'use client';

import { useState, useEffect, useCallback } from "react";
import { useRouter} from "next/navigation";
import { IMessage, IConversation } from "@/lib/types";
import { sendMessage, saveConversation, getConversationById, getInitialMessages } from "@/lib/chat";
import { useConversations } from "@/hooks/use-conversations";

export function useChat(conversationId? : string){
    const router = useRouter();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { currentConversation, setCurrentConversation } = useConversations();

    useEffect(() => {
        const loadingInitialData = async () =>{
            try {
                const initialMessages = await getInitialMessages(conversationId);
                setMessages(initialMessages);

                if(conversationId){
                    const conversation = await getConversationById(conversationId);
                    setCurrentConversation(conversation);
                }else{
                    setCurrentConversation(null);
                    router.replace('/');
                }
            } catch (error) {
                setError("Erro ao carregar mensagens iniciais");
                router.replace('/')
            }
        }

        loadingInitialData()
        setIsLoading(false);
    }, [conversationId, router]);

    useEffect(() => {
        const autoSave = async () => {
          if (messages.length === 0 || !currentConversation) return;
          console.log(messages)
          const updatedConversation = {
            ...currentConversation,
            messages: messages,
            updatedAt: new Date()
          };
          
          await saveConversation(updatedConversation);
        };
        
        autoSave();
      }, [messages, currentConversation]);

    const handleSendMessage = useCallback(async (message: string) => {
        if (!message.trim() || isLoading) return;

        const newMessage: IMessage = {
            id: Date.now().toString(),
            content: message,
            isUser: true,
            timestamp: new Date()
        };

        try {
            setIsLoading(true);
            setError(null);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            const response = await sendMessage(message);
            setMessages((prevMessages) => [...prevMessages, response]);

            const updatedConversation = currentConversation
            ? {
                ...currentConversation,
                messages: [...messages, newMessage, response], 
                updatedAt: new Date(),
            }
            : null;
            
            if (updatedConversation) {
                await saveConversation(updatedConversation);
                setCurrentConversation(updatedConversation);
            }

        } catch (error) {
            setError("Erro ao enviar mensagem");
            setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, currentConversation]);

    return { messages, isLoading, error, handleSendMessage, currentConversation, setCurrentConversation, setIsLoading };

}