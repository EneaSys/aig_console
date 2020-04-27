import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'AigC6eGenericStatus' })
export class AigC6eGenericStatusPipe implements PipeTransform {
    transform(value: any): any {
        switch (value) {
            case "1":
                return "Inserito"
            case "2":
                return "In fase di conferma dell'ente"
            case "3":
                return "Confermato"
            case "4":
                return "Da rivedere"
            default:
                return "Inserito"
        }
    }
}