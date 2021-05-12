import {  BadRequestException, PipeTransform } from "@nestjs/common";
import { TodoStatus } from "../todo-status.enum";

export class TodoStatusValidationPipe implements PipeTransform {

    readonly allowedStatus = [
        TodoStatus.DONE,
        TodoStatus.IN_PROGRESS,
        TodoStatus.OPEN,
    ]
    transform(value: any){
        console.log('value', value)
        value = value.toUpperCase();
        if(!this.isStatusValid(value)){
            throw new BadRequestException(' invalid status')
        }
        return value;
    }

    private isStatusValid(status: any){
      const idx = this.allowedStatus.indexOf(status)
      return idx !== -1;
    }
}