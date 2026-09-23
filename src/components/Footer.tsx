import { useState } from 'react';
import { ImgButton } from './ui/ImgButton';

const MenuItems = [
    {
        key: 1,
        text: "Ôn tập",
        name: "pencil"
    },
    {
        key: 2,
        text: "Học từ mới",
        name: "book-open"
    },
    {
        key: 3,
        text: "Sổ tay",
        name: "book"
    },
]

export function Footer() {
    const [activeKey, setActiveKey] = useState<number>(1);
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
                            onClick={() => setActiveKey(item.key)}
                        />
                    )
                })
            }
        </div>
    )

}