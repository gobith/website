import express, { Application, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

const app: Application = express();

app.use(express.json());

type User = { name: string, password: string };

const users: User[] = [];

app.get("/users", (req: Request, res: Response) => {
    res.json(users);
})

app.post("/users", async (req: Request, res: Response) => {

    try {
        const hashedPassword: string = await bcrypt.hash(req.body.password, 10);
        const user: User = { name: req.body.name, password: hashedPassword };
        users.push(user);
        res.status(201).send();
    } catch { res.status(500).send() }




})

app.get("/", (req: Request, res: Response, next: NextFunction): void => {
    res.send("hello")
});

app.listen(5000, () => { console.log("server running") })