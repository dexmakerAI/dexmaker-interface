import styled from "styled-components";

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  color: #ccc;
  padding: 1rem;
  background-color: #222;
`;

export const FooterComp = () => {
    return (
        <Footer>
            <div>
                {/* Add any gap information you want to include */}
            </div>
            <div>
                © 2023 DexMaker.AI. All rights reserved.
            </div>
        </Footer>
    )
}