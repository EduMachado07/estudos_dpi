# Estudos Dom Pedro I

![Preview-Screens](https://github.com/EduMachado07/estudos_dpi/blob/main/public/screenshots_dpi.png)

Ideia do projeto:

_"um sistema web de estudos bíblicos."_

A ideia central é transformar anotações que normalmente seriam feitas
em diversos aplicativos diferentes em um sistema único, que permita registrar pensamentos, 
interpretações e referências de forma organizada e acessível.

Experimente o sistema [aqui](https://dpi-estudos.vercel.app/). **Responsivo para dispositivos Desktop e Mobile.**

## Motivo

O desenvolvimento deste projeto teve dois objetivos principais.

O primeiro foi resolver um problema real, oferecendo uma ferramenta 
que auxilie na organização de estudos bíblicos.

O segundo objetivo foi aprofundar conhecimentos em desenvolvimento web moderno, 
aplicando conceitos e tecnologias utilizadas em projetos profissionais, sendo um 
estudo prático de arquitetura e desenvolvimento fullstack.

Durante o desenvolvimento explorei conceitos de **organização de componentes, boas práticas de arquitetura,
comunicação com APIs, manipulação de estados, integração com serviços externos**

Se você tiver qualquer feedback ficarei muito feliz em receber! 
Toda sugestão é muito bem-vinda para que eu continue melhorando como profissional.

Email: eduardo.silvamachado07@gmail.com

Conecte-se comigo no [LinkedIn](www.linkedin.com/in/eduardo-machado-fullstack)

## Como posso

Durante o desenvolvimento do sistema, diversas perguntas foram consideradas 
para garantir que a aplicação fosse simples de usar e fácil de manter.

_**Como posso facilitar a criação de estudos?**_

A interface foi projetada para permitir que o usuário crie novos estudos de forma rápida, 
com campos claros e bem definidos, evitando complexidade desnecessária.

Para isso foi também implementado uma funcionalidade de formatação de texto com inteligência artificial.

_**Como posso facilitar a leitura e revisão de estudos?**_

Os estudos foram estruturados de forma que o conteúdo fique bem organizado visualmente, permitindo uma leitura confortável e intuitiva.

_**Como posso facilitar futuras modificações no sistema?**_

A estrutura do frontend foi organizada de forma modular, separando responsabilidades entre componentes, páginas e serviços.
Isso permite que novas funcionalidades sejam adicionadas ou modificadas sem impactar todo o sistema.

_**Como posso manter a interface consistente?**_

Foi adotado um sistema de componentes reutilizáveis utilizando shadcn/ui, garantindo consistência visual e facilitando a manutenção do design da aplicação.

## Funcionalidades

- Visualizar estudos bíblicos em uma página dedicada com informações completas. Cada estudo apresenta:
  - título
  - descrição
  - imagem ilustrativa
  - tempo estimado de leitura
  - texto principal
  - vídeo complementar (opcional)
  - categoria do estudo
  - nome do autor
  - data de criação
- Buscar estudos pelo título.
- Filtrar estudos por categoria.
- Listar estudos em ordem cronológica.
- Autores autorizados podem:
  - Criar novos estudos bíblicos
  - Atualizar qualquer informação do estudo
  - Excluir estudos existentes
- O sistema oferece suporte de inteligência artificial para auxiliar autores na formatação e melhoria do texto principal do estudo.
- A interface da aplicação é totalmente responsiva, adaptando-se automaticamente a diferentes tamanhos de tela, incluindo:
  - desktops
  - tablets
  - smartphones
- O sistema possui autenticação segura:
  - baseado em Access Token e Refresh Token,
  - Sessões protegidas utilizando cookies HTTP-only,
  - Rotas protegidas para criação e gerenciamento de estudos

## Sistema de Refresh Token

![Preview-Screens](https://github.com/EduMachado07/estudos_dpi/blob/main/public/diagram_tokenRefresh.png)

Para garantir maior segurança e melhor experiência de autenticação, 
o sistema utiliza um modelo de autenticação baseado em Access Token e Refresh Token.

- Access Token → curta duração (15 min)
- Refresh Token → longa duração (3 dias)
- 
Os tokens são armazenados utilizando cookies HTTP-only, reduzindo riscos relacionados a ataques como XSS.

A autenticação é baseada em JSON Web Tokens (JWT), cada token é assinado utilizando chaves secretas.

Ao realizar o login, o sistema gera os tokens **(Access Token e Refresh Token)**.
O _Access Token_ é utilizado para acessar rotas protegidas do sistema, quando ele expira,
o sistema utiliza o _Refresh Token_ para gerar um novo _Access Token_ automaticamente.

Esse processo garante segurança e renovação automática da sessão do usuário, 
reduzindo a necessidade de logins repetidos.

## Arquitetura

O cliente foi estruturado com foco em organização, escalabilidade e facilidade de manutenção.
A aplicação segue uma abordagem modular, onde diferentes responsabilidades são separadas em camadas bem definidas.

<img width="1440" height="1132" alt="image" src="https://github.com/user-attachments/assets/28440f67-42df-4f2a-8890-750e2cee88c1" />

Os princípios adotados foram:
- separação entre interface, lógica e comunicação com API
- reutilização de componentes
- baixo acoplamento entre módulos
- organização baseada em funcionalidades

### Fluxo de comunicação

```
Page → Model (hook) → Service → API
```

| Camada           | Responsabilidade                                 |
| ---------------- | ------------------------------------------------ |
| **Page**         | Inicializa dependências e conecta View com Model |
| **Model (hook)** | Gerencia estado e lógica da tela                 |
| **Service**      | Realiza comunicação com a API                    |
| **API**          | Processa a requisição no servidor                |

A estrutura do projeto foi pensada para facilitar a evolução do sistema conforme novas funcionalidades
forem adicionadas, tanto quanto a manutenção do código.

## UI separado de Services

Uma das decisões arquiteturais adotadas da qual destaco é a separação da lógica de comunicação com a API da camada de interface.

Foi criada uma camada de services, responsável por centralizar todas as requisições ao servidor, 
enquanto os componentes da interface permanecem focados apenas na renderização e interação com o usuário.

Service:

```ts
// src/service/implementations/GetStudyAllService.ts

export class GetStudyAllService implements IGetStudyAllService {
  async exec(offset?: number, limit?: number) {
    const { data } = await AxiosInstance.get("/study", {
      params: { offset, limit },
    });

    return {
      studies: data.studies.data,
      next: data.studies.next,
      previous: data.studies.previous,
      length: data.studies.length,
    };
  }
}
```

Model:

```ts
// src/app/(Studies)/get/getStudies.model.ts

...
const res = await getAllStudiesService.exec(
  pageParam.offset,
  pageParam.limit
);
```

Page:

```ts
// src/app/(Studies)/get/page.tsx

export const GetStudiesPage = () => {
  const getStudyAll = new GetStudyAllService();

  const methods = useGetStudiesModel({
    getAllStudiesService: getStudyAll
  });

  return <GetStudiesView {...methods} />;
};
```

## Tecnologias Utilizadas

- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [React](https://react.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)  
- [shadcn/ui](https://ui.shadcn.com/docs) 
- [Lucide React](https://lucide.dev/)  
- [Vercel](https://vercel.com/docs)



