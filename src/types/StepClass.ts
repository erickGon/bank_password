class StepClass {
  constructor(title: string, value: number, active: boolean, passed: boolean) {
    this.title = title;
    this.value = value;
    this.active = active;
    this.passed = passed;
  }

  public title: string;
  public value: number;
  public active: boolean;
  public passed: boolean;

  public stepPassed() {
    this.passed = true;
    this.active = false;
  }

  public stepActive() {
    this.passed = false;
    this.active = true;
  }
}

export default StepClass;
