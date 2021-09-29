
export class Student {
    code: string;
    cedula: string;
    age: string;
    address: string;
    telephoneNumber: string;
  
    constructor(code: string, cedula: string, age: string, address: string, telephoneNumber: string) {
      this.code = code;
      this.cedula = cedula;
      this.age = age;
      this.address = address;
      this.telephoneNumber = telephoneNumber;
    }
  }