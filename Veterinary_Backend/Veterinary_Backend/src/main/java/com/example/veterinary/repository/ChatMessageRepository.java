//package com.example.veterinary.repository;
//
//import com.example.veterinary.Entity.ChatMessage;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//
//public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
//    List<ChatMessage> findBySenderIdAndReceiverIdOrderByTimestamp(Long senderId, Long receiverId);
//}
//
