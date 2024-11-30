import { Carousel } from "../../components/Carousel/Carousel";
import { Hero } from "../../components/Hero/Hero";
import { sales } from "../../data/sales";
import { trendingProducts } from "../../data/trending-products";
import { motion } from "framer-motion";

const heroProps = {
    imageUrl: 'https://res.cloudinary.com/deofotbwc/image/upload/v1732995798/semilla_pqisok.png',
    imageText: 'bienvenidos',
    headline: '',
    button: {
      href: '',
      label: ''
    }

  };
  
function Homepage() {
  return <>
    <motion.div
      initial={{ opacity: 0, y: '-50%' }}
      animate={{ opacity: 1, y: '0%' }}
      transition={{ duration: 2 }}
    >
      <Hero {...heroProps} />
    </motion.div>
    <div className='app-body'>
      <Carousel title="Proximamente" items={trendingProducts} />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <Carousel title="" items={sales} />
      </motion.div>
    </div>
  </>;
}

export { Homepage };
