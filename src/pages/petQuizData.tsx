import { Button, Card, Container } from "@chakra-ui/react";
import { api } from "npm/utils/api";
import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';



export default function PetQuizData() {

    const { data } = api.example.getAll.useQuery();
    const [sydRank, setSydRank] = useState(0);
    const [lokRank, setLokRank] = useState(0);
    const [stuRank, setStuRank] = useState(0);
    const [elRank, setElRank] = useState(0);
    const [totRank, setTotRank] = useState(0);

    useEffect(() => {
        data?.forEach((element: { sydneyRank: number; lokiRank: number; stuartRank: number; elGatoRank: number; }) => {
            setTotRank(totRank + 4);
            setSydRank(5 - element.sydneyRank + sydRank);
            setLokRank(5 - element.lokiRank + lokRank);
            setStuRank(5 - element.stuartRank + stuRank);
            setElRank(5 - element.elGatoRank + elRank);
            });
    }, [data] );

    const data1 = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }
    

    function func()  {
        console.log(data1);
    }
    return(
        <Container bg="blue.50" minWidth={"100vw"} minHeight={"100vh"}>
            <Button onClick={func}></Button>
            <div>
        <h2>Bar Example (custom size)</h2>
        <Bar
          data={data1}
          width={400}
          height={200}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
        </Container>
    )
}