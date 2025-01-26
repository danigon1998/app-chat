import { IMessage, IConversation } from "./types";
import { apiClient } from "@/services/api";

const CONVERSATIONS_KEY = 'chat-conversations';

export const sendMessage = async (message: string): Promise<IMessage> => {
    try {
        const response = await apiClient.post('/chat', { message });
        return response.data.response; 
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const getConversationById = async (id: string): Promise<IConversation | null> => {
    try {
        const conversation = await getAllConversations();
        return conversation.find((c: IConversation) => c.id === id) || null;
    } catch (error) {
        const conversation = await getAllConversations();
        return conversation.find((c: IConversation) => c.id === id) || null;
    }
};
  
export const saveConversation = async (conversation: IConversation): Promise<void> => {
    try {
        const conversations = await getAllConversations();

        const index = conversations.findIndex((c: IConversation) => c.id === conversation.id);

        if (index >= 0) {
            conversations[index] = conversation
        } else {
            conversations.push(conversation)
        }

        localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
    } catch (error) {
        console.error('Erro guardando os dados:', error);
        throw error;
    }
};

export const getInitialMessages = async (conversationId?: string): Promise<IMessage[]> => {
    if (conversationId) {
      const conversation = await getConversationById(conversationId);
      return conversation?.messages || [];
    }
    return [];
  };

export const getAllConversations = async (): Promise<IConversation[]> => {
    const conversations = localStorage.getItem(CONVERSATIONS_KEY);
    return conversations ? JSON.parse(conversations) : [];
};

export const deleteConversationFromStorage = async (id: string): Promise<void> => {
    try {
        const conversations = await getAllConversations(); 
        const filtered = conversations.filter(c => c.id !== id); 
        localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(filtered)); 
    } catch (error) {
        console.error('Erro eliminando a conversa:', error);
        throw error;
    }
};
