import { Product } from 'src/products/entities/products.entity';
import { User } from './user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Order {
  @Column({ type: 'date' })
  date: Date;

  @Column()
  user: User;

  @OneToMany(() => Product, (products) => products.name)
  products: Product[];
}
