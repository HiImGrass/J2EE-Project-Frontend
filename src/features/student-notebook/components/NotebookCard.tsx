import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";

type NotebookType = "onTap" | "nguDong";

interface NotebookCardProps {
    count: number;
    type?: NotebookType;
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
        bgColor: "bg-primary/30",
    },
    nguDong: {
        label: "Từ ngủ đông",
        publicId: "sleep-FIL_uqjnda",
        borderColor: "border-light-green-background",
        bgColor: "bg-light-green-background/30",
    },
};

export const NotebookCard = (
    {
        count = 15,
        type = "onTap",
    }: NotebookCardProps
) => {
    const config = TYPE_CONFIG[type];
    return (
        <div className={`w-full h-60 relative group rounded-2xl border-2 ${config.borderColor} shadow-lg overflow-hidden`}>
            <Image
                publicId={config.publicId}
                aspect="square"
                objectFit="cover"
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