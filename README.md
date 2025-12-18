# 📝 Sistema de Gestão de Tarefas Colaborativo

## 🏗️ Arquitetura
![Logo](https://i.imgur.com/njZyfi1.png)

# 📝 Sistema de Gestão de Tarefas Colaborativo

Este projeto foi desenvolvido como parte do desafio **Full-stack Júnior** da Jungle Gaming.  
O objetivo é implementar um sistema de gestão de tarefas colaborativo com autenticação, CRUD de tarefas, comentários, atribuições e notificações em tempo real.

---

## ⚙️ Decisões Técnicas & Trade-offs

- **Monorepo com Turborepo**  
  - Decisão: facilita compartilhamento de pacotes (tipos, utils, configs).  
  - Trade-off: maior complexidade inicial de configuração e pipelines.

- **NestJS + Microserviços**  
  - Decisão: divisão clara de responsabilidades (auth, tasks, notifications).  
  - Trade-off: overhead de comunicação entre serviços e necessidade de mensageria.

- **RabbitMQ para mensageria**  
  - Decisão: robusto, suporta tópicos e filas, garante entrega confiável.  
  - Trade-off: curva de aprendizado maior e necessidade de monitoramento.

- **API Gateway centralizado**  
  - Decisão: único ponto de entrada, autenticação JWT, documentação Swagger.  
  - Trade-off: adiciona latência mínima e pode ser ponto único de falha.

- **TypeORM com PostgreSQL**  
  - Decisão: ORM obrigatório pelo desafio, suporte a migrations e relacionamentos.  
  - Trade-off: performance inferior em queries complexas comparado a ORMs mais modernos.

- **React + TanStack Router + shadcn/ui + Tailwind**  
  - Decisão: UI moderna, responsiva e consistente.  
  - Trade-off: curva de aprendizado para TanStack Router e integração com shadcn/ui.

---

## 🐞 Problemas Conhecidos & Melhorias Futuras

- **FrontEnd**  
  - Problema: não fiz o frontend porque tive pouco tempo diário para fazer o projeto. Foquei ao máximo no backend porque é a área que domino e tenho bastante experiência.
  - Melhorias: adicionar posteriormente o FrontEnd.

- **Desacoplamento**  
  - Problema: o projeto poderia ser mais desacoplado de bibliotecas.
  - Melhorias: adicionar arquitetura hexagonal.

- **Comunicação entre serviços**  
  - Problema: a comunicação foi feita via TCP porque é mais fácil de implementar, mas tem formas mais eficientes.
  - Melhorias: implementação de comunicação gRPC, pois é mais rápido.

---

## ⏱️ Tempo Gasto em Cada Parte

- **Setup Monorepo & Docker Compose:** 3 dias
- **Auth Service (cadastro/login/refresh):** 1 dia
- **Tasks Service (CRUD, comentários, histórico):** 2 dias 
- **Notifications Service (RabbitMQ + WS):** 2 dias
- **Documentação & ajustes finais:** 1 dia

**Total estimado:** 9 dias

---

## 📖 Instruções Específicas

### Pré-requisitos
- Docker & Docker Compose instalados  
- Node.js 20+ (para desenvolvimento local)

### Passos para rodar
```bash
# Clone o repositório
git clone https://github.com/ocsoares/Jungle-Gaming-Test
cd Jungle-Gaming-Test

# Instalar pnpm globalmente
npm install -g pnpm

# Dentro do seu projeto
pnpm install

# Buildar o projeto
pnpm turbo build

# Suba os serviços
docker-compose up --build