'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useConversations } from "@/hooks/use-conversations";
import { useChat } from "@/hooks/use-chat";
import ChatWindow from "@/components/chat/chat-window";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ChatHomePage() {
    const router = useRouter();
    const { createConversation } = useConversations();
    const { messages ,handleSendMessage, currentConversation, setCurrentConversation, isLoading, setIsLoading } = useChat();
    const [isStartingConversation, setIsStartingConversation] = useState(false);

    const handleNewChatMessage = async (message: string) => {
      if(!currentConversation && !isLoading){
        try {
          setIsLoading(true);
          const newConv = await createConversation();
          setCurrentConversation({
            ...newConv,
            messages: [],
            updatedAt: new Date(),
          });
          await handleSendMessage(message);
          setTimeout(() => {
            router.replace(`/${newConv.id}`);
          }, 500);
        } finally {
          setIsLoading(false);
        }
      }
    }

    return (
      <div className="flex-1 h-full flex flex-col">
          {!currentConversation ? (
              <motion.div
                  className="flex-1 flex flex-col items-center justify-center gap-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
              >
                  <h1 className="text-2xl font-bold">Bem-vindo ao Chat</h1>
                  <p className="text-muted-foreground">Inicie uma nova conversa</p>
                  <div className="absolute bottom-6 w-full max-w-3xl">
                      <ChatWindow
                          messages={messages || []}
                          onSendMessage={handleNewChatMessage}
                          isLoading={isLoading || isStartingConversation}
                      />
                  </div>
              </motion.div>
          ) : (
              <motion.div
                  className="flex-1 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
              >
                  <Button variant="ghost" disabled={isLoading} className="flex items-center gap-2">
                  <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Carregando...
                  </>
                  </Button>
              </motion.div>
          )}
      </div>
  );
}