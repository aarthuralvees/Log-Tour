import React, { useState, useEffect, useRef } from "react";
import ItineraryItem from "../../components/ItineraryItem/index.jsx";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/Button/CustomButton";
import { AiOutlineCheckCircle, AiOutlineHome, AiOutlineCloudUpload } from "react-icons/ai";

const api = axios.create({
  // Use 127.0.0.1 to avoid network resolution errors
  baseURL: "http://127.0.0.1:5000",
});

export default function Roteiro() {
  const [itineraryData, setItineraryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState(null); // null | 'saving' | 'saved' | 'error'
  
  const location = useLocation();
  const navigate = useNavigate();
  const body = location.state?.body;
  
  // Ref to ensure we don't save twice
  const hasSaved = useRef(false);
  // NEW: Ref to ensure we don't fetch AI twice (Protects against React Strict Mode)
  const hasFetchedAI = useRef(false);

  // 1. Fetch from LLM (Generate Trip)
  useEffect(() => {
    async function fetchItinerary() {
      try {
        setLoading(true);
        // FIX: Removed the trailing slash "/"
        const response = await api.post("llm", body); 
        setItineraryData(response.data);
      } catch (error) {
        console.error("Error generating itinerary:", error);
        if (error.response && error.response.status === 429) {
             alert("Muitas solicitações! Aguarde um minuto.");
        } else {
             alert("Erro ao gerar roteiro. Tente novamente.");
        }
        navigate('/chatbot');
      } finally {
        setLoading(false);
      }
    }

    if (body) {
      // ONLY FETCH IF WE HAVEN'T YET
      if (!hasFetchedAI.current) {
          hasFetchedAI.current = true;
          fetchItinerary();
      }
    } else {
      // If accessed directly without data, go back
      navigate('/');
    }
  }, [body, navigate]);

  // 2. Auto-Save to Backend if User is Logged In
  useEffect(() => {
    const saveTripToUser = async () => {
      const token = localStorage.getItem('token');
      
      // Only save if: we have data, we are logged in, and haven't saved yet
      if (itineraryData && token && !hasSaved.current) {
        hasSaved.current = true;
        setSaveStatus('saving');

        try {
          await api.post("trips", {
            informacoesGerais: itineraryData.informacoesGerais,
            roteiroSugerido: itineraryData.roteiroSugerido
          }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          setSaveStatus('saved');
        } catch (error) {
          console.error("Error saving trip:", error);
          setSaveStatus('error');
        }
      }
    };

    if (itineraryData) {
        saveTripToUser();
    }
  }, [itineraryData]);

  // --- LOADING STATE (Prettier) ---
  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-[#147FDF] rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-rokkitt font-bold text-slate-800">
           Turi está criando seu roteiro...
        </h2>
        <p className="text-zinc-500 font-nunito mt-2">
           Isso pode levar alguns instantes. Estamos personalizando cada detalhe!
        </p>
      </div>
    );
  }

  if (!itineraryData) return null;

  const { roteiroSugerido, informacoesGerais } = itineraryData;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
      
      {/* Header with Save Status */}
      <div className="w-full max-w-3xl flex justify-between items-start mb-8">
        <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-rokkitt">
                {informacoesGerais.local}, {informacoesGerais.pais}
            </h1>
            <p className="text-zinc-500 font-nunito mt-1">
                {informacoesGerais.descricaoCurta}
            </p>
        </div>

        {/* Status Badge */}
        {saveStatus === 'saved' && (
            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
                <AiOutlineCheckCircle className="text-lg" />
                <span>Salvo!</span>
            </div>
        )}
        {saveStatus === 'saving' && (
             <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                <AiOutlineCloudUpload className="text-lg" />
                <span>Salvando...</span>
             </div>
        )}
      </div>

      <div className="w-full max-w-3xl">
        {roteiroSugerido.map((dia) => (
          <div key={dia.dia} className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
            <h2 className="text-2xl font-semibold text-blue-700 mb-6 font-rokkitt border-b border-gray-100 pb-2">
              Dia {dia.dia} — {dia.titulo}
              <span className="block text-sm font-normal text-gray-400 mt-1 font-nunito">{dia.data}</span>
            </h2>

            <div className="flex flex-col gap-4">
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
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-lg z-10">
         <div className="max-w-3xl mx-auto flex justify-center">
            <CustomButton 
                variant="borrow"
                label="Voltar para Home"
                width="w-auto"
                className="px-8 py-3 rounded-full shadow-md flex items-center gap-2"
                onClick={() => navigate('/home-logado')}
            >
                <AiOutlineHome /> Voltar para Home
            </CustomButton>
         </div>
      </div>
      
      {/* Spacer for fixed footer */}
      <div className="h-24"></div>
    </div>
  );
}