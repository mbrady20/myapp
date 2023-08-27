import { Center, Container } from "@chakra-ui/react";
import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <Container bg="blue.50" minHeight={"100vh"} minWidth={"100vw"}>
      <Center paddingTop="10vh">
<SignUp></SignUp>
</Center>
</Container>
  );
}