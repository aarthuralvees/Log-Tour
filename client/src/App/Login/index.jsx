import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (!email || !senha) return setErro("Preencha email e senha.");
    // mock simples
    if (email === "teste@email.com" && senha === "1234") {
      localStorage.setItem("token", "fake-token");
      window.location.href = "/"; // redireciona pra Home
    } else {
      setErro("Credenciais inválidas");
    }
  }

  return (
    <main style={{maxWidth:360, margin:"48px auto"}}>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" value={senha} onChange={e=>setSenha(e.target.value)} />
        {erro && <p style={{color:"blue"}}>{erro}</p>}
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}