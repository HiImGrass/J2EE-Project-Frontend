import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

interface TopicCardProps {
    order: number
    publicId: string;
    status: "LEARNED" | "UNLEARNED"
    title: string;
    meaning: string;
}

const topicCardVariants = cva("flex w-full px-5 py-4 rounded-xl gap-4 items-center shadow-lg shadow-gray-400", {
    variants: {
        status: {
            LEARNED: "bg-gradient-to-r from-light-green-background from-50% to-green-background to-100%",
            UNLEARNED: "bg-gray-400",
        },
    },
    defaultVariants: {
        status: "UNLEARNED",
    },
});

export function TopicCard({ order, publicId, status, title, meaning }: TopicCardProps) {
    return (
        <div className={cn(topicCardVariants({ status }))}>
            <div className="size-18 rounded-full overflow-hidden outline-2 outline-white outline-offset-4">
                <Image
                    publicId={publicId}
                    aspect="square"
                />
            </div>
            <div className="flex-col">
                <div className="text-white text-xl font-medium bg-green-b">
                    {title}
                </div>
                <div className="text-white">
                    {order + ". " + meaning}
                </div>
            </div>
        </div>
    );
}