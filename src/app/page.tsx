"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock, User } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("demo@yolobank.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // Default credentials
    const defaultEmail = "demo@yolobank.com";
    const defaultPassword = "123456";
    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    if (email === defaultEmail && password === defaultPassword) {
      setError("");
      router.push("/dashboard");
    } else {
      setError("Email ou senha inválidos.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-primary to-blue-600">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">Email</label>
            <div className="flex items-center border rounded px-2">
              <User className="w-4 h-4 mr-2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border-none focus:ring-0"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="password">Senha</label>
            <div className="flex items-center border rounded px-2">
              <Lock className="w-4 h-4 mr-2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border-none focus:ring-0"
              />
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-center mb-2">
            Email padrão: <b>demo@yolobank.com</b><br />Senha padrão: <b>123456</b>
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <Button type="submit" className="w-full">Entrar</Button>
        </form>
      </Card>
    </div>
  );
}
