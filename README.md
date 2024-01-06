# Teste técnico do processo seletivo da GestãoDS
## Tecnologias utilizadas
- Next.js v13.5.4
- React v18
- MongoDB v6.0.5
- Typescript
- Sass

## Como rodar o projeto
- Basta clonar, dar um `npm install` e rodar com `next dev` ou `npm run dev`
- Também é necessário criar o arquivo `.env` no root e copiar o que tem dentro do `.env.example`

## Considerações
- Dependendo da versão do node, a URI do mongoDB pode reclamar caso esteja usando 127.0.0.1 em vez de localhost e vice-versa
- Decidi usar Next.js pois é a melhor maneira de se utilizar React hoje, ainda mais que resolvi fazer a API do projeto também
- Também escolhi Next.js porque é o com o que atualmente trabalho, então não vi muito sentido usar algo como express para o projeto
- Como o foco do teste técnico era para React puramente, foquei em usar mais CSR, mesmo sendo possível realizar o projeto usando híbrido de SSR e CSR
