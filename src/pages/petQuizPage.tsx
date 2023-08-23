import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Center,
  Container,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Image from "next/image"
import { useRouter } from "next/router";
import { api } from "npm/utils/api";
import { currentUser, useUser } from "@clerk/nextjs";

export default function PetQuiz() {
  const [sydCount, setSydCount] = useState(Number);
  const [lokCount, setLokCount] = useState(Number);
  const [stuCount, setStuCount] = useState(Number);
  const [elCount, setElCount] = useState(Number);
  const [sydText, setSydneyText] = useState(4);
  const [lokText, setLokiText] = useState(4);
  const [stuText, setStuText] = useState(4);
  const [elText, setElText] = useState(4);
  const [submitReady, setSubmitReady] = useState(false);
  const [alertText, setAlertText] = useState<string[]>(["","",""]);
  
  const router = useRouter();
  const mutation = api.example.post.useMutation();
  

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  function submitButton() {
    if (
      sydText == lokText ||
      sydText == stuText ||
      sydText == elText ||
      lokText == stuText ||
      lokText == elText ||
      stuText == elText
    ){
    setSubmitReady(false);
    setAlertText(["Please make sure you\'ve given each pet a different ranking",""]);
    }
    else{
      setSubmitReady(true);
      setAlertText(["Do you want to submit this ranking?", `Sydney: ${sydText}\nLoki: ${lokText}\nStuart: ${stuText}\nEl Gato: ${elText}`]);
    }
      onOpen();
  }


  interface UseUserT {
    isLoaded: boolean;
    isSignedIn: boolean;
    user: { id: string };
  }

  const { isLoaded, isSignedIn, user } = useUser() as UseUserT;

  async function submitPost(){
    const userman = user.id;

   mutation.mutate(
      {
        sydneyRank: sydText.valueOf(),
        lokiRank: lokText.valueOf(),
        stuartRank: stuText.valueOf(),
        elGatoRank: elText.valueOf(),
        authorId: userman
      }
    )

    await router.push("/petQuizData");
   
  }
  function sydneyClick() {
    setSydCount(sydCount + 1);

    setSydneyText((sydCount % 4) + 1);
  }

  function lokClick() {
    setLokCount(lokCount + 1);

    setLokiText((lokCount % 4) + 1);
  }

  function stuClick() {
    setStuCount(stuCount + 1);

    setStuText((stuCount % 4) + 1);
  }

  function elClick() {
    setElCount(elCount + 1);

    setElText((elCount % 4) + 1);
  }
  return (
    <Container minWidth={"90vw"}>
      <Center paddingBottom={"10px"} paddingTop={"20px"}>
      <Text fontSize={"4xl"} as={"b"}>Which pet is the cutest?</Text>
      </Center>
      <Center paddingBottom={"15px"}>
      <Text fontSize={"2xl"} textColor={"gray"}>Click on the images below to rank these pets.</Text>
      </Center>
      <Center>
        
        <SimpleGrid columns={2} spacing={10}>
          <GridItem rowSpan={1}>
            <button onClick={() => sydneyClick()}>
              <Image src="/sydney.png" width={150} height={80} alt = "Sydney"></Image>
            </button>
            <Text>Sydney: {sydText}</Text>
          </GridItem>
          <GridItem>
            <button onClick={() => lokClick()}>
              <Image src="/loki.png" width={150} height={80} alt = "Loki"></Image>
            </button>
            <Text>Loki: {lokText}</Text>
          </GridItem>
          <GridItem>
            <button onClick={() => stuClick()}>
              <Image src="/stuart.png" width={150} height={80} alt = "Stuart"></Image>
            </button>
            <Text>Stuart: {stuText}</Text>
          </GridItem>
          <GridItem>
            <button onClick={() => elClick()}>
              <Image src="/gato.png" width={150} height={80} alt = "El Gato"></Image>
            </button>
            <Text>El Gato {elText}</Text>
          </GridItem>
          <GridItem colSpan={2}>
    
          </GridItem>
        </SimpleGrid>
      </Center>
      <Center>
      <Button onClick={submitButton}>Submit!</Button>
      </Center>
      <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
            <Text>{alertText[0]}</Text>
            </AlertDialogHeader>

            <AlertDialogBody>
             <Text>{alertText[1]}</Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <SimpleGrid columns={2} spacing={5}>
              <Button ref={cancelRef} onClick={onClose}>
                Change my answer!
              </Button>
              <Button colorScheme="telegram" isDisabled={!submitReady} onClick={submitPost}>
                Submit!
              </Button>
              </SimpleGrid>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}
