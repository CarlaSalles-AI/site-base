export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-light mb-4">404</h1>
        <p className="text-muted-foreground">Página não encontrada</p>
        <a href="/" className="text-sm mt-4 inline-block hover:underline">
          Voltar para Home
        </a>
      </div>
    </div>
  );
}