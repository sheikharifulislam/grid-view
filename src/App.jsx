import { Container, MantineProvider, createTheme } from "@mantine/core";
import Header from "components/Header";
import Images from "components/Images";
import ImagesProvider from "contexts/ImagesProvider";

const theme = createTheme({
    defaultRadius: "sm",
});

function App() {
    return (
        <MantineProvider theme={theme}>
            <ImagesProvider>
                <Container
                    size="lg"
                    style={{
                        marginTop: "40px",
                        boxShadow: "34px 38px 239px 44px rgba(0,0,0,0.13)",
                    }}
                >
                    <Header />
                    <Images />
                </Container>
            </ImagesProvider>
        </MantineProvider>
    );
}

export default App;
