import StepClass from '../types/StepClass';

test('Step passed', () => {
  const object = new StepClass('test', 1, true, false);
  object.stepPassed();
  const result = object.passed;
  expect(result).toBeTruthy();
});

test('Step active', () => {
  const object = new StepClass('test', 1, false, false);
  object.stepActive();
  const result = object.active;
  expect(result).toBeTruthy();
});
