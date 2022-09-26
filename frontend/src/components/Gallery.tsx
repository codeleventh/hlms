import React, {useEffect, useState} from 'react';
import {
    Button,
    Grid,
    Group,
    LoadingOverlay,
    Modal,
    Overlay,
    Pagination,
    SimpleGrid,
    Space,
    TextInput
} from '@mantine/core';
import {IconSearch, IconTrash} from "@tabler/icons";
import {City} from "../model/api";
import {endpoints} from "../model/endpoints";
import axios from "axios";
import {isEmpty} from "ramda";
import {CityCard} from './CityCard';

interface IProps {
    pageCount: number;
}

export const Gallery: React.FC<IProps> = (props) => {

    const [activePage, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [searchedCity, setSearchedCity] = useState<City | undefined>();
    const [cities, setCities] = useState<City[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios.request(endpoints.GET_CITIES(activePage))
            .then((response) => {
                const msg = response?.data?.message;
                if (!!msg) throw new Error(msg)
                return response;
            }).then(response => setCities(response.data))
            .catch(e => {
                alert(e.message);
                setCities([])
            }).finally(() => setLoading(false))
    }, [activePage])

    const onDrop = () => {
        setLoading(true);
        axios.request(endpoints.DROP_CITIES())
            .then((response) => {
                const msg = response?.data?.message;
                if (!!msg) throw new Error(msg)
                return response;
            }).then(() => window.location.reload())
            .catch(e => {
                alert(e.message);
                setLoading(false);
            })
    };

    const onSearch = (name: string) => {
        axios.request(endpoints.SEARCH_CITY(name))
            .then((response) => {
                const msg = response?.data?.message;
                if (!!msg) throw new Error(msg)
                return response;
            }).then(response => setSearchedCity(response.data))
            .catch(e => {
                alert(e.message);
                setSearchedCity(undefined);
            })
    };

    return isLoading ? <LoadingOverlay visible={isLoading}/>
        : <>
            <Grid columns={12} gutter='md'>
                <Grid.Col span={8}>
                    <TextInput
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                        placeholder="City name"
                        icon={<IconSearch/>}/>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Button disabled={isEmpty(search?.trim())} onClick={() => onSearch(search!)}>Search</Button>
                </Grid.Col>
            </Grid>
            <Space h='md'/>
            <Modal opened={!!searchedCity} onClose={() => setSearchedCity(undefined)} closeOnEscape>
                <CityCard city={searchedCity} withBorder={false}/>
            </Modal>
            {!!cities && !isEmpty(cities) &&
							<>
								<SimpleGrid cols={3} spacing='md'>
                    {cities!.map(city => <CityCard key={city.id} city={city}/>
                    )}
								</SimpleGrid>

								<Group position='center' style={{padding: '16px 0'}} spacing='md'>
									<Pagination page={activePage} onChange={setPage} total={props.pageCount}/>
									<Button onClick={() => onDrop()} variant='filled' color={'red.9'} leftIcon={<IconTrash/>}>Drop
										database</Button>
								</Group>
							</>
            }
        </>
}
