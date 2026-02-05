# Primeiros Passos

## Rodando a Aplicação

### Modo Desenvolvimento
```bash
npm start
```
Isso irá:
- Compilar o código TypeScript
- Iniciar o servidor de desenvolvimento Vite
- Abrir a aplicação Electron

### Verificando se está funcionando
1. A janela da aplicação deve abrir
2. Deve aparecer "👋 This message is being logged by renderer.ts" no console
3. Sem erros no terminal

## Entendendo o Fluxo

### 1. Main Process (`src/main.ts`)
```typescript
// Cria a janela principal
const mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    preload: path.join(__dirname, "preload.js"),
  },
})
```

### 2. Preload Script (`src/preload.ts`)
```typescript
// Expõe APIs seguras para o renderer
contextBridge.exposeInMainWorld("electronAPI", {
  loadAsset: (path) => ipcRenderer.invoke("load-asset", path),
  // ... outras APIs
})
```

### 3. Renderer Process (`src/renderer.ts`)
```typescript
import './index.css'
console.log('👋 This message is being logged by "renderer.ts"')
```

## Desenvolvimento Interativo

### Hot Reload
- O Vite automaticamente recarrega o renderer quando você salva
- Para mudanças no main/preload, reinicie com `npm start`

### Debug Tools
```typescript
// Descomente em main.ts para abrir DevTools
mainWindow.webContents.openDevTools()
```

### Console Logs
- **Main Process**: Aparece no terminal
- **Renderer Process**: Aparece no DevTools (F12)

## Exemplo Simples de Comunicação

### 1. No Main Process
```typescript
// Adicione handlers IPC
ipcMain.handle('get-app-version', () => {
  return app.getVersion()
})
```

### 2. No Preload Script
```typescript
contextBridge.exposeInMainWorld("electronAPI", {
  getAppVersion: () => ipcRenderer.invoke("get-app-version"),
})
```

### 3. No Renderer Process
```typescript
// Use a API exposta
window.electronAPI.getAppVersion().then(version => {
  console.log('App version:', version)
})
```

## Testando as Configurações

### ESLint + Prettier
```bash
# Teste linting
npm run lint

# Formate o código
npx prettier --write .
```

### TypeScript
```bash
# Verifique tipos
npx tsc --noEmit
```

## Comandos Úteis

```bash
# Desenvolvimento
npm start              # Inicia app em modo dev

# Build e Teste
npm run package        # Empacota para teste
npm run make           # Cria executável

# Código
npm run lint           # Verifica ESLint
npx prettier --write . # Formata código
```

## Próximos Passos

1. **Explore a estrutura**: Leia [Estrutura do Projeto](./structure.md)
2. **Configure o estilo**: Veja [Guia de Estilo](./style-guide.md)
3. **Entenda a arquitetura**: Consulte [Arquitetura](./architecture.md)
4. **Adicione funcionalidades**: Veja [APIs e Comunicação](./api.md)

## Dicas de Desenvolvimento

### Produtividade
- Use VS Code com as extensões recomendadas
- Configure atalhos para comandos frequentes
- Use Git branches para funcionalidades

### Debug
- Use `console.log` para main process
- Use DevTools para renderer process
- Use breakpoints no VS Code

### Boas Práticas
- Commits pequenos e descritivos
- Teste antes de fazer commit
- Mantenha a documentação atualizada

## Problemas Comuns

### "Module not found"
```bash
# Reinstale dependências
rm -rf node_modules package-lock.json
npm install
```

### Janela não abre
- Verifique o console do main process
- Confirme se não há erros de sintaxe
- Verifique as configurações do BrowserWindow

### Hot reload não funciona
- Salve o arquivo renderer.ts
- Verifique se o servidor Vite está rodando
- Reinicie `npm start` se necessário
