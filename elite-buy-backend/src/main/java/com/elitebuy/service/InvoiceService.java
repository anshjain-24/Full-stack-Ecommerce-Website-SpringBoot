package com.elitebuy.service;

import com.elitebuy.model.Order;
import com.elitebuy.model.OrderItem;
import com.elitebuy.model.Product;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class InvoiceService {

    private Logger logger = LoggerFactory.getLogger(InvoiceService.class);

    public ByteArrayInputStream generateInvoice(Order order){

        System.out.println("in services...");

        logger.info("started generating invoice");
        String company_name = "EliteBuy";
        String ack_para = "thank you for choosing EliteBuy";

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        Document document = new Document();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // Title
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 25);
            Paragraph titlePara = new Paragraph("EliteBuy", titleFont);
            titlePara.setAlignment(Element.ALIGN_CENTER);
            document.add(titlePara);

            // Spacing
            document.add(new Paragraph("\n"));

            // Company and Shipping Address
            Font addressFont = FontFactory.getFont(FontFactory.HELVETICA, 12);

// Create a PdfPTable with 2 columns
            PdfPTable addressTable = new PdfPTable(2);
            addressTable.setWidthPercentage(100);
            addressTable.setWidths(new int[]{1, 1});

// Add Company Address to the first column
            Paragraph companyAddressPara = new Paragraph("EliteBuy\n\n" +
                    "28-C VD Soc.,\n\n" +
                    "Vadodara,\n\n" +
                    "Gujarat,\n\n" +
                    "India-390019.\n\n", addressFont);
            PdfPCell companyAddressCell = new PdfPCell(companyAddressPara);
            companyAddressCell.setBorder(Rectangle.NO_BORDER);
            addressTable.addCell(companyAddressCell);

// Add Shipping Address to the second column
            Paragraph shippingAddressPara = new Paragraph("Shipping Address\n\n" +
                    "Customer Name: "+order.getUser().getFname()+" "+order.getUser().getLname()+"\n\n" +
                    "Address: "+order.getShippingAddress().getStreetAddress()+",\n\n" +
                    "City: "+order.getShippingAddress().getCity()+",\n\n" +
                    "State: "+order.getShippingAddress().getState()+",\n\n" +
                    "Postal Code: "+order.getShippingAddress().getZipCode().toString()+"\n\n"+
                    "Contact no.: "+order.getShippingAddress().getMobile().toString()+" \n\n",addressFont);
            PdfPCell shippingAddressCell = new PdfPCell(shippingAddressPara);
            shippingAddressCell.setBorder(Rectangle.NO_BORDER);
            shippingAddressCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            addressTable.addCell(shippingAddressCell);

            document.add(addressTable);




            // Spacing
            document.add(new Paragraph("\n"));

            Font messageFont = FontFactory.getFont(FontFactory.TIMES_ITALIC, 12);

            // Order ID
            Paragraph orderIdPara = new Paragraph("order ID : "+order.getId().toString(), messageFont);
            orderIdPara.setAlignment(Element.ALIGN_CENTER);
            document.add(orderIdPara);

            // Created At
            Paragraph createdAtPara = new Paragraph("Order Booking Time : "+order.getCreatedAt().toString(), messageFont);
            createdAtPara.setAlignment(Element.ALIGN_CENTER);
            document.add(createdAtPara);
            document.add(new Paragraph("\n"));

            // Spacing
            document.add(new Paragraph("\n"));

            // Order Items Table
            PdfPTable table = new PdfPTable(4); // 3 columns
            table.setWidthPercentage(100);



            // Table Header
            Font tableHeaderFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
            PdfPCell cell1 = new PdfPCell(new Phrase("Item Name", tableHeaderFont));
            PdfPCell cell2 = new PdfPCell(new Phrase("Quantity", tableHeaderFont));
            PdfPCell cell3 = new PdfPCell(new Phrase("Price", tableHeaderFont));
            PdfPCell cell4 = new PdfPCell(new Phrase("Discounted Price", tableHeaderFont));

// Set padding for table cells
            cell1.setPadding(5);
            cell2.setPadding(5);
            cell3.setPadding(5);
            cell4.setPadding(5);

// Center-align content within table cells
            cell1.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell4.setHorizontalAlignment(Element.ALIGN_CENTER);

            table.addCell(cell1);
            table.addCell(cell2);
            table.addCell(cell3);
            table.addCell(cell4);

// Table Body (Order Items)
            for (OrderItem item : order.getOrderItems()) {
                // Convert primitive data types to String
                String quantity = String.valueOf(item.getQuantity());
                String price = String.valueOf(item.getPrice());
                String discountedPrice = String.valueOf(item.getDiscountedPrice());

                // Create Phrases for each value
                Phrase itemNamePhrase = new Phrase(item.getProduct().getTitle());
                Phrase quantityPhrase = new Phrase(quantity);
                Phrase pricePhrase = new Phrase(price);
                Phrase discountedPricePhrase = new Phrase(discountedPrice);

                // Add Phrases to PdfPCell
                PdfPCell itemNameCell = new PdfPCell(itemNamePhrase);
                PdfPCell quantityCell = new PdfPCell(quantityPhrase);
                PdfPCell priceCell = new PdfPCell(pricePhrase);
                PdfPCell discountedPriceCell = new PdfPCell(discountedPricePhrase);

                // Set padding for table cells
                itemNameCell.setPadding(5);
                quantityCell.setPadding(5);
                priceCell.setPadding(5);
                discountedPriceCell.setPadding(5);

                // Center-align content within table cells
                itemNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                quantityCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                priceCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                discountedPriceCell.setHorizontalAlignment(Element.ALIGN_CENTER);

                // Add cells to the table
                table.addCell(itemNameCell);
                table.addCell(quantityCell);
                table.addCell(priceCell);
                table.addCell(discountedPriceCell);
            }

            document.add(table);

            document.add(new Paragraph("\n"));

            // Total Price
            Font totalPriceFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
            Paragraph totalPricePara = new Paragraph("Total Price: " + order.getTotalDiscountedPrice(), totalPriceFont);
            totalPricePara.setAlignment(Element.ALIGN_RIGHT);
            document.add(totalPricePara);


            document.add(new Paragraph("\n"));
            document.add(new Paragraph("\n"));
            document.add(new Paragraph("\n"));
            document.add(new Paragraph("\n"));
            document.add(new Paragraph("\n"));
            // Thank You Message
            Paragraph thankYouPara = new Paragraph("Dear Valued Customer,\n" +
                    "\n" +
                    "Thank you for choosing EliteBuy! We truly appreciate your business and trust in our services. Your satisfaction is our top priority, and we are committed to providing you with the best shopping experience possible.\n" +
                    "\n" +
                    "We hope your recent purchase brings you joy and satisfaction. If you have any questions or need further assistance, please don't hesitate to contact our customer support team. We're here to help!\n" +
                    "\n" +
                    "Once again, thank you for shopping with us. We look forward to serving you again in the future.\n", messageFont);
            thankYouPara.setAlignment(Element.ALIGN_JUSTIFIED); // Justify alignment
            document.add(thankYouPara);

            document.close();

        } catch (DocumentException e) {
            logger.error("Error occurred while generating invoice: {}", e.getMessage());
        }


        System.out.println("made invoice");

        return new ByteArrayInputStream(out.toByteArray());

    }

}
