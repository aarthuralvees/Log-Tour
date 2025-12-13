import { useNavigate } from 'react-router-dom'
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai'
import { FaMapMarkedAlt, FaCalendarAlt, FaSuitcaseRolling, FaMapMarkerAlt } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { CustomButton } from '../../components/Button/CustomButton'

const API_BASE_URL = "https://log-tour.onrender.com/";

function HomeLogado() {
  const navigate = useNavigate()
  
  const [user, setUser] = useState(null)
  const [trips, setTrips] = useState([])
  const [loadingTrips, setLoadingTrips] = useState(true)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      navigate('/');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser.name && parsedUser.username) {
        parsedUser.name = parsedUser.username;
      }
      setUser(parsedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchTrips = async () => {
      setLoadingTrips(true);
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${API_BASE_URL}/trips/userTrips/${user.id}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch trips');
        }

        const data = await response.json();

        const formattedTrips = data.map(trip => {
          const info = trip.informacoesGerais || {};
          
          return {
            id: trip.id,
            local: info.local || 'Destino desconhecido',
            pais: info.pais || '',
            dates: (info.dataInicio && info.dataFim) 
              ? `${new Date(info.dataInicio).toLocaleDateString('pt-BR')} - ${new Date(info.dataFim).toLocaleDateString('pt-BR')}`
              : 'Data a definir',
            description: info.descricaoCurta || 'Sem descrição.',
            fullData: trip 
          };
        });

        setTrips(formattedTrips);

      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoadingTrips(false);
      }
    };

    fetchTrips();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/')
  }

  const handleViewDetails = (trip) => {
    navigate(`/trip/${trip.id}`, { state: { tripData: trip.fullData } });
  }

  if (!user) return null;

  return (
    <div className='bg-background min-h-screen'>
      <header className='bg-white shadow-sm border-b border-blue-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-4'>
            <div className='flex items-center gap-3'>
              <img src="/icons/imagem4.svg" alt="LogTour" className='w-10 h-10' />
              <h1 className='font-rokkitt font-bold text-borrow text-3xl'>LogTour</h1>
            </div>

            <div className='flex items-center gap-4'>

              <div className='relative'>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className='flex items-center gap-3 hover:bg-blue-50 rounded-full px-4 py-2 transition-colors'
                >
                  <img 
                    src={user?.avatar} 
                    alt={user?.name}
                    className='w-10 h-10 rounded-full border-2 border-borrow'
                  />
                  <span className='font-nunito font-semibold text-gray-700 hidden sm:block'>
                    {user?.name}
                  </span>
                </button>

                {showUserMenu && (
                  <div className='absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-blue-100 py-2 z-50'>
                    <button
                      onClick={() => navigate('/profile')}
                      className='w-full px-4 py-2 text-left hover:bg-blue-50 flex items-center gap-3 text-gray-700'
                    >
                      <AiOutlineUser className='text-xl' />
                      <span>Meu Perfil</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className='w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-3 text-red-600'
                    >
                      <AiOutlineLogout className='text-xl' />
                      <span>Sair</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-8'>
          <h2 className='font-rokkitt text-5xl font-bold text-slate-900 mb-2'>
            Bem-vindo de volta, {user?.name.split(' ')[0]}! 👋
          </h2>
          <p className='text-zinc-500 font-nunito text-lg'>
            Aqui estão suas viagens salvas
          </p>
        </div>

        <div className='mb-8 bg-gradient-to-r from-borrow to-blue-600 text-white rounded-2xl p-8 shadow-lg'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <div className='flex-1'>
              <h3 className='font-rokkitt text-3xl font-bold mb-2'>
                Pronto para sua próxima aventura?
              </h3>
              <p className='text-blue-100 font-nunito text-lg'>
                Converse com Turi e planeje seu próximo destino em minutos
              </p>
            </div>
            <CustomButton
              variant="white"
              label="Criar Nova Viagem"
              width="w-auto"
              className="px-8 py-3 rounded-full text-lg font-bold shadow-md hover:scale-105 transition-transform"
              onClick={() => navigate('/chatbot')}
            />
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='font-rokkitt text-3xl font-bold text-slate-900'>
                Minhas Viagens
              </h3>
            </div>

            {loadingTrips ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-borrow rounded-full animate-spin"></div>
                <p className="mt-4 text-zinc-500 font-nunito">Buscando seus roteiros...</p>
              </div>
            ) : trips.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border-2 border-dashed border-blue-200">
                 <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaSuitcaseRolling className="text-2xl text-borrow" />
                 </div>
                 <h4 className="text-xl font-bold text-slate-700 mb-2">Nenhuma viagem encontrada</h4>
                 <p className="text-zinc-500 mb-6">Você ainda não criou nenhum roteiro. Que tal começar agora?</p>
                 <CustomButton
                    variant="borrow"
                    label="Criar Roteiro com Turi"
                    width="w-auto"
                    className="px-6 py-2 rounded-full"
                    onClick={() => navigate('/chatbot')}
                 />
              </div>
            ) : (
              <div className='space-y-4'>
                {trips.map((trip) => (
                  <div
                    key={trip.id}
                    className='bg-white p-6 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'
                  >
                    <div className="flex-1">
                        <h4 className='font-rokkitt text-2xl font-bold text-slate-900 flex items-center gap-2'>
                            <FaMapMarkerAlt className="text-borrow text-xl" />
                            {trip.local}{trip.pais ? `, ${trip.pais}` : ''}
                        </h4>
                        
                        <div className="flex flex-col gap-1 mt-2">
                             <span className='flex items-center gap-2 text-sm text-zinc-500'>
                                <FaCalendarAlt className='text-borrow' />
                                {trip.dates}
                            </span>
                            <p className="text-zinc-600 text-sm font-nunito mt-1 line-clamp-2">
                                {trip.description}
                            </p>
                        </div>
                    </div>

                    <div className='flex-shrink-0 w-full sm:w-auto'>
                      <CustomButton
                        variant="borrow"
                        label="Ver Detalhes"
                        width="w-full"
                        className="px-6 py-2 rounded-lg text-sm"
                        onClick={() => handleViewDetails(trip)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='lg:col-span-1'>
            <div className='bg-gradient-to-br from-borrow to-blue-600 rounded-2xl shadow-md p-6 sticky top-8 text-white'>
              <div className='flex items-center gap-3 mb-3'>
                <FaMapMarkedAlt className='text-3xl' />
                <h3 className='font-rokkitt text-xl font-bold'>Dica do Turi</h3>
              </div>
              <p className='text-blue-100 font-nunito text-sm mb-4'>
                Que tal planejar uma viagem para a primavera? É a época perfeita para conhecer novos destinos! 🌸
              </p>
              <CustomButton
                variant="white"
                label="Conversar com Turi"
                width="w-full"
                className="py-2 rounded-lg text-sm font-semibold"
                onClick={() => navigate('/chatbot')}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full text-center text-sm text-gray-500 py-8 mt-12 border-t border-blue-100">
        © LogTour 2025
      </footer>
    </div>
  )
}

export default HomeLogado