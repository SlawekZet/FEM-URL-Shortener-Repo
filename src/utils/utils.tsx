export const handlePlaceholderClick = () => {
  alert("That's a demo version and this is just a placeholder");
};

export const registerUser = async (
  username: string,
  email: string | undefined,
  password: string | undefined,
  setResponse: React.Dispatch<React.SetStateAction<string | undefined>>,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string | undefined>>,
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const response = await fetch(
      'https://render-shooort.onrender.com/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to register a user');
    }
    const result = await response.json();
    setResponse(result.message);
    console.log(result.message);
    setUsername('');
    setPassword('');
    setEmail('');
  } catch (error) {
    console.log('An error has occured', error);
    setError(error.message);
  }
};

export const loginUser = async (
  username: string,
  password: string | undefined,
  setResponse: React.Dispatch<React.SetStateAction<string | undefined>>,
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string | undefined>>,
  setLoggedUser: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const response = await fetch(
      'https://render-shooort.onrender.com/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to login');
    }

    const result = await response.json();
    const token = result.token;
    // auth request to the server
    const loginResponse = await fetch(
      'https://render-shooort.onrender.com/user/profile',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!loginResponse.ok) {
      throw new Error('Failed to login');
    }
    const loginResult = await loginResponse.json();
    setResponse(loginResult.message);
    setIsLogged(true);
    setUsername('');
    setPassword('');
    setLoggedUser(username);
  } catch (error) {
    console.log('An error has occured', error);
    setError(error.message);
  }
};
