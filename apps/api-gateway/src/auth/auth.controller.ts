import { Body, Controller, Post } from "@nestjs/common";
import { LoginDTO } from "@repo/contracts/auth/index";

// Executar o "depcheck ." para REMOVER as Dependências NÃO usadas !!!

@Controller("auth")
export class AuthController {
    @Post()
    async login(@Body() body: LoginDTO) {
        console.log(body);
    }
}
