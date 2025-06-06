package com.Experiment_Training.Backend.Repository;

import com.Experiment_Training.Backend.Entity.Recordd;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<Recordd, Integer> {
}

