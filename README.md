# n8n-nodes-loyverse

Este é um nó n8n para integração com a API do Loyverse.

## Instalação

Para instalar este nó no seu ambiente n8n, siga estes passos:

1. Clone este repositório:
```bash
git clone https://github.com/joaogabrielsantos/node-n8n-loyverse.git
```

2. Entre no diretório do projeto:
```bash
cd node-n8n-loyverse
```

3. Instale as dependências:
```bash
npm install
```

4. Compile o projeto:
```bash
npm run build
```

5. Copie a pasta `dist` para o diretório de nós personalizados do seu n8n:
```bash
cp -r dist /path/to/your/n8n/custom/nodes/
```

6. Reinicie o n8n para que as alterações tenham efeito.

## Configuração

Para usar este nó, você precisará configurar as credenciais da API do Loyverse:

1. Obtenha sua chave de API do Loyverse
2. No n8n, vá para Settings > Credentials
3. Clique em "Add Credential"
4. Selecione "Loyverse API"
5. Insira sua chave de API
6. Clique em "Save"

## Uso

O nó oferece as seguintes operações:

- List Receipts: Lista todos os recibos
- Get Receipt: Obtém um recibo específico
- Create Receipt: Cria um novo recibo
- Refund Receipt: Reembolsa um recibo

## Desenvolvimento

Para desenvolver localmente:

1. Instale as dependências de desenvolvimento:
```bash
npm install
```

2. Execute o modo de desenvolvimento:
```bash
npm run dev
```

3. Faça suas alterações e compile:
```bash
npm run build
```

## Licença

MIT 