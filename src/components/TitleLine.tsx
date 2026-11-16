interface TitleLineProps {
    title: string
    className?: string
    lineClassName?: string
    textClassName?: string
}

export function TitleLine({
    title,
    className,
    lineClassName = "bg-slate-400",
    textClassName = "text-slate-400",
}: TitleLineProps) {
    return (
        <div className={`w-full flex items-center gap-2 ${className}`}>
            <div className={`w-full h-px ${lineClassName}`} />
            <div className={`text-nowrap ${textClassName}`}>{title}</div>
            <div className={`w-full h-px ${lineClassName}`} />
        </div>
    )
}