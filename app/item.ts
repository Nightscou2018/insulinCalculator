export class Item {
    public name: string;
    public breadUnits: number;
    public weight: number;
    public dose: number;
    public factor = 1;
    public converter = 12;
    public id: number;

    constructor(weight = 0, breadUnits = 0, name?, id?){
        this.weight = weight;
        this.breadUnits = breadUnits;
        this.name = name ? name : '';
        this.onChange();
    }
    
    public onChange(isWeightChange?: boolean, isBreadUnitsChange?: boolean){
        if (isWeightChange){
            this.breadUnits = this.weight / 12;
        } else if (isBreadUnitsChange) {
            this.weight = this.breadUnits * 12;
        }
        this.dose = this.breadUnits * this.factor;
        
        console.log('newItem hat: ', this.dose);
    }

    public alterWeight(amount:number){
        this.weight += amount;
        this.onChange(true, false);
    }

    public alterBreadUnits(amount:number){
        this.breadUnits += amount;
        this.onChange(false, true);
    }
}