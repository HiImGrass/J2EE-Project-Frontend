import { StudentTitleCard } from "@/components/StudentTitleCard";
import { TitleLine } from "@/components/TitleLine";
import { NotebookCard } from "@/features/student-notebook/components/NotebookCard";
import { useNavigate } from "react-router-dom";

export function NoteBookPage() {
    const navigate = useNavigate();

    const handleClickPratice = () => {
        navigate('/practice-notebook');
    }

    const handleClickArchived = () => {
        navigate('/archived-notebook');
    }

    return (
        <div className="flex flex-col items-center p-3 gap-4">
            <StudentTitleCard title={"SỔ TAY CỦA BẠN"} />

            <div className="w-full flex flex-col gap-3">
                <TitleLine
                    title={"Sổ tay ôn tập"}
                    lineClassName="bg-primary-border"
                    textClassName="text-blue-foreground"
                    bgClassName="bg-primary-background"
                />
                <NotebookCard
                    count={15}
                    type="onTap"
                    onClick={() => handleClickPratice()}
                />
            </div>

            <div className="w-full flex flex-col gap-3">
                <TitleLine
                    title={"Sổ tay ngủ đông"}
                    lineClassName="bg-green-border"
                    textClassName="text-green-foreground"
                    bgClassName="bg-light-green-background/20"
                />
                <NotebookCard
                    count={15}
                    type="nguDong"
                    onClick={() => handleClickArchived()}
                />
            </div>
        </div>
    )
} 