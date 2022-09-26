package ru.eleventh.hlms.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public enum Errors {
    REPO_IS_NOT_EMPTY("Repository is not empty"),
    WRONG_ID("Ids in the request and params do not match"),
    EMPTY_NAME("City name should be not empty"),
    CANNOT_PARSE("Cannot parse input file as CSV"),
    EMPTY_INPUT("The input file doesn't contains any cities"),
    CITY_IS_NOT_FOUND("City isn't found");

    private final String text;
}


