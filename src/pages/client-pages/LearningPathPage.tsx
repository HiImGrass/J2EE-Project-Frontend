import { StudentTitleCard } from "@/components/StudentTitleCard";
import { TitleLine } from "@/components/TitleLine";
import { TopicCard } from "@/features/learn-new-vocab/TopicCard";

interface LearningPathPageProp {
    teacherName?: string,
}

const Topics = [
    {
        topicId: 1,
        order: 1,
        publicId: "topic_default_gzsqcq",
        status: "LEARNED",
        title: "School",
        meaning: "Trường học"
    },
    {
        topicId: 2,
        order: 2,
        publicId: "topic_default_gzsqcq",
        status: "LEARNED",
        title: "School",
        meaning: "Trường học"
    },
    {
        topicId: 3,
        order: 3,
        publicId: "topic_default_gzsqcq",
        status: "LEARNED",
        title: "School",
        meaning: "Trường học"
    },
    {
        topicId: 4,
        order: 4,
        publicId: "topic_default_gzsqcq",
        status: "UNLEARNED",
        title: "School",
        meaning: "Trường học"
    },
    {
        topicId: 5,
        order: 5,
        publicId: "topic_default_gzsqcq",
        status: "UNLEARNED",
        title: "School",
        meaning: "Trường học"
    },
    {
        topicId: 6,
        order: 6,
        publicId: "topic_default_gzsqcq",
        status: "UNLEARNED",
        title: "School",
        meaning: "Trường học"
    },
    {
        topicId: 7,
        order: 7,
        publicId: "topic_default_gzsqcq",
        status: "UNLEARNED",
        title: "School",
        meaning: "Trường học"
    },
    {
        topicId: 8,
        order: 8,
        publicId: "topic_default_gzsqcq",
        status: "UNLEARNED",
        title: "School",
        meaning: "Trường học"
    },
    {
        topicId: 9,
        order: 9,
        publicId: "topic_default_gzsqcq",
        status: "UNLEARNED",
        title: "School",
        meaning: "Trường học"
    },
    {
        topicId: 10,
        order: 10,
        publicId: "topic_default_gzsqcq",
        status: "UNLEARNED",
        title: "School",
        meaning: "Trường học"
    }
] as const;

export function LearningPathPage({
    teacherName = "Nguyễn Thanh Phước",

}: LearningPathPageProp) {
    return (
        <div className="flex flex-col items-center px-3 py-3 gap-3">
            <div className="flex flex-col w-full p-2 gap-2">
                <StudentTitleCard title={"LUYỆN THI IELTS KHÓA 25"} />
                <div className="flex w-full justify-between gap-2">
                    <div className="flex gap-1 min-w-0">
                        <div className="text-muted-foreground text-nowrap">GV:</div>
                        <div className="text-primary font-semibold truncate">{teacherName}</div>
                    </div>
                    <div className="flex gap-1">
                        <div className="text-muted-foreground text-nowrap">Tiến độ:</div>
                        <div className="text-primary font-semibold">3</div>
                        <div className="text-muted-foreground text-nowrap">/ 30</div>
                    </div>
                </div>

            </div>

            <TitleLine title={"LỘ TRÌNH"} />

            <div className="flex flex-col w-full gap-4">
                {
                    Topics.map((item) => {
                        return (
                            <TopicCard
                                key={item.order}
                                {...item}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}