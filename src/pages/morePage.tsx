import { Center, Container, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import path from "path";
import { pdfjs, Document } from "react-pdf";
import type { PDFDocumentProxy } from 'pdfjs-dist';

export default function MorePage() {


    return (
        <Container minWidth={"90vw"}>
    
            <Grid templateColumns='repeat(3, 1fr)' gap={10}> 
                <GridItem w='100%' h='500' bg='blue.500'>
                    <Document file="/paper.pdf">
                    </Document>
                </GridItem>
                <GridItem w='100%' h='500' bg='blue.500' />
                <GridItem w='100%' h='500' bg='blue.500' />
                </Grid>
            
        </Container>
    )};