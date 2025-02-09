import React from "react";
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
  width: 100%;
  padding: 0 20px;
  font-family: Poppins, sans-serif;
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  padding: 20px;
  justify-items: center;
  align-items: center;
  margin-top: 20px;
  max-width: 1200px;
  margin: 20px auto;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  min-width: 100px;
  max-width: 300px;
  height: 420px;
  font-family: Poppins, sans-serif;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: contain;
  margin-bottom: 10px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`;

const ProductTitle = styled.h3`
  font-size: 1.1rem;
  color: #000;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 35px;
`;

const ProductCode = styled.p`
  font-size: 1rem;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ExclusiveTag = styled.span`
  display: flex;
  justify-content: end;
  align-items: end;
  font-size: 0.8rem;
  color: #00a8e8;
  font-weight: bold;
  text-transform: uppercase;
  width: 100%;
`;

const ProductDescription = styled.p`
  font-size: 0.8rem;
  color: #666;
  line-height: 1.4;
  height: 50px;
  text-align: left;
`;

const ProductPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: end;
  color: #000;
  width: 100%;
  margin-top: 10px;
  gap: 5px;
`;

const PriceLabel = styled.span`
  display: flex;
  font-size: 1rem;
`;

const PriceValue = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

const PriceNote = styled.span`
  font-size: 0.8rem;
`;

const ConfirmButton = styled.button`
  background-color: #82BE06;
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  margin-top: 10px;
  width: 110%;
  max-width: 320px;

  &:hover {
    background-color: #5ba80e;
  }
`;

const ColorSelectorBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: start;
`;

const ColorSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 20px); /* Define colunas menores */
  grid-template-rows: repeat(3, 20px); /* Define linhas menores */
  gap: 4px; /* Ajuste conforme necessário */
`;


const ColorCircle = styled.div<{ color: string }>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border: 1px solid #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);

  &:hover {
    border: 2px solid #000;
  }
`;

const colors = [
  "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF",
  "#00FFFF", "#800000", "#808000", "#008000", "#800080",
  "#008080", "#000080", "#FFA500", "#A52A2A", "#DEB887"
];

// Main component for the products page
const ProductsPage = () => {
  interface Product {
    codigo: string;
    imagem: string;
    nome: string;
    descricao: string;
    preco: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nomeProduto, setNomeProduto] = useState<string>("");
  const [codigoProduto, setCodigoProduto] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const body = nomeProduto || (codigoProduto.length === 4) ? {
      nome_produto: nomeProduto,
      codigo_produto: codigoProduto,
    } : {};

    const url = "https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/produtos/listar";
    const method = nomeProduto || (codigoProduto.length === 4) ? "POST" : "GET";

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
      .catch(() => {
        setError("Erro ao buscar os produtos.");
        setLoading(false);
      });
  }, [router, nomeProduto, codigoProduto]);

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNomeProduto(e.target.value);
  };

  const handleCodigoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodigoProduto(e.target.value);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (products.length === 0) return (
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
      <p>Nenhum produto encontrado.</p>
    </Container>
  );

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
          <div key={product.codigo}>
            <ProductTitle>{product.nome}</ProductTitle>
            <ProductCode>{product.codigo}</ProductCode>
            <ProductCard>
              <ExclusiveTag>Exclusivo!</ExclusiveTag>
              <ProductImage src={product.imagem} alt={product.nome} />
              <ProductInfo>
                <ProductDescription>
                  {product.descricao.length > 80
                    ? `${product.descricao.slice(0, 80)}...`
                    : product.descricao}
                </ProductDescription>
                <ColorSelectorBox>
                  <span>Cores:</span>
                  <ColorSelector>
                    {colors.map((color) => (
                      <ColorCircle key={color} color={color} />
                    ))}
                  </ColorSelector>
                </ColorSelectorBox>
                <ProductPrice>
                    <PriceLabel>a partir de:</PriceLabel>
                    <PriceValue>R$ {parseFloat(product.preco).toFixed(2)}</PriceValue>
                  <PriceNote>gerado pela melhor oferta</PriceNote>
                </ProductPrice>
              </ProductInfo>
            </ProductCard>
            <ConfirmButton>Confira</ConfirmButton>
          </div>
        ))}
      </ProductsGrid>
    </Container>
  );
};

export default ProductsPage;