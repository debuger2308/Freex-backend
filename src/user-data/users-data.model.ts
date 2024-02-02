
import { Column, DataType, Table, Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users.model";


interface usersDataCreateAttrs {
    userId: number
    age: number
    city: string
    description: string
    name: string
    gender: string
    location: string
}

@Table({ tableName: "users-data" })
export class UsersData extends Model<UsersData, usersDataCreateAttrs>{

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    age: number

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    city: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    location: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    description: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    name: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    gender: string

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number

    @BelongsTo(() => User)
    user: User
}