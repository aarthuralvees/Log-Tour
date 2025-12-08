import React, { useState, useEffect } from "react";
import { Modal } from "../Modal";
import PropTypes from "prop-types";
import CustomButton from "../Button/CustomButton";


export function AuthModal({ isOpen, setOpen, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [fade, setFade] = useState(true); // animação suave


  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setErrorEmail("");
      setErrorPassword("");
    }
  }, [isOpen]);


  // 🔥 Reseta erros ao trocar Login <> Cadastro + transição suave
  useEffect(() => {
    setFade(false);
    const timeout = setTimeout(() => {
      setEmail("");
      setPassword("");
      setErrorEmail("");
      setErrorPassword("");
      setFade(true);
    }, 150);


    return () => clearTimeout(timeout);
  }, [isLogin]);


  const handleSubmit = (e) => {
    e.preventDefault();


    let valid = true;


    if (!email) {
      setErrorEmail("Por favor, insira seu email!");
      valid = false;
    } else {
      setErrorEmail("");
    }


    if (!password) {
      setErrorPassword("Por favor, insira sua senha!");
      valid = false;
    } else {
      setErrorPassword("");
    }


    if (!valid) return;


    // Criar usuário mockado
    const mockUser = {
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=2563eb&color=fff&size=128`
    };


    if (isLogin) {
      console.log("Login:", { email, password });
    } else {
      console.log("Cadastro:", { email, password });
    }


    // Chamar callback de login com sucesso
    if (onLoginSuccess) {
      onLoginSuccess(mockUser);
    }


    setEmail("");
    setPassword("");
    setOpen(false);
  };


  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <div
        className={`transition-opacity duration-300 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Acesse LogTour" : "Cadastre-se no LogTour"}
        </h2>


        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              placeholder="Insira seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`border p-2 rounded w-full ${
                errorEmail ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errorEmail && (
              <p className="text-red-600 text-sm mt-1">{errorEmail}</p>
            )}
          </div>


          <div>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`border p-2 rounded w-full ${
                errorPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errorPassword && (
              <p className="text-red-600 text-sm mt-1">{errorPassword}</p>
            )}
          </div>


          <CustomButton
            type="submit"
            variant="borrow"
            label={isLogin ? "Entrar" : "Cadastrar"}
            width="w-full"
            className="!bg-[#147FDF] !text-white h-12 rounded-xl shadow-lg hover:brightness-90 hover:shadow-xl transition"
          />
        </form>


        <p className="mt-4 text-sm text-center text-gray-600">
          {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#147FDF] hover:underline"
          >
            {isLogin ? "Cadastre-se" : "Acesse"}
          </button>
        </p>
      </div>
    </Modal>
  );
}


AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func,
};
