"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import ShaderBackground from "@/components/shader-background";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import Header from "@/components/header";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";


const EmailChip = ({
  email,
  onRemove,
}: {
  email: string;
  onRemove: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm text-white backdrop-blur-md"
    >
      <span>{email}</span>
      <button
        onClick={onRemove}
        className="text-white/70 hover:text-white transition-colors"
      >
        ×
      </button>
    </motion.div>
  );
};

export default function CreateEmailPage() {
  const [html, setHtml] = useState<string>(
    '<h1 style="font-family:Arial">Olá 👋</h1><p>Seu teste de email.</p>'
  );
  const [recipients, setRecipients] = useState<string[]>([]);
  const [newRecipient, setNewRecipient] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [isPreview, setIsPreview] = useState(false);

  const previewSrcDoc = useMemo(() => {
    return `${html}`;
  }, [html]);

  const emailSchema = z
    .string()
    .trim()
    .email({ message: "Email inválido" })
    .max(254, { message: "Email muito longo" });

  const addRecipient = (email: string) => {
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message ?? "Email inválido");
      return;
    }
    if (recipients.length >= 3) {
      toast.error("Máximo de 3 destinatários");
      return;
    }
    if (recipients.includes(email)) {
      toast.error("Este email já foi adicionado");
      return;
    }
    setRecipients([...recipients, email]);
    setNewRecipient("");
  };

  const removeRecipient = (index: number) => {
    const next = recipients.filter((_, i) => i !== index);
    setRecipients(next);
  };

  const handleSend = async () => {
    const to = recipients
      .map((r) => r.trim())
      .filter((r) => r.length > 0);
    if (to.length === 0) {
      toast.error("Adicione pelo menos um destinatário válido.");
      return;
    }
    // valida todos os emails com zod
    const invalid = to.find((r) => !emailSchema.safeParse(r).success);
    if (invalid) {
      toast.error(`Email inválido: ${invalid}`);
      return;
    }
    if (!subject.trim()) {
      toast.error("Informe o assunto do email");
      return;
    }
    if (!html.trim()) {
      toast.error("Informe o conteúdo HTML");
      return;
    }

    const tid = toast.loading("Enviando email...");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, html }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Falha ao enviar.");

      toast.success("Email enviado com sucesso!");
      console.log("Email info:", data);
    } catch (err: any) {
      toast.error(err?.message ?? "Falha ao enviar email");
    } finally {
      toast.dismiss(tid);
    }
  };

  return (
      <main className="relative min-h-screen pt-12 pb-10 px-6 z-20 overflow-hidden">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-white text-3xl font-bold mb-8 drop-shadow-lg">
            New Email test
          </h1>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 mb-8  backdrop-blur-md shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <label className="text-white font-medium text-lg">
                Recipients (máx. 3)
              </label>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <span>{recipients.length}/3</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-4 min-h-[44px]">
              <div className="flex flex-col md:flex-row gap-2">
                {recipients.length < 3 && (
                  <>
                    <input
                      type="email"
                      placeholder="email@exemplo.com"
                      value={newRecipient}
                      onChange={(e) => setNewRecipient(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && addRecipient(newRecipient)
                      }
                      className="flex-1 rounded-full bg-zinc-900/70 text-white placeholder-white/40 px-4 py-2 outline-none border border-transparent focus:border-white/30 transition-colors"
                    />
                    <Button
                      onClick={() => addRecipient(newRecipient)}
                      variant="outline"
                      className="bg-transparent border-white/20 text-white/90 hover:bg-white/10 rounded-full px-6 transition-colors"
                    >
                      Adicionar destinatário
                    </Button>
                  </>
                )}
              </div>
              <AnimatePresence>
                <div className="flex gap-2">
                  {recipients.map((email, index) => (
                    <EmailChip
                      key={email}
                      email={email}
                      onRemove={() => removeRecipient(index)}
                    />
                  ))}
                </div>
              </AnimatePresence>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 mb-8 backdrop-blur-md shadow-xl">
            <label className="text-white font-medium text-lg mb-4 block">
              Subject Line
            </label>
            <input
              type="text"
              placeholder="Enter the subject line"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-full bg-zinc-900/70 text-white placeholder-white/40 px-4 py-2 outline-none border border-transparent focus:border-white/30 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsPreview(false)}
                className="bg-transparent border-white/20 text-white/90 hover:bg-white/10 rounded-full px-6 transition-colors"
              >
                HTML
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsPreview(true)}
                className="bg-transparent border-white/20 text-white/90 hover:bg-white/10 rounded-full px-6 transition-colors"
              >
                Preview
              </Button>
            </div>

            <div>
              {!isPreview ? (
                <section className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-md shadow-xl">
                  <h2 className="text-white font-medium text-lg mb-4">
                    Editor de HTML
                  </h2>
                  <AceEditor
                    mode="html"
                    theme="dracula"
                    name="html-editor"
                    value={html}
                    onChange={setHtml}
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                      enableBasicAutocompletion: true,
                      enableLiveAutocompletion: true,
                      enableSnippets: true,
                      showLineNumbers: true,
                      tabSize: 2,
                    }}
                    width="100%"
                    height="600px"
                    className="w-full rounded-lg overflow-hidden border border-white/10"
                  />
                </section>
              ) : (
                <section className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-md shadow-xl">
                  <h2 className="text-white font-medium text-lg mb-4">
                    Preview do Email
                  </h2>
                  <div className="rounded-lg overflow-hidden border border-white/10 bg-white shadow-lg">
                    <iframe
                      title="Email preview"
                      className="w-full min-h-[70vh]"
                      srcDoc={previewSrcDoc}
                      style={{ backgroundColor: "white" }}
                    />
                  </div>
                </section>
              )}
            </div>

          </div>

          <div className="flex justify-center mt-6">
            <Button
              onClick={handleSend}
              className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-3 font-semibold shadow-2xl transition-all hover:scale-105"
            >
              Enviar email de teste
            </Button>
          </div>
        </div>
      </main>
  );
}
