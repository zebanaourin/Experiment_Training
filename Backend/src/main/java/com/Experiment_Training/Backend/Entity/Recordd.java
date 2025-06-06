package com.Experiment_Training.Backend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "recordd")
public class Recordd {
    @Id
    private int fileNumber;
    private String firstName;
    private String middleName;
    private String country;
    private String city;
    private String gender;
    private String dateOfBirth;

}
