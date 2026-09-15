export interface EquipmentItem {
  id: string;
  name: string;
  importance: "Essencial" | "Recomendado" | "Profissional";
  emoji: string;
  description: string;
  practicalTip: string;
}

export interface KitchenHabit {
  id: string;
  title: string;
  emoji: string;
  description: string;
}

export const equipmentList: EquipmentItem[] = [
  {
    id: "stand-mixer",
    name: "Batedeira Planetária",
    importance: "Essencial",
    emoji: "🥣",
    description: "Uma batedeira de mão aguenta pequenos bolos, mas a planetária economiza horas em encomendas grandes e massas densas.",
    practicalTip: "Use o batedor tipo pá para bater a manteiga com o açúcar até atingir aeração ideal."
  },
  {
    id: "cake-pans",
    name: "Formas Redondas (15cm, 20cm e 25cm)",
    importance: "Essencial",
    emoji: "🥧",
    description: "Conjunto em pelo menos 3 tamanhos essenciais para bolos de andares proporcionais e estáveis.",
    practicalTip: "Formas de alumínio anodizado de fundo fixo ou falso garantem assamento uniforme sem queimar as bordas."
  },
  {
    id: "digital-scale",
    name: "Balança Digital de Cozinha",
    importance: "Essencial",
    emoji: "⚖️",
    description: "Pesar os ingredientes em gramas garante resultados idênticos em todas as fornadas, ao contrário de xícaras.",
    practicalTip: "A precisão da balança evita que um andar fique mais seco ou pesado que outro."
  },
  {
    id: "spatula-scraper",
    name: "Espátula Angular & Raspador (Bench Scraper)",
    importance: "Essencial",
    emoji: "📐",
    description: "Ferramentas chave para alisar o buttercream com precisão milimétrica e cantos retos.",
    practicalTip: "Aqueça levemente o raspador em água quente para o acabamento final espelhado no buttercream."
  },
  {
    id: "turntable",
    name: "Bailarina Giratória Profissional",
    importance: "Essencial",
    emoji: "🔄",
    description: "A base giratória com rolamento suave permite decorar o bolo continuamente sem trepidações.",
    practicalTip: "Prefira modelos de ferro fundido ou alumínio com peso suficiente para não deslizar na bancada."
  },
  {
    id: "dowels-boards",
    name: "Boards de Bolo & Estacas/Dowels",
    importance: "Essencial",
    emoji: "🏗️",
    description: "A estrutura interna de sustentação que impede o andar superior de esmagar o bolo de baixo.",
    practicalTip: "Sempre insira pelo menos 4 a 5 estacas de sustentação em cada andar antes de colocar o seguinte."
  },
  {
    id: "oven-thermometer",
    name: "Termômetro de Forno",
    importance: "Recomendado",
    emoji: "🌡️",
    description: "A maioria dos fornos caseiros oscila entre 10°C e 25°C acima ou abaixo da temperatura mostrada no botão.",
    practicalTip: "Posicione o termômetro no centro da grelha onde a forma vai assar para regular a temperatura real."
  }
];

export const kitchenHabits: KitchenHabit[] = [
  {
    id: "habit-weight",
    title: "Pese Sempre os Ingredientes",
    emoji: "⚖️",
    description: "Bolos de casamento exigem textura uniforme de andar para andar. 1 xícara de farinha pode variar até 30g dependendo de como for medida."
  },
  {
    id: "habit-test",
    title: "Faça um Bolo de Teste Completo",
    emoji: "🔬",
    description: "Teste sabor, estabilidade do miolo e sobreposição em andares antes de oferecer qualquer novo sabor no cardápio aos noivos."
  },
  {
    id: "habit-cards",
    title: "Fichas Técnicas Padronizadas",
    emoji: "📋",
    description: "Tenha uma ficha detalhada para cada receita com quantidades exatas, tempos de forno e observações de umidade."
  },
  {
    id: "habit-legal",
    title: "Regulamentação e Boas Práticas",
    emoji: "📜",
    description: "Verifique as diretrizes locais de manipulação higiênica e rotulagem para alimentos caseiros comercializados."
  }
];
