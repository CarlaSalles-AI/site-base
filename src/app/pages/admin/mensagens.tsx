import { useState, useEffect } from 'react';
import { Mail, Calendar, Building, User } from 'lucide-react';
import { motion } from 'motion/react';
import { contactAPI } from '../../../lib/api';
import type { ContactSubmission } from '../../../types';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Mensagens() {
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await contactAPI.getAll();
      setMessages(data);
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando mensagens...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">MENSAGENS DE CONTATO</h1>
          <p className="text-muted-foreground">
            {messages.length} {messages.length === 1 ? 'mensagem recebida' : 'mensagens recebidas'}
          </p>
        </div>

        {messages.length === 0 ? (
          <div className="text-center py-16">
            <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhuma mensagem recebida ainda.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Lista de mensagens */}
            <div className="space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedMessage(message)}
                  className={`
                    p-6 rounded-lg border cursor-pointer transition-all
                    ${selectedMessage?.id === message.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50 bg-card'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{message.nome || message.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>{message.email}</span>
                      </div>
                      {(message.empresa || message.company) && (
                        <div className="flex items-center gap-2 text-sm">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <span>{message.empresa || message.company}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {message.mensagem || message.message}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {formatDistanceToNow(new Date(message.created_at), {
                      addSuffix: true,
                      locale: ptBR
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Detalhe da mensagem selecionada */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              {selectedMessage ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-8 rounded-lg border border-border bg-card"
                >
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedMessage.nome || selectedMessage.name}</h2>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(selectedMessage.created_at).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <a 
                          href={`mailto:${selectedMessage.email}`}
                          className="text-primary hover:underline"
                        >
                          {selectedMessage.email}
                        </a>
                      </div>

                      {selectedMessage.company && (
                        <div className="flex items-center gap-2 text-sm">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <span>{selectedMessage.company}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="font-bold mb-3">MENSAGEM</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                      {selectedMessage.mensagem || selectedMessage.message}
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: Mensagem de contato`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Responder por Email
                    </a>
                  </div>
                </motion.div>
              ) : (
                <div className="p-8 rounded-lg border border-dashed border-border bg-card text-center">
                  <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Selecione uma mensagem para ver os detalhes
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}