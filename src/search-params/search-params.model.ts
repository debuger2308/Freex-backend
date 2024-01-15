import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "src/users/users.model"


interface searchParamsCreateAttr {
    sex: string
    distance: number
    minAge: number
    maxAge: number
}


@Table({ tableName: "searchParams" })
export class SearchParams extends Model<SearchParams, searchParamsCreateAttr>{

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    sex: string

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    distance: number

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    minAge: number
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    maxAge: number

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number

    @BelongsTo(() => User)
    user: User
}