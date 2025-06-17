//package com.example.veterinary.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.Duration;
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//public class MessageService {
//
//    @Autowired
//    private MessageRepository messageRepository;
//
//    public List<MessageDTO> getMessagesForRecipient(String recipientType) {
//        List<Message> messages = messageRepository.findByRecipientTypeOrderBySentAtDesc(recipientType.toUpperCase());
//
//        return messages.stream().map(message -> MessageDTO.builder()
//                .senderName(message.getSenderName())
//                .subject(message.getSubject())
//                .preview(message.getBody().length() > 80
//                        ? message.getBody().substring(0, 77) + "..."
//                        : message.getBody())
//                .time(getHumanReadableTime(message.getSentAt()))
//                .build()
//        ).collect(Collectors.toList());
//    }
//
//    private String getHumanReadableTime(LocalDateTime sentAt) {
//        Duration duration = Duration.between(sentAt, LocalDateTime.now());
//        if (duration.toMinutes() < 60) {
//            return duration.toMinutes() + " mins ago";
//        } else if (duration.toHours() < 24) {
//            return duration.toHours() + " hours ago";
//        } else if (duration.toDays() == 1) {
//            return "Yesterday";
//        } else {
//            return duration.toDays() + " days ago";
//        }
//    }
//}
//
