"use client";
import { Button, Card, Container } from "@chakra-ui/react";
import { api } from "npm/utils/api";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function PetQuizData() {
  const { data } = api.example.getAll.useQuery();
  const [sydRank, setSydRank] = useState(0);
  const [lokRank, setLokRank] = useState(0);
  const [stuRank, setStuRank] = useState(0);
  const [elRank, setElRank] = useState(0);
  const [totRank, setTotRank] = useState(0);

  useEffect(() => {
    data?.forEach(
      (element: {
        sydneyRank: number;
        lokiRank: number;
        stuartRank: number;
        elGatoRank: number;
      }) => {
        setTotRank(totRank + 4);
        setSydRank(5 - element.sydneyRank + sydRank);
        setLokRank(5 - element.lokiRank + lokRank);
        setStuRank(5 - element.stuartRank + stuRank);
        setElRank(5 - element.elGatoRank + elRank);
        console.log(elRank);
      }

   
    );
  }, [data]);

  const data1 = [
    {
      name: "Sydney",
      total: (sydRank / totRank) * 100,
    },
    {
      name: "Loki",
      total: (lokRank / totRank) * 100,
    },
    {
      name: "Stuart",
      total: (stuRank / totRank) * 100,
    },
    {
      name: "El Gato",
      total: (elRank / totRank) * 100
    },
  ];
  function func() {
    console.log(data);
    console.log(data1);
    }
    

  return (
    <Container bg="blue.50" minWidth={"100vw"} minHeight={"100vh"}>
        <Button onClick={func}></Button>
      <ResponsiveContainer width="80%" height={300}>
        <BarChart data={data1}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `%${value}`}
          />
          <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
}
