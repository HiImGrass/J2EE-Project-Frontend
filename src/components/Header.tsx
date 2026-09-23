import { Icon } from './ui/icon';
import { Image } from './ui/image';
export function Header() {
    return (
        <div className='p-2 flex flex-row justify-between items-center w-full h-12'>
            {/* logo */}
            <div className='flex gap-2'>
                <div className='size-8'>
                    <Icon name='logo' />
                </div>

                <div className='text-primary text-2xl font-semibold'>
                    LA2P
                </div>
            </div>

            <div>
                <Image publicId='type_avatar_initials_eqexyi' />
            </div>
        </div>
    )

}