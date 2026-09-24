import { ClassBox } from '../../features/student-classes/components/ClassBox';
import { ImgButton } from '../../components/ui/ImgButton';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

const MockClasses = [
    {
        key: 1,
        id: 1,
        name: "LUYỆN THI IELTS 8.0",
        teacherName: "Nguyễn Ngọc Thiên Ân"
    },
    {
        key: 2,
        id: 2,
        name: "LUYỆN THI IELTS 8.0",
        teacherName: "Nguyễn Ngọc Thiên Ân"
    },
    {
        key: 3,
        id: 3,
        name: "LUYỆN THI IELTS 8.0",
        teacherName: "Nguyễn Ngọc Thiên Ân"
    },
    {
        key: 4,
        id: 4,
        name: "LUYỆN THI IELTS 8.0",
        teacherName: "Nguyễn Ngọc Thiên Ân"
    },
    {
        key: 5,
        id: 5,
        name: "LUYỆN THI IELTS 8.0",
        teacherName: "Nguyễn Ngọc Thiên Ân"
    },
    {
        key: 6,
        id: 6,
        name: "LUYỆN THI IELTS 8.0",
        teacherName: "Nguyễn Ngọc Thiên Ân"
    },
    {
        key: 7,
        id: 7,
        name: "LUYỆN THI IELTS 8.0",
        teacherName: "Nguyễn Ngọc Thiên Ân"
    },
    {
        key: 8,
        id: 8,
        name: "LUYỆN THI IELTS 8.0",
        teacherName: "Nguyễn Ngọc Thiên Ân"
    },
    {
        key: 9,
        id: 9,
        name: "LUYỆN THI IELTS 8.0",
        teacherName: "Nguyễn Ngọc Thiên Ân"
    }
]

export function ClassPage() {
    const navigate = useNavigate();

    const JoinClass = () => {
        console.log("join") // xử lý logic join class ở đây

        navigate("/join-class");
    };

    return (
        <div className='flex flex-col p-3 gap-2'>
            {
                MockClasses.map((item) => {
                    return (
                        <ClassBox
                            key={item.id}
                            classId={item.id}
                            name={item.name}
                            teacherName={item.teacherName}
                        />
                    )
                })
            }
            <div className='fixed bottom-6 right-6 z-50'>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <ImgButton
                            iconName='plus'
                            className='text-white bg-primary p-4 rounded-lg'
                        />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-50">
                        <DropdownMenuItem className="px-4 py-2 active:bg-accent" onClick={() => JoinClass()}>
                            Tham gia lớp học mới
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}