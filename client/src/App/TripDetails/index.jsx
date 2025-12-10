import React from "react";
import ItineraryItem from "../../components/ItineraryItem/index.jsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CustomButton } from '../../components/Button/CustomButton.jsx';
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function TripDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // We try to get data passed from the HomeLogado page
  const tripData = location.state?.tripData;

  // Ideally, if tripData is missing (e.g. user refreshed the page), 
  // you would fetch it by ID using the 'id' param here.
  // For now, we'll just check if it exists.

  if (!tripData) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Viagem não encontrada</h2>
        <CustomButton
            variant="borrow"
            label="Voltar para Home"
            onClick={() => navigate('/home-logado')}
        />
      </div>
    );
  }

  const { informacoesGerais, roteiroSugerido } = tripData;

  return (
    <div className="min-h-screen bg-background pb-12">
        {/* Header / Nav */}
        <div className="bg-white border-b border-blue-100 shadow-sm sticky top-0 z-10">
            <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
                <button 
                    onClick={() => navigate('/home-logado')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                >
                    <AiOutlineArrowLeft size={24} />
                </button>
                <h1 className="text-xl md:text-2xl font-bold font-rokkitt text-borrow">
                    {informacoesGerais.local}, {informacoesGerais.pais}
                </h1>
            </div>
        </div>

      <div className="flex flex-col items-center py-10 px-4">
        {/* General Info Card */}
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6 mb-8 border border-blue-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 font-rokkitt">
                {informacoesGerais.descricaoCurta}
            </h2>
            <div className="text-gray-500 font-nunito flex gap-4 mt-2">
                <span>📅 {informacoesGerais.dataInicio} até {informacoesGerais.dataFim}</span>
            </div>
        </div>

        {/* Itinerary */}
        <div className="w-full max-w-3xl">
          {roteiroSugerido && roteiroSugerido.map((dia) => (
            <div key={dia.dia} className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-2 border-blue-100 font-rokkitt">
                Dia {dia.dia} — <span className="text-gray-700">{dia.titulo}</span>
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
                    // Assuming your backend/LLM provides a link, otherwise generate a search link
                    link={atividade.linkGoogleMaps || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(atividade.local + " " + informacoesGerais.local)}`}
                    />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}