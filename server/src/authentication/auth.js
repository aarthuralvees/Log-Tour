import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
    const [scheme, token] = (req.headers.authorization || '').split(' ');
    if (scheme !== 'Bearer' || !token) {
        return res.status(401).send('Token não fornecido, acesso negado');
    }

    try {
        const payload = jwt.verify(token, process.env.DB_JWT_SECRET);
        req.userId = payload.userId
        next()
    } catch {
        res.status(401).json({message: 'Token inválido'})
    }
}