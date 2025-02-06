// Importing necessary hooks and components
import { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaLock } from 'react-icons/fa'; // Icons for user and password
import { createGlobalStyle } from 'styled-components'; // Global styles
import { useRouter } from 'next/router'; // Hook for page navigation

// Global styles to ensure the layout takes up the full screen
const GlobalStyle = createGlobalStyle`
  html, body {
    overflow: hidden;  // Prevent scrolling
    margin: 0;  // Remove margins
    padding: 0;  // Remove padding
    height: 100%;  // Make the content take up 100% of the height
  }
`;

// Main container for the form, centering elements
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  background-image: url('https://img.freepik.com/fotos-gratis/feliz-macho-escrita-positivo-correio-para-cliente_1163-3986.jpg?t=st=1738785047~exp=1738788647~hmac=53f73cfbe1023c9010f06de4b2cdd5c3dc285ea0b9a9b822c1c5e07228bd4bd0&w=1380');  // Background image
  background-size: cover;  // Make the image cover the full screen
  background-position: center;  // Center the image
  background-repeat: no-repeat;  // Prevent repeating the image
  background-attachment: fixed;  // Keep the image fixed while scrolling
`;

// Title container with styling
const ContainerTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #72cb10;  // Green color
  text-align: center;  // Center the title
`;

// Login form styling
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 520px;
  height: 250px;
  padding: 20px;
  background-color: rgba(114, 203, 16, 0.9); /* Slightly transparent background */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);  // Subtle shadow for the form
  align-items: center;
  justify-content: center;
`;

// Input container to position the icons inside input fields
const InputContainer = styled.div`
  position: relative;
  width: 70%;
  margin-bottom: 20px;
`;

// Input field styling
const Input = styled.input`
  padding: 15px;
  padding-left: 40px;  // Space for the icon inside the input
  border-radius: 20px;
  border: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
`;

// Icon positioning inside the input field
const Icon = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);  // Vertically center the icon
  color: #000;  // Black color for icons
`;

// Submit button styling
const Button = styled.button`
  padding: 15px;
  background-color: #fff;
  color: #72cb10;  // Green color for button text
  border: none;
  border-radius: 20px;
  cursor: pointer;
  width: 70%;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;  // Light gray on hover
  }
`;

// Main login page component
const LoginPage = () => {
  const [email, setEmail] = useState('');  // State for email input
  const [senha, setSenha] = useState('');  // State for password input
  const router = useRouter();  // Router for navigation

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();  // Prevent default form submission behavior

    // Send login request to API
    const response = await fetch('https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/login/acessar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Specify JSON format
      },
      body: JSON.stringify({ email, senha }),  // Send email and password as JSON
    });

    // Handle the response from the API
    const data = await response.json();
    if (data.status === 1) {  // If login is successful
      const token = data.token_de_acesso;  // Get the access token
      localStorage.setItem('token', token);  // Store token in local storage
      console.log(token);  // Log the token (optional)

      // Redirect to the products page after successful login
      router.push('/products');
    } else {
      // Show an error alert if login fails
      alert('Erro ao realizar login');
    }
  };

  return (
    <FormContainer>
      <GlobalStyle />
      <ContainerTitle>Bem-vindo a Innovation Brindes</ContainerTitle>
      <LoginForm onSubmit={handleLogin}>
        <InputContainer>
          <Icon>
            <FaUser />  {/* User icon */}
          </Icon>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  // Update email state on change
            placeholder="Usuário"
            required  // Make this field required
          />
        </InputContainer>

        <InputContainer>
          <Icon>
            <FaLock />  {/* Lock icon */}
          </Icon>
          <Input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}  // Update password state on change
            placeholder="Senha"
            required  // Make this field required
          />
        </InputContainer>

        <Button type="submit">Login</Button>  {/* Submit button */}
      </LoginForm>
    </FormContainer>
  );
};

export default LoginPage;
