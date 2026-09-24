import { Header } from '@/components/Header';
import { Outlet } from 'react-router-dom';

export const HeaderOnlyLayout = () => {
    return (
        <div className="flex h-dvh flex-col">
            <div className='shrink-0'>
                <Header />
            </div>
            <main className="flex-1 bg-background overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};