import { Inbox } from "lucide-react"

export default function InboxEmpty() {
    return (
        <div className="flex h-full flex-col items-center justify-center text-muted-foreground gap-2">
            <Inbox className="h-12 w-12" />
            <p className="text-sm">Please select an item to view details.</p>
        </div>
    )
}
