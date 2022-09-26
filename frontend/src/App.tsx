import React, {useEffect, useState} from 'react';
import {AppShell, Container, LoadingOverlay, MantineProvider} from '@mantine/core';
import './App.css';
import {Gallery} from "./components/Gallery";
import {Uploader} from "./components/Uploader";
import axios from "axios";
import {endpoints} from "./model/endpoints";
import {head} from "ramda";
import {showNotification} from "@mantine/notifications";

function App() {

    const [isLoading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState<number>();

    useEffect(() => {
        axios.request(endpoints.PAGE_COUNT())
            .then((response) => {
                const msg = response?.data?.message;
                if (!!msg) throw new Error(msg)
                return response;
            }).then((response) => setPageCount(response.data))
            .catch(e => alert(`${e.message}\nPress OK to retry.`))
            .finally(() => setLoading(false));
    }, [pageCount]);

    return (
        <MantineProvider>
            <AppShell>
                <Container size='lg'>
                    {isLoading
                        ? <LoadingOverlay visible={isLoading}/>
                        : pageCount === 0
                            ? <Uploader/>
                            : <Gallery pageCount={pageCount as number}></Gallery>}
                </Container>
            </AppShell>
        </MantineProvider>
    )
}

export default App;
