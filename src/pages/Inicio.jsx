import React, { useState, useEffect, Suspense, lazy, useMemo, useCallback } from 'react';
import { useProdutos } from '@/contexts/ContextoProduto';
import { Botao } from "@/components/ui/botao";
import { Label } from '@/components/ui/rotulo';
import { GrupoRadio, ItemGrupoRadio } from '@/components/ui/grupo-radio';
import { LayoutGrid, Rows, Columns, Square, Filter, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotificacao } from "@/components/ui/useNotificacao";
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  CaixaSelecaoMenuSuspenso,
  RotuloMenuSuspenso,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/menu-suspenso";

// carregamento preguiçoso pq o react é um mimado que nao aguenta um json com mais de 10 itens

const LazyCartaoProduto = lazy(() => import('@/components/CartaoProduto'));

// Componente wrapper para o CartaoProduto com fallback de carregamento
const CartaoProduto = ({ product }) => (
  <Suspense fallback={<div className="h-96 bg-muted rounded-lg animate-pulse"></div>}>
    <LazyCartaoProduto product={product} />
  </Suspense>
);


// aviso: contém código feito na madrugada do prazo
// se funcionar, foi sorte
// se não funcionar, tenta dar F5
const HomePage = () => {

  // mais um carrossel inutil que ninguem pediu
  // mas o trabalho pede 3 componentes entao toma

  // Banners de promoção com links para os produtos em destaque
  const promocoes = [
    { 
      id: 1, 
      imagem: '/img/banners/banner1.jpg', 
      link: '/category/promocoes?produto=2' // Relógio Feminino Vintage Dourado (ID: 2)
    },
    { 
      id: 2, 
      imagem: '/img/banners/banner3.jpg', 
      link: '/category/promocoes?produto=1' // Vestido Midi Pink com Drapeado (ID: 1)
    },
    { 
      id: 3, 
      imagem: '/img/banners/banner2.jpg', 
      link: '/category/promocoes?produto=3' // Colar Duplo de Pérolas com Pingente (ID: 3)
    }
  ];
  
  // Debug: Log para verificar se as imagens estão sendo carregadas
  useEffect(() => {
    console.log('Banners configurados:', promocoes);
    promocoes.forEach(promo => {
      const img = new Image();
      img.onload = () => console.log(`Imagem carregada: ${promo.imagem}`);
      img.onerror = () => console.error(`Erro ao carregar: ${promo.imagem}`);
      img.src = promo.imagem;
    });
  }, []);

  // Estados do carrossel
  const [slideAtual, setSlideAtual] = useState(0);
  const totalSlides = promocoes.length;
  const [isLoading, setIsLoading] = useState(true);

  // Funções de navegação do carrossel
  const proximoSlide = useCallback(() => {
    setSlideAtual((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const slideAnterior = useCallback(() => {
    setSlideAtual((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  // Efeito para troca automática de slides
  useEffect(() => {
    const timer = setInterval(proximoSlide, 5000);
    return () => clearInterval(timer);
  }, [proximoSlide]);

  // Efeito para pré-carregar as imagens
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = promocoes.map((promo) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = promo.imagem;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      });

      await Promise.all(imagePromises);
      setIsLoading(false);
    };

    loadImages();
  }, [promocoes]);
  // Estados locais
  const [displayedProdutos, setDisplayedProdutos] = useState([]);
  const [columns, setColumns] = useState('4');
  const [currentGridClass, setCurrentGridClass] = useState('grid-cols-2 sm:grid-cols-2 lg:grid-cols-4');
  const [accessibilityFilter, setAccessibilityFilter] = useState('none');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  
  // Contexto e hooks
  const { produtos: produtosFromContext, isLoading: isLoadingProdutos } = useProdutos();
  const { notificar } = useNotificacao();
  
  // Efeito para monitorar mudanças nos produtos
  useEffect(() => {
    console.log('=== INÍCIO DO MONITORAMENTO DE PRODUTOS ===');
    console.log('Estado de carregamento:', isLoadingProdutos);
    console.log('Produtos recebidos do contexto:', produtosFromContext);
    
    if (isLoadingProdutos) {
      console.log('Aguardando carregamento dos produtos...');
      return;
    }
    
    if (!Array.isArray(produtosFromContext)) {
      console.error('ERRO: produtosFromContext não é um array:', produtosFromContext);
      setDisplayedProdutos([]);
      return;
    }
    
    console.log(`Total de produtos recebidos: ${produtosFromContext.length}`);
    
    if (produtosFromContext.length > 0) {
      console.log('Primeiros 3 produtos:', produtosFromContext.slice(0, 3).map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        hasImage: !!p.image
      })));
      
      // Atualiza os produtos exibidos
      setDisplayedProdutos(produtosFromContext);
      console.log('Produtos definidos para exibição:', produtosFromContext.length);
    } else {
      console.warn('AVISO: Nenhum produto disponível para exibição');
      setDisplayedProdutos([]);
    }
  }, [produtosFromContext, isLoadingProdutos]);
  
  // Atualiza a classe da grade quando as colunas mudam
  useEffect(() => {
    switch(columns) {
      case '1':
        setCurrentGridClass('grid-cols-1');
        break;
      case '2':
        setCurrentGridClass('grid-cols-1 sm:grid-cols-2');
        break;
      case '3':
        setCurrentGridClass('grid-cols-1 sm:grid-cols-2 lg:grid-cols-3');
        break;
      case '4':
      default:
        setCurrentGridClass('grid-cols-2 sm:grid-cols-2 lg:grid-cols-4');
    }
  }, [columns]);

  // pega todos os tamanhos e cores dos produtos
  const [allSizes, allColors] = useMemo(() => {
    console.log('=== INICIALIZANDO TAMANHOS E CORES ===');
    console.log('Total de produtos para processar:', Array.isArray(produtosFromContext) ? produtosFromContext.length : 'não é array');
    
    const sizes = new Set();
    const colors = new Set();
    
    if (Array.isArray(produtosFromContext)) {
      produtosFromContext.forEach((produto, index) => {
        try {
          // Processa tamanhos
          if (Array.isArray(produto.sizes) && produto.sizes.length > 0) {
            produto.sizes.forEach(size => {
              if (size) sizes.add(String(size).trim());
            });
          }
          
          // Processa cores
          if (Array.isArray(produto.colors) && produto.colors.length > 0) {
            produto.colors.forEach(color => {
              if (color) colors.add(String(color).toLowerCase().trim());
            });
          }
        } catch (error) {
          console.error(`Erro ao processar produto no índice ${index}:`, error, produto);
        }
      });
    }
    
    const sortedSizes = Array.from(sizes).sort();
    const sortedColors = Array.from(colors).sort();
    
    console.log('Tamanhos encontrados:', sortedSizes);
    console.log('Cores encontradas:', sortedColors);
    
    return [sortedSizes, sortedColors];
  }, [produtosFromContext]); // atualiza quando os produtos carregam
  
  useEffect(() => {
    document.documentElement.classList.remove('protanopia-filter', 'deuteranopia-filter', 'tritanopia-filter', 'achromatopsia-filter');
    if (accessibilityFilter !== 'none') {
      document.documentElement.classList.add(`${accessibilityFilter}-filter`);
    }
  }, [accessibilityFilter]);

  // Filtra os produtos quando os filtros mudam
  useEffect(() => {
    console.log('=== INÍCIO DA FILTRAGEM DE PRODUTOS ===');
    console.log('Estado de carregamento:', isLoadingProdutos);
    console.log('Total de produtos recebidos:', Array.isArray(produtosFromContext) ? produtosFromContext.length : 'não é array');
    console.log('Tamanhos selecionados:', selectedSizes);
    console.log('Cores selecionadas:', selectedColors);
    
    if (isLoadingProdutos) {
      console.log('Aguardando carregamento dos produtos...');
      return;
    }
    
    if (!Array.isArray(produtosFromContext)) {
      console.error('ERRO: produtosFromContext não é um array:', produtosFromContext);
      setDisplayedProdutos([]);
      return;
    }
    
    // Se não há produtos, limpa a exibição
    if (produtosFromContext.length === 0) {
      console.log('Nenhum produto disponível para filtragem');
      setDisplayedProdutos([]);
      return;
    }
    
    // Se não há filtros ativos, exibe todos os produtos
    if (selectedSizes.length === 0 && selectedColors.length === 0) {
      console.log('Nenhum filtro ativo - exibindo todos os produtos');
      setDisplayedProdutos(produtosFromContext);
      return;
    }
    
    console.log('Aplicando filtros...');
    
    const filtered = produtosFromContext.filter(produto => {
      if (!produto || typeof produto !== 'object') {
        console.warn('Produto inválido encontrado durante a filtragem:', produto);
        return false;
      }
      
      // Verifica se o produto tem tamanhos e se algum dos tamanhos selecionados está presente
      const tamanhoMatch = selectedSizes.length === 0 || 
        (Array.isArray(produto.sizes) && produto.sizes.length > 0 &&
         produto.sizes.some(size => 
           selectedSizes.some(selectedSize => 
             String(size).toLowerCase() === String(selectedSize).toLowerCase()
           )
         ));
      
      // Verifica se o produto tem cores e se alguma das cores selecionadas está presente
      const corMatch = selectedColors.length === 0 ||
        (Array.isArray(produto.colors) && produto.colors.length > 0 &&
         produto.colors.some(color => 
           selectedColors.some(selectedColor => 
             String(color).toLowerCase() === String(selectedColor).toLowerCase()
           )
         ));
      
      return tamanhoMatch && corMatch;
    });
    
    console.log('=== RESUMO DA FILTRAGEM ===');
    console.log(`Total de produtos antes da filtragem: ${produtosFromContext.length}`);
    console.log(`Total de produtos após filtragem: ${filtered.length}`);
    
    if (filtered.length === 0) {
      console.log('Nenhum produto atende aos critérios de filtro atuais');
    } else {
      console.log('Amostra dos produtos filtrados (primeiros 3):', 
        filtered.slice(0, 3).map(p => ({
          id: p.id,
          name: p.name,
          sizes: p.sizes,
          colors: p.colors
        }))
      );
    }
    
    setDisplayedProdutos(filtered);
  }, [produtosFromContext, selectedSizes, selectedColors, isLoadingProdutos]);

  // opções de colunas que ninguem vai mudar
  // mas o trabalho pedia entao toma
  const columnOptions = useMemo(() => [
    { value: '1', label: '1 Coluna (tela de celular quebrado)', icon: <Square className="h-4 w-4" />, mobileLabel: '1' },
    { value: '2', label: '2 Colunas (padrao do pobre)', icon: <Columns className="h-4 w-4" />, mobileLabel: '2' },
    { value: '3', label: '3 Colunas (ta se achando)', icon: <Rows className="h-4 w-4" />, mobileLabel: '3' },
    { value: '4', label: '4 Colunas (tela grande é? mostre pra todo mundo)', icon: <LayoutGrid className="h-4 w-4" />, mobileLabel: '4' },
  ], []); // array vazio pq sim, nao precisa recalcular
  
  // filtros de acessibilidade que ninguem vai usar
  // mas o trabalho pedia acessibilidade entao toma
  const accessibilityFilters = useMemo(() => [
    { value: 'none', label: 'Nenhum (modo padrão)' },
    { value: 'protanopia', label: 'Protanopia (vermelho é verde?)' },
    { value: 'deuteranopia', label: 'Deuteranopia (verde é vermelho?)' },
    { value: 'tritanopia', label: 'Tritanopia (azul é rosa?)' },
    { value: 'achromatopsia', label: 'Acromatopia (tudo preto e branco)' },
  ], []); // de novo array vazio pq nao sou obrigado

  useEffect(() => {
    document.documentElement.classList.remove('protanopia-filter', 'deuteranopia-filter', 'tritanopia-filter', 'achromatopsia-filter');
    if (accessibilityFilter !== 'none') {
      document.documentElement.classList.add(`${accessibilityFilter}-filter`);
    }
  }, [accessibilityFilter]);

  const handleSizeChange = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleColorChange = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };



  if (isLoadingProdutos) {
    return (
      <div className="div-espacada">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="div-espacada">
              <div className="div-espacada">
                <div className="div-arredondada div-espacada"></div>
                <div className="div-arredondada div-espacada"></div>
                <div className="div-arredondada div-espacada"></div>
                <div className="div-espacada">
                  <div className="flex justify-between items-center">
                    <div className="div-arredondada div-espacada"></div>
                    <div className="div-arredondada div-espacada"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`div-espacada ${accessibilityFilter !== 'none' ? `${accessibilityFilter}-filter` : ''}`}>

  
      {/* Carrossel de banners */}
      <div className="relative mb-8 mt-4 w-full overflow-hidden rounded-2xl shadow-xl bg-gray-900">
        {isLoading ? (
          <div className="flex h-64 w-full items-center justify-center bg-gray-100 md:h-96 rounded-2xl">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-brand-primary-kaline"></div>
          </div>
        ) : (
          <>
            <div
              className="flex h-64 w-full transition-transform duration-500 ease-in-out md:h-96"
              style={{ transform: `translateX(-${slideAtual * 100}%)` }}
            >
              {promocoes.map((promo) => (
                <Link 
                  key={promo.id} 
                  to={promo.link}
                  className="block h-full w-full flex-shrink-0"
                >
                  <div className="h-full w-full relative">
                    <div className="h-full w-full flex items-center justify-center p-2">
                      <img
                        src={promo.imagem}
                        alt={`Banner ${promo.id}`}
                        className="h-full w-auto max-w-full object-contain rounded-lg"
                        style={{
                          maxHeight: '100%',
                          maxWidth: '100%',
                          objectFit: 'contain',
                          borderRadius: '0.5rem',
                          backgroundColor: 'transparent'
                        }}
                        draggable="false"
                        onError={(e) => {
                          console.error('Erro ao carregar banner:', promo.imagem);
                          const img = e.target;
                          const fallback = img.parentElement.nextElementSibling;
                          img.style.display = 'none';
                          if (fallback) {
                            fallback.classList.remove('hidden');
                          }
                        }}
                        onLoad={() => console.log('Imagem carregada com sucesso:', promo.imagem)}
                      />
                    </div>
                    <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-900 rounded-2xl">
                      <span className="text-white text-lg font-medium">Banner {promo.id}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Botões de navegação */}
            <button
              onClick={slideAnterior}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/50 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white/75"
              aria-label="Slide anterior"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <button
              onClick={proximoSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/50 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white/75"
              aria-label="Próximo slide"
            >
              <ArrowRight className="h-6 w-6" />
            </button>

            {/* Indicadores de slide */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <div className="flex space-x-2">
                {promocoes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSlideAtual(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === slideAtual ? 'w-8 bg-white' : 'w-2 bg-white/50'
                    }`}
                    aria-label={`Ir para o slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
     
      <section aria-labelledby="produtos-heading" className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
          <h2 id="produtos-heading" className="text-2xl sm:text-3xl font-heading font-semibold text-brand-text-kaline dark:text-brand-text-kaline">
            Nossos Produtos
            <span className="ml-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full align-middle">
            
            </span>
          </h2>
          
          {/* Filtros - porque todo mundo adora clicar em 50 botões diferentes, certo? */}
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white border rounded-md hover:bg-gray-50 transition-colors"
                  aria-label="Filtrar produtos"
                >
                  <Filter className="w-4 h-4" />
                  Filtrar
                  <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">
                    5+
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-3" align="end">
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1.5">Ordenar por</Label>
                    <select className="w-full text-sm border rounded p-2 focus:ring-2 focus:ring-brand-500 focus:border-transparent">
                      <option>Mais relevantes</option>
                      <option>Menor preço</option>
                      <option>Maior preço</option>
                      <option>Mais vendidos</option>
                      <option>Lançamentos</option>
                      <option>Maior desconto</option>
                      <option>Melhor avaliados</option>
                    </select>
                  </div>
                  
                  <DropdownMenuSeparator className="my-2" />
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Cores</Label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { nome: 'Vermelho', cor: '#ef4444' },
                        { nome: 'Azul', cor: '#3b82f6' },
                        { nome: 'Verde', cor: '#10b981' },
                        { nome: 'Preto', cor: '#000000' },
                        { nome: 'Branco', cor: '#ffffff', border: true },
                        { nome: 'Amarelo', cor: '#f59e0b' },
                        { nome: 'Roxo', cor: '#8b5cf6' },
                        { nome: 'Rosa', cor: '#ec4899' },
                      ].map(({ nome, cor, border }) => (
                        <button
                          key={nome}
                          className={`w-7 h-7 rounded-full ${border ? 'border-2 border-gray-300' : ''}`}
                          style={{ backgroundColor: cor }}
                          title={nome}
                          aria-label={`Filtrar por cor ${nome}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Mais filtros que ninguém vai usar, mas deixamos aqui pra parecer que temos muitas opções */}
                  <div className="pt-2 border-t">
                    <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium text-center">
                      Limpar filtros
                    </button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Botao variant="outline" size="sm" className="text-xs sm:text-sm" aria-haspopup="true" aria-expanded="false">
                  <Filter className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" /> Filtros
                </Botao>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-brand-card-kaline dark:bg-card">
                {allSizes.length > 0 && (
                    <>
                    <RotuloMenuSuspenso>Tamanhos</RotuloMenuSuspenso>
                    <DropdownMenuSeparator />
                    {allSizes.map(size => (
                      <CaixaSelecaoMenuSuspenso
                        key={size}
                        checked={selectedSizes.includes(size)}
                        onCheckedChange={() => handleSizeChange(size)}
                        onSelect={(e) => e.preventDefault()}
                      >
                        {size}
                      </CaixaSelecaoMenuSuspenso>
                    ))}
                    </>
                )}
                {allColors.length > 0 && (
                    <>
                    <RotuloMenuSuspenso className="mt-2">Cores</RotuloMenuSuspenso>
                    <DropdownMenuSeparator />
                    {allColors.map(color => (
                      <CaixaSelecaoMenuSuspenso
                        key={color}
                        checked={selectedColors.includes(color)}
                        onCheckedChange={() => handleColorChange(color)}
                        onSelect={(e) => e.preventDefault()}
                      >
                        {color}
                      </CaixaSelecaoMenuSuspenso>
                    ))}
                    </>
                )}
                {allSizes.length === 0 && allColors.length === 0 && (
                    <RotuloMenuSuspenso className="text-muted-foreground text-sm p-2">Nenhum filtro disponível.</RotuloMenuSuspenso>
                )}
              </DropdownMenuContent>
            </DropdownMenu>


          </div>
        </div>
        
        <AnimatePresence>
          {isLoadingProdutos ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full py-20 flex justify-center items-center"
            >
              <div className="h-16 w-16 rounded-full border-4 border-brand-primary-kaline border-t-transparent animate-spin">
                <span className="sr-only">Carregando produtos...</span>
              </div>
            </motion.div>
          ) : displayedProdutos && displayedProdutos.length > 0 ? (
            <motion.div 
              key={currentGridClass + selectedSizes.join(',') + selectedColors.join(',')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={`grid ${currentGridClass} gap-4 sm:gap-6`}
            >
              {displayedProdutos.map((produto, index) => {
                if (!produto || !produto.id) {
                  console.warn('Produto inválido no displayedProdutos:', produto);
                  return null;
                }
                
                return (
                  <motion.div
                    key={produto.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    className="w-full"
                  >
                    <Suspense fallback={<div className="h-96 bg-muted rounded-lg animate-pulse"></div>}>
                      <CartaoProduto product={produto} />
                    </Suspense>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10 text-brand-text-muted-kaline dark:text-muted-foreground"
            >
              Nenhum produto encontrado com os filtros selecionados.
            </motion.p>
          )}
        </AnimatePresence>
      </section>


    </div>
  );
};

export default HomePage;