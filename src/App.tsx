import './App.css';
import { Benefits } from './components/Benefits/Benefits';
import { Content } from './components/Content/Content';
import { CtaSection } from './components/CtaSection/CtaSection';
import { Footer } from './components/Footer/Footer';
import { HeadingSection } from './components/HeadingSection/HeadingSection';
import { Hero } from './components/Hero/Hero';
import { LoginPage } from './components/LoginPage/LoginPage';
import { Navbar } from './components/Navbar/Navbar';
import { NotFound } from './components/NotFound/NotFound';
import { RedirectPage } from './components/RedirectPage/RedirectPage';
import { RegisterPage } from './components/RegisterPage/RegisterPage';
import { Shortener } from './components/Shortener/Shortener';
import { UrlsList } from './components/UrlsList/UrlsList';
import { UrlShortenerProvider } from './context/UrlShortenerContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <div className="app-wrapper">
              <UrlShortenerProvider>
                <Navbar />
              </UrlShortenerProvider>
              <Hero />
              <UrlShortenerProvider>
                <Shortener />
                <Content>
                  <UrlsList />
                  <HeadingSection />
                  <Benefits />
                </Content>
              </UrlShortenerProvider>
              <CtaSection />
              <Footer />
            </div>
          }
          path=""
        />
        <Route
          element={
            <UrlShortenerProvider>
              <LoginPage />
            </UrlShortenerProvider>
          }
          path="/login"
        />
        <Route
          element={
            <UrlShortenerProvider>
              <RegisterPage />
            </UrlShortenerProvider>
          }
          path="/register"
        />
        <Route element={<RedirectPage />} path="/:shortPath" />
        <Route element={<NotFound />} path="404" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
