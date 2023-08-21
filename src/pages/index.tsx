"use client";

import {
  Button,
  Container,
  Text,
  Image,
  Box,
  Flex,
  Center,
  Spacer,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    

      <Container>
        <Container paddingY="50px">
          <Center>
            <Image src="me.png" width={120} height={120} borderRadius={"50%"} alt="Michael Brady"/>
          </Center>
          <Center paddingY="10px">
            <Text fontSize="50px" as="b" textAlign="center">
              Michael Brady
            </Text>
          </Center>
          <Text fontSize="30px" color="gray.500" textAlign="center">
            I design programs.
          </Text>
        </Container>
        <Container>
          <Text fontSize="20px" color="gray.500" textAlign="center">
            I am a rising Junior at UW Madison majoring in Computer Science,
            Math and Philosophy. I have experience in Java and Javascript
          </Text>
          <Container paddingY="50px">
            <Center>
              <Button bg="blue.800" color="white" onClick={() => router.push("/aboutPage")}>
                More about me &rarr;
              </Button>
            </Center>
          </Container>
          <Container paddingTop={"10px"}>
            <Center>
              <Text fontSize={"50px"} as="b">
                Get in touch
              </Text>
              </Center>
              <Text fontSize={"20px"} align={"center"} color={"gray.500"}>
                Feel free to message me about all things programming
              </Text>
   
            <Flex alignItems={"center"} paddingTop={"20px"}>
              <Box w="70px">
                <Button bgColor={"blue.500"} color={"gray.300"} >Send Me an Email</Button>
              </Box>
              <Spacer w="20px"></Spacer>
              <Box>
                <Button onClick={() => router.push("https://calendly.com/bradymichael362/30min")}>Schedule a meeting</Button>
              </Box>
            </Flex>
          </Container>
        </Container>
      </Container>
      

 
  );
}
