// imports obrigatorios que ngm entende direito pra que serve
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom'; // pra pegar parametro da url
import produtos from "@/data/produtos"; // dados mocados pq sim
import { motion, AnimatePresence } from 'framer-motion'; // animaçoes inuteis

// carregamento preguiçoso pq sim
// se der pau, problema seu
const CartaoProduto = lazy(() => import('@/components/CartaoProduto'));


// se nao achar, azar o seu
const CategoryPage = () => {
  // pega o nome da categoria da URL
  // se nao tiver, ferrou
  const { categoryName } = useParams();
  // lista de produtos filtrados
  // comeca vazia e so deus sabe quando vai encher

  const [filteredPprodutos, setFilteredPprodutos] = useState([]);
  // estado de loading
  // enquanto é true, mostra um spinner bonitinho
  // que ninguem liga mesmo
  
  const [isLoading, setIsLoading] = useState(true);

  // quando a categoria mudar, busca os produtos
  // se der erro, ja era

  useEffect(() => {
    setIsLoading(true);
    const decodedCategoryName = decodeURIComponent(categoryName);
    const filtered = produtos.filter(p => p.category.toLowerCase() === decodedCategoryName.toLowerCase());
    
    // simula um loadingzinho pra ficar bonito
    // senao fica rapido demais e o usuario acha que é mentira
   
    setTimeout(() => {
      setFilteredPprodutos(filtered);
      setIsLoading(false);
    }, 300);
  }, [categoryName]);

  // formata o titulo da categoria
  // se nao tiver nome, coloca 'Categoria' e foda-se

  const categoryTitle = categoryName ? decodeURIComponent(categoryName) : 'Categoria';

  // Visual especial para rota/categoria promocoes
  const isPromocoes = categoryTitle.toLowerCase() === 'promoções' || categoryTitle.toLowerCase() === 'promocoes';

  return (
    // container principal
    // o min-h-screen é so pra nao ficar feio
    <div className="div-container min-h-screen">
      {/* animação de entrada do titulo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} // comeca invisivel
        animate={{ opacity: 1, y: 0 }} // termina visivel
        transition={{ duration: 0.5 }} // duracao da animaçao
      >
        {/* titulo da categoria */}
        {isPromocoes ? (
          <div className="flex items-center gap-3 justify-center mb-8 mt-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink-500 text-white text-3xl shadow-lg animate-bounce">
              <svg xmlns='http://www.w3.org/2000/svg' className='h-7 w-7' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-pink-600 drop-shadow">Promoções Exclusivas</h1>
            <span className="ml-2 text-base bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-bold animate-pulse border-2 border-pink-400 shadow">OFERTA</span>
          </div>
        ) : (
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-primary-kaline dark:text-brand-primary-kaline mb-8 mt-4 drop-shadow">{categoryTitle}</h1>
        )}

        {/* se nao tiver nome, mostra 'Categoria' e foda-se */}
        <h1 className="titulo-principal">
          Categoria: <span className="text-brand-primary-kaline">{categoryTitle}</span>
        </h1>
        {/* contador de produtos */}
        {/* que as vezes some do nada */}
        <p className="text-md text-brand-text-muted-kaline dark:text-muted-foreground mb-8">
          {filteredPprodutos.length} {filteredPprodutos.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
        </p>
      </motion.div>

      {/* animação de entrada/saída */}
      {/* se não tiver, fica feio pra caramba */}
      {/* #animacaoInutil #masFicaBonito */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }} // comeca invisivel
            animate={{ opacity: 1 }} // aparece
            exit={{ opacity: 0 }} // some
            className="w-full py-20 flex justify-center items-center"
          >
            {/* spinner que gira infinitamente */}
            {/* ate a pagina travar */}
            <div className="h-16 w-16 rounded-full border-4 border-brand-primary-kaline border-t-transparent animate-spin">
              <span className="sr-only">Carregando produtos...</span>
            </div>
          </motion.div>
        ) : filteredPprodutos.length > 0 ? (
          <motion.div
            key="product-grid"
            initial={{ opacity: 0 }} // comeca invisivel
            animate={{ opacity: 1 }} // aparece
            transition={{ duration: 0.4 }} // duracao da animaçao
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {filteredPprodutos.map((produto, index) => (
              <motion.div
                key={produto.id} // chave unica obrigatoria
                initial={{ opacity: 0, y: 15 }} // comeca deslocado
                animate={{ opacity: 1, y: 0 }} // termina no lugar
                transition={{ duration: 0.3, delay: index * 0.04 }} // delayzinho bonito
                className="w-full" // ocupa toda a largura
              >
                <Suspense fallback={
                  <div className="h-96 bg-muted rounded-lg animate-pulse">
                    {/* loading bonitinho */}
                    {/* que some rapido demais */}
                  </div>
                }>
                  <CartaoProduto product={produto} />
                </Suspense>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            key="no-produtos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 text-brand-text-muted-kaline dark:text-muted-foreground"
          >
            Nenhum produto encontrado nesta categoria.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryPage;
  