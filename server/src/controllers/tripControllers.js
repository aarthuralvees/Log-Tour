import prisma from '../prismaClient.js'

function validateTripPayload(body) {
  if (!body.informacoesGerais) return 'informacoesGerais required';
  if (!body.roteiroSugerido) return 'roteiroSugerido required';
  return null;
}

class TripController{
    async createTrip(req, res) {
        try {
            const err = validateTripPayload(req.body);
            if (err) return res.status(400).json({ message: err });

            const { informacoesGerais, roteiroSugerido } = req.body;

            const user = await prisma.user.findUnique({ where: { id: Number(req.userId) }});
            if (!user) return res.status(404).json({ message: 'user not found' });

            const trip = await prisma.trip.create({
            data: {
                userId: Number(req.userId),
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
            const trips = await prisma.trip.findMany({ where: { userId: req.userId }});
            res.json(trips);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal server error' });
        }
    }
}

export default new TripController();