import { Button, Card, Container } from "@chakra-ui/react";
import { api } from "npm/utils/api";
import { useState } from "react";

export default function PetQuizData() {

    const { data } = api.example.getAll.useQuery();
    const [sydRank, setSydRank] = useState(0); 
    const [lokRank, setLokRank] = useState(0); 
    const [stuRank, setStuRank] = useState(0); 
    const [elRank, setElRank] = useState(0); 
    const [totRank, setTotRank] = useState(0);
      
        useEffect(() => {
            data?.forEach((element) => {
                setTotRank(totRank + 4);
                setSydRank(5 - element.sydneyRank + sydRank);
                setLokRank(5 - element.lokiRank + lokRank);
                setStuRank(5 - element.stuartRank + stuRank);
                setElRank(5 - element.elGatoRank + elRank);
            });
        }, [window]);
 

    function func()  {
        console.log(data);
    }
    return(
        <Container bg="blue.50" minWidth={"100vw"} minHeight={"100vh"}>
            <Button onClick={func}></Button>
        </Container>
    )
}

function useEffect(arg0: () => void, arg1: (Window & typeof globalThis)[]) {
    throw new Error("Function not implemented.");
}
