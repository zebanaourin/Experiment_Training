package com.Experiment_Training.Backend.Controller;
import org.springframework.http.ResponseEntity;
import com.Experiment_Training.Backend.Entity.Recordd;
import com.Experiment_Training.Backend.Repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
        recordRepository.findById(fileNumber).ifPresent(recordRepository::delete);
    }

    @PutMapping("/{fileNumber}/city2")
    public ResponseEntity<Recordd> updateCity2(
            @PathVariable int fileNumber,
            @RequestBody Map<String, String> requestBody) {

        String city2 = requestBody.get("city2");

        return recordRepository.findById(fileNumber).map(record -> {
            record.setCity2(city2);
            recordRepository.save(record);
            return ResponseEntity.ok(record);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{fileNumber}/country2")
    public ResponseEntity<Recordd> updateCountry2(
            @PathVariable int fileNumber,
            @RequestBody Map<String, String> requestBody) {

        String country2 = requestBody.get("country2");

        return recordRepository.findById(fileNumber).map(record -> {
            record.setCountry2(country2);
            recordRepository.save(record);
            return ResponseEntity.ok(record);
        }).orElse(ResponseEntity.notFound().build());
    }







}



