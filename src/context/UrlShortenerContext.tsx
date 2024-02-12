import { createContext, useContext, useState } from 'react';

interface UrlShortenerContextProps {
  originalUrl: string;
  shortenedUrl: string;
  urlsArray: UrlObject[];
  error: string;
  loading: boolean;
  isLogged: boolean;
  loggedUser: string;
  setOriginalUrl: React.Dispatch<React.SetStateAction<string>>;
  setShortenedUrl: React.Dispatch<React.SetStateAction<string>>;
  setUrlsArray: React.Dispatch<React.SetStateAction<UrlObject[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setLoggedUser: React.Dispatch<React.SetStateAction<string>>;
}

const UrlShortenerContext = createContext<UrlShortenerContextProps | undefined>(
  undefined
);

interface UrlShortenerProviderProps {
  children: React.ReactNode;
}

interface UrlObject {
  orgUrl: string;
  shortUrl: string;
}

export const UrlShortenerProvider: React.FC<UrlShortenerProviderProps> = ({
  children,
}) => {
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [shortenedUrl, setShortenedUrl] = useState<string>('');
  const [urlsArray, setUrlsArray] = useState<UrlObject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<string>('');

  const value: UrlShortenerContextProps = {
    originalUrl,
    shortenedUrl,
    urlsArray,
    error,
    loading,
    isLogged,
    loggedUser,
    setOriginalUrl,
    setShortenedUrl,
    setUrlsArray,
    setLoading,
    setError,
    setIsLogged,
    setLoggedUser,
  };
  return (
    <UrlShortenerContext.Provider value={value}>
      {children}
    </UrlShortenerContext.Provider>
  );
};

export const useUrlShortenerContext = () => {
  const context = useContext(UrlShortenerContext);
  if (context === undefined) {
    throw new Error(
      'useShortenerContext must be used within a ShortenerProvider'
    );
  }
  return context;
};
