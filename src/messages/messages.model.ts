
import { BelongsTo, Column, DataType, Table, Model, ForeignKey } from "sequelize-typescript";
import { Chats } from "src/chats/chats.model";



@Table({ tableName: 'messages' })
export class Messages extends Model<Messages>{

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    messageType: string

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    userId: number


    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    message: string

    @ForeignKey(() => Chats)
    @Column({ type: DataType.INTEGER })
    chatId: string

    @BelongsTo(() => Chats)
    сhat: Chats
}