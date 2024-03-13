import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "src/users/users.model"


interface searchParamsCreateAttr {

}


@Table({ tableName: "votes" })
export class Votes extends Model<Votes, searchParamsCreateAttr>{

    @Column({ type: DataType.BOOLEAN })
    vote: boolean

    @Column({ type: DataType.INTEGER })
    votedUserId: number

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number

    @BelongsTo(() => User)
    user: User
}