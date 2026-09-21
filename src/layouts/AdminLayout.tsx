import { NavBar } from '@/components/NavBar';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen">
            <div>
                <NavBar/>
            </div>

            <main className="flex-1 bg-background">
                <Outlet />
            </main>

        </div>
    );
}