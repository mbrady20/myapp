"use client";
import { Box, Flex, Text, Center, Button, Container, IconButton, IconButtonProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import {AiFillGithub, AiFillInstagram, AiFillLinkedin, AiFillMail, AiFillTwitterCircle} from "react-icons/ai"

export default function RootLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const GitButton = React.forwardRef<IconButtonProps, 'div'>((props, ref) => (
    <IconButton  boxSize={8} borderRadius="50px" ref={ref} onClick={async () => await router.push("https://github.com/mbrady20/")} {...props}/>

  ))
  return (
    
<div>
          <Flex bg="blue.50" justifyItems={"center"}>
          <Box paddingY="25px" paddingX="40px">
            <Text whiteSpace={"nowrap"} as="b">
            Michael Brady
            </Text>
          </Box>
          <Container paddingY="25px">
            <Center>
              <Button
                borderLeftRadius="50px"
                bg="gray.200"
                onClick={async () => await router.push("/")}
              >
                Home
              </Button>
              <Button
                bg="gray.200"
                borderRadius="0"
                onClick={async () => await router.push("/aboutPage")}
              >
                About
              </Button>
              <Button bg="gray.200" borderRadius="0" onClick={async () => await router.push("/petQuizPage")}>
                Pet Quiz
              </Button>
              <Button borderRightRadius="50px" bg="gray.200">
                More
              </Button>
            </Center>
     
          </Container>

          <Box paddingY="25px" paddingX="40px">
            <Button color="blue.600" bg={"gray.200"}>
              Contact
            </Button>
          </Box>
        </Flex>
        <Flex bg="blue.50">
        
              {children}
           
            </Flex>
        <Flex bg="blue.50" paddingY="25px" justifyItems={"center"}>
          <Container>
            <Center>
              <Button bg="transparent" borderRadius={"0"} onClick={async () => await router.push("/")}>
                Home
              </Button>
              <Button
                bg="transparent"
                borderRadius="0"
                onClick={async () => await router.push("/aboutPage")}
              >
                About
              </Button>
              <Button bg="transparent" borderRadius="0" onClick={async () => await router.push("/petQuizPage")}>
                Pet Quiz
              </Button>
              <Button borderRadius={"0"} bg="transparent">
                More
              </Button>
            </Center>
    
         <Center>
              <Flex justifyItems="center" paddingTop={"25px"}>
                <Box p ='4'>
                  <GitButton aria-label="git hub" as={AiFillGithub} />
                                </Box>
              
             <Box p ='4'><IconButton aria-label="git hub" as={AiFillTwitterCircle} boxSize={8} borderRadius="50px" onClick={ async () =>  await router.push("https://twitter.com/MichaelJBrady9")}/></Box>
              <Box p ='4'><IconButton aria-label="git hub" as={AiFillMail} boxSize={8} borderRadius="50px" onClick={ async () => await router.push("mailto:bradymichael362@gmail.com")}/></Box>
              <Box p = '4'><IconButton aria-label="git hub" as={AiFillLinkedin} boxSize={8} borderRadius="50px" onClick={async () => await router.push("https://www.linkedin.com/in/michael-brady-a34976255/")}/></Box>
              <Box p='4'><IconButton aria-label="git hub" as={AiFillInstagram} boxSize={8} borderRadius="50px" onClick={async () => await router.push("https://www.instagram.com/bradymichael362/")}/></Box>
             
              </Flex>
              </Center>
   
          </Container>
         
        </Flex>
        </div>
  );
}
