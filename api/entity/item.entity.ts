import { Column, Entity, PrimaryGeneratedColumn, Double } from "typeorm";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column()
  public description!: string;

  @Column()
  public price!: number;

  @Column({default: null})
  public imageUrls!: string;

  @Column({default: 0})
  public stockCount!: number;

  @Column({default: null})
  public tags!: string;

  @Column({default: false})
  public inStoreOnly!: boolean;
}
