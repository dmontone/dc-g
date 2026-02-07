# Padrão Factory para Entidades

## Visão Geral
Sistema para criação de entidades ECSY com configurações pré-definidas, garantindo consistência e reutilização.

## Conceito
O padrão Factory resolve problemas comuns na criação de entidades, fornecendo uma abordagem estruturada e consistente.

### Vantagens do Padrão Factory

#### 1. Consistência
- Todas as entidades do mesmo tipo seguem o mesmo padrão
- Componentes sempre adicionados na mesma ordem
- Valores padrão consistentes

#### 2. Manutenibilidade
- Mudanças em um único lugar afetam todas as entidades
- Fácil atualizar configurações globais
- Bug fixes aplicados a todas as instâncias

#### 3. Reutilização
- Fábricas podem ser reutilizadas em diferentes contextos
- Configurações podem ser compartilhadas
- Redução de código duplicado

#### 4. Testabilidade
- Fácil criar entidades de teste consistentes
- Configurações podem ser injetadas para testes
- Comportamento previsível

#### 5. Performance
- Objet pooling implementado uma vez na factory
- Configurações pré-calculadas
- Menos alocações em runtime

### BaseEntityFactory
Classe abstrata base que força criação automática no construtor:

```typescript
export abstract class BaseEntityFactory {
  constructor(
    protected world: World,
    protected scene: THREE.Scene | THREE.Group,
    autoCreate: boolean = true  // Cria automaticamente por padrão
  ) {
    if (autoCreate) this.create()
  }

  protected createBaseEntity(components: any[] = []) {
    const entity = this.world.createEntity()
    components.forEach((c) => entity.addComponent(c))
    return entity
  }
  
  protected abstract create(): void  // Método obrigatório nas subclasses
}
```

### Padrão de Uso Real
As factories não têm método `create()` público, mas sim criam entidades específicas:

```typescript
// Exemplo de factory específica
export class InputFactory extends BaseEntityFactory {
  private keyboard() { return this.createBaseEntity([KeyboardState]) }
  private mouse() { return this.createBaseEntity([MouseCoord, MouseDelta, MouseButtons]) }

  create() {
    return {
      keyboard: this.keyboard(),
      mouse: this.mouse()
    }
  }
}
```

### Registro no World
As factories são instanciadas e o método `create()` é chamado automaticamente pelo construtor:

```typescript
// Exemplo de registro no World.ts
private registerEntities(): void {
  new InputFactory(this.ecsyWorld, this.engine.scene)  // create() chamado automaticamente
  new CameraFactory(this.ecsyWorld, this.engine.scene)
  new HexGridFactory(this.ecsyWorld, this.engine.scene)
}
```
