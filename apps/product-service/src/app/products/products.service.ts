import { Injectable } from '@nestjs/common';
import { IProduct } from '../common/interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProducerService } from '../kafka/producer.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productModel: Repository<Product>,
    private producerService: ProducerService
  ){}
  
  async create(createProductDto: CreateProductDto) : Promise<IProduct>{
    const queryBuilder = this.productModel.createQueryBuilder()
    .insert()
    .into(Product)
    .values({...createProductDto})
    .returning('*');
    
    try {
      const createdProduct = await queryBuilder.execute();
      if (createdProduct.raw.length === 0) {
        return null; 
      }

      return createdProduct.raw[0]; 
    } catch (error) {
      throw new Error();
    }
  }

  async findAll() : Promise<IProduct[]>{
    let products: IProduct[];
    try {
      products = await this.productModel.find()
    } catch (error) {
        return null;
    }
    return products;
  }

  async isProductAvailable(productList): Promise<boolean>{
    let products: IProduct[];
    let allItemsValid : boolean ;
    try {
      products = await this.productModel.find();
      productList.forEach(product =>{
        allItemsValid = productList.every(item => {
          const product = products.find(product => product.id === item.id);
      
          if (!product) {
            return false;
          }
          return item.quantity <= product.stock;
        });
      })
    } catch (error) {
        return null;
    }
    return allItemsValid;
  }

  async findOne(id) {
    let product: IProduct;
    try {
      product = await this.productModel.findOneBy({id:id});
      if(!product){
          return null;
      }
  } catch (error) {
    console.log(id);
    console.log(error);
    
      return null;
  }
  return product;
  }

  async update(id, updateProductDto: UpdateProductDto) : Promise<IProduct>{    
      const queryBuilder = this.productModel.createQueryBuilder()
        .update(Product)
        .set({ ...updateProductDto })
        .where('id = :id', { id })
        .returning('*'); 
      try {
        const updatedProduct = await queryBuilder.execute();
        if (updatedProduct.raw.length === 0) {
          return null; 
        }
        return updatedProduct.raw[0];
    } catch (error) {
      throw new Error();
    }
  }

  async remove(id) : Promise<IProduct> {
    const productToRemove = await this.productModel.findOneBy({id:id});

    if (!productToRemove) {
      return null;
    }
    try {
      await this.productModel.delete(id); 
    } catch (error) {
      throw new Error();
    }

    return productToRemove; 
  }
}
