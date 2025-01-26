export interface IMessage {
    id: string;
    content: string;
    isUser: boolean;
    timestamp: Date;
}

export interface IConversation {
    id: string;
    title: string;
    messages: IMessage[];
    createdAt: Date;
    updatedAt: Date;
}