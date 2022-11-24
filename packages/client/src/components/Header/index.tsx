import { Container } from './styled';

interface Props {
  title: string;
}

function Header({ title }: Props) {
  return (
    <Container>
      <h1>{title}</h1>
    </Container>
  );
}

export default Header;
