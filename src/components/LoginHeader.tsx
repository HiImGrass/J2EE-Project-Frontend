import { ThemeToggle } from "./ThemeToggle";
import { Icon } from "./ui/icon";

export default function LoginHeader() {
    return (
        <header className="flex shrink-0 items-center gap-2 border-b border-border px-4 py-3">
            <div className="size-8 text-primary">
                <Icon name="logo" />
            </div>
            <span className="text-2xl font-semibold text-primary-text">LA2P</span>
            <div className="ml-auto"><ThemeToggle /></div>
        </header>
    )
}
