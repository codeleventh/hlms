import {always} from "ramda";
import {FileWithPath} from "react-dropzone";
import {City} from "./api";

export const endpoints = {
    INIT_CITIES: (file: FileWithPath) => ({
        url: '/api/init', method: 'post',
        data: {file},
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    DROP_CITIES: () => ({url: '/api/drop', method: 'post'}),
    PAGE_COUNT: () => ({url: '/api/pagecount', method: 'get'}),
    GET_CITIES: (page: number) => ({url: '/api/city', method: 'get', params: {page: page - 1}}),
    SEARCH_CITY: (name: string) => ({url: '/api/search', method: 'get', params: {name}}),
    UPDATE_CITY: (city: City) => ({url: `/api/city/${city.id}`, method: 'put', data: city})
}