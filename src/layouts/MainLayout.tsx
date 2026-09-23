// MainLayout.tsx
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function MainLayout() {
    return (
        <div className="flex h-dvh flex-col">
            <div className="shrink-0">
                <Header />
            </div>

            <main className="flex-1 bg-background overflow-y-auto">
                <Outlet />
            </main>

            <div className="shrink-0">
                <Footer />
            </div>
        </div>
    );
}