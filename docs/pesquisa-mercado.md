# Pesquisa de Mercado — Serviços de Notificação

## Serviços de E-mail Transacional

| Serviço | Plano Gratuito | Preço Inicial | Diferenciais |
| :--- | :--- | :--- | :--- |
| SendGrid | 100 emails/dia | US$ 15/mês | Fácil de criar templates e API muito estável. |
| Mailgun | 5.000/mês (3 meses) | US$ 35/mês | Focado em devs, boa documentação. |
| Amazon SES | 62.000/mês (EC2) | US$ 0.10/1000 | Mais barato do mercado, mas difícil de configurar. |
| Mailtrap | 500/mês (teste) | US$ 15/mês | Ótimo para simular envios em ambiente de teste. |

## Como o nosso projeto se compara?
Nosso projeto busca a simplicidade dessas ferramentas, mas focando no custo zero e na integração rápida. Diferente dos grandes players, nossa solução é enxuta e voltada especificamente para a necessidade do nosso sistema, sem complexidade de marketing.

## O que poderíamos adotar no futuro?
* **Sistema de Filas:** Para o envio não travar a aplicação.
* **Webhooks:** Para rastrear se o e-mail foi aberto ou se deu erro.
* **Templates Dinâmicos:** Para facilitar a edição das mensagens sem mexer no código.