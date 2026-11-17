import { StudentTitleCard } from "@/components/StudentTitleCard";
import { ImgButton } from "@/components/ui/ImgButton";
import { type MemoryLevelCounts, MemoryLevelChart } from "@/features/vocabulary-training/components/MemoryLevelChart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MAX_WORDS_PER_SESSION = 10;
const TEST_COUNTDOWN_SECONDS = 10; // Tạm 1 phút để test

function formatTime(totalSeconds: number): string {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

/** Đếm ngược theo mốc thời gian thật, nên vẫn đúng khi tab bị trình duyệt làm chậm */
function useCountdown(seconds: number): number {
    const [remaining, setRemaining] = useState(seconds);

    useEffect(() => {
        const endAt = Date.now() + seconds * 1000;
        setRemaining(seconds);

        const id = setInterval(() => {
            const left = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
            setRemaining(left);
            if (left === 0) clearInterval(id);
        }, 250);

        return () => clearInterval(id);
    }, [seconds]);

    return remaining;
}

export function VocabularyTrainingPage() {
    const navigate = useNavigate();

    const counts: MemoryLevelCounts = [38, 24, 17, 9, 4];

    // Số từ ở level thấp nhất (Lv 1), tối đa 10 từ mỗi lần ôn
    const wordsToReview = Math.min(counts[0], MAX_WORDS_PER_SESSION);

    const remaining = useCountdown(TEST_COUNTDOWN_SECONDS);
    const isReady = remaining === 0;

    const handleStartReview = () => {
        navigate("/practice-vocabulary")
    };

    return (
        <div className="flex h-full flex-col items-center gap-3 p-3">
            <StudentTitleCard title={"ÔN TẬP TỪ VỰNG"} />
            <div className="flex w-full h-full flex-col justify-center items-center gap-3">

                <MemoryLevelChart counts={counts} />

                <p>Chuẩn bị ôn tập
                    <span className="px-1 text-primary font-bold text-lg">
                        {wordsToReview}
                    </span>
                    từ</p>

                {isReady ? (
                    <ImgButton
                        text="Ôn tập ngay"
                        onClick={handleStartReview}
                        className="justify-center rounded-lg bg-primary px-6 py-2 text-white"
                    />
                ) : (
                    <ImgButton
                        iconName="alarm-clock"
                        text={formatTime(remaining)}
                        disabled
                        className="text-white justify-center rounded-lg px-6 py-2 bg-slate-400 cursor-default gap-2 tabular-nums"
                    />
                )}
            </div>

        </div>
    );
}