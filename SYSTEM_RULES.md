# Regras do Sistema e Modelo de Dados

Este documento descreve as regras de segurança do Firestore e o modelo de dados para a aplicação de Gestão de Obras.

## 1. Regras de Segurança do Firestore

As seguintes regras são aplicadas à base de dados do Firestore.

**ATENÇÃO:** Estas regras são permissivas e destinam-se apenas a fins de desenvolvimento. Elas permitem que qualquer pessoa leia e escreva na base de dados. Para um ambiente de produção, é crucial implementar regras de segurança mais rigorosas, geralmente envolvendo autenticação de utilizadores.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permite leitura e escrita em toda a base de dados.
    // NÃO USAR EM PRODUÇÃO.
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## 2. Modelo de Dados

A base de dados está estruturada em torno de uma coleção principal chamada `obras`.

### Coleção: `obras`

Cada documento nesta coleção representa um projeto de construção (`obra`).

-   **ID do Documento:** Gerado automaticamente pelo Firestore.
-   **Campos do Documento:**
    -   `nome`: (String) Nome da obra ou projeto.
    -   `cliente`: (String) Nome do cliente.
    -   `endereco`: (String) Endereço da obra.
    -   `previsaoInicialMedicao`: (String) Data da previsão inicial de medição (formato `YYYY-MM-DD`).
    -   `novaPrevisaoMedicao`: (String) Data da nova previsão de medição (formato `YYYY-MM-DD`).
    -   `medicaoEfetuada`: (String) Data em que a medição foi realizada (formato `YYYY-MM-DD`).
    -   `obsMedicao`: (String) Observações sobre a medição.
    -   `previsaoInicialEntrega`: (String) Data da previsão inicial de entrega (formato `YYYY-MM-DD`).
    -   `novaPrevisaoEntrega`: (String) Data da nova previsão de entrega (formato `YYYY-MM-DD`).
    -   `entregaRealizada`: (String) Data em que a entrega foi realizada (formato `YYYY-MM-DD`).
    -   `obsEntrega`: (String) Observações sobre a entrega.
    -   `createdAt`: (Timestamp) Data e hora de criação do registo.
    -   `itens`: (Array) Uma lista de objetos, onde cada objeto representa um item da obra.

#### Objeto `item` (dentro do array `itens`)

-   `id`: (String) Um identificador único para o item (gerado pelo cliente, ex: `Date.now().toString()`).
-   `tipo`: (String) O tipo do item (ex: "Projeto", "Orçamento", "Terceiros").
-   `codigo`: (String) O código do item.
-   `descricao`: (String) A descrição do item.
-   `largura`, `altura`, `m2Total`, `cor`, `vidro`, `m2Vidro`: (String) Campos específicos para itens do tipo "Projeto".
-   `etapas`: (Map) Um mapa de objetos que representa o status de cada etapa do item.
    -   **Chave do Mapa:** O `id` da etapa (ex: "emProducao").
    -   **Valor do Mapa (Objeto `etapa`):**
        -   `status`: (String) O status atual da etapa (ex: "iniciado", "concluido").
        -   `data`: (String) Data da última atualização de status (formato `YYYY-MM-DD`).
        -   `observacao`: (String) Observações sobre a etapa.
        -   `prazoConclusaoInicial`: (String) Data do prazo inicial (formato `YYYY-MM-DD`).
        -   `prazoConclusaoReagendado`: (String) Data do prazo reagendado (formato `YYYY-MM-DD`).
-   `materiais`: (Array) Uma lista de objetos, onde cada objeto representa um material necessário para o item.

#### Objeto `material` (dentro do array `materiais`)

-   `id`: (String) Um identificador único para o material (gerado pelo cliente).
-   `tipo`: (String) O tipo do material (ex: "Perfil", "Vidro").
-   `descricao`: (String) A descrição do material.
-   `qtdeOrcada`, `qtdeDisponivel`: (String) Campos específicos para materiais de itens de "Compra Inicial" ou "Projeto".
-   `statusInfo`: (Map) Um mapa de objetos que representa o status do material.
    -   `status`: (String) O status atual do material (ex: "emCotacao", "comprado").
    -   `data`: (String) Data da última atualização de status (formato `YYYY-MM-DD`).
    -   `observacao`: (String) Observações sobre o material.
    -   `previsaoDisponibilidadeInicial`: (String) Data da previsão inicial (formato `YYYY-MM-DD`).
    -   `previsaoDisponibilidadeReagendado`: (String) Data da previsão reagendada (formato `YYYY-MM-DD`).
