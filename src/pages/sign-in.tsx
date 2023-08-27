import { Center, Container } from "@chakra-ui/react";
import { SignIn } from "@clerk/clerk-react";


export default function SignInPage() {
  return (
    <Container bg="blue.50" minHeight={"100vh"} minWidth={"100vw"}>
      <Center paddingTop="10vh">
<SignIn></SignIn>
</Center>
</Container>
  );
}