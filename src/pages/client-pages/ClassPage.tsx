import { ClassBox } from '../../features/student-classes/components/ClassBox';

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
        </div>
    )
}