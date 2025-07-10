
// Função utilitária para converter URLs para base64 (usado apenas durante a inicialização)
async function urlToBase64(url) {
  try {
    // Se já for base64, retorna a própria string
    if (url && url.startsWith('data:image')) {
      return url;
    }
    
    // Se não for uma URL válida, retorna uma imagem padrão
    if (!url || !url.startsWith('http')) {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48cGF0aCBkPSJNODQgMTI3TDY0IDEwN0w0NCAxMjciIHN0cm9rZT0iIzk5OTk5OSIgc3Ryb2klLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMTUyIDY0TDEzMiA0NEwxMTIgNjQiIHN0cm9rZT0iIzk5OTk5OSIgc3Ryb2klLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMTI4IDEyOEwxMDAgMTAwTDcyIDEyOCIgc3Ryb2klPSIjOTk5OTk5IiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2klLWxpbmVqb2luPSJyb3VuZCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNTAiIHN0cm9rZT0iIzk5OTk5OSIgc3Ryb2klLXdpZHRoPSI2Ii8+PC9zdmc+';
    }
    
    // Fetch da imagem e conversão para base64
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Erro ao converter URL para base64:', error);
    return '/placeholder.jpg';
  }
};

// Inicialização dos produtos com URLs
const produtos = [
  {
    "id": "1001",
    "name": "Vestido Midi Pink com Drapeado",
    "price": "R$ 105,99",
    "originalPrice": "R$ 199,90",
    "category": "Promoções",
    "image": "/img/produtos/vestidocetim.jpg",
    "description": "Vestido longo em cetim rosé, alças finas e caimento elegante. Ideal para festas e ocasiões especiais.",
    "rating": 4.8,
    "reviews": 132,
    "isOnSale": true
  },
  {
    "id": "1002",
    "name": "Relógio Feminino Vintage Dourado",
    "price": "R$ 69,99",
    "originalPrice": "R$ 129,90",
    "category": "Promoções",
    "image": "/img/produtos/relogio-dourado-vintage.jpg",
    "description": "Relógio de pulso feminino dourado com detalhes clássicos e pulseira delicada. Sofisticação para o dia a dia.",
    "rating": 4.9,
    "reviews": 156,
    "isOnSale": true
  },
  {
    "id": "1003",
    "name": "Colar Duplo de Pérolas com Pingente",
    "price": "R$ 84,99",
    "originalPrice": "R$ 149,90",
    "category": "Promoções",
    "image": "/img/produtos/colar-perolas-pingente.jpg",
    "description": "Colar duplo de pérolas sintéticas com pingente central dourado. Elegância clássica para qualquer ocasião.",
    "rating": 4.9,
    "reviews": 218,
    "isOnSale": true
  },
  {
    "id": "3",
    "name": "Conjunto Feminino Social Cinza e Preto",
    "price": "R$ 189,90",
    "originalPrice": "R$ 249,90",
    "category": "Conjuntos",
    "image": "/img/produtos/jaquetaoverside.webp",
    "description": "Conjunto sofisticado feminino em tons de cinza e preto, composto por camisa social de manga longa e saia reta. Ideal para o trabalho ou ocasiões especiais.",
    "rating": 4.7,
    "reviews": 98,
    "isOnSale": true,
    "sizes": [
      "P",
      "M",
      "G",
      "GG"
    ],
    "colors": [
      "Terracota"
    ],
    "details": [
      "Modelagem godê",
      "Cintura alta",
      "Fechamento por zíper invisível",
      "Material premium",
      "Caimento fluido"
    ],
    "inStock": true,
    "createdAt": "2025-01-15T10:30:00Z",
    "updatedAt": "2025-06-03T14:14:00Z"
  },
  {
    "id": "4",
    "name": "Tênis Casual Branco Classic",
    "price": "R$ 179,90",
    "category": "Calçados",
    "image": "https://img.ltwebstatic.com/images3_spmp/2024/10/23/35/172968692664981f8046e6b356840e19d69e2d28dc_thumbnail_900x.jpg",
    "description": "Tênis casual em couro branco com entressola amortecida. Conforto e estilo para o dia a dia ou passeios de fim de semana.",
    "rating": 4.9,
    "reviews": 325,
    "sizes": [
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44"
    ],
    "colors": [
      "Branco"
    ],
    "details": [
      "Cabedal em couro",
      "Entressola com amortecimento Nike Air",
      "Solado de borracha",
      "Perfurações na parte frontal para ventilação"
    ],
    "inStock": true,
    "createdAt": "2025-02-10T09:45:00Z",
    "updatedAt": "2025-06-01T11:30:00Z"
  },
  {
    "id": "2",
    "name": "Calça Jeans Skinny Stretch",
    "price": "R$ 159,90",
    "category": "Calças",
    "image": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "description": "Calça jeans skinny com elastano, lavagem média e acabamento levemente desgastado. Valoriza a silhueta sem perder o conforto.",
    "rating": 4.7,
    "reviews": 287,
    "sizes": [
      "38",
      "40",
      "42",
      "44",
      "46",
      "48"
    ],
    "colors": [
      "Azul Médio",
      "Azul Escuro",
      "Preto"
    ],
    "details": [
      "Modelagem reta",
      "Fechamento por botões",
      "Cinco bolsos",
      "100% algodão",
      "Lavagem média"
    ],
    "inStock": true,
    "createdAt": "2025-03-05T14:20:00Z",
    "updatedAt": "2025-05-28T16:40:00Z"
  },
  {
    "id": "6",
    "name": "Camiseta Básica DryFit",
    "price": "R$ 59,90",
    "category": "Camisetas",
    "image": "/img/produtos/camisa dryfit.webp",
    "originalPrice": "R$ 89,90",
    "description": "Camiseta em tecido DryFit que absorve o suor e mantém o corpo seco. Ideal para treinos ou composições casuais.",
    "rating": 4.5,
    "reviews": 210,
    "sizes": [
      "PP",
      "P",
      "M",
      "G",
      "GG",
      "XG"
    ],
    "colors": [
      "Branco",
      "Preto",
      "Vermelho",
      "Azul"
    ],
    "details": [
      "100% algodão",
      "Gola redonda",
      "Corte regular",
      "Tecido macio"
    ],
    "inStock": true,
    "createdAt": "2025-01-25T10:15:00Z",
    "updatedAt": "2025-05-30T09:20:00Z"
  },
  {
    "id": "1",
    "name": "Blusa Feminina Manga Bufante",
    "price": "R$ 89,90",
    "category": "Camisetas",
    "image": "/img/produtos/manga bufante.webp",
    "description": "Blusa feminina com mangas bufantes e tecido leve. Perfeita para combinar com jeans ou saias em ocasiões diversas.",
    "rating": 4.8,
    "reviews": 176,
    "sizes": [
      "P",
      "M",
      "G",
      "GG"
    ],
    "colors": [
      "Estampado"
    ],
    "details": [
      "Estampa exclusiva",
      "Modelagem midi",
      "Mangas bufantes",
      "Decote em V",
      "Fechamento por botões frontais"
    ],
    "inStock": true,
    "createdAt": "2025-04-10T11:30:00Z",
    "updatedAt": "2025-06-02T13:45:00Z"
  },
 
  {
    "id": "8",
    "name": "Bolsa Transversal Matelassê Couro",
    "price": "R$ 199,90",
    "category": "Bolsas",
    "image": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    "description": "Bolsa transversal em couro matelassê com alça ajustável e ferragens douradas. Elegância atemporal para completar o look.",
    "rating": 4.9,
    "reviews": 98,
    "sizes": [
      "Único"
    ],
    "colors": [
      "Preto",
      "Bege",
      "Vermelho"
    ],
    "details": [
      "Couro matelassê",
      "Fecho duplo",
      "Alça ajustável",
      "Interior com bolso",
      "Ferragens douradas"
    ],
    "inStock": true,
    "createdAt": "2025-03-15T16:40:00Z",
    "updatedAt": "2025-05-25T15:20:00Z"
  },
  {
    "id": "9",
    "name": "Smartwatch Fitness Pro",
    "price": "R$ 1.299,00",
    "category": "Acessórios",
    "image": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
    "description": "Smartwatch com monitoramento de saúde, GPS integrado e resistência à água. Seu parceiro ideal para atividades físicas.",
    "rating": 4.8,
    "reviews": 245,
    "sizes": [
      "41mm",
      "45mm"
    ],
    "colors": [
      "Preto",
      "Prata",
      "Vermelho"
    ],
    "details": [
      "Tela Retina Always-On",
      "Monitoramento de ECG",
      "Sensor de oxigênio no sangue",
      "Detecção de quedas",
      "Resistente à água"
    ],
    "inStock": true,
    "createdAt": "2025-02-20T09:30:00Z",
    "updatedAt": "2025-05-29T14:15:00Z"
  },
  {
    "id": "10",
    "name": "Jaqueta Jeans Oversized Vintage",
    "price": "R$ 259,90",
    "category": "Jaquetas",
    "image": "/img/produtos/jaquetaoverside.webp",
    "description": "Jaqueta jeans oversized com lavagem vintage e detalhes desfiados. Aposta certeira para um visual urbano descolado.",
    "rating": 4.6,
    "reviews": 134,
    "sizes": [
      "P",
      "M",
      "G",
      "GG"
    ],
    "colors": [
      "Jeans Claro"
    ],
    "details": [
      "Modelagem oversized",
      "Fechamento por botões",
      "Bolsos frontais",
      "Acabamento desfiado",
      "100% algodão"
    ],
    "inStock": true,
    "createdAt": "2025-01-30T13:25:00Z",
    "updatedAt": "2025-05-27T10:40:00Z"
  },
  {
    "id": "11",
    "name": "Blusa de Seda com Laço",
    "price": "R$ 189,90",
    "category": "Blusas",
    "image": "https://58532.cdn.simplo7.net/static/58532/sku/feminino-camisa-feminina-social-manga-longa-cinza-ibiza-p-1681236525761.jpg",
    "description": "Blusa de seda com gola laço, mangas longas e caimento elegante. Perfeita para ocasiões formais e para o trabalho.",
    "rating": 4.7,
    "reviews": 98,
    "sizes": [
      "P",
      "M",
      "G"
    ],
    "colors": [
      "Branco",
      "Preto",
      "Rosa"
    ],
    "details": [
      "Tecido: 100% Seda",
      "Gola com laço",
      "Mangas longas com punho",
      "Modelagem soltinha"
    ],
    "inStock": true,
    "createdAt": "2025-07-07T19:54:23Z",
    "updatedAt": "2025-07-07T19:54:23Z"
  },
  {
    "id": "12",
    "name": "Minissaia Jeans com Botões",
    "price": "R$ 99,90",
    "category": "Saias",
    "image": "/img/produtos/mini.jpg",
    "description": "Minissaia jeans de cintura alta com botões frontais e lavagem clara. Essencial para um look jovem e despojado.",
    "rating": 4.5,
    "reviews": 85,
    "sizes": ["36", "38", "40", "42"],
    "colors": ["Jeans Claro"],
    "details": ["Cintura alta", "Fechamento com botões", "Tecido 100% algodão"],
    "inStock": true,
    "createdAt": "2025-07-07T20:07:22Z",
    "updatedAt": "2025-07-07T20:07:22Z"
  },
  {
    "id": "13",
    "name": "Saia Midi Plissada Estampada",
    "price": "R$ 229,90",
    "category": "Saias",
    "image": "/img/produtos/saiamidi.webp",
    "originalPrice": "R$ 299,90",
    "description": "Saia midi plissada com estampa floral e cós elástico. Leve e fluida, ideal para um visual romântico e moderno.",
    "rating": 4.8,
    "reviews": 112,
    "sizes": ["P", "M", "G"],
    "colors": ["Estampado"],
    "details": ["Comprimento midi", "Tecido plissado", "Cós elástico"],
    "inStock": true,
    "createdAt": "2025-07-07T20:07:22Z",
    "updatedAt": "2025-07-07T20:07:22Z"
  },
  {
    "id": "14",
    "name": "Vestido Longo Floral com Fenda",
    "price": "R$ 349,90",
    "category": "Vestidos",
    "image": "public/img/produtos/opvl092804136_1.jpg",
    "description": "Vestido longo com estampa floral, alças finas, decote V e fenda frontal. Perfeito para eventos ao ar livre.",
    "rating": 4.9,
    "reviews": 150,
    "sizes": ["P", "M", "G", "GG"],
    "colors": ["Fundo Branco", "Fundo Preto"],
    "details": ["Alças reguláveis", "Fenda frontal", "Zíper invisível nas costas"],
    "inStock": true,
    "createdAt": "2025-07-07T20:07:22Z",
    "updatedAt": "2025-07-07T20:07:22Z"
  },
  {
    "id": "15",
    "name": "Vestido Curto de Alcinha em Viscose",
    "price": "R$ 179,90",
    "salePrice": "R$ 149,90",
    "onSale": true,
    "category": "Vestidos",
    "image": "/img/produtos/vestidocurto.webp",
    "originalPrice": "R$ 249,90",
    "description": "Vestido curto e soltinho de alcinha, feito em viscose leve. Ótima opção para dias quentes.",
    "rating": 4.6,
    "reviews": 95,
    "sizes": ["P", "M", "G"],
    "colors": ["Vermelho", "Amarelo", "Azul"],
    "details": ["Modelagem soltinha", "Tecido leve", "Alças finas"],
    "inStock": true,
    "createdAt": "2025-07-07T20:07:22Z",
    "updatedAt": "2025-07-07T20:07:22Z"
  },
  {
    "id": "16",
    "name": "Vestido Chemise de Linho",
    "price": "R$ 289,90",
    "category": "Vestidos",
    "image": "/img/produtos/vestidochemise.webp",
    "description": "Vestido estilo chemise em linho, com botões frontais e faixa para amarração na cintura. Elegante e versátil.",
    "rating": 4.7,
    "reviews": 130,
    "sizes": ["P", "M", "G", "GG"],
    "colors": ["Branco", "Bege"],
    "details": ["Tecido de linho", "Acompanha faixa", "Bolsos laterais"],
    "inStock": true,
    "createdAt": "2025-07-07T20:07:22Z",
    "updatedAt": "2025-07-07T20:07:22Z"
  },
  {
    "id": "17",
    "name": "Óculos de Sol Aviador",
    "price": "R$ 320,00",
    "category": "Acessórios",
    "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
    "description": "Clássico óculos de sol modelo aviador com armação de metal dourada e lentes escuras. Proteção UV400.",
    "rating": 4.9,
    "reviews": 320,
    "sizes": ["Único"],
    "colors": ["Dourado"],
    "details": ["Armação de metal", "Lentes com proteção UV400", "Acompanha estojo"],
    "inStock": true,
    "createdAt": "2025-07-07T20:07:22Z",
    "updatedAt": "2025-07-07T20:07:22Z"
  },
  {
    "id": "18",
    "name": "Cinto de Couro com Fivela",
    "price": "R$ 99,90",
    "salePrice": "R$ 69,90",
    "onSale": true,
    "category": "Acessórios",
    "image": "/img/produtos/CINTOCOURO.jpg",
    "description": "Cinto de couro legítimo com fivela de metal escovado. Ideal para complementar calças e vestidos.",
    "rating": 4.8,
    "reviews": 180,
    "sizes": ["80cm", "90cm", "100cm"],
    "colors": ["Preto", "Marrom"],
    "details": ["Couro legítimo", "Fivela de metal", "Largura: 3cm"],
    "inStock": true,
    "createdAt": "2025-07-07T20:07:22Z",
    "updatedAt": "2025-07-07T20:07:22Z"
  },
  {
    "id": "19",
    "name": "Saint Laurent Opyum Pump",
    "price": "R$ 1.899,00",
    "category": "Sapatos de Luxo",
    "image": "/img/produtos/sapato2.avif",
    "description": "Scarpin de luxo Saint Laurent Opyum Pump em couro preto com salto em formato do logo YSL. Um ícone de sofisticação e ousadia.",
    "rating": 4.9,
    "reviews": 32,
    "sizes": ["35", "36", "37", "38", "39", "40"],
    "colors": ["Preto"],
    "details": ["Salto 10,5cm YSL metalizado", "Cabedal em couro legítimo", "Palmilha acolchoada", "Solado em couro"],
    "inStock": true,
    "createdAt": "2025-07-10T11:06:33Z",
    "updatedAt": "2025-07-10T11:06:33Z"
  },
  {
    "id": "20",
    "name": "Christian Louboutin Kate 100mm",
    "price": "R$ 3.199,00",
    "category": "Sapatos de Luxo",
    "image": "/img/produtos/sapato1.1.jpg",
    "description": "O clássico scarpin Christian Louboutin Kate 100mm em couro envernizado nude com o icônico solado vermelho. Elegância e poder em cada passo.",
    "rating": 5.0,
    "reviews": 28,
    "sizes": ["34", "35", "36", "37", "38", "39", "40"],
    "colors": ["Nude"],
    "details": ["Salto 10cm", "Couro envernizado", "Solado vermelho assinatura Louboutin", "Bico fino"],
    "inStock": true,
    "createdAt": "2025-07-10T11:06:33Z",
    "updatedAt": "2025-07-10T11:06:33Z"
  }
  ,
  {
    "id": "21",
    "name": "Vestido Longo Vinho",
    "price": "R$ 299,90",
    "category": "Vestidos",
    "image": "/img/produtos/vestidovinho.jpg",
    "description": "Vestido longo em tecido fluido, cor vinho, com alças finas e fenda lateral. Elegância para festas e eventos.",
    "rating": 4.8,
    "reviews": 61,
    "sizes": ["P", "M", "G", "GG"],
    "colors": ["Vinho"],
    "details": ["Comprimento longo", "Fenda lateral", "Forro interno", "Alças reguláveis"],
    "inStock": true,
    "createdAt": "2025-07-10T11:27:30Z",
    "updatedAt": "2025-07-10T11:27:30Z"
  },
  {
    "id": "22",
    "name": "Calça Jeans Skinny Feminina",
    "price": "R$ 179,90",
    "category": "Calças",
    "image": "/img/produtos/calcajeans.webp",
    "description": "Calça jeans skinny feminina, azul escuro, modelagem ajustada e elastano para maior conforto.",
    "rating": 4.7,
    "reviews": 87,
    "sizes": ["36", "38", "40", "42", "44"],
    "colors": ["Azul Escuro"],
    "details": ["Modelagem skinny", "Com elastano", "Cintura média", "Acabamento pespontado"],
    "inStock": true,
    "createdAt": "2025-07-10T11:27:30Z",
    "updatedAt": "2025-07-10T11:27:30Z"
  },
  {
    "id": "23",
    "name": "Relógio Feminino Rose Gold",
    "price": "R$ 499,90",
    "category": "Acessórios",
    "image": "/img/produtos/relogiofeminino.webp",
    "description": "Relógio feminino com pulseira de aço dourado, mostrador minimalista e resistente à água. Sofisticação para o dia a dia.",
    "rating": 4.9,
    "reviews": 134,
    "sizes": ["Único"],
    "colors": ["Rose Gold"],
    "details": ["Pulseira de aço inox", "Resistente à água", "Mostrador analógico", "Fecho ajustável"],
    "inStock": true,
    "createdAt": "2025-07-10T11:27:30Z",
    "updatedAt": "2025-07-10T11:27:30Z"
  }
  ,
  {
    "id": "24",
    "name": "Conjunto Feminino Rosa",
    "price": "R$ 219,90",
    "category": "Conjuntos",
    "image": "/img/produtos/conjuntorosa.webp",
    "description": "Conjunto feminino rosa composto por blazer e calça de alfaiataria. Elegância e modernidade para ocasiões especiais ou trabalho.",
    "rating": 4.8,
    "reviews": 39,
    "sizes": ["P", "M", "G", "GG"],
    "colors": ["Rosa"],
    "details": ["Blazer com forro", "Calça cintura alta", "Tecido leve e confortável", "Fechamento em botão"],
    "inStock": true,
    "createdAt": "2025-07-10T11:46:48Z",
    "updatedAt": "2025-07-10T11:46:48Z"
  },
  {
    "id": "25",
    "name": "Conjunto Feminino Preto",
    "price": "R$ 229,90",
    "category": "Conjuntos",
    "image": "/img/produtos/conjuntopreto.jpg",
    "description": "Conjunto preto feminino com blazer estruturado e calça reta. Versatilidade e sofisticação para diversas ocasiões.",
    "rating": 4.9,
    "reviews": 52,
    "sizes": ["P", "M", "G", "GG"],
    "colors": ["Preto"],
    "details": ["Blazer estruturado", "Calça reta", "Tecido de alta qualidade", "Acabamento premium"],
    "inStock": true,
    "createdAt": "2025-07-10T11:46:48Z",
    "updatedAt": "2025-07-10T11:46:48Z"
  },
  {
    "id": "26",
    "name": "Conjunto Feminino Vermelho",
    "price": "R$ 239,90",
    "category": "Conjuntos",
    "image": "/img/produtos/conjuntovermelho.webp",
    "description": "Conjunto vermelho composto por blazer acinturado e calça flare. Destaque-se com estilo e personalidade.",
    "rating": 4.7,
    "reviews": 27,
    "sizes": ["P", "M", "G", "GG"],
    "colors": ["Vermelho"],
    "details": ["Blazer acinturado", "Calça flare", "Tecido com elastano", "Botões decorativos"],
    "inStock": true,
    "createdAt": "2025-07-10T11:46:48Z",
    "updatedAt": "2025-07-10T11:46:48Z"
  }
];

// Função para processar produtos com imagens em base64
async function inicializarProdutosComImagensBase64() {
  // Cria uma cópia profunda dos produtos
  const produtosWithBase64 = JSON.parse(JSON.stringify(produtos));
  
  // Converte todas as imagens para base64
  for (let i = 0; i < produtosWithBase64.length; i++) {
    if (produtosWithBase64[i].image) {
      produtosWithBase64[i].image = await urlToBase64(produtosWithBase64[i].image);
    }
  }
  
  return produtosWithBase64;
};

export { inicializarProdutosComImagensBase64 };
export default produtos;
