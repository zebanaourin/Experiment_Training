package com.Experiment_Training.Backend.Controller;

import com.Experiment_Training.Backend.Entity.Recordd;
import com.Experiment_Training.Backend.Repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequestMapping("/api/records")
@CrossOrigin(origins = "*") // allow frontend to call it
public class RecordController {

    @Autowired
    private RecordRepository recordRepository;

    @GetMapping
    public List<Recordd> getAll() {
        return recordRepository.findAll();
    }

    @GetMapping("/{fileNumber}")
    public ResponseEntity<Recordd> getById(@PathVariable int fileNumber) {
        return recordRepository.findById(fileNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{fileNumber}")
    public ResponseEntity<Recordd> update(@PathVariable int fileNumber, @RequestBody Recordd updated) {
        return recordRepository.findById(fileNumber).map(record -> {
            updated.setFileNumber(fileNumber);
            recordRepository.save(updated);
            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{fileNumber}")
    public void delete(@PathVariable int fileNumber) {
        recordRepository.delete(recordRepository.findById(fileNumber).get());
    }
}



