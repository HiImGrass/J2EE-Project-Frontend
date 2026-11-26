import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from './ui/icon';

interface FooterOptionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    iconName: string;
    selected?: boolean;
}

export function FooterOptionButton({
    text,
    iconName,
    selected = false,
    className = '',
    ...props
}: FooterOptionButtonProps) {
    return (
        <button
            type="button"
            title={text}
            aria-current={selected ? 'page' : undefined}
            className={cn(
                'cursor-pointer flex flex-col items-center justify-between select-none',
                'text-(--footer-option-color) hover:text-(--footer-option-selected-color)',
                selected && 'text-(--footer-option-selected-color)',
                className,
            )}
            {...props}
        >
            <span className="block size-4"><Icon name={iconName} /></span>
            <span>{text}</span>
            <div
                className={cn('block size-1.5 rounded-full', selected ? 'bg-primary-text' : 'bg-transparent')}
                aria-hidden="true"
            />
        </button>
    );
}
