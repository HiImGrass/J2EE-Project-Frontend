import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TopicCardProps {
    id: number;
    image_url: string;
    status: "LEARNED" | "UNLEARNED"
    topic_name: string;
    description: string;
}

const topicCardVariants = cva("flex w-full px-5 py-4 rounded-xl gap-4 items-center shadow-lg shadow-primary-shadow", {
    variants: {
        status: {
            LEARNED: "bg-gradient-to-r from-primary/90 from-50% to-primary/80 to-100%",
            UNLEARNED: "bg-card-background",
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
            onClick={handleClickCard}
        >
            <div className={cn(
                "size-18 rounded-full overflow-hidden outline-2 outline-white",
                status === "UNLEARNED" && "grayscale"
            )}>
                <Image
                    publicId={image_url}
                    aspect="square"
                />
            </div>
            <div className="flex-col">
                <div className={cn(`text-white text-xl font-medium bg-green-b`, status === "UNLEARNED" && "text-foreground")}>
                    {topic_name}
                </div>
                <div className={cn(`text-white text-sm`, status === "UNLEARNED" && "text-foreground")}>
                    {description}
                </div>
            </div>
            <ChevronRight
                aria-hidden="true"
                className={cn("ml-auto size-5 shrink-0", status === "LEARNED" ? "text-white" : "text-muted-foreground")}
            />
        </div>
    );
}
