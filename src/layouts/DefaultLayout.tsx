import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
    return (
        <div className="flex h-dvh flex-col">
            <main className="flex-1 bg-background overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};