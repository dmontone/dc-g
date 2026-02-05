# Guia de Documentação

## Como Criar Novas Documentações

Este guia explica como criar e manter a documentação do projeto DC-G.

## Estrutura de Documentação

### Localização
Todas as documentações ficam na pasta `docs/`:
```
docs/
├── setup.md                    # Setup inicial
├── getting-started.md          # Primeiros passos
├── documentation-guide.md      # Este arquivo
└── [outros-arquivos].md        # Documentações específicas
```

### Padrão de Nomenclatura
- **kebab-case**: `user-guide.md`, `api-reference.md`
- **Inglês para termos técnicos**: `getting-started.md`, `style-guide.md`
- **Português para guias**: `guia-de-estilo.md`, `configuracao.md`

## Template para Novos Documentos

### Template Básico
```markdown
# Título do Documento

## Descrição
Breve descrição do que este documento cobre.

## Pré-requisitos
- O que é necessário antes de começar
- Dependências ou conhecimentos requeridos

## Conteúdo Principal

### Seção 1
Conteúdo detalhado...

### Seção 2
Mais conteúdo...

## Exemplos
```bash
# Comandos de exemplo
npm run comando
```

## Dicas e Boas Práticas
- Dica importante
- Outra dica útil

## Problemas Comuns
### Problema X
**Solução**: Como resolver

## Recursos Relacionados
- [Link para outro doc](./outro-arquivo.md)
- [Link externo](https://exemplo.com)

---

**Última atualização**: YYYY-MM-DD  
**Autor**: Seu nome
```

### Template para Documentos Técnicos
```markdown
# [Técnico] - Título

## Visão Geral
Descrição técnica do componente/sistema.

## Arquitetura
```
diagrama ou código
```

## API Reference
### Método/Função
```typescript
function exemplo(param: string): Promise<void>
```
**Parâmetros**: 
- `param`: descrição

**Retorno**: Promise<void>

## Configuração
Arquivos de configuração relevantes.

## Exemplos de Uso
Código prático de implementação.

## Testes
Como testar este componente.

## Performance
Considerações de performance.

## Segurança
Aspectos de segurança relevantes.
```

## Tipos de Documentação

### 1. Guias de Setup
- **Público-alvo**: Novos desenvolvedores
- **Conteúdo**: Passo a passo, comandos, configuração
- **Exemplos**: `setup.md`, `getting-started.md`

### 2. Documentação Técnica
- **Público-alvo**: Desenvolvedores experientes
- **Conteúdo**: API, arquitetura, padrões
- **Exemplos**: `api.md`, `architecture.md`

### 3. Guias de Processo
- **Público-alvo**: Equipe de desenvolvimento
- **Conteúdo**: Workflows, boas práticas
- **Exemplos**: `contributing.md`, `build.md`

### 4. Documentação de Referência
- **Público-alvo**: Todos os desenvolvedores
- **Conteúdo**: Configurações, comandos, FAQ
- **Exemplos**: `scripts.md`, `configurations.md`, `faq.md`

## Boas Práticas de Escrita

### Formatação
- Use **negrito** para termos importantes
- Use `código inline` para nomes de arquivos, comandos
- Use blocos de código para exemplos
- Use emojis para categorizar seções (🚀, 🛠️, 📚, etc.)

### Estrutura
1. **Título claro e descritivo**
2. **Descrição breve no início**
3. **Seções lógicas com ##**
4. **Exemplos práticos**
5. **Links para recursos relacionados**

### Linguagem
- **Português** para documentação interna
- **Inglês** para termos técnicos e código
- **Tom amigável** mas profissional
- **Verbos no imperativo** para instruções

## Atualizando o README Principal

Ao criar nova documentação, atualize o `README.md`:

### 1. Adicione ao índice apropriado
```markdown
### 🚀 Guias
- [Setup Inicial](./docs/setup.md) - Configuração do ambiente
- [Getting Started](./docs/getting-started.md) - Primeiros passos
- [Novo Guia](./docs/novo-guia.md) - Descrição breve
```

### 2. Mantenha ordem alfabética
Mantenha os links em ordem alfabética dentro de cada seção.

### 3. Descrições breves
Use descrições de uma linha claras e objetivas.

## Validação de Documentação

### Checklist antes de publicar:
- [ ] Título claro e descritivo
- [ ] Links funcionais (testar todos)
- [ ] Código formatado corretamente
- [ ] Exemplos testados
- [ ] Atualizado no README.md
- [ ] Data e autor no final
- [ ] Revisado por outro dev (se possível)

### Teste de Links
```bash
# Verifique se todos os links funcionam
npx markdown-link-check docs/*.md
```

## Versionamento de Documentação

### Quando atualizar:
- **Patch**: Correções pequenas, links quebrados
- **Minor**: Novas seções, exemplos adicionais
- **Major**: Reestruturação completa, mudança de formato

### Controle de Mudanças
Adicione seção de changangelog em documentos maiores:
```markdown
## Changelog

### v1.2.0 (2026-02-05)
- Adicionada seção de exemplos
- Corrigidos links quebrados

### v1.1.0 (2026-01-20)
- Documentação inicial
```

## Ferramentas Úteis

### Edição
- **VS Code** com extensão Markdown All in One
- **Typora** para visualização ao vivo
- **Mark Text** editor de markdown

### Validação
- **markdownlint** para verificar estilo
- **markdown-link-check** para verificar links
- **remark** para linting avançado

### Preview
```bash
# Servidor local para preview
npx live-server docs/

# Ou use extensões do VS Code
```

## Exemplo Prático

### Criando um novo guia:

1. **Crie o arquivo**:
```bash
touch docs/novo-guia.md
```

2. **Use o template**:
```markdown
# Novo Guia

## Descrição
...
```

3. **Adicione ao README**:
```markdown
### 🚀 Guias
- [Novo Guia](./docs/novo-guia.md) - Descrição do novo guia
```

4. **Valide**:
```bash
# Teste links
npx markdown-link-check README.md docs/novo-guia.md
```

5. **Commit**:
```bash
git add docs/novo-guia.md README.md
git commit -m "docs: add novo guia de [tópico]"
```

## Manutenção Contínua

### Revisão Periódica
- **Mensal**: Verificar links quebrados
- **Trimestral**: Revisar conteúdo desatualizado
- **Semestral**: Reestruturação geral se necessário

### Feedback
- Encoraje feedback da equipe
- Crie issues para melhorias na documentação
- Mantenha aberto a sugestões

---

**Este guia ajuda a manter a documentação consistente e útil para toda equipe!**
