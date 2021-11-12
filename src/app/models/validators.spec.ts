import {emailValidator} from './app-validators';

describe('EMail-Validator', () => {
  it('should accept valid email addresses', () => {
    var control = <any>{value: 'foo@bar.com'};
    var result = emailValidator(control);
    expect(result).toBe(null);
  });
  it('should not accept invalid email addresses', () => {
    var control = <any>{value: 'foobar.com'};
    var result = emailValidator(control);
    expect(result['invalidEMail']).toBeTruthy();
  });
  it('should accept empty email addresses', () => {
    var control = <any>{value: ''};
    var result = emailValidator(control);
    expect(result).toBeNull();
  });

});
