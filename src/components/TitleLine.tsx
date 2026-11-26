interface TitleLineProps {
    title: string
    className?: string
    lineClassName?: string
    textClassName?: string
    bgClassName?: string
}

export function TitleLine({
    title,
    className,
    lineClassName = "bg-slate-300",
    textClassName = "text-slate-400",
    bgClassName = "bg-slate-50"
}: TitleLineProps) {
    return (
        <div className={`w-full px-8 flex items-center gap-6 ${className ?? ""}`}>
            <div
                className={`h-px w-full ${lineClassName}`}
                style={{ maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)" }}
            />
            <div className={`text-nowrap rounded-full px-4 py-1.5 ${textClassName} ${bgClassName}`}>
                {title}
            </div>
            <div
                className={`h-px w-full ${lineClassName}`}
                style={{ maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)" }}
            />
        </div>
    )
}
