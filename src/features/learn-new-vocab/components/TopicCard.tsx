import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { useNavigate } from "react-router-dom";

interface TopicCardProps {
    topicId: number;
    order: number;
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

export function TopicCard({ topicId, order, publicId, status, title, meaning }: TopicCardProps) {
    const navigate = useNavigate();

    const handleClickCard = () => {
        navigate(`/study/${topicId}`)
    }
    return (
        <div
            className={cn(topicCardVariants({ status }))}
            onClick={() => handleClickCard()}
        >
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