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
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";

import { useRouter } from "next/router";
import { submittedState } from "npm/states/recoil_state";
import { useRecoilState } from "recoil";

export default function Home() {
  const router = useRouter();

  const [isSubmitted, setIsSubmitted] = useRecoilState<boolean>(submittedState);

  
  return (


      <Container>
        <Container paddingTop="10px" paddingBottom={"30px"}>
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
            <Container >
            <Center paddingTop={"25px"}>
             {!isSubmitted && <Text>Take the Pet Quiz!</Text>}
             {isSubmitted && <Text>Sure you don&apos;t want to take another look at your results?</Text>}
              </Center>
              <Center paddingTop={"20px"}>
              {!isSubmitted && <Button colorScheme={"green"} onClick={() => router.push("/petQuizPage")}>Pet Quiz!</Button>}
              {isSubmitted && <Button colorScheme={"green"} onClick={() => router.push("/petQuizData")}>View Results</Button>}

            </Center>
            </Container>
          </Container>
          
          <Container paddingTop={"5px"}>
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
                <Button colorScheme="twitter" ><a href="mailto:bradymichael362@gmail.com">Send Me an Email</a></Button>
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
