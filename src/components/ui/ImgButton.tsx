import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";

// clone button component from another repo

//thiết kế variant cho size + vị trí của icon
const buttonVariants = cva(
    "cursor-pointer flex items-center select-none",
    {
        variants: {
            iconPosition: {
                left: "flex-row",
                right: "flex-row-reverse",
                top: "flex-col",
                bottom: "flex-col-reverse"
            }
        },
        defaultVariants: {
            iconPosition: "left"
        }
    }
);

const iconSizeVariants = {
    '2xs': 'w-3',
    xs: 'w-5',
    sm: 'w-7',
    md: 'w-10',
    lg: 'w-12',
    xl: 'w-15',
    '2xl': 'w-24',
    '3xl': 'w-32',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    text?: string,
    className?: string,
    iconName?: string,
    iconSize?: keyof typeof iconSizeVariants;
}

export const ImgButton = (
    {
        type = 'button',
        text = '',
        iconName,
        iconPosition,
        iconSize = 'xs',
        className = '',
        ...props
    }: ButtonProps
) => {
    return (
        <button type={type} title={text} className={cn(buttonVariants({ iconPosition }), className)} {...props}>
            {iconName &&
                <div className={iconSizeVariants[iconSize]}>
                    <Icon name={iconName} />
                </div>
            }
            <div>{text}</div>
        </button>
    )
}