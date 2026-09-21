export type SVGComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface ViteSVGRModule {
    default: SVGComponent;
}

const svgModules = import.meta.glob('./*.svg', { 
    eager: true, 
    query: '?react' 
}) as Record<string, ViteSVGRModule>

const svgs: Record<string, SVGComponent> = {}

for (const path in svgModules) {
    const fileName = path.replace('./', '').replace('.svg', '');
    svgs[fileName] = svgModules[path].default;
}

export default svgs;