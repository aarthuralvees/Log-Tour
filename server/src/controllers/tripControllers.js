import prisma from '../prismaClient.js'

function validateTripPayload(body) {
  if (!body.userId) return 'userId required';
  if (!body.informacoesGerais) return 'informacoesGerais required';
  if (!body.roteiroSugerido) return 'roteiroSugerido required';
  return null;
}

class TripController{
    async createTrip(req, res) {
        try {
            const err = validateTripPayload(req.body);
            if (err) return res.status(400).json({ message: err });

            const { userId, informacoesGerais, roteiroSugerido } = req.body;

            const user = await prisma.user.findUnique({ where: { id: Number(userId) }});
            if (!user) return res.status(404).json({ message: 'user not found' });

            const trip = await prisma.trip.create({
            data: {
                userId: Number(userId),
                informacoesGerais: informacoesGerais,
                roteiroSugerido: roteiroSugerido
            }
            });

            res.status(201).json(trip);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal server error' });
        }
    }

    async getTripsByUser(req, res) {
        try {
            const userId = Number(req.params.userId);
            const trips = await prisma.trip.findMany({ where: { userId }});
            res.json(trips);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal server error' });
        }
    }
}

export default new TripController();