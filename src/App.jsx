import { Container, MantineProvider, createTheme } from "@mantine/core";
import { useState } from "react";
import Header from "./components/Header";
import Images from "./components/Images";
import imagesData from "./data/images.json";

const theme = createTheme({
    defaultRadius: "sm",
});

function App() {
    const [images, setImages] = useState([...imagesData]);

    return (
        <MantineProvider theme={theme}>
            <Container
                size="lg"
                style={{
                    marginTop: "40px",
                    boxShadow: "34px 38px 239px 44px rgba(0,0,0,0.13)",
                }}
            >
                <Header />
                <Images images={images} setImages={setImages} />
            </Container>
        </MantineProvider>
    );
}

export default App;
