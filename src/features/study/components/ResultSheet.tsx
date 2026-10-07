import { useEffect, useState } from "react";
import type { Word } from "../types";
import { createPortal } from "react-dom";
import { ImgButton } from "@/components/ui/ImgButton";

export function ResultSheet({
    isCorrect,
    vocab,
    onNext,
}: {
    isCorrect: boolean;
    vocab: Word;
    onNext: () => void;
}) {
    const [show, setShow] = useState(false);        // animation trượt lên
    const [expanded, setExpanded] = useState(true); // true = mở rộng, false = thu gọn

    useEffect(() => {
        // Đóng bàn phím để thẻ dính mép dưới màn hình
        (document.activeElement as HTMLElement | null)?.blur();

        const id = requestAnimationFrame(() => setShow(true));
        return () => cancelAnimationFrame(id);
    }, []);

    if (typeof document === "undefined") return null;

    const theme = isCorrect
        ? { bg: "bg-green-100", title: "text-green-700", btn: "bg-green-500" }
        : { bg: "bg-red-100", title: "text-red-700", btn: "bg-red-500" };

    return createPortal(
        <div
            className={`flex flex-col fixed inset-x-0 bottom-0 z-9999 rounded-t-3xl px-5 pt-3
                pb-[max(1rem,env(safe-area-inset-bottom))]
                transition-transform duration-300 ease-out
                ${theme.bg} ${show ? "translate-y-0" : "translate-y-full"}`}
        >
            <div className="flex justify-between items-center">
                <p className={`text-lg font-bold ${theme.title}`}>
                    {isCorrect ? "Chính xác!" : "Chưa đúng rồi!"}
                </p>
                <ImgButton
                    iconName={expanded ? "arrow-down" : "arrow-up"}
                    iconSize="md"
                    onClick={() => setExpanded((v) => !v)}
                    aria-label={expanded ? "Thu gọn" : "Mở rộng"}
                />
            </div>

            {/* Nội dung: thu gọn bằng grid-rows */}
            <div
                className={`grid transition-all duration-300 ease-in-out
                    ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
                <div className="overflow-hidden">
                    <div className="flex flex-col gap-2 pb-4 pt-3">

                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-900">{vocab.word}</span>
                            <span className="text-sm italic text-gray-500">{vocab.partOfSpeech}</span>
                        </div>

                        <p className="text-gray-600">{vocab.pronunciation}</p>
                        <p className="font-medium text-gray-800">{vocab.meaning}</p>

                        <div className="rounded-xl bg-white/60 p-3 text-sm">
                            <p className="text-gray-800">{vocab.example}</p>
                            {vocab.exampleMeaning && (
                                <p className="mt-1 text-gray-500">{vocab.exampleMeaning}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Nút tiếp tục luôn hiển thị, kể cả khi thu gọn */}
            <div className="w-full flex justify-center">
                <ImgButton
                    text="Tiếp tục"
                    onClick={onNext}
                    className={`p-4 text-white rounded-xl text-center text-nowrap ${theme.btn}`}
                />
            </div>
        </div>,
        document.body
    );
}