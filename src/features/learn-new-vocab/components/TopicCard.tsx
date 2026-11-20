import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { useNavigate } from "react-router-dom";

interface TopicCardProps {
    id: number;
    image_url: string;
    status: "LEARNED" | "UNLEARNED"
    topic_name: string;
    description: string;
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

export function TopicCard({ id, image_url, status, topic_name, description }: TopicCardProps) {
    const navigate = useNavigate();

    const handleClickCard = () => {
        navigate(`/study/${id}`)
    }
    return (
        <div
            className={cn(
                topicCardVariants({ status }),
                status === "LEARNED" ? "cursor-pointer" : "pointer-events-none"
            )}
            onClick={status === "LEARNED" ? handleClickCard : undefined}
        >
            <div className={cn(
                "size-18 rounded-full overflow-hidden outline-2 outline-white outline-offset-4",
                status === "UNLEARNED" && "grayscale"
            )}>
                <Image
                    publicId={image_url}
                    aspect="square"
                />
            </div>
            <div className="flex-col">
                <div className="text-white text-xl font-medium bg-green-b">
                    {topic_name}
                </div>
                <div className="text-white text-sm">
                    {description}
                </div>
            </div>
        </div>
    );
}
