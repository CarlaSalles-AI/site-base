import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { getAuthHeaders } from '../../lib/supabase';

export default function Diagnostico() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testCreateProject = async () => {
    setLoading(true);
    setResult(null);

    try {
      const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-a04a6230`;
      const authHeaders = getAuthHeaders();
      
      const testData = {
        title: 'TESTE DIAGNÓSTICO',
        slug: 'teste-diagnostico-' + Date.now(),
        category: ['Branding', 'Design Comercial'],
        short_description: 'Teste de diagnóstico',
        full_description: 'Teste completo',
        cover_image_url: 'https://via.placeholder.com/400',
        gallery: [],
        tags: ['teste'],
        featured: false,
        published: false
      };

      console.log('🔍 Enviando requisição POST:', testData);
      console.log('🔍 Headers:', authHeaders);

      const response = await fetch(`${SERVER_URL}/portfolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders
        },
        body: JSON.stringify(testData)
      });

      console.log('🔍 Response status:', response.status);
      
      const responseText = await response.text();
      console.log('🔍 Response text:', responseText);

      let resultData;
      try {
        resultData = JSON.parse(responseText);
      } catch {
        resultData = responseText;
      }

      setResult({
        success: response.ok,
        status: response.status,
        data: resultData,
        request: testData
      });

    } catch (error: any) {
      console.error('🔍 Erro no teste:', error);
      setResult({
        success: false,
        error: error.message || String(error)
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-light mb-8">Diagnóstico - Criar Projeto</h1>

        <Card className="p-6 mb-6">
          <Button 
            onClick={testCreateProject} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Testando...' : 'Testar Criação de Projeto'}
          </Button>
        </Card>

        {result && (
          <Card className="p-6">
            <h2 className="text-2xl font-light mb-4">
              {result.success ? '✅ Sucesso' : '❌ Erro'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <strong className="text-sm text-muted-foreground">Status HTTP:</strong>
                <p className="font-mono text-sm bg-muted p-2 rounded mt-1">
                  {result.status || 'N/A'}
                </p>
              </div>

              {result.request && (
                <div>
                  <strong className="text-sm text-muted-foreground">Dados Enviados:</strong>
                  <pre className="font-mono text-xs bg-muted p-4 rounded mt-1 overflow-auto">
                    {JSON.stringify(result.request, null, 2)}
                  </pre>
                </div>
              )}

              <div>
                <strong className="text-sm text-muted-foreground">
                  {result.success ? 'Resposta:' : 'Erro:'}
                </strong>
                <pre className="font-mono text-xs bg-muted p-4 rounded mt-1 overflow-auto max-h-96">
                  {typeof result.data === 'string' 
                    ? result.data 
                    : JSON.stringify(result.data, null, 2)}
                  {result.error && result.error}
                </pre>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>💡 Dica:</strong> Abra o console do navegador (F12) para ver logs detalhados
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}