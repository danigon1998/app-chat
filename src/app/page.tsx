import ChatWindow from "@/components/chat/chat-window";
import { getInitialMessages } from "@/lib/chat";
import ChatHomePage from "./(chat)/page";

export default async function ChatPage() {
  const initialMessages = await getInitialMessages();
  return (
    <div className="h-full">
      <ChatHomePage/>
    </div>
  );
}
