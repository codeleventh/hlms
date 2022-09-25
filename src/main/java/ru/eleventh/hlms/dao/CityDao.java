package ru.eleventh.hlms.dao;

import ru.eleventh.hlms.entity.City;

import java.util.List;

public interface CityDao {

    List<City> findCityByNameICase(String name);

    List<City> findAll(Integer page, Integer pageSize);

    void update(City city);

    void saveAll(List<City> list);

    void deleteAll();

    Long count();
}