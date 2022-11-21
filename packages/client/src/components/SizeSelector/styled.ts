import styled from '@emotion/styled';

export const Container = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 5%;
`;

export const ItemContainer = styled.div<{ isSelected: boolean }>`
  width: 28%;
  padding: 5%;
  border-radius: 10px;
  text-align: center;
  border: ${(props) => props.theme.border.default};
  border-width: 2px;
  border-color: ${(props) =>
    props.isSelected ? props.theme.colors.primary : props.theme.colors.grey200};
`;

export const SizeText = styled.p`
  margin: 10% 0;
  font-size: ${(props) => props.theme.font.size.md};
`;

export const VolumeText = styled.p`
  font-size: ${(props) => props.theme.font.size.xs};
  color: ${(props) => props.theme.colors.grey600};
`;
