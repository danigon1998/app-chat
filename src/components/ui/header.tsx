interface ChatHeaderProps {
    title: string | undefined;
}

export default function ChatHeader({ title }: ChatHeaderProps) {
    return (
        <header className="p-4">
            <h1 className="text-lg font-semibold text-center">
                {title}
            </h1>
        </header>
    );
}