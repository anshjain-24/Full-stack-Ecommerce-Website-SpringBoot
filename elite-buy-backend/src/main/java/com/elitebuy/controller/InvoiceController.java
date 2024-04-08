package com.elitebuy.controller;

import com.elitebuy.model.Order;
import com.elitebuy.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/invoice")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping("/generate")
    public ResponseEntity<InputStreamResource> generateInvoice(Order order) throws IOException {
        System.out.println("in controller");
        ByteArrayInputStream invoice = invoiceService.generateInvoice(order);

        // Define the path where you want to save the PDF file in the target directory
        String targetDirectory = "target/invoices/";
        String orderId  = order.getId().toString();
        String fileName = "invoice"+orderId+".pdf";

        // Write the PDF to the target directory
        try (FileOutputStream fos = new FileOutputStream(targetDirectory + fileName)) {
            byte[] buffer = new byte[invoice.available()];
            invoice.read(buffer);
            fos.write(buffer);
        }

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-Disposition", "inline;filename=" + fileName);
        System.out.println("aadded invoice");
        return ResponseEntity
                .ok()
                .headers(httpHeaders)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(invoice));
    }
}
