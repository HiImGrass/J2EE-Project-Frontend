import svgs from "@/assets/icons"
import type { SVGComponent } from "@/assets/icons" 

interface IconProps {
    name: string,
    className?: string
}

export const Icon = (
    {
        name = 'Default',
        className = ''
    }: IconProps
) => {
    const SvgComponent: SVGComponent = svgs[name];
    return (
        <div className={`w-full h-full`}>
            {SvgComponent && <SvgComponent
                className={`w-full h-full ${className}`}
            />}
        </div>
    );
}