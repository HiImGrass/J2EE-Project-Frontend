import { useState } from 'react';
import { ImgButton } from './ui/ImgButton';
import { useNavigate } from 'react-router-dom';

const MenuItems = [
    {
        key: 1,
        text: "Ôn tập",
        name: "pencil",
        path: "/student-practice"
    },
    {
        key: 2,
        text: "Học từ mới",
        name: "book-open",
        path: "student-learning-path"
    },
    {
        key: 3,
        text: "Sổ tay",
        name: "book",
        path: "student-notebook"
    },
]

export function Footer() {
    const [activeKey, setActiveKey] = useState<number>(2);

    const handleSelectionItem = (key: number, path: string) => {
        setActiveKey(key);
        NavToSelectionPage(path);
    }

    const navigate = useNavigate();

    const NavToSelectionPage = (path: string) => {
        navigate(path);
    }

    return (
        <div className='h-16 w-full bg-background flex justify-between p-2'>
            {
                MenuItems.map((item, key) => {
                    const isActive = activeKey === item.key;
                    return (
                        <ImgButton
                            key={key}
                            text={item.text}
                            iconName={item.name}
                            iconPosition={'top'}
                            className={`px-4 py-2 flex-1 hover:text-primary ${isActive ? "text-primary" : ""}`}
                            onClick={() => handleSelectionItem(item.key, item.path)}
                        />
                    )
                })
            }
        </div>
    )

}