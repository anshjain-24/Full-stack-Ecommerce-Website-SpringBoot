package com.elitebuy.controller;

import com.elitebuy.Exception.OrderException;
import com.elitebuy.Repository.OrderRepository;
import com.elitebuy.Repository.ProductRepository;
import com.elitebuy.Response.ApiResponse;
import com.elitebuy.model.Order;
import com.elitebuy.model.OrderItem;
import com.elitebuy.model.Product;
import com.elitebuy.service.OrderService;
import com.elitebuy.service.UserService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PaymentController {

    @Value("${razorpay.api.key}")
    String apiKey;

    @Value("${razorpay.api.secret}")
    String apiSecret;

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/payments/{orderId}")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(@PathVariable Long orderId,
                            @RequestHeader("Authorization") String jwt) throws OrderException, RazorpayException {

        Order order = orderService.findOrderById(orderId);

        try{
            RazorpayClient razorpay = new RazorpayClient(apiKey,apiSecret);

            JSONObject paymentLinkRequest = new JSONObject();

            paymentLinkRequest.put("amount",order.getTotalDiscountedPrice()*100);

            paymentLinkRequest.put("currency","INR");

            JSONObject customer = new JSONObject();
            customer.put("name",order.getUser().getFname());
            customer.put("email",order.getUser().getEmail());
            paymentLinkRequest.put("customer",customer);

            JSONObject notify = new JSONObject();
            notify.put("sms",true);
            notify.put("email",true);
            paymentLinkRequest.put("notify",notify);

            paymentLinkRequest.put("callback_url","http://localhost:3000/payment/"+orderId);

            paymentLinkRequest.put("callback_method","get");

            PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);

            String paymentLinkId = payment.get("id");
            String paymentLinkUrl = payment.get("short_url");

            PaymentLinkResponse res = new PaymentLinkResponse();
            res.setPayment_link_id(paymentLinkId);
            res.setPayment_link_url(paymentLinkUrl);

            System.out.println("payment has been successfully done");

            return new ResponseEntity<PaymentLinkResponse>(res, HttpStatus.CREATED);

        }
        catch (Exception e){
            System.out.println("there is some problem with payment");
            throw new RazorpayException(e.getMessage());
        }

    }

    @GetMapping("/payments")
    public ResponseEntity<ApiResponse> redirect(@RequestParam(name="payment_id")String paymentId,
                     @RequestParam(name="order_id")Long orderId) throws OrderException, RazorpayException {
        Order order = orderService.findOrderById(orderId);
        RazorpayClient razorpay = new RazorpayClient(apiKey,apiSecret);
        try{
            Payment payment = razorpay.payments.fetch(paymentId);

            if(payment.get("status").equals("captured")){
                order.getPaymentDetails().setPaymentId(paymentId);
                order.getPaymentDetails().setStatus("COMPLETED");
                order.setOrderStatus("PLACED");
                List<OrderItem> orderitemslist = order.getOrderItems();
                orderitemslist.forEach(orderItem ->{
                    Product product =  orderItem.getProduct();
                    product.setQuantity(product.getQuantity()- orderItem.getQuantity());
                    productRepository.save(product);
                });
                System.out.println("order has been placed successfully , orderId : "+orderId);
                orderRepository.save(order);
            }
            ApiResponse res = new ApiResponse();
            res.setMessage("your order placed successfully");
            res.setStatus(true);
            return new ResponseEntity<ApiResponse>(res,HttpStatus.ACCEPTED);
        }
        catch (Exception e){
            throw new RazorpayException(e.getMessage());
        }
    }
}
