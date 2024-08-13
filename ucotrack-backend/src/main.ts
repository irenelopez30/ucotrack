import express from "express";
import cors from "cors";
import userRouter from "./usuarios/infraestructure/usuarioRouter";
import tfgRouter from "./tfgs/infraestructure/TFGRouter";


async function bootstrap(){
    const app = express();
    const port = process.env.PORT || 3001;  
    const env= process.env.NODE_ENV || "development";
    
    app.use(cors());
    app.use(express.json());

    app.use("/api/user", userRouter);
    app.use("/api/login", userRouter);
    app.use("/api/tfg", tfgRouter);


    app.listen(port, () => {
        return console.log(`server is listening ${port}`);
    });
}

bootstrap();