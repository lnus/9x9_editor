import { NavCollapse } from '@/components/Navigation/NavCollapse';
import { Center, Container, Pagination } from '@mantine/core';

export const SchematicsPage = () => {
  return (
    <NavCollapse>
      <Container>
        <Center>
          <Pagination total={10} />;
        </Center>
      </Container>
    </NavCollapse>
  );
};
