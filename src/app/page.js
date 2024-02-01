import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import EcomAll from "@/components/ecommerce/EcomAll";

function App() {
  return (
    <main className="w-full min-h-screen flex flex-col relative">
      <Banner />
      <EcomAll />
    </main>
  );
}

export default App;
