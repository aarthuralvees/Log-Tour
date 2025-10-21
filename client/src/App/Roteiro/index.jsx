import React, { useState, useEffect } from "react";
import ItineraryItem from "../../components/ItineraryItem/index.jsx";
import axios from "axios";
import { useLocation } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export default function Roteiro() {
  const [itineraryData, setItineraryData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation()
  const body = location.state?.body;

  useEffect(() => {
    async function fetchItinerary() {
      try {
        setLoading(true);
        const response = await api.post("/llm/", body);
        setItineraryData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchItinerary();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Gerando seu roteiro
          </h2>
          <p className="text-gray-500 mt-2">Isso pode levar alguns segundos</p>
        </div>
      </div>
    );
  }

  if (!itineraryData) return null;

  const { roteiroSugerido, informacoesGerais } = itineraryData;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Roteiro Sugerido — {informacoesGerais.local}, {informacoesGerais.pais}
      </h1>

      <div className="w-full max-w-3xl">
        {roteiroSugerido.map((dia) => (
          <div key={dia.dia} className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              Dia {dia.dia} — {dia.titulo}
            </h2>

            {dia.atividades.map((atividade, idx) => (
              <ItineraryItem
                key={idx}
                time={atividade.periodo}
                title={atividade.local}
                description={atividade.descricao}
                location={atividade.local}
                link={atividade.linkGoogleMaps}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
