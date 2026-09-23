import { Icon } from "./icon";

interface IconButtonProps {
    name: string,
    className?: string
}

export const IconButton = (
    {
        name = 'Default',
        className = ''
    }: IconButtonProps
) => {
    return (
        <div className={`w-full h-full ${className}`}>
            <Icon name={name}></Icon>
            
        </div>
    );
}