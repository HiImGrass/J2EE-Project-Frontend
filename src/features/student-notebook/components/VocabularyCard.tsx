import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface VocabItem {
    id: number;
    word: string;
    partOfSpeech: string;
    meaning: string;
}

export const MOCK_VOCAB: VocabItem[] = [
    { id: 1, word: "abandon", partOfSpeech: "verb", meaning: "từ bỏ, bỏ rơi" },
    { id: 2, word: "benefit", partOfSpeech: "noun", meaning: "lợi ích" },
    { id: 3, word: "consider", partOfSpeech: "verb", meaning: "xem xét, cân nhắc" },
    { id: 4, word: "diverse", partOfSpeech: "adj", meaning: "đa dạng" },
    { id: 5, word: "efficient", partOfSpeech: "adj", meaning: "hiệu quả" },
    { id: 6, word: "flexible", partOfSpeech: "adj", meaning: "linh hoạt" },
    { id: 7, word: "generate", partOfSpeech: "verb", meaning: "tạo ra, sinh ra" },
    { id: 8, word: "habit", partOfSpeech: "noun", meaning: "thói quen" },
    { id: 9, word: "improve", partOfSpeech: "verb", meaning: "cải thiện" },
    { id: 10, word: "journey", partOfSpeech: "noun", meaning: "chuyến đi, hành trình" },
    { id: 11, word: "knowledge", partOfSpeech: "noun", meaning: "kiến thức" },
    { id: 12, word: "limit", partOfSpeech: "noun", meaning: "giới hạn" },
    { id: 13, word: "maintain", partOfSpeech: "verb", meaning: "duy trì" },
    { id: 14, word: "necessary", partOfSpeech: "adj", meaning: "cần thiết" },
    { id: 15, word: "opportunity", partOfSpeech: "noun", meaning: "cơ hội" },
    { id: 16, word: "provide", partOfSpeech: "verb", meaning: "cung cấp" },
    { id: 17, word: "quickly", partOfSpeech: "adv", meaning: "một cách nhanh chóng" },
    { id: 18, word: "reduce", partOfSpeech: "verb", meaning: "giảm bớt" },
    { id: 19, word: "significant", partOfSpeech: "adj", meaning: "quan trọng, đáng kể" },
    { id: 20, word: "tend", partOfSpeech: "verb", meaning: "có xu hướng" },
];

interface VocabularyCardProps {
    items?: VocabItem[];
    onSelectionChange?: (selectedIds: number[]) => void;
}

export default function VocabularyCard({
    items = MOCK_VOCAB,
    onSelectionChange,
}: VocabularyCardProps) {
    const [selected, setSelected] = useState<Set<number>>(new Set());

    const toggle = (id: number, checked: boolean) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (checked) next.add(id);
            else next.delete(id);
            onSelectionChange?.(Array.from(next));
            return next;
        });
    };

    return (
        <div className="w-full flex flex-col rounded-2xl bg-gray-100 p-3 min-h-0 flex-1">
            <ScrollArea className="min-h-0 flex-1">
                <ul className="flex flex-col gap-3 pr-3">
                    {items.map((item) => (
                        <li key={item.id} className="flex items-center gap-3">
                            <div className="flex w-28 shrink-0 flex-col">
                                <span className="font-medium">{item.word}</span>
                                <span className="text-sm text-gray-500">{item.partOfSpeech}</span>
                            </div>

                            <span className="flex-1 text-sm">{item.meaning}</span>

                            <Checkbox
                                className={"rounded-full size-6 border-2"}
                                checked={selected.has(item.id)}
                                onCheckedChange={(checked) => toggle(item.id, checked === true)}
                                aria-label={`Chọn từ ${item.word}`}
                            />
                        </li>
                    ))}
                </ul>
            </ScrollArea>
        </div>
    );
}