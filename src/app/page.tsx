import { Container } from "@radix-ui/themes/components/container";
import { Heading } from "@radix-ui/themes/components/heading";
import { Section } from "@radix-ui/themes/components/section";
import { type FC } from "react";

const Home: FC = () => {
  return (
    <Container>
      <Section>
        <Heading size="9">Shape of Dreams Tool</Heading>
      </Section>
    </Container>
  );
};

export default Home;
