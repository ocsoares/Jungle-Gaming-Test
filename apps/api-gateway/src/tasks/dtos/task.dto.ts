// Estava dando erro de IMPORTAÇÃO do TypeScript em /packages/contracts !!!

import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateTaskDTO } from "@repo/contracts";

export class UpdateTaskGatewayDTO extends PartialType(
    OmitType(CreateTaskDTO, ["usersId"]),
) {}
