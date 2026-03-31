import { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router';
import { auth } from '../../../lib/auth';
import { LayoutDashboard, Briefcase, Image, Settings, Users, LogOut, Mail } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

export default function AdminLayout() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    auth.getSession()
      .then(s => {
        if (!s) {
          navigate('/login');
        } else {
          setSession(s);
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    toast.success('Logout realizado com sucesso');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const isAdminMaster = session.role === 'admin_master';

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-light">Marca do cliente</h1>
          <p className="text-xs text-sidebar-foreground/60 mt-1">{session.name}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {isAdminMaster && (
            <Link
              to="/admin"
              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive('/admin')
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          )}

          <Link
            to="/admin/portfolio"
            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive('/admin/portfolio')
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Portfólio
          </Link>

          <Link
            to="/admin/media"
            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive('/admin/media')
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50'
            }`}
          >
            <Image className="w-4 h-4" />
            Mídia
          </Link>

          <Link
            to="/admin/mensagens"
            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive('/admin/mensagens')
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50'
            }`}
          >
            <Mail className="w-4 h-4" />
            Mensagens
          </Link>

          {isAdminMaster && (
            <>
              <Link
                to="/admin/settings"
                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive('/admin/settings')
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50'
                }`}
              >
                <Settings className="w-4 h-4" />
                Configurações
              </Link>

              <Link
                to="/admin/users"
                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive('/admin/users')
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50'
                }`}
              >
                <Users className="w-4 h-4" />
                Usuários
              </Link>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative">
        <Outlet />
      </main>
    </div>
  );
}