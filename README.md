# Laboratório de Flip-Flops — Grupo 4

**Fatec Rubens Lara · Análise e Desenvolvimento de Sistemas**  
**Disciplina:** Arquitetura e Organização de Computadores  
**Integrantes:** Richard, Matheus, Vinicius e João

## Objetivo

Demonstrar as tabelas características de SR, JK, D e T em um modelo de simulação lógico-funcional, com entradas manipuláveis, clock comum, saída Q e complemento, previsão da próxima operação e histórico das bordas de subida.

## Executar

1. Extraia o ZIP em uma pasta.
2. Abra `index.html` com Chrome, Edge ou Firefox. Não é preciso instalar nada, usar servidor ou conectar à internet.
3. Clique nos botões de entrada para alternar 0/1. Use **Alternar clock** para ver a diferença entre subida e descida, ou **Pulso completo** para executar um ciclo com uma subida e terminar em zero.
4. Use **Demonstração: passo 1/6** para percorrer os seis casos preparados. No primeiro passo, o simulador reinicia os estados. Após o último, o botão permite repetir.
5. Se desejar, exporte o histórico CSV. Em **Como funciona**, é possível executar o autoteste.

## Entradas, processamento e saídas

- Entradas: S/R, J/K, D, T e CLK (valores 0 ou 1).
- Processamento: o código identifica a transição 0→1 de CLK. Calcula cada próximo estado de acordo com a regra do dispositivo e com seu Q anterior. A descida não atualiza Q.
- Saídas: Q, complemento de Q, linha da tabela selecionada, previsão do próximo estado e histórico de cada execução.

| Tipo | Entrada | Próximo Q na subida |
| --- | --- | --- |
| SR | 00 / 01 / 10 / 11 | Q / 0 / 1 / X (proibido) |
| JK | 00 / 01 / 10 / 11 | Q / 0 / 1 / complemento de Q |
| D | 0 / 1 | 0 / 1 |
| T | 0 / 1 | Q / complemento de Q |

O projeto representa flip-flops disparados por borda ascendente com entradas funcionais ativas em nível alto. X é uma abstração de estado indeterminado para o SR convencional, não um terceiro nível elétrico. A condição 11 no latch NOR simples força ambas as saídas a 0 enquanto ativa, podendo deixar o estado final indeterminado quando liberada simultaneamente. Aqui simulamos o **modelo por borda**, não o latch NOR físico. Após X, 00 mantém X; Set ou Reset válido recupera um estado conhecido. As saídas complementares são X quando Q é X. Não se simulam tensões, propagação, setup/hold, metastabilidade nem preset/clear físicos. O botão de reinicialização apenas inicializa o ambiente de simulação em Q=0.

## Demonstração sugerida (3 a 4 minutos)

1. Reinicie. Altere D para 1 sem clock: Q continua 0. Alterne o clock para 1: Q=1. Volte D para 0 e alterne o clock para 0: Q permanece 1. Uma nova subida captura 0. Explique que isso diferencia o flip-flop por borda de um latch habilitado.
2. Clique em **Demonstração: passo 1/6** (reinicia automaticamente). Observe as quatro saídas e as tabelas. Prossiga pelos passos, pedindo que a turma preveja os resultados antes dos cliques.

| Borda | SR S,R | JK J,K | D | T | Q SR | Q JK | Q D | Q T |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 10 | 11 | 1 | 1 | 1 | 1 | 1 | 1 |
| 2 | 00 | 11 | 0 | 0 | 1 | 0 | 0 | 1 |
| 3 | 01 | 10 | 1 | 1 | 0 | 1 | 1 | 0 |
| 4 | 00 | 01 | 0 | 1 | 0 | 0 | 0 | 1 |
| 5 | 11 | 00 | 1 | 0 | X | 0 | 1 | 1 |
| 6 | 01 | 11 | 0 | 1 | 0 | 1 | 0 | 0 |

3. Destaque a condição proibida do SR no passo 5 e a recuperação no 6. Compare o JK com o SR, a captura D e o toggle T.
4. Mostre o histórico e conclua que cada elemento armazena um bit, mas a regra de atualização depende do tipo.

Todos os integrantes devem estudar a tabela inteira e o mecanismo do clock, não somente sua parte. Sugestão de divisão: Pessoa 1 introduz e explica SR; Pessoa 2 demonstra JK; Pessoa 3 demonstra D e a borda; Pessoa 4 demonstra T, compara e conclui. Os exemplos podem ser conduzidos durante uma demonstração compartilhada.

## Validação

O autoteste disponível no navegador inclui 24 casos das tabelas (cada combinação para Q inicial 0 e 1), 10 verificações de clock/estado/indeterminação e seis etapas de demonstração: 40 testes. O arquivo `resultados_testes.csv` contém os resultados efetivamente obtidos na execução automatizada.

Opcionalmente, se Node.js estiver instalado, execute `node testar.cjs` na pasta. Não há dependências npm. O script executa o mesmo núcleo lógico do HTML e gera `resultados_testes.csv`.

## Organização do projeto

- `index.html`: interface, estilos, modelo lógico e testes incorporados.
- `testar.cjs`: execução automatizada opcional dos testes via Node.js.
- `resultados_testes.csv`: evidência da execução dos testes.
- `evidencia_execucao.png`: captura da demonstração real em execução no navegador.
- `README.md`: documentação e roteiro.

## Entrega no GitHub

O professor exige repositório quando há desenvolvimento de código. Crie um repositório no GitHub (por exemplo, `flipflops-fatec`), carregue os arquivos desta pasta na raiz usando **Add file → Upload files**, confirme o commit e compartilhe o link com o professor. Verifique se ele tem acesso. A publicação não foi realizada automaticamente; precisa ser feita por um integrante em sua própria conta. GitHub Pages é opcional: a execução local já funciona.

## Referências

- TANENBAUM, Andrew S.; AUSTIN, Todd. *Organização estruturada de computadores*. 6. ed. Pearson, 2013. Cap. 3, §§3.2.4, 3.3.1–3.3.3 (clock, latch, memória, flip-flop D e registradores).
- FREY, Ray. *Digital Electronics Notes*. University of Oregon. https://pages.uoregon.edu/rayfrey/DigitalNotes.pdf (referência de lógica digital indicada nos slides do grupo).
- Texas Instruments. SN74HC112 (JK) e SN74HC74 (D). https://www.ti.com/product/SN74HC112 e https://www.ti.com/product/SN74HC74 (referências técnicas indicadas nos slides; o JK físico citado é de borda descendente, diferentemente da convenção ascendente deste simulador).
- Orientações do trabalho fornecidas pelo professor, seções 2.2, 4, 5 e 6.

Implementação didática em nível lógico, sem dependências externas; não se trata de uma simulação elétrica de circuitos.
