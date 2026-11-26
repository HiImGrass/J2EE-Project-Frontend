import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";

type NotebookType = "onTap" | "nguDong";

interface NotebookCardProps {
    count: number;
    type?: NotebookType;
    onClick: () => void;
}

const TYPE_CONFIG: Record<NotebookType, {
    label: string;
    publicId: string;
    borderColor: string;
    bgColor: string;
}> = {
    onTap: {
        label: "Từ ôn tập",
        publicId: "study-FIL_x3htyc",
        borderColor: "border-primary",
        bgColor: "bg-primary/40",
    },
    nguDong: {
        label: "Từ ngủ đông",
        publicId: "sleep-FIL_uqjnda",
        borderColor: "border-light-green-background",
        bgColor: "bg-light-green-background/40",
    },
};

export const NotebookCard = (
    {
        count = 15,
        type = "onTap",
        onClick,
    }: NotebookCardProps
) => {
    const config = TYPE_CONFIG[type];
    return (
        <div
            className={`bg-white/10 w-full h-60 relative group rounded-2xl border-2 ${config.borderColor} shadow-lg overflow-hidden`}
            onClick={() => onClick()}
        >
            <Image
                publicId={config.publicId}
                aspect="square"
                objectFit="cover"
                className="opacity-100 dark:opacity-40"
            />

            <div className={`absolute inset-4 flex flex-col items-center justify-center rounded-xl border-2 border-white ${config.bgColor} shadow-lg text-white select-none`}>
                <div className="w-10">
                    <Icon name="book-open" />
                </div>
                <div className="text-2xl font-bold">{count}</div>
                <div>{config.label}</div>
            </div>

            <div className="absolute inset-0 bg-black/10 opacity-0 group-active:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
        </div>
    );
};
