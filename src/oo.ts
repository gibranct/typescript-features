class Department {
    // private readonly id: string;
    // private name: string;
    protected employees: string[] = [];
  
    constructor(private readonly id: string, public name: string) {
      // this.id = id;
      // this.name = n;
    }
  
    describe(this: Department) {
      console.log(`Department (${this.id}): ${this.name}`);
    }
  
    addEmployee(employee: string) {
      // validation etc
      // this.id = 'd2';
      this.employees.push(employee);
    }
  
    printEmployeeInformation() {
      console.log(this.employees.length);
      console.log(this.employees);
    }
  }
  
  class ITDepartment extends Department {
    // admins: string[];
    constructor(id: string, public admins: string[]) {
      super(id, 'IT');
    //   this.admins = admins;
    }
  }
  
  class AccountingDepartment extends Department {
    private lastReport: string;

    get mostRecentReport() {
      if (this.lastReport) {
        return this.lastReport
      }
      throw new Error('No report found')
    }

    constructor(id: string, private reports: string[]) {
      super(id, 'Accounting');
      this.lastReport = reports[0]
    }

    addEmployee(name: string) {
      if (name === 'Max') {
        return;
      }
      this.employees.push(name)
    }
  
    addReport(text: string) {
      this.reports.push(text);
      this.lastReport = text
    }
  
    printReports() {
      console.log(this.reports);
    }
  }
  
  const it = new ITDepartment('d1', ['Max']);
  
  it.addEmployee('Max');
  it.addEmployee('Manu');
  
  // it.employees[2] = 'Anna';
  
  it.describe();
  it.name = 'NEW NAME';
  it.printEmployeeInformation();
  
  console.log(it);
  
  const accounting = new AccountingDepartment('d2', []);
  
  accounting.addReport('Something went wrong...');
  
  accounting.printReports();
  
  // const accountingCopy = { name: 'DUMMY', describe: accounting.describe };
  
  // accountingCopy.describe();