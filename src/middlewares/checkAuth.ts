import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface Payload{
    sub: string;
}

export function checkAuth(req: Request, res: Response, next: NextFunction){
    const authToken = req.headers.authorization;
    if(!authToken){
        res.status(401).end();
        return 
    }

    const token = authToken.split(' ')[1]; //isolar "token" do "Bearer"
    
    try{
        const { sub } = verify(
            token,
            process.env.JWT_SECRET as string
        ) as Payload;

        req.user_id = sub

        return next();

    }catch(e){
        res.status(401).end();
        return;
    }
    
}