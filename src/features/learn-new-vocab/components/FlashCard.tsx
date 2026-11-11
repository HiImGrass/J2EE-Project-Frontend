import { Icon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';
import { useState } from 'react';

export interface FlashCardProps {
    word: string;
    example: string; // câu ví dụ có chứa từ vựng
    pronunciation: string; // phát âm, vd: /skuːl/
    meaning: string;
    partOfSpeech: string; // từ loại, vd: noun
    publicId?: string;
    src?: string;
    onPlay?: () => void; // nút loa
    onPlaySlow?: () => void; // nút ốc sên
}

// Tách câu ví dụ để in đậm + gạch chân từ vựng
const renderExample = (example: string, word: string) => {
    const index = example.toLowerCase().indexOf(word.toLowerCase());
    if (index === -1) return example;

    const before = example.slice(0, index);
    const match = example.slice(index, index + word.length);
    const after = example.slice(index + word.length);

    return (
        <>
            {before}
            <strong className="underline">{match}</strong>
            {after}
        </>
    );
};

// Style chung cho 2 mặt thẻ: chồng lên nhau, ẩn mặt lưng khi bị lật
const FACE =
    'absolute inset-0 p-6 bg-gray-100 rounded-2xl [backface-visibility:hidden] [-webkit-backface-visibility:hidden] shadow-xl';

export const FlashCard = ({
    word,
    example,
    pronunciation,
    meaning,
    partOfSpeech,
    publicId = 'School_okqkhw',
    src,
    onPlay,
    onPlaySlow,
}: FlashCardProps) => {
    const [isFlipped, setIsFlipped] = useState<boolean>(false);

    const flipCard = () => {
        setIsFlipped((prev) => !prev)
    }

    return (
        // Khung chứa: tạo chiều sâu 3D
        <div
            className="w-72 h-112 perspective-[1000px]"
            onClick={() => flipCard()}
        >
            {/* Phần xoay: lật 180 độ quanh trục Y */}
            <div
                className={`relative w-full h-full transition-transform duration-500 transform-3d ${isFlipped ? 'transform-[rotateY(180deg)]' : ''
                    }`}
            >
                {/* ===== Mặt trước ===== */}
                <div className={FACE}>
                    <div className="h-full flex flex-col gap-4 items-center">
                        <div className='w-full p-4'>
                            <Image publicId={publicId} src={src} aspect="square" alt={word} />
                        </div>

                        <div className="flex flex-row gap-4">
                            <button type="button" onClick={onPlay} className="w-8 h-8">
                                <Icon name="volume" />
                            </button>
                            <button type="button" onClick={onPlaySlow} className="w-8 h-8">
                                <Icon name="snail" />
                            </button>
                        </div>

                        <div className='text-center'>
                            {renderExample(example, word)}
                        </div>
                    </div>
                    <div
                        className="absolute bottom-4 right-4 w-8 h-8"
                    >
                        <Icon name="hand" />
                    </div>
                </div>

                {/* ===== Mặt sau (xoay sẵn 180 độ) ===== */}
                <div className={`${FACE} transform-[rotateY(180deg)]`}>
                    <div className="h-full flex flex-col gap-4 justify-center items-center">
                        <div className="text-2xl font-medium">{word}</div>
                        <p>{pronunciation}</p>
                        <p>
                            {meaning} ({partOfSpeech})
                        </p>
                    </div>
                    <div
                        className="absolute bottom-4 right-4 w-8 h-8"
                    >
                        <Icon name="hand" />
                    </div>
                </div>
            </div>
        </div>
    );
};