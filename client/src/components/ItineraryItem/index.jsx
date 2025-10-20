import React from 'react';

// Placeholder de ícone de mapa (pro campo de mais informações) gerado pelo gemini
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

// Placeholder de ícone pro maps criado fornecido pelo gemini
const GoogleMapsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 10h6" />
    </svg>
);


function ItineraryItem({ time, title, description, link, location }) {
  // Constrói a URL do Google Maps a partir da localização (chama api do maps)
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

  // Estilos para o contêiner do item
  const containerStyles = "bg-white p-4 rounded-lg shadow-md my-3 flex flex-col";

  // Estilos para os elementos internos
  const timeStyles = "text-sm font-semibold text-blue-600 mb-1";
  const titleStyles = "text-lg font-bold text-gray-800 flex items-center";
  const descriptionStyles = "text-gray-600 my-2 text-sm";
  
  // Estilos para a área dos botões/links
  const linksContainerStyles = "mt-4 pt-3 border-t border-gray-200 flex items-center gap-4"; // Adicionado 'gap' para espaçamento
  const baseLinkStyles = "text-sm font-medium transition duration-200 ease-in-out";
  const detailsLinkStyles = `${baseLinkStyles} bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-3 rounded-lg`;
  const mapButtonStyles = `${baseLinkStyles} bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded-lg flex items-center justify-center`;

  return (
    <div className={containerStyles}>
      <p className={timeStyles}>{time}</p>
      
      <h3 className={titleStyles}>
        <MapPinIcon />
        {title}
      </h3>

      <p className={descriptionStyles}>{description}</p>
      
      {/* Contêiner para os links/botões */}
      <div className={linksContainerStyles}>
        {/* Mostra o link de detalhes apenas se ele existir */}
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className={detailsLinkStyles}>
            Ver mais detalhes
          </a>
        )}

        {/* Mostra o botão do Google Maps apenas se a localização for fornecida */}
        {location && (
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className={mapButtonStyles}>
            <GoogleMapsIcon />
            Ver no mapa
          </a>
        )}
      </div>
    </div>
  );
}

export default ItineraryItem;