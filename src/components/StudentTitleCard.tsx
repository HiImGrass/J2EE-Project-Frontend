interface StudentTitleCardProps {
    title: string
}


export function StudentTitleCard({title}: StudentTitleCardProps) {
    return (
        <div className="py-4 text-xl font-semibold text-white bg-primary w-full text-center rounded-md">
            {title}
        </div>
    )
}