package ru.eleventh.hlms.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "city")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class City {
    @Id
    @Column
    private Long id;

    @Column
    private String name;

    @Column(length = 1024)
    private String photo;
}

