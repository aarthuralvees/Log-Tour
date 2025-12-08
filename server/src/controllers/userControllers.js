import prisma from '../prismaClient.js'

class UserController{
    async createUser(req, res) {
        try {
            const { username, password } = req.body;
            if (!username || !password) return res.status(400).json({ message: 'username and password required' });

            const exists = await prisma.user.findUnique({ where: { username } });
            if (exists) return res.status(400).json({ message: 'username already in use' });

            const user = await prisma.user.create({
            data: { username, password }
            });

            const { password: _p, ...safe } = user;
            res.status(201).json(safe);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal server error' });
        }
    }

    async getUser(req, res) {
        try {
            const username = req.params.username;
            const user = await prisma.user.findUnique({
            where: { username },
            select: { id: true, username: true, trips: true }
        });
        if (!user) return res.status(404).json({ message: 'user not found' });
        res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'internal server error' });
        }
    }
}

export default new UserController();