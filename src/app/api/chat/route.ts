import { NextResponse } from "next/server";
import { IMessage } from "@/lib/types";

const BOT_RESPONSES = [
    "Interessante! Você poderia desenvolver mais essa ideia?",
    "Eu entendo o que você está dizendo. Você considerou outras alternativas?",
    "Esse é um bom ponto. Vamos explorá-lo em detalhes:",
    "Eu poderia ajudá-lo com isso. De que informações específicas você precisa?",
    "Você já tentou de outra maneira?"
]

export async function POST(request: Request) {
    try {
        const { message } = await request.json();

        await new Promise(resolve => setTimeout(resolve, 1000))

        if (message.toLowerCase().includes('error')) {
            throw new Error('Erro simulado no servidor');
        }

        const responseMessage: IMessage = {
            id: Date.now().toString(),
            content: BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)],
            isUser: false,
            timestamp: new Date()
          };

        return NextResponse.json({ success: true, response: responseMessage });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message });
    }
}