import express, { Application, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

const app: Application = express();

app.use(express.json());

type User = { name: string; password: string };

const users: User[] = [];

app.get("/users", (req: Request, res: Response) => {
  res.json(users);
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const hashedPassword: string = await bcrypt.hash(req.body.password, 10);
    const user: User = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post("/users/login", async (req: Request, res: Response) => {
  const userName: string = req.body.name;
  const user: User | undefined = users.find((user: User) => {
    return user.name === userName;
  });
  if (user == undefined) {
    return res.status(400).send("cannot find user");
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send(`${user.name} successfuly logged in`);
    } else {
      res.status(401).send("Not logged in");
    }
  } catch {
    res.status(500).send();
  }
});

app.get("/", (req: Request, res: Response, next: NextFunction): void => {
  res.send("hello");
});

app.listen(5000, () => {
  console.log("server running");
});
