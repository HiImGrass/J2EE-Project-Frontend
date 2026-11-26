import { StudentTitleCard } from "@/components/StudentTitleCard";
import { TitleLine } from "@/components/TitleLine";
import { TopicCard } from "@/features/learn-new-vocab/components/TopicCard";
import { LearningPathProgressBar } from "@/features/study/components/LearningPathProgressBar";

interface LearningPathPageProp {
    teacherName?: string,
}

const Topics = [
    {
        id: 1,
        learning_path_id: 1,
        topic_name: 'Schools',
        image_url: 'TACB_lesson_35_jysllp',
        description: 'Trường học',
        status: 'LEARNED',
    },
    {
        id: 2,
        learning_path_id: 1,
        topic_name: 'Examination',
        image_url: 'TACB_lesson_36_sdmltv',
        description: 'Kì thi',
        status: 'LEARNED',
    },
    {
        id: 3,
        learning_path_id: 1,
        topic_name: 'Extracurricular Activities',
        image_url: 'TACB_lesson_2_x4x3uv',
        description: 'Hoạt động ngoại khóa',
        status: 'LEARNED',
    },
    {
        id: 4,
        learning_path_id: 1,
        topic_name: 'School Stationery',
        image_url: 'TACB_lesson_31_jgv0cy',
        description: 'Dụng cụ học tập',
        status: 'UNLEARNED',
    },
    {
        id: 5,
        learning_path_id: 1,
        topic_name: 'School Subjects',
        image_url: 'TACB_lesson_32_uhx1yx',
        description: 'Các môn học',
        status: 'UNLEARNED',
    },
    {
        id: 6,
        learning_path_id: 1,
        topic_name: 'Classroom',
        image_url: 'TACB_lesson_33_r4g7yi',
        description: 'Lớp học',
        status: 'UNLEARNED',
    },
    {
        id: 7,
        learning_path_id: 1,
        topic_name: 'Universities',
        image_url: 'TACB_lesson_34_jucogo',
        description: 'Trường đại học',
        status: 'UNLEARNED',
    },
    {
        id: 8,
        learning_path_id: 1,
        topic_name: 'Body',
        image_url: 'TACB_lesson_8_q6s0yf',
        description: 'Bộ phận cơ thể',
        status: 'UNLEARNED',
    },
    {
        id: 9,
        learning_path_id: 1,
        topic_name: 'Appearance',
        image_url: 'TACB_lesson_9_xizzq9',
        description: 'Ngoại hình',
        status: 'UNLEARNED',
    },
    {
        id: 10,
        learning_path_id: 1,
        topic_name: 'Characteristics',
        image_url: 'TACB_lesson_10_fndmkd',
        description: 'Tính cách',
        status: 'UNLEARNED',
    },
    {
        id: 11,
        learning_path_id: 1,
        topic_name: 'Age',
        image_url: 'TACB_lesson_11_fbrbkz',
        description: 'Tuổi tác',
        status: 'UNLEARNED',
    },
    {
        id: 12,
        learning_path_id: 1,
        topic_name: 'Feelings',
        image_url: 'TACB_lesson_12_ytly0c',
        description: 'Cảm xúc',
        status: 'UNLEARNED',
    },
    {
        id: 13,
        learning_path_id: 1,
        topic_name: 'Family',
        image_url: 'TACB_lesson_13_vmsbpd',
        description: 'Gia đình',
        status: 'UNLEARNED',
    },
    {
        id: 14,
        learning_path_id: 1,
        topic_name: 'Relationships',
        image_url: 'TACB_lesson_14_owhj5g',
        description: 'Các mối quan hệ',
        status: 'UNLEARNED',
    },
    {
        id: 15,
        learning_path_id: 1,
        topic_name: 'Colours',
        image_url: 'TACB_lesson_6_jlfzxz',
        description: 'Màu sắc',
        status: 'UNLEARNED',
    },
    {
        id: 16,
        learning_path_id: 1,
        topic_name: 'Shapes',
        image_url: 'TACB_lesson_7_iq1ogs',
        description: 'Hình dạng',
        status: 'UNLEARNED',
    },
    {
        id: 17,
        learning_path_id: 1,
        topic_name: 'Numbers',
        image_url: 'TACB_lesson_17_yldz3i',
        description: 'Số đếm',
        status: 'UNLEARNED',
    },
    {
        id: 18,
        learning_path_id: 1,
        topic_name: 'Ordinal Numbers',
        image_url: 'TACB_lesson_37_inz0og',
        description: 'Số thứ tự',
        status: 'UNLEARNED',
    },
    {
        id: 19,
        learning_path_id: 1,
        topic_name: 'Days In A Week',
        image_url: 'TACB_lesson_95_sh95xg',
        description: 'Ngày trong tuần',
        status: 'UNLEARNED',
    },
    {
        id: 20,
        learning_path_id: 1,
        topic_name: 'Talking About Time',
        image_url: 'TACB_lesson_4_mtaw4l',
        description: 'Nói về thời gian',
        status: 'UNLEARNED',
    }
] as const;

export function LearningPathPage({
    teacherName = "Nguyễn Thanh Phước",

}: LearningPathPageProp) {
    return (
        <div className="flex flex-col items-center px-3 py-3 gap-8">
            <div className="flex flex-col w-full gap-2">
                <StudentTitleCard title={"LUYỆN THI IELTS KHÓA 25"} />
                <div className="flex flex-col w-full justify-between gap-2 px-1">
                    <div className="flex gap-1 min-w-0">
                        <div className=" text-nowrap">GV:</div>
                        <div className="text-primary-text font-semibold truncate">{teacherName}</div>
                    </div>
                    <div className="flex gap-1 justify-between">
                        <div className="text-nowrap">Tiến độ:</div>
                        <div className="flex gap-2">
                            <div className="flex">
                                <div className="text-primary-text font-semibold">3</div>
                                <div className=" text-nowrap">/30</div>
                            </div>
                            <div>chủ đề</div>
                        </div>
                    </div>
                    <LearningPathProgressBar current={3} total={30} />
                </div>

            </div>


            <div className="flex flex-col w-full gap-4">
                {
                    Topics.map((item) => {
                        return (
                            <TopicCard
                                key={item.id}
                                {...item}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}
