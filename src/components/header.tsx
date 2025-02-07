import styled from "styled-components";

const HeaderContainer = styled.div`
  background-color: #82BE06;
  color: white;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  justify-content: space-between;
  position: fixed;  /* Fixar o header no topo */
  top: 0;
  left: 0;
  width: 100%;  /* Cobrir toda a largura da tela */
  z-index: 1000;  /* Garantir que o header fique acima de outros elementos */
`;

const HeaderInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    margin-left: 5%
`;

const LogoImage = styled.img`
  height: 80px;
  border-radius: 25px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const UserText = styled.div`
  display: flex;
  flex-direction: column;

  .name {
    font-weight: bold;
  }

  .date {
    font-size: 0.875rem;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      {/* Logo */}
      <HeaderInfo>
          <LogoImage
            alt="Logo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq8qRMZLYuFW2kblWdCFjGzUm7hfTH28aUWg&s"
          />
          {/* User Info */}
          <UserInfo>
            <Avatar
              alt="Ana Carol Machado"
              src="https://img.favpng.com/20/9/6/lucy-rose-doctor-of-philosophy-round-portrait-science-cheek-png-favpng-YsCnikpuKnZP7esm8GRtuppHu.jpg"
            />
            <UserText>
              <div className="name">Ana Carol Machado</div>
              <div className="date">Quarta, 23/09/2020</div>
            </UserText>
          </UserInfo>
      </HeaderInfo>
    </HeaderContainer>
  );
};

export default Header;
