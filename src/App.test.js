import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import App from './App';

chai.use(chaiEnzyme());

describe('App', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
  });

  it('has expected text', () => {
    wrapper = shallow(<App />);

    expect(wrapper.find('#text').text()).to.equal('To get started, edit src/App.js and save to reload.');
  });
});
