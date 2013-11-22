/**
 * Runs all end to end tests
 */

describe('My Sample Static Site: <%= siteName%>', function() {

  it('should render the root', function() {
    browser().navigateTo('/');
    expect(element('title').text()).toBe("Express");
  });

});