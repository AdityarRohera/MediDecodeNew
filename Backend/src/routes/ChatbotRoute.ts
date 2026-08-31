
import express from 'express';
import { userAuth } from '../middlewares/auth';
import { createMessageHandler, getChatHandler } from '../controller/ChatbotController';
const ChatbotRoute = express.Router();

ChatbotRoute.get('/reports/:reportId/chat' , userAuth , getChatHandler);
ChatbotRoute.post('/chats/:chatId/messages' , userAuth , createMessageHandler);


export default ChatbotRoute;

