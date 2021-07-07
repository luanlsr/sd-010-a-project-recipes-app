import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarBebidas() {
  return (
    <section>
      <Header title="Explorar Bebidas" show={ false } />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/bebidas/">
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
      <footer>
        <Footer />
      </footer>
    </section>);
}

export default ExplorarBebidas;
