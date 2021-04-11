import styled from "styled-components";

export const HeaderContainer = styled.header`
  border-bottom: 1px solid #d0d0d0;
  margin-bottom: 1rem;
  padding: 1rem 0;
  
  a {
    color: #999;
    transition: .3s;
    
    &:hover {
      color: #d0d0d0;
      text-decoration: none;
    }
  }
  
  p {
    margin-bottom: .5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  h1 {
    font-size: 3rem;
    
    a {
      color: #1e1e1e;
      font-weight: 300;
    }
  }
`;

export const FooterContainer = styled.footer`
  border-top: 1px solid #d0d0d0;
  padding: 1rem 0;
  
  p {
    margin-bottom: 0;
    
    small {
      color: #bababa;
      font-style: oblique;
    }
  }
`;

export const LayoutContainer = styled.div`
  width: 100%;
  max-width: 960px;
  min-height: 100vh;
  margin: auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  
  #main {
    flex: 1;
  }
`;

export const HomeNaviContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
  
  a {
    color: #666;
    background: #ddd;
    font-weight: 600;
    padding: 1rem;
    transition: .3s;

    &:hover {
      color: #fff;
      background: #333;
      text-decoration: none;
    }

    &:active {
      box-shadow: 0 0 0 .25rem rgba(0, 0, 0, .25);
    }
  }
  
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
