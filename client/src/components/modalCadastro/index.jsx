import React, { useState, useEffect } from "react";
import { Modal } from "../Modal";
import PropTypes from "prop-types";
import CustomButton from "../Button/CustomButton";

const API_BASE_URL = "https://log-tour..com/"; 

export function AuthModal({ isOpen, setOpen, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    setFade(false);
    const timeout = setTimeout(() => {
      resetForm();
      setFade(true);
    }, 150);
    return () => clearTimeout(timeout);
  }, [isLogin]);

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setErrorUsername("");
    setErrorPassword("");
    setGeneralError("");
    setIsLoading(false);
  };

  const validate = () => {
    let valid = true;
    if (!username) {
      setErrorUsername("Por favor, insira seu usuário!");
      valid = false;
    } else {
      setErrorUsername("");
    }

    if (!password) {
      setErrorPassword("Por favor, insira sua senha!");
      valid = false;
    } else {
      setErrorPassword("");
    }
    return valid;
  };

  const handleLoginRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erro ao realizar login");
    }

    return data;
  };

  const handleSignupRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/user/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erro ao criar conta");
    }

    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    if (!validate()) return;

    setIsLoading(true);

    try {
      let authData;

      if (isLogin) {
        authData = await handleLoginRequest();
      } else {
        await handleSignupRequest();
        
        authData = await handleLoginRequest();
      }

      const userData = {
        username: username,
        token: authData.token,
        avatar: `https://ui-avatars.com/api/?name=${username}&background=2563eb&color=fff&size=128`
      };

      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }

      resetForm();
      setOpen(false);

    } catch (err) {
      console.error(err);
      setGeneralError(err.message);
    } finally {
      setIsLoading(false);
    }
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

        {generalError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome de Usuário
            </label>
            <input
              type="text"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className={`border p-2 rounded w-full ${
                errorUsername ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errorUsername && (
              <p className="text-red-600 text-sm mt-1">{errorUsername}</p>
            )}
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
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
            label={
              isLoading 
                ? "Carregando..." 
                : isLogin ? "Entrar" : "Cadastrar"
            }
            disabled={isLoading}
            width="w-full"
            className={`!bg-[#147FDF] !text-white h-12 rounded-xl shadow-lg hover:brightness-90 hover:shadow-xl transition ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          />
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            disabled={isLoading}
            className="text-[#147FDF] hover:underline font-bold"
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