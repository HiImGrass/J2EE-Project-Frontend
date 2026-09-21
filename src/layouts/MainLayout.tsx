// MainLayout.tsx
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="layout">
      <header>Header / Navbar</header>
      
      <main>
        <Outlet /> 
      </main>

      <footer>Footer</footer>
    </div>
  );
}