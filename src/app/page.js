import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import EcomAll from "@/components/ecommerce/EcomAll";

function App() {
  return (
    <main className="w-full min-h-screen flex flex-col relative">
      <Header />
      <Banner />
      <EcomAll />
      <Footer />
    </main>
  );
}

export default App;
