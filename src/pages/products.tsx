import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Header from "@/components/header";

// Styled components for the page layout and styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const FiltersSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding: 20px;
  margin-top: 80px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  max-width: 250px;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px;
  padding: 20px;
  justify-items: center;
  margin-top: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 230px;
  font-family: Arial, sans-serif;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProductInfo = styled.div`
  padding: 10px;
`;

const ProductTitle = styled.h3`
  font-size: 0.9rem;
  color: #333;
  margin: 5px 0;
  font-weight: bold;
`;

const ProductCode = styled.p`
  font-size: 0.75rem;
  color: #666;
  margin: 5px 0;
`;

const ExclusiveTag = styled.span`
  display: block;
  font-size: 0.75rem;
  color: #00a8e8;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ProductDescription = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin: 5px 0;
  line-height: 1.3;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  color: #72cb10;
  font-weight: bold;
  margin: 8px 0;
`;

const ConfirmButton = styled.button`
  background-color: #72cb10;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;
  text-transform: uppercase;

  &:hover {
    background-color: #5ba80e;
  }
`;

// Main component for the products page
const ProductsPage = () => {
  // Interface for the product data
  interface Product {
    codigo: string;
    imagem: string;
    nome: string;
    descricao: string;
    preco: string;
  }

  // State variables for managing products, loading state, error messages, and filter inputs
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nomeProduto, setNomeProduto] = useState<string>("");
  const [codigoProduto, setCodigoProduto] = useState<string>("");
  const router = useRouter();

  // Effect hook to fetch products data from the API
  useEffect(() => {
    const token = localStorage.getItem("token")?.toString();

    // Redirect to login if no token is found
    if (!token) {
      router.push("/login");
      return;
    }

    // Skip fetch if the product code is too short
    if (codigoProduto && codigoProduto.length < 4) {
      return;
    }

    // Prepare request body and URL based on filter inputs
    const body = nomeProduto || codigoProduto ? {
      nome_produto: nomeProduto,
      codigo_produto: codigoProduto,
    } : {};

    const url = nomeProduto || codigoProduto 
      ? "https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/produtos/listar" // Endpoint for POST with filter
      : "https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/produtos/listar"; // Endpoint for GET without filter

    const method = nomeProduto || codigoProduto ? "POST" : "GET";

    // Fetch products data from the API
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: method === "POST" ? JSON.stringify(body) : undefined,
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setError("Erro ao carregar os produtos.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
        setError("Erro ao buscar os produtos.");
        setLoading(false);
      });
  }, [router, nomeProduto, codigoProduto]);

  // Handlers for filter input changes
  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNomeProduto(e.target.value);
  };

  const handleCodigoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodigoProduto(e.target.value);
  };

  // Render loading, error, or no products found messages
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (products.length === 0) return (
    <div>
      <Header />
      <FiltersSection>
        <Input
          type="text"
          placeholder="Filtrar por nome"
          value={nomeProduto}
          onChange={handleNomeChange}
        />
        <Input
          type="text"
          placeholder="Filtrar por código"
          value={codigoProduto}
          onChange={handleCodigoChange}
        />
      </FiltersSection>
      <p>Nenhum produto encontrado.</p>
    </div>
  );

  // Render the products grid
  return (
    <Container>
      <Header />
      <FiltersSection>
        <Input
          type="text"
          placeholder="Filtrar por nome"
          value={nomeProduto}
          onChange={handleNomeChange}
        />
        <Input
          type="text"
          placeholder="Filtrar por código"
          value={codigoProduto}
          onChange={handleCodigoChange}
        />
      </FiltersSection>
      <ProductsGrid>
        {products.map((product) => (
          <ProductCard key={product.codigo}>
            <ProductTitle>{product.nome}</ProductTitle>
            <ProductCode>{product.codigo}</ProductCode>
            <ProductInfo>
              <ExclusiveTag>EXCLUSIVO!</ExclusiveTag>
              <ProductImage
                src={product.imagem}
                alt={product.nome}
              />
              <ProductDescription>
                {product.descricao.length > 100
                  ? `${product.descricao.slice(0, 100)}...`
                  : product.descricao}
              </ProductDescription>
              <ProductPrice>
                R$ {parseFloat(product.preco).toFixed(2)}
              </ProductPrice>
              <ConfirmButton>CONFIRA</ConfirmButton>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductsGrid>
    </Container>
  );
};

export default ProductsPage;