import { Input } from '@/components/ui/input';
import BackButton from '../../components/BackButton';
import LevelFilter from '../../features/student-notebook/components/LevelFilter';
import { ImgButton } from '../../components/ui/ImgButton';
import VocabularyCard from '@/features/student-notebook/components/VocabularyCard';
export function PracticeNotebookPage() {

    return (
        <div className="flex flex-col h-full items-center p-3 gap-3">
            <div className="flex w-full gap-2">
                <BackButton />
                <div className="text-xl font-semibold">
                    Sổ tay ôn tập
                </div>
            </div>

            <LevelFilter />

            <div className='w-full flex gap-1'>
                <Input
                    className='h-12'
                    placeholder='Nhập từ vựng cần tìm'
                />
                <ImgButton
                    className='rounded-md bg-primary px-5 text-white active:bg-primary/80'
                    text='Tìm'
                />
                <ImgButton
                    className='rounded-md bg-card-background px-5 text-muted-foreground active:bg-card-background/80 text-nowrap'
                    text='Lưu trữ'
                />
            </div>
            <VocabularyCard />
        </div>
    )
} 