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
import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "npm/utils/api";
import { currentUser, useUser } from "@clerk/nextjs";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { answerState, submittedState } from "../states/recoil_state";

export default function PetQuiz() {
  const [sydCount, setSydCount] = useState(4);
  const [lokCount, setLokCount] = useState(4);
  const [stuCount, setStuCount] = useState(4);
  const [elCount, setElCount] = useState(4);
 
  const [submitReady, setSubmitReady] = useState(false);
  const [alertText, setAlertText] = useState<string[]>(["", "", ""]);

  const sydText = 4
  const sydTextRef = useRef(sydText);
  const lokText = 4
  const lokTextRef = useRef(lokText);
  const stuText = 4
  const stuTextRef = useRef(stuText);
  const elText = 4
  const elTextRef = useRef(elText);

  const [isSubmitted, setIsSubmitted] = useRecoilState(submittedState);
  const [answer, setAnswer] = useRecoilState(answerState);

  const router = useRouter();
  const mutation = api.example.post.useMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  function submitButton() {
    if (
      answer.syd == answer.lok ||
      answer.syd == answer.stu ||
      answer.syd == answer.el ||
      answer.lok == answer.stu ||
      answer.lok == answer.el ||
      answer.stu == answer.el
    ) {
      setSubmitReady(false);
      setAlertText([
        "Please make sure you've given each pet a different ranking",
        "",
      ]);
    } else {
      setSubmitReady(true);
      setAlertText([
        "Do you want to submit this ranking?",
        `Sydney: ${answer.syd}\nLoki: ${answer.lok}\nStuart: ${answer.stu}\nEl Gato: ${answer.el}`,
      ]);
    }
    onOpen();
  }

  interface UseUserT {
    isLoaded: boolean;
    isSignedIn: boolean;
    user: { id: string };
  }

  const { isLoaded, isSignedIn, user } = useUser() as UseUserT;

  async function submitPost() {
    const userman = user.id;

    setAnswer({
      syd: sydTextRef.current,
      lok: lokTextRef.current,
      stu: stuTextRef.current,
      el: elTextRef.current
    })
    mutation.mutate({
      sydneyRank: answer.syd,
      lokiRank: answer.lok,
      stuartRank: answer.stu,
      elGatoRank: answer.el,
      authorId: userman,
    });

    setIsSubmitted(true);
    await router.push("/petQuizData");
  }
  function sydneyClick() {
    if(!isSubmitted){
    setSydCount(sydCount + 1);

    sydTextRef.current = (sydCount % 4) + 1;
  }
  }

  function lokClick() {
    if(!isSubmitted){
    setLokCount(lokCount + 1);

    lokTextRef.current = (lokCount % 4) + 1;

  }
  }



  function stuClick() {
    if(!isSubmitted){
    setStuCount(stuCount + 1);

   stuTextRef.current = (stuCount % 4) + 1;
  }
  }

  function elClick() {
    if(!isSubmitted){
    setElCount(elCount + 1);

   elTextRef.current = (elCount % 4) + 1;
  }
  }

  function columns(){
    if (submitReady)
      return 2;
    else
      return 1;
  }


  return (
    <Container minWidth={"90vw"}>
      <Center paddingBottom={"10px"} paddingTop={"20px"}>
        <Text fontSize={"4xl"} as={"b"}>
          Which pet is the cutest?
        </Text>
      </Center>
     {!isSubmitted && <Center paddingBottom={"15px"}>
        <Text fontSize={"2xl"} textColor={"gray"}>
          Click on the images below to rank these pets.
        </Text>
      </Center>}
      <Center>
        <SimpleGrid columns={2} spacing={10}>
          <GridItem rowSpan={1}>
            <button onClick={() => sydneyClick()}>
              <Image
                src="/sydney.png"
                width={150}
                height={80}
                alt="Sydney"
              ></Image>
            </button>
            <Text>Sydney: {sydTextRef.current}</Text>
          </GridItem>
          <GridItem>
            <button onClick={() => lokClick()}>
              <Image src="/loki.png" width={150} height={80} alt="Loki"></Image>
            </button>
            <Text>Loki: {lokTextRef.current}</Text>
          </GridItem>
          <GridItem>
            <button onClick={() => stuClick()}>
              <Image
                src="/stuart.png"
                width={150}
                height={80}
                alt="Stuart"
              ></Image>
            </button>
            <Text>Stuart: {stuTextRef.current}</Text>
          </GridItem>
          <GridItem>
            <button onClick={() => elClick()}>
              <Image
                src="/gato.png"
                width={150}
                height={80}
                alt="El Gato"
              ></Image>
            </button>
            <Text>El Gato {elTextRef.current}</Text>
          </GridItem>
          <GridItem colSpan={2}></GridItem>
        </SimpleGrid>
      </Center>
      <Center>
        {!isSubmitted && <Button onClick={submitButton}>Submit!</Button>}
        {!!isSubmitted && (
          <Button onClick={() => router.push("petQuizData")}>
            View Results!
          </Button>
        )}
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
              <SimpleGrid columns={columns()} spacing={5}>
                <Button ref={cancelRef} onClick={onClose}>
                  Change my answer!
                </Button>
                {submitReady && (
                  <Button colorScheme="telegram" onClick={submitPost}>
                    Submit!
                  </Button>
                )}
              </SimpleGrid>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}
