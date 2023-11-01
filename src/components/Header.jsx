import { Button, Checkbox, Flex } from "@mantine/core";
import React from "react";

const Header = () => {
    return (
        <Flex
            justify="space-between"
            align="center"
            style={{
                padding: "10px 15px",
            }}
        >
            <Checkbox label="3 file selected" />
            <Button variant="filled" color="red">
                Delete Files
            </Button>
        </Flex>
    );
};

export default Header;
