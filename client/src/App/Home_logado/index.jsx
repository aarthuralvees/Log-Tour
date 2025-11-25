import { useNavigate } from 'react-router-dom'
import { AiOutlineHistory, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai'
import { FaMapMarkedAlt, FaUsers, FaCalendarAlt } from 'react-icons/fa'
import { useState } from 'react'
import { CustomButton } from '../../components/Button/CustomButton'
import { useAuth } from '../../contexts/AuthContext'

const mockTrips = [
  {
    id: 1,
    destination: 'Paris, França',
    dates: '15-22 Dez 2025',
    participants: 4,
    status: 'Em planejamento',
    progress: 65,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    destination: 'Rio de Janeiro, Brasil',
    dates: '10-17 Jan 2026',
    participants: 6,
    status: 'Confirmada',
    progress: 100,
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    destination: 'Tóquio, Japão',
    dates: '05-15 Mar 2026',
    participants: 3,
    status: 'Rascunho',
    progress: 30,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop'
  }
]

const recentActivities = [
  { id: 1, text: 'João adicionou uma atividade em Paris', time: '2 horas atrás' },
  { id: 2, text: 'Ana comentou no roteiro do Rio', time: '5 horas atrás' },
  { id: 3, text: 'Você criou um novo roteiro para Tóquio', time: '1 dia atrás' },
  { id: 4, text: 'Pedro confirmou presença em Paris', time: '2 dias atrás' }
]

function HomeLogado() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmada':
        return 'bg-green-100 text-green-800'
      case 'Em planejamento':
        return 'bg-yellow-100 text-yellow-800'
      case 'Rascunho':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

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
              <CustomButton
                variant="white"
                label="Histórico"
                width="w-auto"
                className="px-4 py-2 rounded-lg flex items-center gap-2"
                onClick={() => navigate('/historico')}
              />

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
            Aqui estão suas viagens e atividades recentes
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
              <CustomButton
                variant="white"
                label="Ver Todas"
                width="w-auto"
                className="px-4 py-2 rounded-lg flex items-center gap-2"
                onClick={() => navigate('/historico')}
              />
            </div>

            <div className='space-y-6'>
              {mockTrips.map((trip) => (
                <div
                  key={trip.id}
                  className='bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border-2 border-blue-100 overflow-hidden group cursor-pointer'
                  onClick={() => navigate(`/trip/${trip.id}`)}
                >
                  <div className='flex flex-col sm:flex-row'>
                    <div className='sm:w-64 h-48 sm:h-auto overflow-hidden'>
                      <img
                        src={trip.image}
                        alt={trip.destination}
                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                      />
                    </div>

                    <div className='flex-1 p-6'>
                      <div className='flex items-start justify-between mb-4'>
                        <div>
                          <h4 className='font-rokkitt text-2xl font-bold text-slate-900 mb-2'>
                            {trip.destination}
                          </h4>
                          <div className='flex items-center gap-4 text-sm text-zinc-500'>
                            <span className='flex items-center gap-2'>
                              <FaCalendarAlt className='text-borrow' />
                              {trip.dates}
                            </span>
                            <span className='flex items-center gap-2'>
                              <FaUsers className='text-borrow' />
                              {trip.participants} pessoas
                            </span>
                          </div>
                        </div>
                        <span className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(trip.status)}`}>
                          {trip.status}
                        </span>
                      </div>

                      <div className='space-y-2'>
                        <div className='flex items-center justify-between text-sm'>
                          <span className='text-zinc-500 font-nunito'>Progresso do planejamento</span>
                          <span className='font-bold text-borrow'>{trip.progress}%</span>
                        </div>
                        <div className='w-full bg-gray-200 rounded-full h-3'>
                          <div
                            className='bg-gradient-to-r from-borrow to-blue-400 h-3 rounded-full transition-all'
                            style={{ width: `${trip.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className='mt-4 flex gap-3'>
                        <CustomButton
                          variant="borrow"
                          label="Ver Detalhes"
                          width="w-auto"
                          className="px-4 py-2 rounded-lg text-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/trip/${trip.id}`)
                          }}
                        />
                        <CustomButton
                          variant="gray"
                          label="Editar"
                          width="w-auto"
                          className="px-4 py-2 rounded-lg text-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/trip/${trip.id}/edit`)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-6 text-center'>
              <CustomButton
                variant="white"
                label="Carregar Mais Viagens"
                width="w-auto"
                className="px-6 py-3 rounded-lg"
                onClick={() => navigate('/historico')}
              />
            </div>
          </div>

          <div className='lg:col-span-1'>
            <div className='bg-white rounded-2xl shadow-md border-2 border-blue-100 p-6 sticky top-8'>
              <h3 className='font-rokkitt text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2'>
                <AiOutlineHistory className='text-borrow' />
                Atividades Recentes
              </h3>

              <div className='space-y-4'>
                {recentActivities.map((activity) => (
                  <div key={activity.id} className='flex gap-3 pb-4 border-b border-gray-100 last:border-0'>
                    <div className='flex-shrink-0 w-2 h-2 bg-borrow rounded-full mt-2' />
                    <div className='flex-1'>
                      <p className='text-sm text-gray-700 font-nunito mb-1'>
                        {activity.text}
                      </p>
                      <span className='text-xs text-zinc-500'>{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className='mt-6'>
                <CustomButton
                  variant="white"
                  label="Ver Todas →"
                  width="w-full"
                  className="py-2 rounded-lg text-sm"
                  onClick={() => navigate('/atividades')}
                />
              </div>
            </div>

            <div className='bg-gradient-to-br from-borrow to-blue-600 rounded-2xl shadow-md p-6 mt-6 text-white'>
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