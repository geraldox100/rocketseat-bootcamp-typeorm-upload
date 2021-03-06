import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import Category from './Category';

@Entity('transactions')
class Transaction {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  type: 'income' | 'outcome';

  @Column('decimal')
  value: number;

  @Column()
  category_id: string;

  @ManyToOne( () => Category)
  @JoinColumn({ name: 'category_id'})
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
