export interface RecipeIngredient {
  name: string;
  amount: string;
}

export interface RecipeSection {
  title: string;
  ingredients: RecipeIngredient[];
}

export interface Recipe {
  id: string;
  name: string;
  emoji: string;
  color: string;
  colorLight: string;
  description: string;
  servings: number;
  prepTime: string;
  bakeTime: string;
  difficulty: "Fácil" | "Fácil a Moderado" | "Moderado";
  difficultyStars: 1 | 2 | 3;
  sections: RecipeSection[];
  steps: string[];
  businessTip: string;
  xpReward: number;
}

export const recipes: Recipe[] = [
  {
    id: "vanilla-bean",
    name: "Bolo de Baunilha Clássico",
    emoji: "🍰",
    color: "#f59e0b",
    colorLight: "#fef3c7",
    description: "O sabor mais pedido em casamentos — leve, húmido e a base perfeita para qualquer recheio.",
    servings: 16,
    prepTime: "20 min",
    bakeTime: "30–35 min",
    difficulty: "Fácil",
    difficultyStars: 1,
    sections: [
      {
        title: "Bolo",
        ingredients: [
          { name: "Farinha de trigo especial", amount: "3 xícaras (375g)" },
          { name: "Fermento em pó", amount: "1 colher de sopa" },
          { name: "Sal", amount: "½ colher de chá" },
          { name: "Manteiga sem sal, amolecida", amount: "1 xícara (225g)" },
          { name: "Açúcar granulado", amount: "2 xícaras (400g)" },
          { name: "Ovos grandes, temperatura ambiente", amount: "4 unidades" },
          { name: "Pasta de baunilha (ou extrato puro)", amount: "1 colher de sopa" },
          { name: "Leite integral, temperatura ambiente", amount: "1 xícara (240ml)" },
        ],
      },
      {
        title: "Buttercream de Baunilha",
        ingredients: [
          { name: "Manteiga sem sal, amolecida", amount: "1½ xícaras (340g)" },
          { name: "Açúcar de confeiteiro", amount: "5 xícaras (600g)" },
          { name: "Creme de leite", amount: "2 colheres de sopa" },
          { name: "Extrato de baunilha", amount: "1 colher de chá" },
          { name: "Pitada de sal", amount: "a gosto" },
        ],
      },
    ],
    steps: [
      "Pré-aqueça o forno a 180°C. Unte e forre duas formas redondas de 20cm.",
      "Misture a farinha, o fermento e o sal numa tigela. Reserve.",
      "Bata a manteiga com o açúcar por 3–4 minutos até ficar pálida e fofa.",
      "Adicione os ovos um a um, batendo bem após cada adição. Misture a pasta de baunilha.",
      "Adicione a mistura de farinha em três etapas, alternando com o leite. Misture apenas até incorporar.",
      "Divida a massa entre as formas e asse por 30–35 min, até um palito sair limpo.",
      "Arrefeça nas formas 10 minutos, depois transfira para uma grade e arrefeça completamente.",
      "Para o buttercream: bata a manteiga até ficar lisa. Adicione gradualmente o açúcar, creme, baunilha e sal até ficar leve.",
      "Recheie, empilhe, aplique a crumb coat e finalize com buttercream liso ou texturizado.",
    ],
    businessTip:
      "A baunilha é o sabor 'padrão' mais seguro para degustações — combine com recheios criativos (framboesa, caramelo salgado, lemon curd) para que mesmo um sabor simples pareça personalizado.",
    xpReward: 50,
  },
  {
    id: "chocolate-fudge",
    name: "Bolo de Chocolate Intenso",
    emoji: "🍫",
    color: "#92400e",
    colorLight: "#fef3c7",
    description: "Um bolo de camadas incrivelmente chocolatado que permanece húmido por dias — ideal para montagem antecipada.",
    servings: 16,
    prepTime: "20 min",
    bakeTime: "32–35 min",
    difficulty: "Fácil",
    difficultyStars: 1,
    sections: [
      {
        title: "Bolo",
        ingredients: [
          { name: "Farinha de trigo", amount: "2 xícaras (250g)" },
          { name: "Cacau em pó sem açúcar", amount: "¾ xícara (75g)" },
          { name: "Bicarbonato de sódio", amount: "2 colheres de chá" },
          { name: "Fermento em pó", amount: "½ colher de chá" },
          { name: "Sal", amount: "1 colher de chá" },
          { name: "Açúcar granulado", amount: "2 xícaras (400g)" },
          { name: "Ovos grandes", amount: "2 unidades" },
          { name: "Buttermilk", amount: "1 xícara (240ml)" },
          { name: "Café quente (ou água quente)", amount: "1 xícara (240ml)" },
          { name: "Óleo vegetal", amount: "½ xícara (120ml)" },
          { name: "Extrato de baunilha", amount: "1 colher de chá" },
        ],
      },
      {
        title: "Ganache de Chocolate",
        ingredients: [
          { name: "Chocolate meio amargo picado", amount: "225g" },
          { name: "Creme de leite", amount: "1 xícara (240ml)" },
        ],
      },
    ],
    steps: [
      "Pré-aqueça o forno a 180°C. Unte e forre duas formas de 20cm.",
      "Misture a farinha, cacau, bicarbonato, fermento e sal.",
      "Noutro tigela, misture o açúcar, ovos, buttermilk, óleo e baunilha.",
      "Combine os ingredientes húmidos e secos, depois adicione cuidadosamente o café quente — a massa ficará líquida; isso é normal.",
      "Divida entre as formas e asse 32–35 min, até um palito sair com apenas algumas migalhas húmidas.",
      "Arrefeça completamente antes de rechear e cobrir.",
      "Para a ganache: aqueça o creme até ferver, deite sobre o chocolate e deixe 2 minutos antes de mexer até ficar liso. Arrefeça até consistência para barrar.",
      "Cubra o exterior com buttercream de baunilha ou chocolate.",
    ],
    businessTip:
      "O chocolate é o sabor que a maioria dos casais escolhe como um dos dois andares — mantenha-o sempre no menu, pois raramente é ignorado numa degustação.",
    xpReward: 50,
  },
  {
    id: "red-velvet",
    name: "Red Velvet do Sul",
    emoji: "❤️",
    color: "#dc2626",
    colorLight: "#fee2e2",
    description: "Um miolo vermelho vibrante com toque de cacau, finalizado com cobertura clássica de cream cheese.",
    servings: 16,
    prepTime: "25 min",
    bakeTime: "28–30 min",
    difficulty: "Fácil",
    difficultyStars: 1,
    sections: [
      {
        title: "Bolo",
        ingredients: [
          { name: "Farinha de trigo", amount: "2½ xícaras (315g)" },
          { name: "Açúcar granulado", amount: "1½ xícaras (300g)" },
          { name: "Bicarbonato de sódio", amount: "1 colher de chá" },
          { name: "Cacau em pó", amount: "1 colher de sopa" },
          { name: "Sal", amount: "1 colher de chá" },
          { name: "Óleo vegetal", amount: "1½ xícaras (355ml)" },
          { name: "Buttermilk, temperatura ambiente", amount: "1 xícara (240ml)" },
          { name: "Ovos grandes", amount: "2 unidades" },
          { name: "Corante vermelho em gel", amount: "2 colheres de sopa" },
          { name: "Vinagre branco", amount: "1 colher de chá" },
          { name: "Extrato de baunilha", amount: "1 colher de chá" },
        ],
      },
      {
        title: "Cobertura de Cream Cheese",
        ingredients: [
          { name: "Cream cheese, amolecido", amount: "450g" },
          { name: "Manteiga sem sal, amolecida", amount: "½ xícara (115g)" },
          { name: "Açúcar de confeiteiro", amount: "4 xícaras (480g)" },
          { name: "Extrato de baunilha", amount: "1 colher de chá" },
        ],
      },
    ],
    steps: [
      "Pré-aqueça o forno a 180°C. Unte e forre duas formas de 20cm.",
      "Misture a farinha, açúcar, bicarbonato, cacau e sal.",
      "Noutro tigela, misture o óleo, buttermilk, ovos, corante, vinagre e baunilha.",
      "Combine os húmidos e secos. Misture apenas até ficar liso — não bata em excesso.",
      "Divida entre as formas e asse 28–30 min.",
      "Arrefeça completamente antes de cobrir.",
      "Bata o cream cheese com a manteiga até ficar liso. Adicione o açúcar e a baunilha, batendo até ficar fofo.",
      "Recheie e cubra — o red velvet é tradicionalmente finalizado com uma camada semi-nua para deixar o miolo vermelho aparecer.",
    ],
    businessTip:
      "A cobertura de cream cheese é mais mole que o buttercream e não aguenta bem o calor — para casamentos ao ar livre ou de verão, estabilize com açúcar extra ou ofereça este sabor apenas para locais com ar condicionado.",
    xpReward: 50,
  },
  {
    id: "lemon-elderflower",
    name: "Limão e Flor de Sabugueiro",
    emoji: "🍋",
    color: "#16a34a",
    colorLight: "#dcfce7",
    description: "Um bolo brilhante e floral que se tornou favorito para casamentos de primavera e verão.",
    servings: 16,
    prepTime: "25 min",
    bakeTime: "28–32 min",
    difficulty: "Fácil a Moderado",
    difficultyStars: 2,
    sections: [
      {
        title: "Bolo",
        ingredients: [
          { name: "Farinha de trigo especial", amount: "3 xícaras (375g)" },
          { name: "Fermento em pó", amount: "1 colher de sopa" },
          { name: "Sal", amount: "½ colher de chá" },
          { name: "Manteiga sem sal, amolecida", amount: "1 xícara (225g)" },
          { name: "Açúcar granulado", amount: "1¾ xícaras (350g)" },
          { name: "Ovos grandes", amount: "4 unidades" },
          { name: "Raspa de 2 limões", amount: "2 limões" },
          { name: "Suco de limão fresco", amount: "¼ xícara (60ml)" },
          { name: "Cordial de flor de sabugueiro", amount: "2 colheres de sopa" },
          { name: "Leite integral", amount: "¾ xícara (180ml)" },
        ],
      },
      {
        title: "Buttercream de Flor de Sabugueiro",
        ingredients: [
          { name: "Manteiga sem sal, amolecida", amount: "1½ xícaras (340g)" },
          { name: "Açúcar de confeiteiro", amount: "5 xícaras (600g)" },
          { name: "Cordial de flor de sabugueiro", amount: "2 colheres de sopa" },
          { name: "Suco de limão", amount: "1 colher de sopa" },
        ],
      },
    ],
    steps: [
      "Pré-aqueça o forno a 180°C. Unte e forre duas formas de 20cm.",
      "Misture a farinha, fermento e sal.",
      "Bata a manteiga com o açúcar até ficar leve e fofo, cerca de 3 minutos.",
      "Adicione os ovos um a um, depois misture a raspa de limão, o suco e o cordial.",
      "Alterne a farinha e o leite, misturando apenas até incorporar.",
      "Divida entre as formas e asse 28–32 min.",
      "Arrefeça completamente. Para o buttercream: bata a manteiga, adicione o açúcar, cordial e suco de limão.",
      "Recheie com lemon curd para um sabor mais intenso, depois cubra com o buttercream.",
    ],
    businessTip:
      "Sabores florais e cítricos ficam lindos em fotos com flores prensadas ou rodelas de limão cristalizadas — fácil upsell para casais que planeiam um casamento ao ar livre.",
    xpReward: 60,
  },
  {
    id: "carrot-cake",
    name: "Bolo de Cenoura com Cream Cheese",
    emoji: "🥕",
    color: "#ea580c",
    colorLight: "#ffedd5",
    description: "Um bolo temperado e naturalmente húmido que agrada a quem prefere uma opção menos doce.",
    servings: 16,
    prepTime: "25 min",
    bakeTime: "35–40 min",
    difficulty: "Fácil",
    difficultyStars: 1,
    sections: [
      {
        title: "Bolo",
        ingredients: [
          { name: "Farinha de trigo", amount: "2½ xícaras (315g)" },
          { name: "Fermento em pó", amount: "2 colheres de chá" },
          { name: "Bicarbonato de sódio", amount: "1 colher de chá" },
          { name: "Canela em pó", amount: "1 colher de sopa" },
          { name: "Noz-moscada", amount: "½ colher de chá" },
          { name: "Sal", amount: "½ colher de chá" },
          { name: "Óleo vegetal", amount: "1½ xícaras (355ml)" },
          { name: "Açúcar mascavo claro", amount: "1½ xícaras (300g)" },
          { name: "Ovos grandes", amount: "4 unidades" },
          { name: "Cenouras finamente raladas", amount: "3 xícaras (300g)" },
          { name: "Nozes ou pecãs picadas (opcional)", amount: "1 xícara (100g)" },
        ],
      },
      {
        title: "Cobertura de Cream Cheese",
        ingredients: [
          { name: "Cream cheese, amolecido", amount: "450g" },
          { name: "Manteiga sem sal, amolecida", amount: "½ xícara (115g)" },
          { name: "Açúcar de confeiteiro", amount: "4 xícaras (480g)" },
          { name: "Extrato de baunilha", amount: "1 colher de chá" },
        ],
      },
    ],
    steps: [
      "Pré-aqueça o forno a 180°C. Unte e forre duas formas de 20cm.",
      "Misture a farinha, fermento, bicarbonato, canela, noz-moscada e sal.",
      "Noutro tigela, misture o óleo, açúcar mascavo e ovos.",
      "Incorpore os secos nos húmidos, depois adicione as cenouras raladas e as nozes.",
      "Divida entre as formas e asse 35–40 min.",
      "Arrefeça completamente antes de cobrir.",
      "Bata o cream cheese e a manteiga. Adicione o açúcar e a baunilha até ficar fofo.",
      "Recheie e cubra, deixando os lados semi-nus ou totalmente cobertos com acabamento rústico.",
    ],
    businessTip:
      "Liste este como o sabor 'alternativo' no seu menu — muitos casais reservam um andar especificamente para convidados com gostos diferentes, e o bolo de cenoura cumpre esse papel perfeitamente.",
    xpReward: 50,
  },
  {
    id: "champagne",
    name: "Bolo de Champanhe",
    emoji: "🥂",
    color: "#7c3aed",
    colorLight: "#ede9fe",
    description: "Um bolo delicado e festivo feito com champanhe real — escolha elegante e adequada à ocasião.",
    servings: 16,
    prepTime: "25 min",
    bakeTime: "28–30 min",
    difficulty: "Moderado",
    difficultyStars: 3,
    sections: [
      {
        title: "Bolo",
        ingredients: [
          { name: "Farinha de trigo especial", amount: "3 xícaras (375g)" },
          { name: "Fermento em pó", amount: "1 colher de sopa" },
          { name: "Sal", amount: "½ colher de chá" },
          { name: "Manteiga sem sal, amolecida", amount: "1 xícara (225g)" },
          { name: "Açúcar granulado", amount: "1¾ xícaras (350g)" },
          { name: "Claras de ovo, temperatura ambiente", amount: "4 unidades" },
          { name: "Champanhe ou vinho espumante, temp. ambiente", amount: "1 xícara (240ml)" },
          { name: "Leite integral", amount: "¼ xícara (60ml)" },
          { name: "Extrato de baunilha", amount: "1 colher de chá" },
        ],
      },
      {
        title: "Buttercream de Champanhe",
        ingredients: [
          { name: "Manteiga sem sal, amolecida", amount: "1½ xícaras (340g)" },
          { name: "Açúcar de confeiteiro", amount: "5 xícaras (600g)" },
          { name: "Champanhe reduzido à metade", amount: "3 colheres de sopa" },
          { name: "Pitada de sal", amount: "a gosto" },
        ],
      },
    ],
    steps: [
      "Pré-aqueça o forno a 180°C. Unte e forre duas formas de 20cm.",
      "Misture a farinha, fermento e sal.",
      "Bata a manteiga com o açúcar até ficar leve e fofo, cerca de 3 minutos.",
      "Adicione as claras em duas partes, batendo bem após cada adição.",
      "Misture o champanhe, leite e baunilha numa tigela pequena.",
      "Alterne a farinha e a mistura de champanhe, misturando apenas até incorporar.",
      "Divida entre as formas e asse 28–30 min.",
      "Para o buttercream: ferva 3 colheres de champanhe até reduzir à metade. Arrefeça completamente antes de incorporar na manteiga com o açúcar.",
    ],
    businessTip:
      "O bolo de champanhe é um item premium — muitas padeiras cobram 15–20% acima do andar de baunilha padrão devido ao ingrediente especial e ao apelo de 'ocasião especial'.",
    xpReward: 75,
  },
  {
    id: "funfetti",
    name: "Bolo Confetti Funfetti",
    emoji: "🎉",
    color: "#db2777",
    colorLight: "#fce7f3",
    description: "Um bolo colorido e divertido que funciona lindamente para jantares de ensaio e casamentos descontraídos.",
    servings: 16,
    prepTime: "20 min",
    bakeTime: "28–30 min",
    difficulty: "Fácil",
    difficultyStars: 1,
    sections: [
      {
        title: "Bolo",
        ingredients: [
          { name: "Farinha de trigo especial", amount: "3 xícaras (375g)" },
          { name: "Fermento em pó", amount: "1 colher de sopa" },
          { name: "Sal", amount: "½ colher de chá" },
          { name: "Manteiga sem sal, amolecida", amount: "1 xícara (225g)" },
          { name: "Açúcar granulado", amount: "2 xícaras (400g)" },
          { name: "Ovos grandes", amount: "4 unidades" },
          { name: "Extrato de baunilha", amount: "1 colher de sopa" },
          { name: "Leite integral", amount: "1 xícara (240ml)" },
          { name: "Sprinkles coloridos (jimmies)", amount: "¾ xícara (140g)" },
        ],
      },
      {
        title: "Buttercream de Baunilha",
        ingredients: [
          { name: "Manteiga sem sal, amolecida", amount: "1½ xícaras (340g)" },
          { name: "Açúcar de confeiteiro", amount: "5 xícaras (600g)" },
          { name: "Creme de leite", amount: "2 colheres de sopa" },
          { name: "Extrato de baunilha", amount: "1 colher de chá" },
        ],
      },
    ],
    steps: [
      "Pré-aqueça o forno a 180°C. Unte e forre duas formas de 20cm.",
      "Misture a farinha, fermento e sal.",
      "Bata a manteiga com o açúcar até ficar leve e fofo, cerca de 3 minutos.",
      "Adicione os ovos um a um, depois misture a baunilha.",
      "Alterne a farinha e o leite, misturando apenas até incorporar.",
      "Adicione os sprinkles à mão delicadamente — não bata em excesso ou as cores vão sangrar.",
      "Divida entre as formas e asse 28–30 min.",
      "Arrefeça completamente, recheie e cubra com buttercream de baunilha.",
    ],
    businessTip:
      "Use sprinkles do tipo 'jimmies' em vez de 'nonpareils' — os nonpareils mancham a massa e ficam cinzentos. Este detalhe é um erro comum de principiantes que vale evitar com clientes pagantes.",
    xpReward: 50,
  },
  {
    id: "almond-raspberry",
    name: "Bolo de Amêndoa e Framboesa",
    emoji: "🫐",
    color: "#9333ea",
    colorLight: "#f3e8ff",
    description: "Um bolo refinado com recheio vibrante de framboesa — escolha popular para um perfil de sabor mais adulto.",
    servings: 16,
    prepTime: "25 min",
    bakeTime: "30–32 min",
    difficulty: "Fácil a Moderado",
    difficultyStars: 2,
    sections: [
      {
        title: "Bolo",
        ingredients: [
          { name: "Farinha de trigo especial", amount: "2¾ xícaras (345g)" },
          { name: "Fermento em pó", amount: "1 colher de sopa" },
          { name: "Sal", amount: "½ colher de chá" },
          { name: "Manteiga sem sal, amolecida", amount: "1 xícara (225g)" },
          { name: "Açúcar granulado", amount: "1¾ xícaras (350g)" },
          { name: "Ovos grandes", amount: "4 unidades" },
          { name: "Extrato de amêndoa", amount: "1 colher de chá" },
          { name: "Extrato de baunilha", amount: "1 colher de chá" },
          { name: "Leite integral", amount: "1 xícara (240ml)" },
        ],
      },
      {
        title: "Recheio e Buttercream",
        ingredients: [
          { name: "Geleia de framboesa sem sementes", amount: "1 xícara (320g)" },
          { name: "Manteiga sem sal, amolecida", amount: "1½ xícaras (340g)" },
          { name: "Açúcar de confeiteiro", amount: "5 xícaras (600g)" },
          { name: "Creme de leite", amount: "2 colheres de sopa" },
          { name: "Extrato de amêndoa", amount: "½ colher de chá" },
        ],
      },
    ],
    steps: [
      "Pré-aqueça o forno a 180°C. Unte e forre duas formas de 20cm.",
      "Misture a farinha, fermento e sal.",
      "Bata a manteiga com o açúcar até ficar leve e fofo, cerca de 3 minutos.",
      "Adicione os ovos um a um, depois misture os extratos de amêndoa e baunilha.",
      "Alterne a farinha e o leite, misturando apenas até incorporar.",
      "Divida entre as formas e asse 30–32 min.",
      "Arrefeça completamente. Espalhe uma camada fina de geleia de framboesa numa das camadas antes do buttercream.",
      "Para o buttercream: bata a manteiga, adicione o açúcar, creme e extrato de amêndoa. Recheie e cubra.",
    ],
    businessTip:
      "Sempre pergunte sobre alergias a frutos secos antes de oferecer sabores com amêndoa — mantenha uma alternativa sem frutos secos (como baunilha ou limão) pronta para sugerir.",
    xpReward: 60,
  },
];

export const getRecipeById = (id: string) => recipes.find((r) => r.id === id);
