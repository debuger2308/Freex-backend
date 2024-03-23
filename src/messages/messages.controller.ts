import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { UserDataGuard } from 'src/auth/user-data.guard';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
    constructor(private messagesService: MessagesService) { }

    @Post('/send-message')
    @UseGuards(UserDataGuard)
    @UsePipes(ValidationPipe)
    sendMessage(@Body() createMessageDto: CreateMessageDto, @Req() req: any) {
        return this.messagesService.createMessage({ messageType: 'user', ...createMessageDto })
    }
}
