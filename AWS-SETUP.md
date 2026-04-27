# AWS Setup Guide — Portfolio Admin Panel

Siga esta guia **na ordem exata** antes de fazer o primeiro deploy do Admin Panel.

---

## 1. Criar IAM User com permissões mínimas

### 1.1 Criar policy customizada

1. Acesse **IAM → Policies → Create policy**
2. Selecione a aba **JSON** e cole:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DynamoDBPortfolioAccess",
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Query",
        "dynamodb:Scan",
        "dynamodb:BatchGetItem",
        "dynamodb:BatchWriteItem"
      ],
      "Resource": [
        "arn:aws:dynamodb:us-east-1:*:table/portfolio-data",
        "arn:aws:dynamodb:us-east-1:*:table/portfolio-data/index/*"
      ]
    }
  ]
}
```

> **Importante:** troque `us-east-1` pela sua região se for diferente.

3. Clique em **Next**
4. Nome da policy: `PortfolioDataAccess`
5. Clique em **Create policy**

---

### 1.2 Criar o IAM User

1. Acesse **IAM → Users → Create user**
2. Nome do usuário: `portfolio-api`
3. **Não** marque "AWS Management Console access" (é só programático)
4. Clique em **Next**
5. Em "Set permissions": selecione **Attach policies directly**
6. Busque e selecione `PortfolioDataAccess`
7. Clique em **Next → Create user**

---

### 1.3 Criar Access Key

1. Clique no usuário `portfolio-api` recém criado
2. Vá na aba **Security credentials**
3. Em "Access keys" → **Create access key**
4. Selecione **Application running outside AWS**
5. Clique em **Next → Create access key**
6. **Copie e salve agora** — a secret não aparece novamente:
   - `Access key ID` → será `AWS_ACCESS_KEY_ID`
   - `Secret access key` → será `AWS_SECRET_ACCESS_KEY`

---

## 2. Criar a tabela DynamoDB

1. Acesse **DynamoDB → Tables → Create table**
2. Preencha:

| Campo | Valor |
|---|---|
| Table name | `portfolio-data` |
| Partition key | `pk` (String) |
| Sort key | `sk` (String) |
| Table class | DynamoDB Standard |
| Read/write capacity | **On-demand** (paga só o que usa — gratuito para uso pessoal) |

3. Em **Additional settings**:
   - Encryption: deixe como padrão (AWS managed key — gratuito)
   - Point-in-time recovery: **Enable** (proteção contra deleção acidental)

4. Clique em **Create table**

> A tabela ficará no estado "Active" em ~30 segundos.

---

## 3. Adicionar variáveis de ambiente no Vercel

Acesse **Vercel → seu projeto → Settings → Environment Variables** e adicione:

| Nome | Valor | Environments |
|---|---|---|
| `AWS_ACCESS_KEY_ID` | `AKIA...` (copiado no passo 1.3) | Production, Preview |
| `AWS_SECRET_ACCESS_KEY` | `...` (copiado no passo 1.3) | Production, Preview |
| `AWS_REGION` | `us-east-1` (ou sua região) | Production, Preview |
| `DYNAMODB_TABLE` | `portfolio-data` | Production, Preview |
| `JWT_SECRET` | string aleatória longa (≥32 chars) | Production, Preview |
| `JWT_REFRESH_SECRET` | outra string aleatória longa (≥32 chars) | Production, Preview |
| `ADMIN_PASSWORD_HASH` | hash bcrypt da sua senha (ver abaixo) | Production, Preview |

### Gerar o ADMIN_PASSWORD_HASH

Execute localmente (Node.js):

```bash
node -e "const b=require('bcryptjs'); b.hash('SUA_SENHA_AQUI', 12).then(console.log)"
```

Ou use um gerador online de bcrypt com cost factor 12.

Cole o hash gerado (começa com `$2a$12$...`) na variável `ADMIN_PASSWORD_HASH`.

---

## 4. Verificar região

Certifique-se de que a tabela foi criada na mesma região definida em `AWS_REGION`. Para encontrar a região:

- Na URL do DynamoDB: `https://us-east-1.console.aws.amazon.com/dynamodb/...`
- Em **DynamoDB → Tables** → verifique no canto superior direito

---

## 5. Checklist final

- [ ] IAM User `portfolio-api` criado
- [ ] Policy `PortfolioDataAccess` criada e anexada ao user
- [ ] Access Key ID e Secret copiados e salvos
- [ ] Tabela `portfolio-data` criada com pk (String) + sk (String)
- [ ] PITR habilitado na tabela
- [ ] Todas as 7 variáveis de ambiente adicionadas no Vercel
- [ ] `ADMIN_PASSWORD_HASH` gerado com bcrypt cost 12

---

## Custos esperados

Com uso pessoal (< 1.000 req/mês):

| Recurso | Free tier permanente | Uso estimado |
|---|---|---|
| DynamoDB storage | 25 GB | < 1 MB |
| DynamoDB reads | 25 RCU | < 10/mês |
| DynamoDB writes | 25 WCU | < 10/mês |
| **Total** | | **$0/mês** |
