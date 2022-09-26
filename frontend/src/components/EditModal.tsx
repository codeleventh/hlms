import {Button, Modal, SimpleGrid, TextInput} from "@mantine/core";
import {City} from "../model/api";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {all, values, isEmpty, none} from "ramda";
import axios from "axios";
import {endpoints} from "../model/endpoints";

interface IProps {
    initialCity: City,
    opened: boolean,
    setOpened: (opened: boolean) => void,
}

export const EditModal: React.FC<IProps> = (props) => {
    const {initialCity, opened, setOpened} = props;
    const [isLoading, setLoading] = useState(false);

    const submit = (city: City) => {
        setLoading(true);
        axios.request(endpoints.UPDATE_CITY(city))
            .then((response) => {
                const msg = response?.data?.message;
                if (!!msg) throw new Error(msg)
                return response;
            }).then(() => window.location.reload())
            .catch(e => alert(e.message))
            .finally(() => {
                setLoading(false)
            })
    };

    const form = useForm<City>({
        validateInputOnBlur: true,
        initialValues: {
            id: initialCity.id,
            name: initialCity.name,
            photo: initialCity.photo
        },
        validate: {
            name: (value: string) => isEmpty(value.trim()) ? 'Name should be not empty' : null,
        },
    });

    return <Modal title='Editor form' opened={opened} onClose={() => setOpened(false)}>
        <SimpleGrid spacing='md'>
            <TextInput
                withAsterisk
                label="City name"
                {...form.getInputProps('name')}
            />
            <TextInput
                label="Photo link"
                {...form.getInputProps('photo')}
            />
            <Button type="submit" onClick={() => submit(form.values)} disabled={!form.isValid()}>Submit</Button>
        </SimpleGrid>
    </Modal>
}