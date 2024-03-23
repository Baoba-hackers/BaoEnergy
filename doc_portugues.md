
## BaoTrack
#### Integrantes:
- <a href="https://www.linkedin.com/in/davi-motta/">Davi Motta</a>
- <a href="https://www.linkedin.com/in/erik-batista-da-silva-455612215/">Erik Batista</a>
- <a href="https://www.linkedin.com/in/nicollas-isaac/">Nicollas Isaac</a>
- <a href="https://www.linkedin.com/in/rafaella-bianca-cavalcante/">Rafaella Cavalcante</a>
- <a href="https://www.linkedin.com/in/yan-m-coutinho/">Yan Coutinho</a>

## Sumário

[1. Introdução](#c1)

[2. Objetivos e Justificativa](#c2)

[3. Análise de Mercado e Desenvolvimento](#c3)

[4. Arquitetura da Solução](#c4)

[5. Conclusões e Próximos Passos](#c6)

[6. Referências](#c7)

## <a name="c1"></a>1. Introdução
&emsp;A plataforma BaoTrack visa solucionar a falta de transparência nos preços históricos praticados por fornecedores e o desvio de dinheiro presente na compra de insumos indiretos nas mais diversas empresas. Por meio da implementação de uma solução inovadora utilizando a tecnologia blockchain, o objetivo principal é dinamizar o processo de cotação na área de Supply Chain - Sourcing, automatizando a negociação e aumentando a transparência e segurança nas transações.<p>
&emsp;A solução BaoTrack utiliza as tecnologias ChainLink, Hardhat, Next.js, Scaffold e Scroll para criar um serviço que emprega a blockchain na determinação do preço médio de mercado para insumos indiretos. Isso assegura que os usuários paguem um preço justo, enquanto proporciona total transparência e rastreabilidade das transações para as áreas de Supply Chain e Auditoria das empresas.<p>
&emsp;Além disso, busca-se a criação de um ambiente confiável e eficiente, eliminando a necessidade de intermediários e promovendo uma rede de informações confiáveis entre os parceiros.<p>

## <a name="c2"></a>2. Objetivos e Justificativa

### 2.1 Objetivos Gerais

&emsp;O projeto BaoTrack surge para enfrentar os desafios na gestão transparente e eficiente das cadeias de suprimentos empresariais. Diante da falta de transparência nos preços dos fornecedores e dos desvios financeiros, é essencial desenvolver uma solução inovadora e confiável. Os objetivos do BaoTrack são claros: promover transparência nos preços, automatizar processos de cotação e estabelecer uma rede segura de informações entre parceiros. Esses objetivos são fundamentais para o sucesso do projeto, alinhando-se com a missão de transformar a gestão da cadeia de suprimentos e impulsionar a adoção da tecnologia blockchain nas empresas.<p>

### 2.2 Objetivos Específicos

&emsp;Os objetivos específicos delineados para o projeto BaoTrack são essenciais para direcionar seu desenvolvimento e implementação. Eles representam os pilares fundamentais para o sucesso do BaoTrack, buscando soluções práticas e eficazes para melhorar as operações comerciais das empresas.<p>

**1. Aumentar a Transparência nos Preços:** Implementar uma solução que permita aos usuários acessar e compreender os preços históricos praticados por fornecedores, promovendo maior transparência no processo de cotação e compra de insumos indiretos.

**2. Reduzir o Desvio de Dinheiro:** Combater o desvio de recursos financeiros por meio da criação de um sistema imutável e transparente, que registra todas as transações na blockchain, garantindo a integridade e a rastreabilidade dos pagamentos.

**3. Automatizar o Processo de Cotação:** Desenvolver ferramentas e algoritmos que automatizem o processo de cotação na área de Supply Chain - Sourcing, agilizando as negociações entre compradores e fornecedores e reduzindo a dependência de intervenção humana.

**4. Garantir Preços Justos:** Utilizar a tecnologia blockchain para determinar o preço médio de mercado para produtos e serviços, garantindo que os usuários paguem valores justos e competitivos, alinhados com as condições do mercado.

**5. Eliminar Intermediários:** Criar um ambiente confiável e eficiente, no qual os participantes da rede possam interagir diretamente entre si, eliminando a necessidade de intermediários e reduzindo custos adicionais no processo de compra.

**6. Promover uma Rede de Informações Confiáveis:** Estabelecer uma rede sólida de informações entre os parceiros, baseada na transparência e na confiabilidade das transações registradas na blockchain, fortalecendo as relações comerciais e aumentando a segurança das operações.

**7. Facilitar a Adoção de Tecnologia Blockchain:** Demonstrar a viabilidade e os benefícios da tecnologia blockchain na otimização dos processos de supply chain, incentivando a sua adoção por parte de outras empresas e setores da indústria.

**8. Desenvolver um Produto Viável Mínimo (MVP):** Criar um MVP funcional da plataforma BaoTrack, que demonstre de forma prática e eficaz as capacidades da solução proposta, permitindo testes e validações por parte dos usuários e potenciais investidores.

&emsp;Esses objetivos são fundamentais para orientar o desenvolvimento e a implementação bem-sucedida do projeto BaoTrack, visando resolver os desafios identificados na gestão de cotações e compras na cadeia de suprimentos das empresas.<p>

### 2.3 Justificativa
  
&emsp;A implementação deste projeto se fundamenta na necessidade premente do mercado por transparência nos preços de insumos indiretos, com o objetivo claro de alcançar preços justos e mitigar os riscos associados à corrupção. A compra de insumos indiretos representa uma atividade crítica para o sucesso de qualquer organização, seja ela pública ou privada, porém, frequentemente, este processo se mostra opaco e suscetível a práticas corruptas. </p>
&emsp;Pagamentos excessivos são uma das consequências mais diretas dessa falta de transparência, onde as empresas podem inadvertidamente desembolsar quantias superiores ao valor justo dos insumos, prejudicando seus resultados financeiros e minando sua competitividade. Além disso, a pressão para reduzir custos muitas vezes leva à aquisição de insumos de qualidade inferior, comprometendo, por consequência, a qualidade dos produtos ou serviços finais oferecidos pela organização. </p>
&emsp;Um estudo recente conduzido pelo Tribunal de Contas da União (TCU) evidenciou que, entre 2010 e 2020, o governo federal registrou perdas significativas da ordem de R$ 100 bilhões devido a fraudes em licitações para a compra de insumos indiretos `1`. Esse dado alarmante destaca a urgência de medidas efetivas para combater a corrupção neste setor e garantir uma gestão mais transparente e eficiente dos recursos públicos e privados. </p>
&emsp;Neste contexto, a transparência emerge como um pilar fundamental para assegurar a equidade e eficácia na aquisição de insumos indiretos. Ao tornar públicas informações cruciais, tais como preços, fornecedores e processos de compra, é possível promover a concorrência saudável entre os fornecedores, fomentando a redução de preços e garantindo a qualidade dos insumos adquiridos. Além disso, a transparência dificulta práticas de favorecimento de empresas específicas e a ocorrência de atos corruptivos, contribuindo para um ambiente de negócios mais íntegro e justo. </p>
&emsp;Assim, a construção da solução proposta se apresenta não apenas como uma resposta eficaz aos desafios enfrentados no contexto da compra de insumos indiretos, mas também como um passo fundamental na promoção da transparência, equidade e eficiência nas práticas comerciais, tanto no setor público quanto privado.
 </p>

## <a name="c3"></a>3. Análise de Mercado e Desenvolvimento

### 3.1 Contexto da Indústria

### 3.2 Análise das 5 Forças de Porter

### 3.3 Análise SWOT

### 3.4 Value Proposition Canvas

### 3.5 Personas & User Story 

### 3.6 Regras de Negócios

## <a name="c4"></a>4. Arquitetura da Solução

### 4.1 Visão Geral da Arquitetura

### 4.2 Tecnologias Utilizadas

### 4.3 Diagrama de Blocos

## <a name="c5"></a>5. Conclusões e Próximos Passos

## <a name="c6"></a>6. Referências
[1]TCU (Tribunal de Contas da União). Relatório de Gestão [online]. Disponível em: <https://portal.tcu.gov.br/contas/contas-e-relatorios-de-gestao/prestacao-de-contas/relatorio-de-gestao.htm>. Acesso em: [coloque a data de acesso aqui, no formato dia/mês/ano].