import { Icon } from './ui/icon';
import { AccountAvatar } from './AccountAvatar';
import { ThemeToggle } from './ThemeToggle';




export function Header() {
    return (
        <div className='p-2 flex flex-row justify-between items-center w-full h-14'>
            {/* logo */}
            <div className='flex gap-2'>
                <div className='size-8'>
                    <Icon name='logo' className='text-primary' />
                </div>

                <div className='text-primary-text text-2xl font-semibold'>
                    LA2P
                </div>
            </div>

            <div className="flex items-center gap-2">
                <ThemeToggle />
                <AccountAvatar/>

            </div>
        </div>
    )

}
