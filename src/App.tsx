import "./App.css";
import { Content } from "./components/Content/Content";
import { Footer } from "./components/Footer/Footer";
import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";
import { NotFound } from "./components/NotFound/NotFound";
import { RedirectPage } from "./components/RedirectPage/RedirectPage";
import { Shortener } from "./components/Shortener/Shortener";
import { UrlShortenerProvider } from "./context/UrlShortenerContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <main className="app-wrapper">
              <Navbar />
              <Hero />
              <UrlShortenerProvider>
                <Shortener />
                <Content />
              </UrlShortenerProvider>
              <Footer />
            </main>
          }
          path=""
        />
        <Route element={<RedirectPage />} path="/:shortPath" />
        <Route element={<NotFound />} path="404" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// useNavigate() - przekieruje w obrębie routera
// <Redirect> react-router (coś starego, prawdopodobnie not valid)
// window.location.replace - sprawdź czy można wykorzystać tę funkcję do podmiany URLa w pzeglądarce na zasadzie - jeżeli znaleziono w db to przekieruj na stronę XXX, a jeżeli nie to na 404
