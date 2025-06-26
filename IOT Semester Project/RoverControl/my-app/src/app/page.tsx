import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SolutionsSlider from './components/SolutionsSlider';
import Footer from './components/Footer';
import HowItWorks from './components/HowItWorks';


export default function HomePage() {
  return (
    <main>
      <Hero />
      <SolutionsSlider />
      <HowItWorks />
    </main>
  );
}
