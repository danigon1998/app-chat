'use client';

import {create} from 'zustand';
import { useState, useEffect } from "react";
import { v4 as uuidv4} from 'uuid';
import { IConversation } from "@/lib/types";
import { getAllConversations, saveConversation, deleteConversationFromStorage } from "@/lib/chat";

interface ConversationStore {
    conversations: IConversation[];
    isLoadingConv: boolean;
    currentConversation: IConversation | null;
    loadConversations: () => Promise<void>;
    createConversation: () => Promise<IConversation>;
    updateConversation: (id: string, newTitle: string) => Promise<void>;
    deleteConversation: (id: string) => Promise<void>;
    setCurrentConversation: (conv: IConversation | null) => void;
}

export const useConversations = create<ConversationStore>((set, get) => ({
    conversations: [],
    isLoadingConv: true,
    currentConversation: null,
    loadConversations: async () => {
      try {
        const loadedConversations = await getAllConversations();
        set({ conversations: loadedConversations });
      } catch (error) {
        console.error('Erro ao carregar conversas:', error);
      } finally {
        set({ isLoadingConv: false });
      }
    },
  
    createConversation: async () => {
      const newConversation: IConversation = {
        id: uuidv4(),
        title: `Conversa ${get().conversations.length + 1}`,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
  
      set((state) => ({
        conversations: [...state.conversations, newConversation]
      }));
      
      await saveConversation(newConversation);
      return newConversation;
    },

    setCurrentConversation: (conv) => set({ currentConversation: conv }),
  
    updateConversation: async (id, newTitle) => {
      set((state) => ({
        conversations: state.conversations.map(c => 
          c.id === id ? {...c, title: newTitle} : c
        ),
        currentConversation: state.currentConversation?.id === id 
        ? {...state.currentConversation, title: newTitle} 
        : state.currentConversation
      }));
      
      const conversation = get().conversations.find(c => c.id === id);
      if (conversation) {
        await saveConversation({...conversation, title: newTitle});
      }
    },
  
    deleteConversation: async (id) => {
      set((state) => ({
        conversations: state.conversations.filter(c => c.id !== id)
      }));
      await deleteConversationFromStorage(id);
    }
  }));