import { Outlet } from "react-router";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <main className="bg-[#efefef] min-h-dvh pb-6 px-[4vw] lg:px-[8vw] w-full flex flex-col gap-4 md:gap-6">
        <Navbar />
        <hr className="-mt-3 bg-zinc-600" />

        <section className="flex-1">
          <Outlet />
        </section>

        {/* <GetStudiesPage {...methods} /> */}

        <hr className="bg-zinc-600" />
        <Footer />
      </main>
    </>
  );
}

export default App;
