'use client';

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Input } from "../ui/input";
import { ModeToggle } from "../ui/mode-toggle";
import { MoreVertical, Plus } from "lucide-react";
import { useConversations } from "@/hooks/use-conversations";

export default function Sidebar(){
    
    const { conversations,createConversation, updateConversation, deleteConversation, loadConversations, currentConversation } = useConversations();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newTitle, setNewTitle] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadConversations();
    }, [loadConversations]);

    useEffect(() => {
        if (editingId && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [editingId]); 
    
    const handleEdit = (id: string, currentTitle: string) => {
        setEditingId(id);
        setNewTitle(currentTitle);
    };

    const handleRenameEnd = async(id:string) => {
        if(newTitle.trim() && newTitle !== conversations.find(c => c.id === id)?.title){
            await updateConversation(id, newTitle);
            // if(currentConversation?.id === id) {
            //     updateCurrentConversationTitle(newTitle);
            // }
        }
        setEditingId(null);
        setNewTitle('');
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
        if(e.key === 'Enter'){
            handleRenameEnd(id);
        }
    }

    return(
        <Card className="w-64 h-full rounded-none  p-4 flex  flex-col">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg  font-semibold">Historial</h1>
                <p><Button variant="ghost" size="sm" onClick={createConversation}>
                        <Plus className="h-4 w-4"/>
                    </Button>
                    <ModeToggle/>
                </p>
            </div>
            <ScrollArea className="flex-1 [&>div>div]:!block">
                <div className="space-y-1">
                    {conversations.map((conv)=>(
                        <div key={conv.id} className="group relative w-full">
                            {editingId === conv.id ? (
                                <Input
                                    ref={inputRef}
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    onBlur={() => handleRenameEnd(conv.id)}
                                    onKeyDown={(e) => handleKeyPress(e, conv.id)}
                                    className="h-8 px-2 w-full border-0 rounded-none focus-visible:ring-1"
                                />
                            ) : (
                                <div className="flex-1 min-w-0 overflow-hidden">
                                  <Link
                                    href={`/${conv.id}`}
                                    className="hover:bg-accent rounded-lg w-full"
                                  >
                                    <Button
                                      variant="ghost"
                                      className="w-full max-w-[calc(100%-40px)] justify-start truncate text-left"
                                    >
                                      <span className="truncate"> {conv.title} </span>
                                    </Button>
                                  </Link>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 hover:bg-accent flex-shrink-0" 
                                      >
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => handleEdit(conv.id, conv.title)}>
                                        Renombrar
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        className="text-destructive"
                                        onClick={() => deleteConversation(conv.id)}
                                      >
                                        Eliminar
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              )}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </Card>
    )
}