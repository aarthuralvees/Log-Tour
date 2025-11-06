import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock axios before imports
vi.mock('axios', () => {
  const mockApiPost = vi.fn()
  return {
    default: {
      create: vi.fn(() => ({
        post: mockApiPost
      }))
    },
    create: vi.fn(() => ({
      post: mockApiPost
    }))
  }
})

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Roteiro from '.'

describe('Roteiro Page – 2-day itinerary', () => {
  const mockBody = {
    destino: 'Recife',
    dataInicio: '2025-11-10',
    dataFim: '2025-11-11',
    perfilViajante: 'aventura',
    interesses: ['praia'],
    orcamento: 'baixo'
  }

  const mockItineraryData = {
    informacoesGerais: {
      local: 'Recife',
      pais: 'Brazil',
      dataInicio: '2025-11-10',
      dataFim: '2025-11-11',
      descricaoCurta: 'Viagem curta de 2 dias'
    },
    roteiroSugerido: [
      {
        dia: 1,
        data: '2025-11-10',
        titulo: 'Chegada e praia',
        atividades: [
          {
            periodo: 'Manhã',
            descricao: 'Praia de Boa Viagem',
            local: 'Praia de Boa Viagem',
            linkGoogleMaps: 'https://maps.google.com/?q=Praia+de+Boa+Viagem'
          }
        ]
      },
      {
        dia: 2,
        data: '2025-11-11',
        titulo: 'Cultura e partida',
        atividades: [
          {
            periodo: 'Tarde',
            descricao: 'Visita ao centro histórico',
            local: 'Recife Antigo',
            linkGoogleMaps: 'https://maps.google.com/?q=Recife+Antigo'
          }
        ]
      }
    ]
  }

  beforeEach(() => {
    vi.clearAllMocks()
    axios.create().post.mockResolvedValue({ data: mockItineraryData })
  })

  it('Testa roteiro de 2 dias', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/roteiro', state: { body: mockBody } }]}>
        <Routes>
          <Route path="/roteiro" element={<Roteiro />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/Roteiro Sugerido — Recife, Brazil/i)).toBeInTheDocument()
    })

    expect(screen.getByText(/Dia 1 — Chegada e praia/i)).toBeInTheDocument()
    expect(screen.getByText('Praia de Boa Viagem', { selector: 'p' })).toBeInTheDocument();
    expect(screen.getByText(/Dia 2 — Cultura e partida/i)).toBeInTheDocument()
    expect(screen.getByText('Recife Antigo')).toBeInTheDocument()

    expect(axios.create().post).toHaveBeenCalledWith('llm/', mockBody)
  })

  it('retorna null se for null', async () => {
    axios.create().post.mockResolvedValue({ data: null })
    
    const { container } = render(
      <MemoryRouter initialEntries={[{ pathname: '/roteiro', state: { body: mockBody } }]}>
        <Routes> 
          <Route path="/roteiro" element={<Roteiro />} />
        </Routes>
      </MemoryRouter>
    )
    
    await waitFor(() => {
      expect(container.innerHTML).toBe('')
    })
  })
})