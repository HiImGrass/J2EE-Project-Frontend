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
        <div className="flex flex-col items-center p-3 gap-6">
            <StudentTitleCard title={"SỔ TAY CỦA BẠN"} />

            <div className="w-full flex flex-col gap-3">
                <TitleLine
                    title={"Sổ tay ôn tập"}
                    lineClassName="bg-primary"
                    textClassName="text-primary"
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
                    lineClassName="bg-light-green-background"
                    textClassName="text-light-green-background"
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