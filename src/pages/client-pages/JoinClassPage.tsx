import { Input } from '@/components/ui/input';
import { ImgButton } from '../../components/ui/ImgButton';
import BackButton from '@/components/BackButton';

const Title = "Tham gia lớp học";
const Decsription = "Hỏi giáo viên của bạn để biết mã lớp rồi nhập mã đó vào đây.";

const Tutorial = {
    title: "Cách đăng nhập bằng mã lớp học",
    contents: [
        "• Sử dụng tài khoản được cấp phép",
        "• Sử dụng mã lớp gồm 7 chữ cái hoặc số, không có dấu cách hoặc ký hiệu"
    ]
}

export function JoinClassPage() {
    return (
        <div className='flex flex-col p-3 gap-6'>
            <div className="flex pt-1 gap-2 items-center">
                <BackButton/>
                <div className='text-lg'>
                    {Title}
                </div>
            </div>

            <div>
                {Decsription}
            </div>

            <div className='flex gap-2'>
                <Input placeholder='Mã lớp' className='h-12'>
                </Input>
                <ImgButton
                    text="Tham gia"
                    className='text-nowrap text-white bg-primary px-4 rounded-md active:bg-primary/80'
                />
            </div>

            <div className='flex flex-col gap-1'>
                <div className='font-medium'>
                    {Tutorial.title}
                </div>
                <div className='flex flex-col'>
                    {
                        Tutorial.contents.map((item, key) => {
                            return <div key={key} className=''>
                                {item}
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}