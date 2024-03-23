
import { Column, DataType, HasMany, Table, Model, ForeignKey } from "sequelize-typescript";
import { Messages } from "src/messages/messages.model";


@Table({ tableName: 'chats' })
export class Chats extends Model<Chats>{

    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number
    @Column({
        type: DataType.STRING,
        unique: true,
        primaryKey: true
    })
    chatId: string

    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    userId1: number
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    userId2: number


    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    chatType: string



    @HasMany(() => Messages)
    messages: Messages[]
}