import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IMessage } from "@/lib/types";

export default function Message({message}: {message: IMessage}) {

    const formattedTime = message.timestamp
        ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : null;

    return (
        <div className={`flex mb-2 ${message.isUser ? "justify-end" : "justify-start"}`} role="region" aria-label={`Mensagem de ${message.isUser ? "usuario" : "asistente"}`}>
            <Card className={`p-4 max-w-[75%] ${message.isUser? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                <div className="flex items-start gap-3">
                    <Avatar>
                        <AvatarImage src={message.isUser ? "/user.png" : "/bot.png"} alt={message.isUser ? "Avatar do usuario" : "Avatar do asistente"}/>
                        <AvatarFallback className="text-xs">{message.isUser? "Você" : "IA"}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm">{message.content}</p>   
                    {message.timestamp && (
                        <time className={`block mt-1 text-xs ${message.isUser? "text-primary-foreground/80" : "text-secondary-foreground/80"}`}
                        dateTime={new Date(message.timestamp).toISOString()}>
                            {formattedTime}
                        </time>
                    )}
                </div>
            </Card>
        </div>
    )
}
