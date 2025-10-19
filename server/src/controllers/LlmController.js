import { GoogleGenAI } from "@google/genai"
import dotenv from 'dotenv'
dotenv.config()

function construirPrompt(dadosUsuario) {
    return `Aja como um especialista em viagens e assistente de API. Sua única função é retornar um roteiro de viagem

    Utilize sua capacidade de pesquisa para encontrar links para o Google Maps dos locais mencionados.

    Utilize essas informações:

    --- DADOS DA VIAGEM ---
    destino: ${dadosUsuario.destino}
    Data de Início: ${dadosUsuario.dataInicio}
    Data de Fim: ${dadosUsuario.dataFim}
    Perfil viajante ${dadosUsuario.perfilViajante}
    interesses: ${dadosUsuario.interesses}
    orcamento: ${dadosUsuario.orcamento}
    ritmo: ${dadosUsuario.ritmo}

    O objeto JSON de resposta deve seguir rigorosamente a seguinte estrutura e tipos de dados, não adicione nenhum texto antes ou depois do json:

    {
        "informacoesGerais": {
            "local": "[string]",
            "pais": "[string]",
            "dataInicio": "[string: YYYY-MM-DD]",
            "dataFim": "[string: YYYY-MM-DD]",
            "descricaoCurta": "[string]"
        },
        "roteiroSugerido": [
            {
            "dia": "[number]",
            "data": "[string: YYYY-MM-DD]",
            "titulo": "[string]",
            "atividades": [
                {
                "periodo": "[string: Manhã, Tarde ou Noite]",
                "descricao": "[string]",
                "local": "[string]",
                "linkGoogleMaps": "[string URL]"
                }
            ]
            }
        ],
        "climaPrevisto": {
            "temperaturaMediaCelsius": {
            "minima": "[number]",
            "maxima": "[number]"
            },
            "sugestaoVestuario": "[string]"
        },
        "dicasLocais": {
            "costumes": "[array de strings]",
            "gastronomiaRecomendada": [
            {
                "nome": "[string]",
                "tipoCulinaria": "[string]",
                "linkGoogleMaps": "[string URL]"
            }
            ]
        },
        "seguranca": {
            "nivelGeral": "[string: Muito Alto, Alto, Médio, etc.]",
            "aviso": "[string]",
            "golpesComuns": "[array de strings]"
        }
    }
    `
}

const ai = new GoogleGenAI({});

class LlmControler{
    async createTrip(req, res) {
        try {
            const {
                destino,
                dataInicio,
                dataFim,
                perfilViajante,
                interesses,
                orcamento,
                ritmo
            } = req.body;

            if (!destino || !dataInicio || !dataFim || !perfilViajante || !interesses || !orcamento || !ritmo) {
                return res.status(400).json({
                    error: 'Dados insuficientes'
                });
            }

            const prompt = construirPrompt(req.body)
            const resposta = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    "response_mime_type": "application/json"
                },
            });
            const text = resposta.candidates[0].content.parts[0].text
            const cleanedText = text.replace(/```json\n?|```/g, "");
            const json = JSON.parse(cleanedText);
            res.status(200).json(json);

        } catch(error) {
            res.status(500).json({ error: "Erro ao gerar roteiro", message: error.message})
        }
    }

}

export default new LlmControler();