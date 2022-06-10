import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'join'

})
export class JoinPipe implements PipeTransform{
    transform(value: any) {//taking the coma seperated values under the meal/schedule in the list as 'value'
        return Array.isArray(value)? value.join(', ') : value ; // if array, join with ',' or else return that value itself
    }

}