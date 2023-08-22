"use client"
import { Container } from "@chakra-ui/react";
import { api } from "npm/utils/api";

export default function PetQuizData() {

    const { data } = api.example.getAll.useQuery();
    return(
        <Container>
            hello
        </Container>
    )
}