import { NavigateFunction } from 'react-router-dom';
import { domain } from './config';
import React from 'react';
import { UrlObject } from '../context/UrlShortenerContext';

function clearCookie(name: string) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

export const handlePlaceholderClick = () => {
  alert(
    "That's a demo version and this is just a placeholder. But check the shortening, register, login and logout features!"
  );
};

// AUTH

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  setResponse: React.Dispatch<React.SetStateAction<string | undefined>>,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const usernameRegex = /^[a-zA-Z0-9_-]{5,20}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;

  if (!emailRegex.test(email)) {
    return setError(
      'Please enter a valid email address. It should follow the standard email format, e.g., example@example.com.'
    );
  } else if (!usernameRegex.test(username)) {
    return setError(
      'Username should be between 5 and 20 characters long and may include letters (both uppercase and lowercase), numbers, hyphens, and underscores. No spaces are allowed.'
    );
  } else if (!passwordRegex.test(password)) {
    return setError(
      'Password should contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special symbol.'
    );
  }

  try {
    const response = await fetch(`${domain}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      const result = await response.json();
      setError(result.message);
      return console.error(result.message);
    }
    const result = await response.json();
    setResponse(result.message);
    console.log(result.message);
    setUsername('');
    setPassword('');
    setEmail('');
  } catch (error) {
    if (
      typeof error === 'object' &&
      error &&
      'message' in error &&
      typeof error.message === 'string'
    ) {
      console.log('An error has occured', error);
      setError(error.message);
    }
  }
};

export const loginUser = async (
  username: string,
  password: string | undefined,
  setResponse: React.Dispatch<React.SetStateAction<string | undefined>>,
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  setLoggedUser: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  navigate: NavigateFunction
) => {
  try {
    const response = await fetch(`${domain}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (!response.ok) {
      const result = await response.json();
      setError(result.message);
      return console.error('Failed to login:', result.message);
    }

    const result = await response.json();
    const token = result.token;
    document.cookie = `jwt=${token}; Max-Age=${
      24 * 60 * 60
    }; Secure; SameSite=None`;
    // auth request to the server
    const loginResponse = await fetch(`${domain}/user/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!loginResponse.ok) {
      throw new Error('Failed to login');
    }
    const loginResult = await loginResponse.json();
    setResponse(loginResult.message);
    setIsLogged(true);
    setUsername('');
    setPassword('');
    setLoggedUser(username);
    setInterval(() => navigate('/'), 1500);
  } catch (error) {
    if (
      typeof error === 'object' &&
      error &&
      'message' in error &&
      typeof error.message === 'string'
    ) {
      console.log('An error has occured', error);
      setError(error.message);
    }
  }
};

export const logout = async (
  setLoggedUser: React.Dispatch<React.SetStateAction<string>>,
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await fetch(`${domain}/auth/logout`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to logout');
    }
    setLoggedUser('');
    setIsLogged(false);
    clearCookie('jwt');
    console.log('Logout Successful');
  } catch (error) {
    console.log(error);
  }
};

// SHORTENER

export const errorChecker = (
  originalUrl: string,
  setError: React.Dispatch<React.SetStateAction<string>>,
  urlsArray: UrlObject[]
) => {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

  if (!originalUrl && originalUrl.length === 0) {
    setError('Please provide a URL to shorten');
    return true;
  } else if (originalUrl.includes(' ')) {
    setError(
      'Please remove any spaces from the URL or encode them to %20 or +'
    );
    return true;
  } else if (
    !originalUrl.startsWith('http://') &&
    !originalUrl.startsWith('https://')
  ) {
    setError('Please start with a http:// or https:// protocol to your URL');
    return true;
  } else if (!urlRegex.test(originalUrl)) {
    setError('Please provide a correct URL');
    return true;
  } else if (urlsArray.some((e) => e.orgUrl === originalUrl)) {
    setError('This url is already shortened and on your list');
    return true;
  } else if (originalUrl.includes('shooort.eu')) {
    setError('You cannot shorten already shortened URL');
    return true;
  }
  setError('');
  return false;
};

export const handleShortenUrl = async (
  e: React.MouseEvent<HTMLButtonElement>,
  originalUrl: string,
  urlsArray: UrlObject[],
  loggedUser: string,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setShortenedUrl: React.Dispatch<React.SetStateAction<string>>
) => {
  e.preventDefault();
  if (!errorChecker(originalUrl, setError, urlsArray)) {
    try {
      setLoading(true);
      const response = await fetch(`${domain}/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          genByUser: loggedUser ? loggedUser : 'null',
          originalUrl: originalUrl,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.message);
        return console.error(result.message);
      }
      const result = await response.json();
      setShortenedUrl(result.shortenedUrlPath);
      setLoading(false);
    } catch (error) {
      setError(`An error has occured while shortening URL`);
      setLoading(false);
    }
  }
};

// URL LIST

// checks if the short url input is correct

export const inputChecker = (
  input: string,
  setShortUrlError: React.Dispatch<React.SetStateAction<string>>
) => {
  const regex = /^[a-zA-Z0-9]{4,15}$/;

  if (input.length > 15 || input.length < 4) {
    setShortUrlError('URL path should be betwen 4 and 15 characters');
    return true;
  } else if (!regex.test(input)) {
    setShortUrlError('Invalid input. You can only use letters and numbers');
    return true;
  }
  setShortUrlError('');
  return false;
};

// updating the short url

export const handleSaveEditClick = async (
  e: UrlObject,
  newShortUrl: string,
  setEditedUrl: React.Dispatch<React.SetStateAction<string>>,
  setShortUrlError: React.Dispatch<React.SetStateAction<string>>,
  setNewShortUrl: React.Dispatch<React.SetStateAction<string>>,
  setEditingIndices: React.Dispatch<React.SetStateAction<number[]>>
) => {
  setEditedUrl('');
  if (!inputChecker(newShortUrl, setShortUrlError)) {
    try {
      const response = await fetch(`${domain}/update-short-url`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shortPath: e.shortUrl,
          newShortPath: newShortUrl,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        setShortUrlError(errorMessage.message);
        return console.error('There was an error:', errorMessage.message);
      }
      console.log('short URL changed sucessfully');
      setNewShortUrl('');
      setEditingIndices([]);
      setEditedUrl(e.shortUrl);
    } catch (error) {
      console.error('An errr occurred:', error);
    }
  }
};

// deleting the URL from the urlsArray

export const handleDeleteUrl = async (
  e: UrlObject,
  index: number,
  loggedUser: string,
  urlsArray: UrlObject[],
  setUrlsArray: React.Dispatch<React.SetStateAction<UrlObject[]>>,
  setDeletedUrl: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!loggedUser) {
    const filteredUrls = urlsArray.filter((_url, i) => i !== index);
    localStorage.setItem('urlsArray', JSON.stringify(filteredUrls));
    return setUrlsArray(filteredUrls);
  }

  try {
    const response = await fetch(`${domain}/delete-user-from-entry`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shortPath: e.shortUrl,
      }),
    });
    if (!response.ok) {
      console.error('There was an error:', response.statusText);
    }
    console.log('entry deleted succesfully');
    setDeletedUrl(e.shortUrl);
  } catch (error) {
    console.error('Error while deleting the URL:', error);
  }
};

// copying the shortened url

export const handleCopyButtonClick = async (
  url: string,
  setCopiedUrl: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    await navigator.clipboard.writeText(url);
    const text = await navigator.clipboard.readText();

    if (text === url) {
      setCopiedUrl(text);
    } else {
      alert('URL was not copied! Check the console');
    }
  } catch (error) {
    console.error('Error while copying the URL:', error);
  }
};
