import { Outlet } from 'react-router';
import { Header } from '../components/site/header';
import { Footer } from '../components/site/footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="flex-1 relative pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}