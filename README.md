# Estudos Dom Pedro I

![Preview-Screens]()

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

Conecte-se comigo no [LinkedIn](https://www.linkedin.com/in/eduardo-machado-dev/)

## Como posso

Durante o desenvolvimento do sistema, diversas perguntas foram consideradas 
para garantir que a aplicação fosse simples de usar e fácil de manter.

_**Como posso facilitar a criação de estudos?**_

A interface foi projetada para permitir que o usuário crie novos estudos de forma rápida, 
com campos claros e bem definidos, evitando complexidade desnecessária.

Para isso foi também implementado uma funcionalidade de edição do corpo do estudo com inteligência artificial.

_**Como posso facilitar a leitura e revisão de estudos?**_

Os estudos foram estruturados de forma que o conteúdo fique bem organizado visualmente, permitindo uma leitura confortável e intuitiva.

_**Como posso facilitar futuras modificações no sistema?**_

A estrutura do frontend foi organizada de forma modular, separando responsabilidades entre componentes, páginas e serviços.
Isso permite que novas funcionalidades sejam adicionadas ou modificadas sem impactar todo o sistema.

_**Como posso manter a interface consistente?**_

Foi adotado um sistema de componentes reutilizáveis utilizando shadcn/ui, garantindo consistência visual e facilitando a manutenção do design da aplicação.

## Funcionalidades

### **Autenticação de usuário**
### **Criação de novos estudos bíblicos**
### **Edição e exclusão de estudos existentes**
### **Visualização detalhada dos estudos**
### **Edição de texto com inteligência artificial**
### **Upload de imagens para estudos**
### **Interface responsiva para qualquer dispositivo**

## Sistema de Refresh Token

Para garantir maior segurança e melhor experiência de autenticação, 
o sistema utiliza um modelo de autenticação baseado em Access Token e Refresh Token.

Ao realizar o login, o sistema gera dois tokens **(Access Token e Refresh Token)**.
O _Access Token_ é utilizado para acessar rotas protegidas do sistema, quando ele expira,
o sistema utiliza o _Refresh Token_ para gerar um novo _Access Token_ automaticamente.

Esse processo garante segurança e renovação automática da sessão do usuário, 
reduzindo a necessidade de logins repetidos.

Os tokens são armazenados utilizando cookies HTTP-only, 
reduzindo riscos relacionados a ataques como XSS.

## Arquitetura

O cliente foi estruturado com foco em organização, escalabilidade e facilidade de manutenção.
A aplicação segue uma abordagem modular, onde diferentes responsabilidades são separadas em camadas bem definidas.

Os princípios adotados foram:
- separação entre interface, lógica e comunicação com API
- reutilização de componentes
- baixo acoplamento entre módulos
- organização baseada em funcionalidades

A estrutura do projeto foi pensada para facilitar a evolução do sistema conforme novas funcionalidades
forem adicionadas, tanto quanto a manutenção do código.

## Tecnologias Utilizadas

- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [React](https://react.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)  
- [shadcn/ui](https://ui.shadcn.com/docs) 
- [Lucide React](https://lucide.dev/)  
- [Vercel](https://vercel.com/docs)



