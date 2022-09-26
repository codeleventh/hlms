import React, {useEffect, useState} from 'react';
import {
    ActionIcon,
    AppShell,
    Button,
    Card,
    Center,
    Container,
    Group,
    Image,
    MantineProvider,
    Overlay,
    Pagination,
    Modal,
    SimpleGrid,
    Text, LoadingOverlay, Grid
} from '@mantine/core';
import {IconPencil, IconTrash, IconUpload} from "@tabler/icons";
import {Dropzone, MIME_TYPES} from "@mantine/dropzone";
import {FileWithPath} from "react-dropzone";
import {wait} from "@testing-library/user-event/dist/utils";
import axios from "axios";
import {endpoints} from "../model/endpoints";
import {always, head} from "ramda";

export const Uploader: React.FC = () => {
    const [isLoading, setLoading] = useState(false);

    const onDrop = (files: FileWithPath[]) => {
        setLoading(true);
        axios.request(endpoints.INIT_CITIES(head(files)!))
            .then((response) => {
                const msg = response?.data?.message;
                if (!!msg) throw new Error(msg)
            }).then(() => window.location.reload())
            .catch(e => alert(e.message))
            .finally(() => setLoading(false))
    }

    return <SimpleGrid>
        <Text>Database is empty.</Text>
        <Dropzone
            onDrop={(files) => onDrop(files)}
            maxFiles={1}
        >
            <LoadingOverlay visible={isLoading}/>
            <Container>
                <Center><IconUpload size={64} stroke={1.5}/></Center>
                <Text align="center">Drop your CSV file here</Text>
            </Container>
        </Dropzone>
    </SimpleGrid>
}