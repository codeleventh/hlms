package ru.eleventh.hlms.service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import ru.eleventh.hlms.dao.CityDaoImpl;
import ru.eleventh.hlms.entity.City;
import ru.eleventh.hlms.error.BusinessException;
import ru.eleventh.hlms.error.Errors;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CityService {
    private static final String DELIMITER = ",";

    @Value("${pageSize}")
    private Integer pageSize;

    private final CityDaoImpl repository;

    public void setCities(@RequestParam MultipartFile file) {
        if (repository.count() != 0)
            throw new BusinessException(Errors.REPO_IS_NOT_EMPTY.getText());

        try {
            val stream = file.getInputStream();
            val reader = new BufferedReader(new InputStreamReader(stream));

            val list = new ArrayList<City>();
            reader.lines()
                    .skip(1) // skipping CSV header
                    .forEach(csvString -> {
                        val fields = csvString.split(DELIMITER);
                        list.add(new City(Long.valueOf(fields[0]), fields[1], fields[2]));
                    });

            if (list.isEmpty())
                throw new BusinessException(Errors.EMPTY_INPUT.getText());

            repository.saveAll(list);
        } catch (Exception exception) {
            throw new BusinessException(Errors.CANNOT_PARSE.getText());
        }
    }

    public void dropCities() {
        repository.deleteAll();
    }

    public Long countPages() {
        return (long) Math.ceil(repository.count() / pageSize.doubleValue());
    }

    public List<City> getCities(@NonNull Integer page) {
        return repository.findAll(page, pageSize);
    }

    public City searchCity(String name) {
        if (null == name || name.isEmpty())
            throw new BusinessException(Errors.EMPTY_NAME.getText());

        val list = repository.findCityByNameICase(name);

        if (list.isEmpty())
            throw new BusinessException(Errors.CITY_IS_NOT_FOUND.getText());

        return list.get(0);
    }

    public void editCity(@NonNull Long number, @NonNull City city) {
        if (!number.equals(city.getId()))
            throw new BusinessException(Errors.WRONG_ID.getText());
        if (city.getName().isBlank())
            throw new BusinessException(Errors.EMPTY_NAME.getText());
        repository.update(city);
    }
}
