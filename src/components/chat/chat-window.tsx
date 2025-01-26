'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatHeader from '../ui/header';
import { SendHorizonal } from "lucide-react";
import Message from "./chat-message";
import { IMessage } from "@/lib/types";
import { IConversation } from '@/lib/types';

interface ChatWindowProps {
    messages: IMessage[];
    onSendMessage: (message: string) => Promise<void>;
    isLoading?: boolean;
    error?: string | null;
    showPlaceholder?: boolean;
    currentConversation?: IConversation | null;
}

export default function ChatWindow({messages, onSendMessage, isLoading = false, error = null, showPlaceholder = false, currentConversation} : ChatWindowProps){

    const [inputMessage, setInputMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim() || isLoading ) return;
        try {
            await onSendMessage(inputMessage);
            setInputMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return(
        <div className="flex flex-col h-full">
            <ChatHeader title={currentConversation?.title}/>
            <ScrollArea className="flex-1 p-4">
                <div className="space-x-4">
                    {messages.map((message) =>(
                        <Message key={message.id} message={message}/>
                    ))}
                    {showPlaceholder && messages.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                        Digite sua mensagem para começar
                    </div>
                )}
                </div>
            </ScrollArea>
            <form action="submit" onSubmit={handleSubmit} className="w-full self-center p-4 border-t max-w-3xl ">
                <div className="p-4 border-t ">
                    <div className="flex gap-2">
                        <Textarea value={inputMessage} onChange={(e) => {setInputMessage(
                            e.target.value);
                            e.target.style.height = "auto";
                            e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;}
                        } 
                        placeholder="Digite sua mensagem" className="resize-none" disabled={isLoading}/>
                        <Button type="submit" size="icon" disabled={isLoading || !inputMessage.trim()}>
                            <SendHorizonal className="h-4 w-4"/>
                        </Button>
                    </div>
                </div>
                {error && (
                <div className="mt-2 text-sm text-destructive">{error}</div>
                )}
            </form>
        </div>
    )
}