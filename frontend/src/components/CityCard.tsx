import React, {useEffect, useState} from 'react';
import {
    ActionIcon,
    Button,
    Card,
    Center,
    Group,
    Image,
    LoadingOverlay,
    Pagination,
    SimpleGrid,
    Text
} from '@mantine/core';
import {IconPencil, IconTrash} from "@tabler/icons";
import {City} from "../model/api";
import {EditModal} from "./EditModal";
import {endpoints} from "../model/endpoints";
import axios from "axios";
import {isEmpty} from "ramda";

interface IProps {
    city?: City;
    withBorder?: boolean;
}

export const CityCard: React.FC<IProps> = (props) => {
    const {city = {} as City, withBorder = true} = props;
    const [isModalOpened, setModalOpened] = useState(false);

    return !!city && <Card radius='md' withBorder={withBorder}>
			<Center>
				<Image
					fit='contain'
					height={240}
					width='100%'
					alt={city.name}
					src={city.photo}
					withPlaceholder
				/>
			</Center>
			<Group>
				<Text size='lg'>{city.name}</Text>
				<ActionIcon onClick={() => {
            setModalOpened(true);
        }}>
					<IconPencil size={20}/>
				</ActionIcon>
			</Group>
        {isModalOpened &&
					<EditModal initialCity={city as City} opened={isModalOpened} setOpened={setModalOpened}/>}
		</Card>
}
