import { Type } from "class-transformer";
import { IsInt } from "class-validator";
import { IListOrdersFilter } from "../interfaces/list-orders-filter.interface";




export class ListOrdersFilter implements IListOrdersFilter {

    @Type(()=>Number)
    @IsInt()
    _page: number;

    @Type(()=>Number)
    @IsInt()
    _limit:number;


}
