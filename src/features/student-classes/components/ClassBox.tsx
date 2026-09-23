import { Image } from "@/components/ui/image";
import { getClassroomPublicId } from "@/utils/IdCRImageRenderer";
import { ImgButton } from '../../../components/ui/ImgButton';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

interface ClassBoxProp {
    classId: number,
    name: string,
    teacherName: string
}

export function ClassBox({
    classId,
    name,
    teacherName
}: ClassBoxProp) {
    const classPublicId = getClassroomPublicId(classId);

    const hiddenClass = () => {
        console.log("Ẩn")
    }

    const cancelClass = () => {
        console.log("Hủy đăng ký")
    }

    return (
        <div className="relative w-full h-34 flex items-center justify-center overflow-hidden rounded-xl">
            {/* 1. Component Image đóng vai trò làm nền */}
            <Image
                publicId={classPublicId}
                // hoặc src="/path/to/bg.jpg"
                aspect="auto"
                objectFit="cover"
                className="absolute inset-0 z-0" // Phủ kín thẻ cha và nằm ở lớp dưới cùng
            />

            {/* 2. Lớp phủ tối (Dark Overlay) giúp chữ dễ đọc hơn nếu ảnh sáng */}
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-transparent z-1" />

            {/* 3. Nội dung đè lên trên ảnh nền */}
            <div className="w-full h-full px-4 py-4 flex flex-col justify-between text-white z-10">
                <div className="w-full flex gap-2 justify-between items-center">
                    <div className="text-2xl truncate">{name}</div>
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <ImgButton iconName="more-horizontal" text="" className="text-white" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem className="px-4 py-2 active:bg-accent" onClick={() => hiddenClass()}>
                                Ẩn
                            </DropdownMenuItem>

                            <DropdownMenuItem className="px-4 py-2 active:bg-accent" onClick={() => cancelClass()}>
                                Hủy đăng ký
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div>{teacherName}</div>
            </div>
        </div>
    );
}