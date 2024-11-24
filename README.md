# action-create-pull-request

Essa action GitHub realiza a abertura de pull_request

## Inputs **Required**

### `token`
### `branch`
### `base`
### `commit_message`
### `title`
### `body`

## Acão requerida

Para que a action possa realizar a abertura de pull_request de forma automatizada você precisará habilidade o seu repositório para que crie e aprove solicitações pull.

Siga os passos a baixo para habilitar a função.

No seu repositório vá em `settings` > `action` > `general` habilite a função `Allow GitHub Actions to create and approve pull requests`. 

## Caso de uso.

```yaml
uses: juliobsilva/action-create-pull-request@v1
with:
  token:           ${{ secrets.GITHUB_TOKEN }}
  branch:          "branch-name"
  base:            "main"
  commit_message: "A Message for your commit"
  title:          "A title for your pull_request" 
  body:           "A Message for your pull_request"
```
