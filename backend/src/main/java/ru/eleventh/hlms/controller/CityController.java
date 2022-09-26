package ru.eleventh.hlms.controller;

import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationContext;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.eleventh.hlms.entity.City;
import ru.eleventh.hlms.error.BusinessException;
import ru.eleventh.hlms.error.ErrorResponse;
import ru.eleventh.hlms.service.CityService;

import java.util.List;

@RestController
@RequestMapping(path = "api", produces = {MediaType.APPLICATION_JSON_VALUE})
@RequiredArgsConstructor
public class CityController {

    private final CityService service;

    private final ApplicationContext context;

    @PostMapping("init")
    public void setCities(@RequestBody MultipartFile file) {
        service.setCities(file);
    }

    @PostMapping("drop")
    public void dropCities() {
        service.dropCities();
    }

    @GetMapping("pagecount")
    public Long countPages() {
        return service.countPages();
    }

    @GetMapping("search")
    public City searchCity(@PathParam("name") String name) {
        return service.searchCity(name);
    }

    @GetMapping("city")
    public List<City> getCities(@PathParam("page") Integer page) {
        return service.getCities(page);
    }

    @PutMapping(value = "city/{id}")
    public void editCity(@PathVariable Long id, @RequestBody City city) {
        service.editCity(id, city);
    }

    @ExceptionHandler({BusinessException.class})
    private ErrorResponse handleError(BusinessException e) {
        return new ErrorResponse(e.getMessage());
    }
}
