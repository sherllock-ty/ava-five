import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from '../common/interfaces/product.interface';
import { JwtAuthGuard } from '../common/guard/jwt.guard';
import { RolesGuard } from '../common/guard/roles.guard';
import { HasRole } from '../common/guard/roles.decorator';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard,RolesGuard)
  @HasRole('OWNER')
  create(@Body(ValidationPipe) createProductDto: CreateProductDto) : Promise<IProduct>{
    return this.productsService.create(createProductDto);
  }


  @Get()
  findAll(): Promise<IProduct[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id) : Promise<IProduct> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @HasRole('OWNER')
  update(@Param('id') id, @Body(ValidationPipe) updateProductDto: UpdateProductDto) : Promise<IProduct> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @HasRole('OWNER')
  remove(@Param('id') id) : Promise<IProduct> {
    return this.productsService.remove(id);
  }
}
